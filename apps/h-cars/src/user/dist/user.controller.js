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
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var UserController = /** @class */ (function () {
    function UserController(userService, neo4jService, offerService) {
        this.userService = userService;
        this.neo4jService = neo4jService;
        this.offerService = offerService;
    }
    UserController.prototype.follow = function (req, body) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, followingUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.user.email;
                        followingUser = body.followingUser;
                        return [4 /*yield*/, this.userService.follow(userEmail, followingUser)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'User followed successfully' }];
                }
            });
        });
    };
    UserController.prototype.likeCar = function (req, body) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, carId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.user.email;
                        carId = body.carId;
                        return [4 /*yield*/, this.userService.likeCar(userEmail, carId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Car liked successfully' }];
                }
            });
        });
    };
    UserController.prototype.likeProduct = function (req, body) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, productId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userEmail = req.user.email;
                        productId = body.productId;
                        return [4 /*yield*/, this.userService.likeProduct(userEmail, productId)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Product liked successfully' }];
                }
            });
        });
    };
    UserController.prototype.getLikedCars = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail;
            return __generator(this, function (_a) {
                userEmail = req.user.email;
                return [2 /*return*/, this.userService.getLikedCars(userEmail)];
            });
        });
    };
    UserController.prototype.getLikedProducts = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail;
            return __generator(this, function (_a) {
                userEmail = req.user.email;
                return [2 /*return*/, this.userService.getLikedProducts(userEmail)];
            });
        });
    };
    UserController.prototype.getProfile = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail;
            return __generator(this, function (_a) {
                userEmail = req.user.email;
                return [2 /*return*/, this.userService.findByEmail(userEmail)];
            });
        });
    };
    UserController.prototype.getAllUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.userService.getAllUsers()];
            });
        });
    };
    UserController.prototype.getRecommendedCars = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail;
            return __generator(this, function (_a) {
                userEmail = req.user.email;
                return [2 /*return*/, this.neo4jService.recommendCarsBasedOnFollowedUserLikes(userEmail)];
            });
        });
    };
    UserController.prototype.getRecommendedProducts = function (req) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail;
            return __generator(this, function (_a) {
                userEmail = req.user.email;
                return [2 /*return*/, this.neo4jService.recommendProductsBasedOnFollowedUserLikes(userEmail)];
            });
        });
    };
    UserController.prototype.getOffersForCar = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.offerService.getOffersForCar(id)];
            });
        });
    };
    UserController.prototype.createOffer = function (req, body) {
        return __awaiter(this, void 0, void 0, function () {
            var userEmail, carId, price;
            return __generator(this, function (_a) {
                userEmail = req.user.email;
                carId = body.carId, price = body.price;
                return [2 /*return*/, this.offerService.createOffer({
                        carId: carId,
                        user: userEmail,
                        price: price,
                        createdAt: new Date()
                    })];
            });
        });
    };
    UserController.prototype.updateCar = function (id, offerDTO) {
        return __awaiter(this, void 0, void 0, function () {
            var updatedCar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.offerService.updateOffer(id, offerDTO)];
                    case 1:
                        updatedCar = _a.sent();
                        return [2 /*return*/, updatedCar];
                }
            });
        });
    };
    UserController.prototype.deleteCar = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.offerService.deleteOffer(id)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { message: 'Offer deleted successfully' }];
                }
            });
        });
    };
    __decorate([
        common_1.Post('follow'),
        __param(0, common_1.Request()), __param(1, common_1.Body())
    ], UserController.prototype, "follow");
    __decorate([
        common_1.Post('like-car'),
        __param(0, common_1.Request()), __param(1, common_1.Body())
    ], UserController.prototype, "likeCar");
    __decorate([
        common_1.Post('like-product'),
        __param(0, common_1.Request()), __param(1, common_1.Body())
    ], UserController.prototype, "likeProduct");
    __decorate([
        common_1.Get('liked-cars'),
        __param(0, common_1.Request())
    ], UserController.prototype, "getLikedCars");
    __decorate([
        common_1.Get('liked-products'),
        __param(0, common_1.Request())
    ], UserController.prototype, "getLikedProducts");
    __decorate([
        common_1.Get('profile'),
        __param(0, common_1.Request())
    ], UserController.prototype, "getProfile");
    __decorate([
        common_1.Get('all-users')
    ], UserController.prototype, "getAllUsers");
    __decorate([
        common_1.Get('recommendations/cars'),
        __param(0, common_1.Request())
    ], UserController.prototype, "getRecommendedCars");
    __decorate([
        common_1.Get('recommendations/products'),
        __param(0, common_1.Request())
    ], UserController.prototype, "getRecommendedProducts");
    __decorate([
        common_1.Get('offers-for-car/:id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "getOffersForCar");
    __decorate([
        common_1.Post('offer'),
        __param(0, common_1.Request()),
        __param(1, common_1.Body())
    ], UserController.prototype, "createOffer");
    __decorate([
        common_1.Post('update-offer/:id'),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], UserController.prototype, "updateCar");
    __decorate([
        common_1.Post('delete-offer/:id'),
        __param(0, common_1.Param('id'))
    ], UserController.prototype, "deleteCar");
    UserController = __decorate([
        common_1.Controller('user'),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard)
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
