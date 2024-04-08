"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var mongoose_module_1 = require("@nestjs/mongoose/dist/mongoose.module");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var config_1 = require("@nestjs/config");
var user_module_1 = require("../user/user.module");
var car_module_1 = require("../car/car.module");
var car_controller_1 = require("../car/car.controller");
var jwt_1 = require("@nestjs/jwt");
var jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
var auth_controller_1 = require("../auth/auth.controller");
var auth_service_1 = require("../auth/auth.service");
var product_controller_1 = require("../product/product.controller");
var product_module_1 = require("../product/product.module");
var user_controller_1 = require("../user/user.controller");
var neo4j_module_1 = require("../neo4j/neo4j.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                config_1.ConfigModule.forRoot(),
                mongoose_module_1.MongooseModule.forRoot(process.env.MONGO_URI),
                user_module_1.UserModule,
                car_module_1.CarModule,
                product_module_1.ProductModule,
                neo4j_module_1.Neo4jModule,
            ],
            controllers: [
                app_controller_1.AppController,
                auth_controller_1.AuthController,
                car_controller_1.CarController,
                product_controller_1.ProductController,
                user_controller_1.UserController,
            ],
            providers: [app_service_1.AppService, jwt_1.JwtService, jwt_auth_guard_1.JwtAuthGuard, auth_service_1.AuthService]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
