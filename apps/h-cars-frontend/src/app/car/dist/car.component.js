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
        this.selectedCar = null;
        this.activeTab = 'allCars';
    }
    CarComponent.prototype.ngOnInit = function () {
        this.showAllCars();
    };
    CarComponent.prototype.showAllCars = function () {
        this.activeTab = 'allCars';
        this.loadCars();
    };
    CarComponent.prototype.showMyCars = function () {
        this.activeTab = 'myCars';
        this.loadMyCars();
    };
    CarComponent.prototype.loadCars = function () {
        var _this = this;
        this.carService.getAllCars().subscribe(function (cars) {
            _this.cars = cars;
        });
    };
    CarComponent.prototype.loadMyCars = function () {
        var _this = this;
        this.carService.getUserCars().subscribe(function (myCars) {
            _this.myCars = myCars;
        });
    };
    CarComponent.prototype.likeCar = function (id) {
        var _this = this;
        this.carService.likeCar(id).subscribe(function () {
            // Toggle the liked status
            var car = _this.cars.find(function (c) { return c._id === id; });
            if (car) {
                car.liked = !car.liked;
            }
        });
    };
    CarComponent.prototype.showLikedCars = function () {
        var _this = this;
        this.carService.getLikedCars().subscribe(function (cars) {
            _this.activeTab = 'likedCars';
            _this.cars = cars;
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
