"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var user_service_1 = require("./user.service");
var mongoose_1 = require("@nestjs/mongoose");
var user_schema_1 = require("../models/user.schema");
var auth_controller_1 = require("../auth/auth.controller");
var auth_service_1 = require("../auth/auth.service");
var car_module_1 = require("../car/car.module");
var jwt_1 = require("@nestjs/jwt");
var product_module_1 = require("../product/product.module");
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
                product_module_1.ProductModule,
                car_module_1.CarModule,
            ],
            providers: [user_service_1.UserService, auth_service_1.AuthService, jwt_1.JwtService],
            controllers: [auth_controller_1.AuthController],
            exports: [user_service_1.UserService]
        })
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
