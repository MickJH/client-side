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
        this.mongoClient = new mongodb_1.MongoClient(mongoUri);
        var neo4jUri = process.env.NEO4J_URI;
        var neo4jUser = process.env.NEO4J_USER;
        var neo4jPassword = process.env.NEO4J_PASSWORD;
        this.neo4jDriver = neo4j_driver_1["default"].driver(neo4jUri, neo4j_driver_1["default"].auth.basic(neo4jUser, neo4jPassword));
    }
    Neo4jService.prototype.onModuleInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var database, collection, changeStream;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.mongoClient.connect()];
                    case 1:
                        _a.sent();
                        database = this.mongoClient.db(process.env.MONGO_DB);
                        collection = database.collection('users');
                        changeStream = collection.watch();
                        changeStream.on('change', function (change) { return __awaiter(_this, void 0, void 0, function () {
                            var userId, user, session, _a, newUser, likedCars, likedProducts, updatedFields, likedCars, likedProducts, followingUsers, userEmail;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        userId = change.documentKey._id;
                                        return [4 /*yield*/, collection.findOne({ _id: new mongodb_1.ObjectId(userId) })];
                                    case 1:
                                        user = _b.sent();
                                        session = this.neo4jDriver.session();
                                        _b.label = 2;
                                    case 2:
                                        _b.trys.push([2, , 13, 15]);
                                        _a = change.operationType;
                                        switch (_a) {
                                            case 'insert': return [3 /*break*/, 3];
                                            case 'update': return [3 /*break*/, 6];
                                            case 'delete': return [3 /*break*/, 10];
                                        }
                                        return [3 /*break*/, 12];
                                    case 3:
                                        newUser = change.fullDocument;
                                        return [4 /*yield*/, this.createUser(session, newUser.email)];
                                    case 4:
                                        _b.sent();
                                        likedCars = newUser.likedCars.map(function (car) { return car.carId; });
                                        likedProducts = newUser.likedProducts.map(function (product) { return product.productId; });
                                        return [4 /*yield*/, this.updateUserLikes(session, newUser.email, likedCars, likedProducts)];
                                    case 5:
                                        _b.sent();
                                        return [3 /*break*/, 12];
                                    case 6:
                                        if (!user) {
                                            return [2 /*return*/];
                                        }
                                        updatedFields = change.updateDescription.updatedFields;
                                        likedCars = user.likedCars.map(function (car) { return car.carId; });
                                        likedProducts = user.likedProducts.map(function (product) { return product.productId; });
                                        return [4 /*yield*/, this.updateUserLikes(session, user.email, likedCars, likedProducts)];
                                    case 7:
                                        _b.sent();
                                        if (!updatedFields.following) return [3 /*break*/, 9];
                                        followingUsers = updatedFields.following.map(function (f) { return f.followingUser; });
                                        return [4 /*yield*/, this.updateUserFollowing(session, user.email, followingUsers)];
                                    case 8:
                                        _b.sent();
                                        _b.label = 9;
                                    case 9: return [3 /*break*/, 12];
                                    case 10:
                                        userEmail = change.documentKey.email;
                                        return [4 /*yield*/, this.deleteUser(session, userEmail)];
                                    case 11:
                                        _b.sent();
                                        return [3 /*break*/, 12];
                                    case 12: return [3 /*break*/, 15];
                                    case 13: return [4 /*yield*/, session.close()];
                                    case 14:
                                        _b.sent();
                                        return [7 /*endfinally*/];
                                    case 15: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.createUser = function (session, email) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      MERGE (u:User {email: $email})\n    ";
                        return [4 /*yield*/, session.run(query, { email: email })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.updateUserLikes = function (session, email, likedCars, likedProducts) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      MATCH (u:User {email: $email})\n      SET u.likedCars = $likedCars, u.likedProducts = $likedProducts\n    ";
                        return [4 /*yield*/, session.run(query, { email: email, likedCars: likedCars, likedProducts: likedProducts })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.deleteUser = function (session, email) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "\n      MATCH (u:User {email: $email})\n      DETACH DELETE u\n    ";
                        return [4 /*yield*/, session.run(query, { email: email })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.updateUserFollowing = function (session, userEmail, following) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, following_1, followingUserEmail, query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, following_1 = following;
                        _a.label = 1;
                    case 1:
                        if (!(_i < following_1.length)) return [3 /*break*/, 4];
                        followingUserEmail = following_1[_i];
                        query = "\n        MATCH (u:User {email: $userEmail})\n        MERGE (f:User {email: $followingUserEmail})\n        MERGE (u)-[:FOLLOWS]->(f)\n      ";
                        return [4 /*yield*/, session.run(query, { userEmail: userEmail, followingUserEmail: followingUserEmail })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.recommendCars = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var session, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = this.neo4jDriver.session();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 5]);
                        query = "\n        MATCH (u:User {email: $email})-[:FOLLOWS]->(f:User)\n        WITH u, collect(f.likedCars) AS friendsLikedCars\n        UNWIND friendsLikedCars AS friendLikedCar\n        WITH u, friendLikedCar\n        WHERE NOT friendLikedCar IN u.likedCars\n        RETURN DISTINCT friendLikedCar AS RecommendedCar\n      ";
                        return [4 /*yield*/, session.run(query, { email: email })];
                    case 2:
                        result = _a.sent();
                        if (result.records.length === 0) {
                            return [2 /*return*/, "No recommendations found because you either don't follow anyone or none of your friends have liked any cars."];
                        }
                        return [2 /*return*/, result.records.map(function (record) { return record.get('RecommendedCar'); })];
                    case 3: return [4 /*yield*/, session.close()];
                    case 4:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Neo4jService.prototype.recommendProducts = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var session, query, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        session = this.neo4jDriver.session();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, , 3, 5]);
                        query = "\n        MATCH (u:User {email: $email})-[:FOLLOWS]->(f:User)\n        WITH u, collect(f.likedProducts) AS friendsLikedProducts\n        UNWIND friendsLikedProducts AS friendLikedProduct\n        WITH u, friendLikedProduct\n        WHERE NOT friendLikedProduct IN u.likedProducts\n        RETURN DISTINCT friendLikedProduct AS RecommendedProduct\n      ";
                        return [4 /*yield*/, session.run(query, { email: email })];
                    case 2:
                        result = _a.sent();
                        if (result.records.length === 0) {
                            return [2 /*return*/, "No recommendations found because you either don't follow anyone or none of your friends have liked any products."];
                        }
                        return [2 /*return*/, result.records.map(function (record) { return record.get('RecommendedProduct'); })];
                    case 3: return [4 /*yield*/, session.close()];
                    case 4:
                        _a.sent();
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
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
