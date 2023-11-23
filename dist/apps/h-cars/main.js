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
const car_module_1 = __webpack_require__(23);
const car_controller_1 = __webpack_require__(26);
const jwt_1 = __webpack_require__(21);
const jwt_auth_guard_1 = __webpack_require__(20);
const auth_controller_1 = __webpack_require__(15);
const auth_service_1 = __webpack_require__(17);
let AppModule = exports.AppModule = class AppModule {
};
exports.AppModule = AppModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot(),
            mongoose_module_1.MongooseModule.forRoot(process.env.MONGO_URI),
            user_module_1.UserModule,
            car_module_1.CarModule,
        ],
        controllers: [app_controller_1.AppController, auth_controller_1.AuthController, car_controller_1.CarController],
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
const user_schema_1 = __webpack_require__(14);
const auth_controller_1 = __webpack_require__(15);
const auth_service_1 = __webpack_require__(17);
const car_module_1 = __webpack_require__(23);
const jwt_1 = __webpack_require__(21);
let UserModule = exports.UserModule = class UserModule {
};
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            (0, common_1.forwardRef)(() => car_module_1.CarModule),
        ],
        providers: [user_service_1.UserService, auth_service_1.AuthService, jwt_1.JwtService],
        controllers: [auth_controller_1.AuthController],
        exports: [user_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const mongoose_2 = __webpack_require__(12);
const bcrypt = tslib_1.__importStar(__webpack_require__(13));
let UserService = exports.UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
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
            throw new common_1.HttpException('user doesnt exist', common_1.HttpStatus.BAD_REQUEST);
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
};
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('User')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
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
    lastName: { type: String, required: true }
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
/* 15 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const user_dto_1 = __webpack_require__(16);
const user_service_1 = __webpack_require__(10);
const auth_service_1 = __webpack_require__(17);
const login_dto_1 = __webpack_require__(19);
const jwt_auth_guard_1 = __webpack_require__(20);
let AuthController = exports.AuthController = class AuthController {
    constructor(userService, authService) {
        this.userService = userService;
        this.authService = authService;
    }
    protectedRoute() {
        return 'This route is protected';
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
    (0, common_1.Get)('/protected'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AuthController.prototype, "protectedRoute", null);
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
/* 16 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const jsonwebtoken_1 = __webpack_require__(18);
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
    async getCurrentUser(email) {
        return await this.userService.findByEmail(email);
    }
};
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof user_service_1.UserService !== "undefined" && user_service_1.UserService) === "function" ? _a : Object])
], AuthService);


/***/ }),
/* 18 */
/***/ ((module) => {

module.exports = require("jsonwebtoken");

/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
// jwt-auth.guard.ts
const common_1 = __webpack_require__(2);
const core_1 = __webpack_require__(3);
const jwt_1 = __webpack_require__(21);
const graphql_1 = __webpack_require__(22);
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
/* 21 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 22 */
/***/ ((module) => {

module.exports = require("@nestjs/graphql");

/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const mongoose_1 = __webpack_require__(11);
const car_service_1 = __webpack_require__(24);
const car_schema_1 = __webpack_require__(25);
const auth_service_1 = __webpack_require__(17);
const auth_controller_1 = __webpack_require__(15);
const user_module_1 = __webpack_require__(9);
const jwt_1 = __webpack_require__(21);
const jwt_auth_guard_1 = __webpack_require__(20);
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
/* 24 */
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
};
exports.CarService = CarService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, mongoose_1.InjectModel)('Car')),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object])
], CarService);


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarSchema = void 0;
const tslib_1 = __webpack_require__(1);
const mongoose = tslib_1.__importStar(__webpack_require__(12));
exports.CarSchema = new mongoose.Schema({
    carModel: { type: String, required: true },
    counter: { type: Number, required: true },
    typeOfFuel: { type: String, enum: ['Petrol', 'Diesel', 'Electric'], required: true },
    transmissionType: { type: String, enum: ['Automatic', 'Manual'], required: true },
    apk: { type: Boolean, required: true },
    apkExpires: { type: Date },
    numberPlate: { type: String, unique: true, required: true },
    constructionYear: { type: Number, required: true },
    userEmail: { type: String, required: true },
    imageUrl: { type: String, required: true },
});


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CarController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(2);
const car_service_1 = __webpack_require__(24);
const car_dto_1 = __webpack_require__(27);
const jwt_auth_guard_1 = __webpack_require__(20);
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
    (0, common_1.Post)('create-car'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof car_dto_1.CarDTO !== "undefined" && car_dto_1.CarDTO) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "createCar", null);
tslib_1.__decorate([
    (0, common_1.Get)('all-cars'),
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
    (0, common_1.Post)('update-car/:id'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('id')),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof car_dto_1.CarDTO !== "undefined" && car_dto_1.CarDTO) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], CarController.prototype, "updateCar", null);
tslib_1.__decorate([
    (0, common_1.Post)('delete-car/:id'),
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
/* 27 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 28 */
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
const passport_1 = tslib_1.__importDefault(__webpack_require__(28));
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors();
    app.use(passport_1.default.initialize());
    app.useGlobalPipes(new common_1.ValidationPipe()); // Enable global validation pipe
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