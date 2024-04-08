"use strict";
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
var dotenv_1 = require("dotenv");
var mongodb_1 = require("mongodb");
var neo4j_driver_1 = require("neo4j-driver");
dotenv_1["default"].config();
// MongoDB setup
var mongoClient = new mongodb_1.MongoClient(process.env.MONGO_URI);
var dbName = 'test';
var usersCollection = 'users';
// Neo4j setup
var neo4jDriver = neo4j_driver_1["default"].driver(process.env.NEO4J_URI, neo4j_driver_1["default"].auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD));
var neo4jSession = neo4jDriver.session();
function syncData() {
    return __awaiter(this, void 0, void 0, function () {
        var database, collection, changeStream;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('Syncing data...');
                    return [4 /*yield*/, mongoClient.connect()];
                case 1:
                    _a.sent();
                    database = mongoClient.db(dbName);
                    collection = database.collection(usersCollection);
                    changeStream = collection.watch();
                    changeStream.on('change', function (change) { return __awaiter(_this, void 0, void 0, function () {
                        var likedCars;
                        var _this = this;
                        return __generator(this, function (_a) {
                            // Example: Sync new liked car to Neo4j
                            if (change.operationType === 'update' &&
                                change.updateDescription.updatedFields.likedCars) {
                                console.log('Change detected for neo4j');
                                likedCars = change.updateDescription.updatedFields.likedCars;
                                likedCars.forEach(function (car) { return __awaiter(_this, void 0, void 0, function () {
                                    var query;
                                    return __generator(this, function (_a) {
                                        switch (_a.label) {
                                            case 0:
                                                query = "\n          MATCH (u:User {email: $email})\n          MERGE (c:Car {carId: $carId})\n          MERGE (u)-[:LIKES_CAR]->(c)\n        ";
                                                return [4 /*yield*/, neo4jSession.run(query, {
                                                        email: change.documentKey._id,
                                                        carId: car.carId
                                                    })];
                                            case 1:
                                                _a.sent();
                                                return [2 /*return*/];
                                        }
                                    });
                                }); });
                            }
                            return [2 /*return*/];
                        });
                    }); });
                    return [2 /*return*/];
            }
        });
    });
}
syncData()["catch"](console.error);
