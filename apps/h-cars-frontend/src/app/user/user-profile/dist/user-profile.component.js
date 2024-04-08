"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserProfileComponent = void 0;
var core_1 = require("@angular/core");
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent(userService, carService, productService) {
        this.userService = userService;
        this.carService = carService;
        this.productService = productService;
        this.user = null;
        this.recommendedCars = [];
        this.recommendedProducts = [];
    }
    UserProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getUserProfile().subscribe(function (user) {
            _this.user = user;
            _this.fetchRecommendedCars();
            _this.fetchRecommendedProducts();
        });
    };
    UserProfileComponent.prototype.fetchRecommendedCars = function () {
        var _this = this;
        this.userService.recommendedCars().subscribe(function (recommendedCarsIds) {
            var carIds = recommendedCarsIds.join(',').split(',');
            carIds.forEach(function (carId) {
                _this.carService.getCarById(carId).subscribe(function (car) {
                    _this.recommendedCars.push(car);
                }, function (error) {
                    console.error('Failed to fetch recommended car:', error);
                });
            });
        }, function (error) {
            console.error('Failed to fetch recommended cars:', error);
        });
    };
    UserProfileComponent.prototype.fetchRecommendedProducts = function () {
        var _this = this;
        this.userService.recommendedProducts().subscribe(function (recommendedProductsIds) {
            var productIds = recommendedProductsIds.join(',').split(',');
            productIds.forEach(function (productId) {
                _this.productService.getProductById(productId).subscribe(function (product) {
                    _this.recommendedProducts.push(product);
                }, function (error) {
                    console.error('Failed to fetch recommended product:', error);
                });
            });
        }, function (error) {
            console.error('Failed to fetch recommended products:', error);
        });
    };
    UserProfileComponent = __decorate([
        core_1.Component({
            selector: 'client-side-user-profile',
            templateUrl: './user-profile.component.html',
            styleUrls: ['./user-profile.component.css']
        })
    ], UserProfileComponent);
    return UserProfileComponent;
}());
exports.UserProfileComponent = UserProfileComponent;
