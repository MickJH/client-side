import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import neo4j from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit {
  private mongoClient: MongoClient;
  private neo4jSession;

  constructor() {
    const mongoUri = process.env.MONGO_URI;

    // MongoDB setup
    this.mongoClient = new MongoClient(mongoUri);

    // Neo4j setup
    const neo4jUri = process.env.NEO4J_URI;
    const neo4jUser = process.env.NEO4J_USER;
    const neo4jPassword = process.env.NEO4J_PASSWORD;
    const neo4jDriver = neo4j.driver(
      neo4jUri,
      neo4j.auth.basic(neo4jUser, neo4jPassword)
    );
    this.neo4jSession = neo4jDriver.session();
  }

  async onModuleInit() {
    console.log('Syncing data...');

    await this.mongoClient.connect();
    const database = this.mongoClient.db(process.env.MONGO_DB);
    const collection = database.collection('users');

    const changeStream = collection.watch();
    changeStream.on('change', async (change) => {
      console.log('Change detected:', change);

      switch (change.operationType) {
        case 'insert': {
          const newUser = change.fullDocument;
          await this.createUser(newUser);
          break;
        }
        case 'update': {
          const updatedFields = change.updateDescription.updatedFields;
          const userId = change.documentKey._id.toString();
          // Fetch the email from MongoDB
          const user = await this.mongoClient
            .db(process.env.MONGO_DB)
            .collection('users')
            .findOne({ _id: new ObjectId(userId) });

          if (user) {
            await this.updateUser(user.email, updatedFields);
          } else {
            return 'User not found in MongoDB with _id: ' + userId;
          }
          break;
        }
        case 'delete': {
          const deletedUserId = change.documentKey._id.toString();
          // Fetch the email from MongoDB
          const user = await this.mongoClient
            .db(process.env.MONGO_DB)
            .collection('users')
            .findOne({ _id: new ObjectId(deletedUserId) });
          if (user) {
            await this.deleteUser(deletedUserId);
          } else {
            return 'User not found in MongoDB with _id: ' + deletedUserId;
          }
          break;
        }
      }
    });
  }

  async createUser(user) {
    const query = `
      MERGE (u:User {email: $email})
      ON CREATE SET u.firstName = $firstName, u.lastName = $lastName, u.age = $age
      ON MATCH SET u.firstName = COALESCE($firstName, u.firstName),
                   u.lastName = COALESCE($lastName, u.lastName),
                   u.age = COALESCE($age, u.age)
    `;
    await this.neo4jSession.run(query, {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      age: user.age,
    });
  }

  async updateUser(userEmail, updatedFields) {
    // Update user properties
    const userPropertiesQuery = `
      MATCH (u:User {email: $userEmail})
      SET u += $updatedFields
    `;
    await this.neo4jSession.run(userPropertiesQuery, {
      userEmail,
      updatedFields,
    });

    // Check if 'following' field is updated and create relationships in Neo4j
    if (updatedFields.following && updatedFields.following.length > 0) {
      // The following field should contain an array of user email addresses
      for (const followingUserInfo of updatedFields.following) {
        const followingUserEmail = followingUserInfo.followingUser; // Adjust this if the structure is different

        // Log the email addresses for debugging purposes
        console.log(
          `Creating relationship: ${userEmail} FOLLOWS ${followingUserEmail}`
        );

        // Create a FOLLOW relationship to the newly followed user
        const followUserQuery = `
        MATCH (currentUser:User {email: $userEmail})
        MATCH (followedUser:User {email: $followingUserEmail})
        MERGE (currentUser)-[:FOLLOWS]->(followedUser)
      `;

        try {
          await this.neo4jSession.run(followUserQuery, {
            userEmail,
            followingUserEmail,
          });
        } catch (error) {
          console.error('Error creating FOLLOW relationship:', error);
        }
      }
    }
  }

  async deleteUser(userId) {
    const query = `
      MATCH (u:User {_id: $userId})
      DETACH DELETE u
    `;
    await this.neo4jSession.run(query, { _id: new ObjectId(userId) });
  }

  async recommendCarsBasedOnFollowedUserLikes(userEmail) {
    // Match the current user and find cars liked by users they follow
    const recommendCarsQuery = `
      MATCH (currentUser:User {email: $userEmail})-[:FOLLOWS]->(followedUser)-[:LIKES_CAR]->(car)
      WHERE NOT (currentUser)-[:LIKES_CAR]->(car)
      RETURN car
    `;
    const carsResult = await this.neo4jSession.run(recommendCarsQuery, {
      userEmail,
    });

    // Map the result to car properties and return
    const recommendedCars = carsResult.records.map(
      (record) => record.get('car').properties
    );

    if (recommendedCars.length === 0) {
      return 'No car recommendations available either because you are not following anyone or because the persons you follow do not have any liked cars.';
    }

    return recommendedCars;
  }

  async recommendProductsBasedOnFollowedUserLikes(userEmail) {
    // Match the current user and find products liked by users they follow
    const recommendProductsQuery = `
      MATCH (currentUser:User {email: $userEmail})-[:FOLLOWS]->(followedUser)-[:LIKES_PRODUCT]->(product)
      WHERE NOT (currentUser)-[:LIKES_PRODUCT]->(product)
      RETURN product
    `;
    const productsResult = await this.neo4jSession.run(recommendProductsQuery, {
      userEmail,
    });

    // Map the result to product properties and return
    const recommendedProducts = productsResult.records.map(
      (record) => record.get('product').properties
    );

    if (recommendedProducts.length === 0) {
      return 'No product recommendations available either because you are not following anyone or because the persons you follow do not have any liked products.';
    }

    return recommendedProducts;
  }
}
