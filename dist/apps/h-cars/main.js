/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_module_1 = __webpack_require__(5);
const app_controller_1 = __webpack_require__(6);
const app_service_1 = __webpack_require__(7);
const config_1 = __webpack_require__(8);
const user_module_1 = __webpack_require__(9);
const car_module_1 = __webpack_require__(25);
const car_controller_1 = __webpack_require__(29);
const jwt_1 = __webpack_require__(23);
const jwt_auth_guard_1 = __webpack_require__(22);
const auth_controller_1 = __webpack_require__(17);
const auth_service_1 = __webpack_require__(19);
const product_controller_1 = __webpack_require__(31);
const product_module_1 = __webpack_require__(27);
const user_controller_1 = __webpack_require__(33);
const neo4j_module_1 = __webpack_require__(39);
const offer_module_1 = __webpack_require__(40);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_module_1.MongooseModule.forRoot(process.env.MONGO_URI),
            user_module_1.UserModule,
            car_module_1.CarModule,
            product_module_1.ProductModule,
            neo4j_module_1.Neo4jModule,
            offer_module_1.OfferModule,
        ],
        controllers: [
            app_controller_1.AppController,
            auth_controller_1.AuthController,
            car_controller_1.CarController,
            product_controller_1.ProductController,
            user_controller_1.UserController,
        ],
        providers: [app_service_1.AppService, jwt_1.JwtService, jwt_auth_guard_1.JwtAuthGuard, auth_service_1.AuthService],
    })
], AppModule);


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose/dist/mongoose.module");

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const app_service_1 = __webpack_require__(7);
let AppController = exports.AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    getData() {
        return this.appService.getData();
    }
};
tslib_1.__decorate([
    (0, common_1.Get)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AppController.prototype, "getData", null);
exports.AppController = AppController = tslib_1.__decorate([
    (0, common_1.Controller)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _a : Object])
], AppController);


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
let AppService = exports.AppService = class AppService {
    getData() {
        return { message: 'Hello API' };
    }
};
exports.AppService = AppService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], AppService);


/***/ }),
/* 8 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_service_1 = __webpack_require__(10);
const mongoose_1 = __webpack_require__(11);
const user_schema_1 = __webpack_require__(16);
const auth_controller_1 = __webpack_require__(17);
const auth_service_1 = __webpack_require__(19);
const car_module_1 = __webpack_require__(25);
const jwt_1 = __webpack_require__(23);
const product_module_1 = __webpack_require__(27);
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            product_module_1.ProductModule,
            car_module_1.CarModule,
        ],
        providers: [user_service_1.UserService, auth_service_1.AuthService, jwt_1.JwtService],
        controllers: [auth_controller_1.AuthController],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const mongoose_2 = __webpack_require__(12);
const bcrypt = tslib_1.__importStar(__webpack_require__(13));
const car_service_1 = __webpack_require__(14);
const product_service_1 = __webpack_require__(15);
let UserService = exports.UserService = class UserService {
    constructor(userModel, carService, productService) {
        this.userModel = userModel;
        this.carService = carService;
        this.productService = productService;
    }
    async create(UserDTO) {
        const email = UserDTO.email;
        const user = await this.userModel.findOne({ email });
        if (user) {
            throw new common_1.HttpException('user already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdUser = new this.userModel(UserDTO);
        await createdUser.save();
        return this.removePassword(createdUser);
    }
    async findByLogin(LoginDTO) {
        const { email, password } = LoginDTO;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
        }
        if (await bcrypt.compare(password, user.password)) {
            return this.removePassword(user);
        }
        else {
            throw new common_1.HttpException('invalid credentials', common_1.HttpStatus.BAD_REQUEST);
        }
    }
    removePassword(user) {
        const removePassword = user.toObject();
        delete removePassword['password'];
        return removePassword;
    }
    async findByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    async validatePayload(payload) {
        return payload;
    }
    async getAllUsers() {
        return this.userModel.find().exec();
    }
    async follow(userEmail, followingUser) {
        if (!userEmail || !followingUser) {
            throw new common_1.HttpException('missing parameters', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.findByEmail(userEmail);
        if (!user) {
            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
        }
        if (userEmail === followingUser) {
            throw new common_1.HttpException('cannot follow yourself', common_1.HttpStatus.BAD_REQUEST);
        }
        const isAlreadyFollowing = user.following.some((follow) => follow.followingUser === followingUser);
        if (isAlreadyFollowing) {
            throw new common_1.HttpException('You are already following this user', common_1.HttpStatus.BAD_REQUEST);
        }
        user.following.push({
            followingUser: followingUser,
            createdAt: new Date(),
        });
        await user.save();
        return 'You are now following this user: ' + followingUser;
    }
    async likeCar(userEmail, carId) {
        if (!userEmail || !carId) {
            throw new common_1.HttpException('missing parameters', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.findByEmail(userEmail);
        if (!user) {
            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
        }
        const car = await this.carService.findById(carId);
        if (!car) {
            throw new common_1.HttpException('car not found', common_1.HttpStatus.NOT_FOUND);
        }
        const isAlreadyLiked = user.likedCars.some((likedCar) => likedCar.carId === carId);
        if (isAlreadyLiked) {
            throw new common_1.HttpException('You have already liked this car', common_1.HttpStatus.BAD_REQUEST);
        }
        user.likedCars.push({
            carId: carId,
            createdAt: new Date(),
        });
        await user.save();
    }
    async likeProduct(userEmail, productId) {
        if (!userEmail || !productId) {
            throw new common_1.HttpException('missing parameters', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.findByEmail(userEmail);
        if (!user) {
            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.NOT_FOUND);
        }
        const product = await this.productService.findById(productId);
        if (!product) {
            throw new common_1.HttpException('product not found', common_1.HttpStatus.NOT_FOUND);
        }
        const isAlreadyLiked = user.likedProducts.some((likedProduct) => likedProduct.productId === productId);
        if (isAlreadyLiked) {
            throw new common_1.HttpException('You have already liked this product', common_1.HttpStatus.BAD_REQUEST);
        }
        user.likedProducts.push({
            productId: productId,
            createdAt: new Date(),
        });
        await user.save();
    }
    async getLikedCars(userEmail) {
        const user = await this.findByEmail(userEmail);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const likedCarIds = user.likedCars.map((likedCar) => likedCar.carId);
        const likedCars = await this.carService.getCarsByIds(likedCarIds);
        return likedCars;
    }
    async getLikedProducts(userEmail) {
        const user = await this.findByEmail(userEmail);
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const likedProductIds = user.likedProducts.map((likedProduct) => likedProduct.productId);
        const likedProducts = await this.productService.getProductsByIds(likedProductIds);
        return likedProducts;
    }
};
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('User')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, typeof (_b = typeof car_service_1.CarService !== "undefined" && car_service_1.CarService) === "function" ? _b : Object, typeof (_c = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _c : Object])
], UserService);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/mongoose");

/***/ }),
/* 12 */
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),
/* 13 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const mongoose_2 = __webpack_require__(12);
let CarService = exports.CarService = class CarService {
    constructor(carModel) {
        this.carModel = carModel;
    }
    async create(carDTO) {
        const numberPlate = carDTO.numberPlate;
        const car = await this.carModel.findOne({ numberPlate });
        if (car) {
            throw new common_1.HttpException('car already exists', common_1.HttpStatus.BAD_REQUEST);
        }
        const createdCar = new this.carModel(carDTO);
        await createdCar.save();
        return createdCar;
    }
    async getMyCars(userEmail) {
        return this.carModel.find({ userEmail }).exec();
    }
    async getAll() {
        return this.carModel.find().exec();
    }
    async findById(id) {
        return this.carModel.findById(id).exec();
    }
    async update(id, carDTO) {
        return this.carModel.findByIdAndUpdate(id, carDTO, { new: true }).exec();
    }
    async delete(id) {
        return this.carModel.findByIdAndDelete(id).exec();
    }
    async getCarsByIds(carIds) {
        return this.carModel.find({ _id: { $in: carIds } }).exec();
    }
};
exports.CarService = CarService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('Car')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CarService);


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const mongoose_2 = __webpack_require__(12);
let ProductService = exports.ProductService = class ProductService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async create(productDTO) {
        const createdProduct = new this.productModel(productDTO);
        await createdProduct.save();
        return createdProduct;
    }
    async getMyProducts(userEmail) {
        return this.productModel.find({ userEmail }).exec();
    }
    async getAll() {
        return this.productModel.find().exec();
    }
    async findById(id) {
        return this.productModel.findById(id).exec();
    }
    async update(id, productDTO) {
        return this.productModel
            .findByIdAndUpdate(id, productDTO, { new: true })
            .exec();
    }
    async delete(id) {
        return this.productModel.findByIdAndDelete(id).exec();
    }
    async getProductsByIds(productIds) {
        return this.productModel.find({ _id: { $in: productIds } }).exec();
    }
};
exports.ProductService = ProductService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('Product')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], ProductService);


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserSchema = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose = tslib_1.__importStar(__webpack_require__(12));
const bcrypt = tslib_1.__importStar(__webpack_require__(13));
exports.UserSchema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    following: [
        {
            followingUser: { type: String, required: true },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    likedCars: [
        {
            carId: {
                type: String,
                ref: 'Car',
                required: true,
            },
            createdAt: { type: Date, default: Date.now },
        },
    ],
    likedProducts: [
        {
            productId: {
                type: String,
                ref: 'Product',
                required: true,
            },
            createdAt: { type: Date, default: Date.now },
        },
    ],
});
exports.UserSchema.pre('save', async function (next) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcrypt.hash(this['password'], 10);
        this['password'] = hashed;
        return next();
    }
    catch (err) {
        return next(err);
    }
});


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_dto_1 = __webpack_require__(18);
const user_service_1 = __webpack_require__(10);
const auth_service_1 = __webpack_require__(19);
const login_dto_1 = __webpack_require__(21);
const jwt_auth_guard_1 = __webpack_require__(22);
let AuthController = exports.AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    async checkEmailAvailability(email) {
        const user = await this.userService.findByEmail(email);
        return { isAvailable: !user };
    }
    async register(userDTO) {
        const user = await this.userService.create(userDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
    async login(loginDTO) {
        const user = await this.userService.findByLogin(loginDTO);
        const payload = {
            email: user.email,
        };
        const token = await this.authService.signPayload(payload);
        return { user, token };
    }
    getCurrentUser(req) {
        return req.user;
    }
};
tslib_1.__decorate([
    (0, common_1.Get)('check-email/:email'),
    tslib_1.__param(0, (0, common_1.Param)('email')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "checkEmailAvailability", null);
tslib_1.__decorate([
    (0, common_1.Post)('register'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof user_dto_1.UserDTO !== "undefined" && user_dto_1.UserDTO) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
tslib_1.__decorate([
    (0, common_1.Post)('login'),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof login_dto_1.LoginDTO !== "undefined" && login_dto_1.LoginDTO) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
tslib_1.__decorate([
    (0, common_1.Get)('current-user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "getCurrentUser", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)('auth'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _b : Object])
], AuthController);


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jsonwebtoken_1 = __webpack_require__(20);
const user_service_1 = __webpack_require__(10);
let AuthService = exports.AuthService = class AuthService {
    constructor(userService) {
        this.userService = userService;
    }
    async signPayload(payload) {
        return (0, jsonwebtoken_1.sign)(payload, process.env.SECRET_KEY, { expiresIn: '7d' });
    }
    async validateUser(payload) {
        return await this.userService.validatePayload(payload);
    }
};
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 20 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
// jwt-auth.guard.ts
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(23);
const graphql_1 = __webpack_require__(24);
let JwtAuthGuard = exports.JwtAuthGuard = class JwtAuthGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
    }
    canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true; // Public routes can be accessed without a token
        }
        const ctx = graphql_1.GqlExecutionContext.create(context);
        const { req } = ctx.getContext();
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token) {
            return false; // No token provided
        }
        try {
            const secret = process.env.SECRET_KEY;
            const decoded = this.jwtService.verify(token, { secret });
            req.user = decoded; // Attach the user object to the request
            return true;
        }
        catch (error) {
            console.error('Token verification error:', error);
            return false; // Token is invalid
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], JwtAuthGuard);


/***/ }),
/* 23 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 24 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const car_service_1 = __webpack_require__(14);
const car_schema_1 = __webpack_require__(26);
const auth_service_1 = __webpack_require__(19);
const auth_controller_1 = __webpack_require__(17);
const user_module_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(23);
const jwt_auth_guard_1 = __webpack_require__(22);
let CarModule = exports.CarModule = class CarModule {
};
exports.CarModule = CarModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Car', schema: car_schema_1.CarSchema }]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [car_service_1.CarService, auth_service_1.AuthService, jwt_1.JwtService, jwt_auth_guard_1.JwtAuthGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [car_service_1.CarService],
    })
], CarModule);


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarSchema = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose = tslib_1.__importStar(__webpack_require__(12));
exports.CarSchema = new mongoose.Schema({
    carModel: { type: String, required: true },
    counter: { type: Number, required: true },
    typeOfFuel: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric'],
        required: true,
    },
    transmissionType: {
        type: String,
        enum: ['Automatic', 'Manual'],
        required: true,
    },
    apk: { type: Boolean, required: true },
    apkExpires: { type: Date },
    numberPlate: { type: String, unique: true, required: true },
    constructionYear: { type: Number, required: true },
    userEmail: { type: String, required: true },
    imageUrl: { type: String, required: true },
});


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const product_service_1 = __webpack_require__(15);
const auth_service_1 = __webpack_require__(19);
const auth_controller_1 = __webpack_require__(17);
const user_module_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(23);
const jwt_auth_guard_1 = __webpack_require__(22);
const product_schema_1 = __webpack_require__(28);
let ProductModule = exports.ProductModule = class ProductModule {
};
exports.ProductModule = ProductModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Product', schema: product_schema_1.ProductSchema }]),
            (0, common_1.forwardRef)(() => user_module_1.UserModule),
        ],
        providers: [product_service_1.ProductService, auth_service_1.AuthService, jwt_1.JwtService, jwt_auth_guard_1.JwtAuthGuard],
        controllers: [auth_controller_1.AuthController],
        exports: [product_service_1.ProductService],
    })
], ProductModule);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductSchema = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose = tslib_1.__importStar(__webpack_require__(12));
exports.ProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    userEmail: { type: String, required: true },
    imageUrl: { type: String, required: true },
    car: { type: String, required: true },
    category: {
        type: String,
        enum: [
            'Electronic',
            'Liquid',
            'Wheels',
            'Tools',
            'Car Accessoires',
            'Other',
        ],
        required: true,
    },
    brand: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const car_service_1 = __webpack_require__(14);
const car_dto_1 = __webpack_require__(30);
const jwt_auth_guard_1 = __webpack_require__(22);
let CarController = exports.CarController = class CarController {
    constructor(carService) {
        this.carService = carService;
    }
    async createCar(carDTO) {
        const car = await this.carService.create(carDTO);
        return car;
    }
    async getAllCars() {
        const cars = await this.carService.getAll();
        return cars;
    }
    async getCarById(id) {
        const car = await this.carService.findById(id);
        return car;
    }
    async getMyCars(req) {
        const userEmail = req.user.email;
        const cars = await this.carService.getMyCars(userEmail);
        return cars;
    }
    async updateCar(id, carDTO) {
        const updatedCar = await this.carService.update(id, carDTO);
        return updatedCar;
    }
    async deleteCar(id) {
        await this.carService.delete(id);
        return { message: 'Car deleted successfully' };
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof car_dto_1.CarDTO !== "undefined" && car_dto_1.CarDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "createCar", null);
tslib_1.__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "getAllCars", null);
tslib_1.__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "getCarById", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-cars'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "getMyCars", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof car_dto_1.CarDTO !== "undefined" && car_dto_1.CarDTO) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "updateCar", null);
tslib_1.__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "deleteCar", null);
exports.CarController = CarController = tslib_1.__decorate([
    (0, common_1.Controller)('car'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof car_service_1.CarService !== "undefined" && car_service_1.CarService) === "function" ? _a : Object])
], CarController);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jwt_auth_guard_1 = __webpack_require__(22);
const product_service_1 = __webpack_require__(15);
const product_dto_1 = __webpack_require__(32);
let ProductController = exports.ProductController = class ProductController {
    constructor(productService) {
        this.productService = productService;
    }
    async createProduct(productDTO) {
        const product = await this.productService.create(productDTO);
        return product;
    }
    async getAllProducts() {
        const products = await this.productService.getAll();
        return products;
    }
    async getCarByProduct(id) {
        const product = await this.productService.findById(id);
        return product;
    }
    async getMyCars(req) {
        const userEmail = req.user.email;
        const products = await this.productService.getMyProducts(userEmail);
        return products;
    }
    async updateProduct(id, productDTO) {
        const updatedProduct = await this.productService.update(id, productDTO);
        return updatedProduct;
    }
    async deleteProduct(id) {
        await this.productService.delete(id);
        return { message: 'Product deleted successfully' };
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof product_dto_1.ProductDTO !== "undefined" && product_dto_1.ProductDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "createProduct", null);
tslib_1.__decorate([
    (0, common_1.Get)('all'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getAllProducts", null);
tslib_1.__decorate([
    (0, common_1.Get)('id/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getCarByProduct", null);
tslib_1.__decorate([
    (0, common_1.Get)('my-products'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "getMyCars", null);
tslib_1.__decorate([
    (0, common_1.Put)('update/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof product_dto_1.ProductDTO !== "undefined" && product_dto_1.ProductDTO) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "updateProduct", null);
tslib_1.__decorate([
    (0, common_1.Delete)('delete/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ProductController.prototype, "deleteProduct", null);
exports.ProductController = ProductController = tslib_1.__decorate([
    (0, common_1.Controller)('product'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof product_service_1.ProductService !== "undefined" && product_service_1.ProductService) === "function" ? _a : Object])
], ProductController);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_service_1 = __webpack_require__(10);
const jwt_auth_guard_1 = __webpack_require__(22);
const neo4j_service_1 = __webpack_require__(34);
const offer_service_1 = __webpack_require__(37);
const offer_dto_1 = __webpack_require__(38);
let UserController = exports.UserController = class UserController {
    constructor(userService, neo4jService, offerService) {
        this.userService = userService;
        this.neo4jService = neo4jService;
        this.offerService = offerService;
    }
    async follow(req, body) {
        const userEmail = req.user.email;
        const { followingUser } = body;
        await this.userService.follow(userEmail, followingUser);
        return { message: 'User followed successfully' };
    }
    async likeCar(req, body) {
        const userEmail = req.user.email;
        const { carId } = body;
        await this.userService.likeCar(userEmail, carId);
        return { message: 'Car liked successfully' };
    }
    async likeProduct(req, body) {
        const userEmail = req.user.email;
        const { productId } = body;
        await this.userService.likeProduct(userEmail, productId);
        return { message: 'Product liked successfully' };
    }
    async getLikedCars(req) {
        const userEmail = req.user.email;
        return this.userService.getLikedCars(userEmail);
    }
    async getLikedProducts(req) {
        const userEmail = req.user.email;
        return this.userService.getLikedProducts(userEmail);
    }
    async getProfile(req) {
        const userEmail = req.user.email;
        return this.userService.findByEmail(userEmail);
    }
    async getAllUsers() {
        return this.userService.getAllUsers();
    }
    async getRecommendedCars(req) {
        const userEmail = req.user.email;
        return this.neo4jService.recommendCars(userEmail);
    }
    async getRecommendedProducts(req) {
        const userEmail = req.user.email;
        return this.neo4jService.recommendProducts(userEmail);
    }
    async getOffersForCar(id) {
        return this.offerService.getOffersForCar(id);
    }
    async createOffer(req, body) {
        const userEmail = req.user.email;
        const { carId, price } = body;
        return this.offerService.createOffer({
            carId: carId,
            user: userEmail,
            price,
            createdAt: new Date(),
        });
    }
    async updateCar(id, offerDTO) {
        const updatedCar = await this.offerService.updateOffer(id, offerDTO);
        return updatedCar;
    }
    async deleteCar(id) {
        await this.offerService.deleteOffer(id);
        return { message: 'Offer deleted successfully' };
    }
};
tslib_1.__decorate([
    (0, common_1.Post)('follow'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "follow", null);
tslib_1.__decorate([
    (0, common_1.Post)('like-car'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "likeCar", null);
tslib_1.__decorate([
    (0, common_1.Post)('like-product'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "likeProduct", null);
tslib_1.__decorate([
    (0, common_1.Get)('liked-cars'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getLikedCars", null);
tslib_1.__decorate([
    (0, common_1.Get)('liked-products'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getLikedProducts", null);
tslib_1.__decorate([
    (0, common_1.Get)('profile'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getProfile", null);
tslib_1.__decorate([
    (0, common_1.Get)('all-users'),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getAllUsers", null);
tslib_1.__decorate([
    (0, common_1.Get)('recommendations/cars'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getRecommendedCars", null);
tslib_1.__decorate([
    (0, common_1.Get)('recommendations/products'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getRecommendedProducts", null);
tslib_1.__decorate([
    (0, common_1.Get)('offers-for-car/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "getOffersForCar", null);
tslib_1.__decorate([
    (0, common_1.Post)('offer'),
    tslib_1.__param(0, (0, common_1.Request)()),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "createOffer", null);
tslib_1.__decorate([
    (0, common_1.Put)('update-offer/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof offer_dto_1.OfferDTO !== "undefined" && offer_dto_1.OfferDTO) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "updateCar", null);
tslib_1.__decorate([
    (0, common_1.Delete)('delete-offer/:id'),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "deleteCar", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)('user'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object, typeof (_b = typeof neo4j_service_1.Neo4jService !== "undefined" && neo4j_service_1.Neo4jService) === "function" ? _b : Object, typeof (_c = typeof offer_service_1.OfferService !== "undefined" && offer_service_1.OfferService) === "function" ? _c : Object])
], UserController);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Neo4jService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongodb_1 = __webpack_require__(35);
const neo4j_driver_1 = tslib_1.__importDefault(__webpack_require__(36));
let Neo4jService = exports.Neo4jService = class Neo4jService {
    constructor() {
        const mongoUri = process.env.MONGO_URI;
        this.mongoClient = new mongodb_1.MongoClient(mongoUri);
        const neo4jUri = process.env.NEO4J_URI;
        const neo4jUser = process.env.NEO4J_USER;
        const neo4jPassword = process.env.NEO4J_PASSWORD;
        this.neo4jDriver = neo4j_driver_1.default.driver(neo4jUri, neo4j_driver_1.default.auth.basic(neo4jUser, neo4jPassword));
    }
    async onModuleInit() {
        await this.mongoClient.connect();
        const database = this.mongoClient.db(process.env.MONGO_DB);
        const collection = database.collection('users');
        const changeStream = collection.watch();
        changeStream.on('change', async (change) => {
            const userId = change.documentKey._id;
            const user = await collection.findOne({ _id: new mongodb_1.ObjectId(userId) });
            const session = this.neo4jDriver.session();
            try {
                switch (change.operationType) {
                    case 'insert': {
                        const newUser = change.fullDocument;
                        await this.createUser(session, newUser.email);
                        const likedCars = newUser.likedCars.map((car) => car.carId);
                        const likedProducts = newUser.likedProducts.map((product) => product.productId);
                        await this.updateUserLikes(session, newUser.email, likedCars, likedProducts);
                        break;
                    }
                    case 'update': {
                        if (!user) {
                            return;
                        }
                        const updatedFields = change.updateDescription.updatedFields;
                        const likedCars = user.likedCars.map((car) => car.carId);
                        const likedProducts = user.likedProducts.map((product) => product.productId);
                        await this.updateUserLikes(session, user.email, likedCars, likedProducts);
                        if (updatedFields.following) {
                            const followingUsers = updatedFields.following.map((f) => f.followingUser);
                            await this.updateUserFollowing(session, user.email, followingUsers);
                        }
                        break;
                    }
                    case 'delete': {
                        const userEmail = change.documentKey.email;
                        await this.deleteUser(session, userEmail);
                        break;
                    }
                }
            }
            finally {
                await session.close();
            }
        });
    }
    async createUser(session, email) {
        const query = `
      MERGE (u:User {email: $email})
    `;
        await session.run(query, { email });
    }
    async updateUserLikes(session, email, likedCars, likedProducts) {
        const query = `
      MATCH (u:User {email: $email})
      SET u.likedCars = $likedCars, u.likedProducts = $likedProducts
    `;
        await session.run(query, { email, likedCars, likedProducts });
    }
    async deleteUser(session, email) {
        const query = `
      MATCH (u:User {email: $email})
      DETACH DELETE u
    `;
        await session.run(query, { email });
    }
    async updateUserFollowing(session, userEmail, following) {
        for (const followingUserEmail of following) {
            const query = `
        MATCH (u:User {email: $userEmail})
        MERGE (f:User {email: $followingUserEmail})
        MERGE (u)-[:FOLLOWS]->(f)
      `;
            await session.run(query, { userEmail, followingUserEmail });
        }
    }
    async recommendCars(email) {
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
        }
        finally {
            await session.close();
        }
    }
    async recommendProducts(email) {
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
        }
        finally {
            await session.close();
        }
    }
};
exports.Neo4jService = Neo4jService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [])
], Neo4jService);


/***/ }),
/* 35 */
/***/ ((module) => {

module.exports = require("mongodb");

/***/ }),
/* 36 */
/***/ ((module) => {

module.exports = require("neo4j-driver");

/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfferService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const mongoose_2 = __webpack_require__(12);
let OfferService = exports.OfferService = class OfferService {
    constructor(offerModel) {
        this.offerModel = offerModel;
    }
    async createOffer(offerDTO) {
        const createdOffer = new this.offerModel(offerDTO);
        return createdOffer.save();
    }
    async updateOffer(id, offerDTO) {
        return this.offerModel.findByIdAndUpdate(id, offerDTO, { new: true });
    }
    async deleteOffer(id) {
        return this.offerModel.findByIdAndDelete(id);
    }
    async getOffersForCar(carId) {
        return this.offerModel.find({ carId: carId });
    }
};
exports.OfferService = OfferService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('Offer')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], OfferService);


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Neo4jModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const config_1 = __webpack_require__(8);
const neo4j_service_1 = __webpack_require__(34);
let Neo4jModule = exports.Neo4jModule = class Neo4jModule {
};
exports.Neo4jModule = Neo4jModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule],
        providers: [neo4j_service_1.Neo4jService],
        exports: [neo4j_service_1.Neo4jService],
    })
], Neo4jModule);


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfferModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const offer_schema_1 = __webpack_require__(41);
const offer_service_1 = __webpack_require__(37);
let OfferModule = exports.OfferModule = class OfferModule {
};
exports.OfferModule = OfferModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Offer', schema: offer_schema_1.OfferSchema }]),
        ],
        providers: [offer_service_1.OfferService],
        exports: [offer_service_1.OfferService],
    })
], OfferModule);


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OfferSchema = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose = tslib_1.__importStar(__webpack_require__(12));
exports.OfferSchema = new mongoose.Schema({
    carId: { type: String, ref: 'Car', required: true },
    user: { type: String, ref: 'User', required: true },
    price: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
});


/***/ }),
/* 42 */
/***/ ((module) => {

module.exports = require("passport");

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const app_module_1 = __webpack_require__(4);
const passport_1 = tslib_1.__importDefault(__webpack_require__(42));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(passport_1.default.initialize());
    app.useGlobalPipes(new common_1.ValidationPipe());
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    const port = process.env.PORT || 3000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map