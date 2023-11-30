"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("@nestjs/mongoose");
var bcrypt = require("bcrypt");
var UserService = /** @class */ (function () {
    function UserService(userModel, carService, productService) {
        this.userModel = userModel;
        this.carService = carService;
        this.productService = productService;
    }
    UserService.prototype.create = function (UserDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, createdUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = UserDTO.email;
                        return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (user) {
                            throw new common_1.HttpException('user already exists', common_1.HttpStatus.BAD_REQUEST);
                        }
                        createdUser = new this.userModel(UserDTO);
                        return [4 /*yield*/, createdUser.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this.removePassword(createdUser)];
                }
            });
        });
    };
    UserService.prototype.findByLogin = function (LoginDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = LoginDTO.email, password = LoginDTO.password;
                        return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        if (_a.sent()) {
                            return [2 /*return*/, this.removePassword(user)];
                        }
                        else {
                            throw new common_1.HttpException('invalid credentials', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.removePassword = function (user) {
        var removePassword = user.toObject();
        delete removePassword['password'];
        return removePassword;
    };
    UserService.prototype.findByEmail = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userModel.findOne({ email: email })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UserService.prototype.validatePayload = function (payload) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, payload];
            });
        });
    };
    UserService.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userModel.find().exec()];
            });
        });
    };
    UserService.prototype.follow = function (userEmail, followingUser) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isAlreadyFollowing;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userEmail || !followingUser) {
                            throw new common_1.HttpException('missing parameters', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.findByEmail(userEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
                        }
                        if (userEmail === followingUser) {
                            throw new common_1.HttpException('cannot follow yourself', common_1.HttpStatus.BAD_REQUEST);
                        }
                        isAlreadyFollowing = user.following.some(function (follow) { return follow.followingUser === followingUser; });
                        if (isAlreadyFollowing) {
                            throw new common_1.HttpException('You are already following this user', common_1.HttpStatus.BAD_REQUEST);
                        }
                        user.following.push({
                            followingUser: followingUser,
                            createdAt: new Date()
                        });
                        return [4 /*yield*/, user.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, 'You are now following this user: ' + followingUser];
                }
            });
        });
    };
    UserService.prototype.likeCar = function (userEmail, carId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, car, isAlreadyLiked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userEmail || !carId) {
                            throw new common_1.HttpException('missing parameters', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.findByEmail(userEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.carService.findById(carId)];
                    case 2:
                        car = _a.sent();
                        if (!car) {
                            throw new common_1.HttpException('car not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        isAlreadyLiked = user.likedCars.some(function (likedCar) { return likedCar.carId === carId; });
                        if (isAlreadyLiked) {
                            throw new common_1.HttpException('You have already liked this car', common_1.HttpStatus.BAD_REQUEST);
                        }
                        user.likedCars.push({
                            carId: carId,
                            createdAt: new Date()
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.likeProduct = function (userEmail, productId) {
        return __awaiter(this, void 0, void 0, function () {
            var user, product, isAlreadyLiked;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!userEmail || !productId) {
                            throw new common_1.HttpException('missing parameters', common_1.HttpStatus.BAD_REQUEST);
                        }
                        return [4 /*yield*/, this.findByEmail(userEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [4 /*yield*/, this.productService.findById(productId)];
                    case 2:
                        product = _a.sent();
                        if (!product) {
                            throw new common_1.HttpException('product not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        isAlreadyLiked = user.likedProducts.some(function (likedProduct) { return likedProduct.productId === productId; });
                        if (isAlreadyLiked) {
                            throw new common_1.HttpException('You have already liked this product', common_1.HttpStatus.BAD_REQUEST);
                        }
                        user.likedProducts.push({
                            productId: productId,
                            createdAt: new Date()
                        });
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getLikedCars = function (userEmail) {
        return __awaiter(this, void 0, Promise, function () {
            var user, likedCarIds, likedCars;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByEmail(userEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        likedCarIds = user.likedCars.map(function (likedCar) { return likedCar.carId; });
                        return [4 /*yield*/, this.carService.getCarsByIds(likedCarIds)];
                    case 2:
                        likedCars = _a.sent();
                        return [2 /*return*/, likedCars];
                }
            });
        });
    };
    UserService.prototype.getLikedProducts = function (userEmail) {
        return __awaiter(this, void 0, Promise, function () {
            var user, likedProductIds, likedProducts;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.findByEmail(userEmail)];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
                        }
                        likedProductIds = user.likedProducts.map(function (likedProduct) { return likedProduct.productId; });
                        return [4 /*yield*/, this.productService.getProductsByIds(likedProductIds)];
                    case 2:
                        likedProducts = _a.sent();
                        return [2 /*return*/, likedProducts];
                }
            });
        });
    };
    UserService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel('User'))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
