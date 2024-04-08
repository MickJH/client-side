import { Injectable, OnModuleInit } from '@nestjs/common';
import { MongoClient, ObjectId } from 'mongodb';
import neo4j, { Driver, Session } from 'neo4j-driver';

@Injectable()
export class Neo4jService implements OnModuleInit {
  private mongoClient: MongoClient;
  private neo4jDriver: Driver;

  constructor() {
    const mongoUri = process.env.MONGO_URI;
    this.mongoClient = new MongoClient(mongoUri);

    const neo4jUri = process.env.NEO4J_URI;
    const neo4jUser = process.env.NEO4J_USER;
    const neo4jPassword = process.env.NEO4J_PASSWORD;
    this.neo4jDriver = neo4j.driver(
      neo4jUri,
      neo4j.auth.basic(neo4jUser, neo4jPassword)
    );
  }

  async onModuleInit() {
    await this.mongoClient.connect();
    const database = this.mongoClient.db(process.env.MONGO_DB);
    const collection = database.collection('users');

    const changeStream = collection.watch();
    changeStream.on('change', async (change: any) => {
      const userId = change.documentKey._id;
      const user = await collection.findOne({ _id: new ObjectId(userId) });

      const session = this.neo4jDriver.session();
      try {
        switch (change.operationType) {
          case 'insert': {
            const newUser = change.fullDocument;
            await this.createUser(session, newUser.email);
            const likedCars = newUser.likedCars.map((car) => car.carId);
            const likedProducts = newUser.likedProducts.map(
              (product) => product.productId
            );
            await this.updateUserLikes(
              session,
              newUser.email,
              likedCars,
              likedProducts
            );
            break;
          }
          case 'update': {
            if (!user) {
              return;
            }
            const updatedFields = change.updateDescription.updatedFields;
            const likedCars = user.likedCars.map((car) => car.carId);
            const likedProducts = user.likedProducts.map(
              (product) => product.productId
            );
            await this.updateUserLikes(
              session,
              user.email,
              likedCars,
              likedProducts
            );

            if (updatedFields.following) {
              const followingUsers = updatedFields.following.map(
                (f) => f.followingUser
              );
              await this.updateUserFollowing(
                session,
                user.email,
                followingUsers
              );
            }
            break;
          }
          case 'delete': {
            const userEmail = change.documentKey.email;
            await this.deleteUser(session, userEmail);
            break;
          }
        }
      } finally {
        await session.close();
      }
    });
  }

  async createUser(session: Session, email: string) {
    const query = `
      MERGE (u:User {email: $email})
    `;
    await session.run(query, { email });
  }

  async updateUserLikes(
    session: Session,
    email: string,
    likedCars: string[],
    likedProducts: string[]
  ) {
    const query = `
      MATCH (u:User {email: $email})
      SET u.likedCars = $likedCars, u.likedProducts = $likedProducts
    `;
    await session.run(query, { email, likedCars, likedProducts });
  }

  async deleteUser(session: Session, email: string) {
    const query = `
      MATCH (u:User {email: $email})
      DETACH DELETE u
    `;
    await session.run(query, { email });
  }

  async updateUserFollowing(
    session: Session,
    userEmail: string,
    following: string[]
  ) {
    for (const followingUserEmail of following) {
      const query = `
        MATCH (u:User {email: $userEmail})
        MERGE (f:User {email: $followingUserEmail})
        MERGE (u)-[:FOLLOWS]->(f)
      `;
      await session.run(query, { userEmail, followingUserEmail });
    }
  }

  async recommendCars(email: string) {
    const session = this.neo4jDriver.session();
    try {
      const query = `
        MATCH (u:User {email: $email})-[:FOLLOWS]->(f:User)
        WITH u, collect(f.likedCars) AS friendsLikedCars
        UNWIND friendsLikedCars AS friendLikedCar
        WITH u, friendLikedCar
        WHERE NOT friendLikedCar IN u.likedCars
        RETURN DISTINCT friendLikedCar AS RecommendedCar
      `;
      const result = await session.run(query, { email });

      if (result.records.length === 0) {
        return "No recommendations found because you either don't follow anyone or none of your friends have liked any cars.";
      }

      return result.records.map((record) => record.get('RecommendedCar'));
    } finally {
      await session.close();
    }
  }

  async recommendProducts(email: string) {
    const session = this.neo4jDriver.session();
    try {
      const query = `
        MATCH (u:User {email: $email})-[:FOLLOWS]->(f:User)
        WITH u, collect(f.likedProducts) AS friendsLikedProducts
        UNWIND friendsLikedProducts AS friendLikedProduct
        WITH u, friendLikedProduct
        WHERE NOT friendLikedProduct IN u.likedProducts
        RETURN DISTINCT friendLikedProduct AS RecommendedProduct
      `;
      const result = await session.run(query, { email });

      if (result.records.length === 0) {
        return "No recommendations found because you either don't follow anyone or none of your friends have liked any products.";
      }

      return result.records.map((record) => record.get('RecommendedProduct'));
    } finally {
      await session.close();
    }
  }
}
