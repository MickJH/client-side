"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarDetailsComponent = void 0;
// car-details.component.ts
var core_1 = require("@angular/core");
var CarDetailsComponent = /** @class */ (function () {
    function CarDetailsComponent(carService, route, router) {
        this.carService = carService;
        this.route = route;
        this.router = router;
        this.car = null;
    }
    CarDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var carId = params.get('id');
            if (carId) {
                _this.carService.getCarById(carId).subscribe(function (car) {
                    _this.car = car;
                });
            }
        });
    };
    CarDetailsComponent.prototype.updateCar = function () {
        if (this.car) {
            this.router.navigate(['/car/update', this.car._id]);
        }
    };
    CarDetailsComponent.prototype.deleteCar = function () {
        if (this.car) {
            this.router.navigate(['/car/delete', this.car._id]);
        }
    };
    CarDetailsComponent.prototype.toggleLike = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.carService.likeCar(this.car._id).subscribe(function (updatedCar) {
            _this.car = updatedCar;
        });
    };
    CarDetailsComponent = __decorate([
        core_1.Component({
            selector: 'client-side-car-details',
            templateUrl: './car-details.component.html',
            styleUrls: ['./car-details.component.css']
        })
    ], CarDetailsComponent);
    return CarDetailsComponent;
}());
exports.CarDetailsComponent = CarDetailsComponent;
