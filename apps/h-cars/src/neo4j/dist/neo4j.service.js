"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.Neo4jService = void 0;
var common_1 = require("@nestjs/common");
var mongodb_1 = require("mongodb");
var neo4j_driver_1 = require("neo4j-driver");
var Neo4jService = /** @class */ (function () {
    function Neo4jService() {
        var mongoUri = process.env.MONGO_URI;
        // MongoDB setup
        this.mongoClient = new mongodb_1.MongoClient(mongoUri);
        // Neo4j setup
        var neo4jUri = process.env.NEO4J_URI;
        var neo4jUser = process.env.NEO4J_USER;
        var neo4jPassword = process.env.NEO4J_PASSWORD;
        var neo4jDriver = neo4j_driver_1["default"].driver(neo4jUri, neo4j_driver_1["default"].auth.basic(neo4jUser, neo4jPassword));
        this.neo4jSession = neo4jDriver.session();
    }
    Neo4jService.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection, changeStream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('Syncing data...');
                        return [4 /*yield*/, this.mongoClient.connect()];
                    case 1:
                        _a.sent();
                        database = this.mongoClient.db(process.env.MONGO_DB);
                        collection = database.collection('users');
                        changeStream = collection.watch();
                        changeStream.on('change', function (change) { return __awaiter(_this, void 0, void 0, function () {
                            var _a, newUser, updatedFields, userId, user, deletedUserId, user;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        console.log('Change detected:', change);
                                        _a = change.operationType;
                                        switch (_a) {
                                            case 'insert': return [3 /*break*/, 1];
                                            case 'update': return [3 /*break*/, 3];
                                            case 'delete': return [3 /*break*/, 8];
                                        }
                                        return [3 /*break*/, 13];
                                    case 1:
                                        newUser = change.fullDocument;
                                        return [4 /*yield*/, this.createUser(newUser)];
                                    case 2:
                                        _b.sent();
                                        return [3 /*break*/, 13];
                                    case 3:
                                        updatedFields = change.updateDescription.updatedFields;
                                        userId = change.documentKey._id.toString();
                                        return [4 /*yield*/, this.mongoClient
                                                .db(process.env.MONGO_DB)
                                                .collection('users')
                                                .findOne({ _id: new mongodb_1.ObjectId(userId) })];
                                    case 4:
                                        user = _b.sent();
                                        if (!user) return [3 /*break*/, 6];
                                        return [4 /*yield*/, this.updateUser(user.email, updatedFields)];
                                    case 5:
                                        _b.sent();
                                        return [3 /*break*/, 7];
                                    case 6: return [2 /*return*/, 'User not found in MongoDB with _id: ' + userId];
                                    case 7: return [3 /*break*/, 13];
                                    case 8:
                                        deletedUserId = change.documentKey._id.toString();
                                        return [4 /*yield*/, this.mongoClient
                                                .db(process.env.MONGO_DB)
                                                .collection('users')
                                                .findOne({ _id: new mongodb_1.ObjectId(deletedUserId) })];
                                    case 9:
                                        user = _b.sent();
                                        if (!user) return [3 /*break*/, 11];
                                        return [4 /*yield*/, this.deleteUser(deletedUserId)];
                                    case 10:
                                        _b.sent();
                                        return [3 /*break*/, 12];
                                    case 11: return [2 /*return*/, 'User not found in MongoDB with _id: ' + deletedUserId];
                                    case 12: return [3 /*break*/, 13];
                                    case 13: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.createUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      MERGE (u:User {email: $email})\n      ON CREATE SET u.firstName = $firstName, u.lastName = $lastName, u.age = $age\n      ON MATCH SET u.firstName = COALESCE($firstName, u.firstName),\n                   u.lastName = COALESCE($lastName, u.lastName),\n                   u.age = COALESCE($age, u.age)\n    ";
                        return [4 /*yield*/, this.neo4jSession.run(query, {
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                age: user.age
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.updateUser = function (userEmail, updatedFields) {
        return __awaiter(this, void 0, void 0, function () {
            var userPropertiesQuery, _i, _a, followingUserInfo, followingUserEmail, followUserQuery, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        userPropertiesQuery = "\n      MATCH (u:User {email: $userEmail})\n      SET u += $updatedFields\n    ";
                        return [4 /*yield*/, this.neo4jSession.run(userPropertiesQuery, {
                                userEmail: userEmail,
                                updatedFields: updatedFields
                            })];
                    case 1:
                        _b.sent();
                        if (!(updatedFields.following && updatedFields.following.length > 0)) return [3 /*break*/, 7];
                        _i = 0, _a = updatedFields.following;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 7];
                        followingUserInfo = _a[_i];
                        followingUserEmail = followingUserInfo.followingUser;
                        // Log the email addresses for debugging purposes
                        console.log("Creating relationship: " + userEmail + " FOLLOWS " + followingUserEmail);
                        followUserQuery = "\n        MATCH (currentUser:User {email: $userEmail})\n        MATCH (followedUser:User {email: $followingUserEmail})\n        MERGE (currentUser)-[:FOLLOWS]->(followedUser)\n      ";
                        _b.label = 3;
                    case 3:
                        _b.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, this.neo4jSession.run(followUserQuery, {
                                userEmail: userEmail,
                                followingUserEmail: followingUserEmail
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        error_1 = _b.sent();
                        console.error('Error creating FOLLOW relationship:', error_1);
                        return [3 /*break*/, 6];
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.deleteUser = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      MATCH (u:User {_id: $userId})\n      DETACH DELETE u\n    ";
                        return [4 /*yield*/, this.neo4jSession.run(query, { _id: new mongodb_1.ObjectId(userId) })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.recommendCarsBasedOnFollowedUserLikes = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendCarsQuery, carsResult, recommendedCars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recommendCarsQuery = "\n      MATCH (currentUser:User {email: $userEmail})-[:FOLLOWS]->(followedUser)-[:LIKES_CAR]->(car)\n      WHERE NOT (currentUser)-[:LIKES_CAR]->(car)\n      RETURN car\n    ";
                        return [4 /*yield*/, this.neo4jSession.run(recommendCarsQuery, {
                                userEmail: userEmail
                            })];
                    case 1:
                        carsResult = _a.sent();
                        recommendedCars = carsResult.records.map(function (record) { return record.get('car').properties; });
                        if (recommendedCars.length === 0) {
                            return [2 /*return*/, 'No car recommendations available either because you are not following anyone or because the persons you follow do not have any liked cars.'];
                        }
                        return [2 /*return*/, recommendedCars];
                }
            });
        });
    };
    Neo4jService.prototype.recommendProductsBasedOnFollowedUserLikes = function (userEmail) {
        return __awaiter(this, void 0, void 0, function () {
            var recommendProductsQuery, productsResult, recommendedProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        recommendProductsQuery = "\n      MATCH (currentUser:User {email: $userEmail})-[:FOLLOWS]->(followedUser)-[:LIKES_PRODUCT]->(product)\n      WHERE NOT (currentUser)-[:LIKES_PRODUCT]->(product)\n      RETURN product\n    ";
                        return [4 /*yield*/, this.neo4jSession.run(recommendProductsQuery, {
                                userEmail: userEmail
                            })];
                    case 1:
                        productsResult = _a.sent();
                        recommendedProducts = productsResult.records.map(function (record) { return record.get('product').properties; });
                        if (recommendedProducts.length === 0) {
                            return [2 /*return*/, 'No product recommendations available either because you are not following anyone or because the persons you follow do not have any liked products.'];
                        }
                        return [2 /*return*/, recommendedProducts];
                }
            });
        });
    };
    Neo4jService = __decorate([
        common_1.Injectable()
    ], Neo4jService);
    return Neo4jService;
}());
exports.Neo4jService = Neo4jService;
