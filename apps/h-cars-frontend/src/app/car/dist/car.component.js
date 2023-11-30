"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarComponent = void 0;
// car.component.ts
var core_1 = require("@angular/core");
var CarComponent = /** @class */ (function () {
    function CarComponent(carService) {
        this.carService = carService;
        this.cars = [];
        this.myCars = [];
        this.likedCars = [];
        this.selectedCar = null;
        this.activeTab = 'allCars';
        this.errorMessage = '';
    }
    CarComponent.prototype.ngOnInit = function () {
        this.showAllCars();
    };
    CarComponent.prototype.showAllCars = function () {
        var _this = this;
        this.activeTab = 'allCars';
        this.carService.getAllCars().subscribe(function (cars) {
            _this.cars = cars;
        });
    };
    CarComponent.prototype.showMyCars = function () {
        var _this = this;
        this.activeTab = 'myCars';
        this.carService.getUserCars().subscribe(function (myCars) {
            _this.myCars = myCars;
        });
    };
    CarComponent.prototype.showLikedCars = function () {
        var _this = this;
        this.activeTab = 'likedCars';
        this.carService.getLikedCars().subscribe(function (likedCars) {
            _this.likedCars = likedCars;
        });
    };
    CarComponent = __decorate([
        core_1.Component({
            selector: 'client-side-car',
            templateUrl: './car.component.html',
            styleUrls: ['./car.component.css']
        })
    ], CarComponent);
    return CarComponent;
}());
exports.CarComponent = CarComponent;
