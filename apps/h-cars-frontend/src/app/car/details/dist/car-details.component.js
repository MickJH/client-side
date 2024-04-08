"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarDetailsComponent = void 0;
var core_1 = require("@angular/core");
var CarDetailsComponent = /** @class */ (function () {
    function CarDetailsComponent(carService, route, router) {
        this.carService = carService;
        this.route = route;
        this.router = router;
        this.car = null;
        this.errorMessage = '';
        this.offerAmount = 0;
        this.currentOffers = [];
    }
    CarDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var carId = params.get('id');
            if (carId) {
                _this.carService.getCarById(carId).subscribe(function (car) {
                    _this.car = car;
                    _this.fetchOffersForCar(carId);
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
    CarDetailsComponent.prototype.likeCar = function (carId) {
        var _this = this;
        this.carService.likeCar(carId).subscribe(function () {
            _this.errorMessage = 'Car liked successfully';
        }, function (error) {
            if (error.status === 400 &&
                error.error.message === 'missing parameters') {
                _this.displayErrorMessage('Missing parameters');
            }
            else if (error.status === 404 &&
                error.error.message === 'user doesnt exist') {
                _this.displayErrorMessage('User not found');
            }
            else if (error.status === 404 &&
                error.error.message === 'product not found') {
                _this.displayErrorMessage('Car not found');
            }
            else if (error.status === 400 &&
                error.error.message === 'You have already liked this car') {
                _this.displayErrorMessage('You have already liked this car');
            }
            else {
                _this.displayErrorMessage('Unexpected error during like operation');
            }
        });
    };
    CarDetailsComponent.prototype.placeOffer = function () {
        var _this = this;
        if (this.car) {
            // Assume a method in CarService to submit the offer
            if (this.car && this.car._id) {
                this.carService.placeOffer(this.car._id, this.offerAmount).subscribe(function () {
                    _this.errorMessage = 'Offer placed successfully!';
                    _this.offerAmount = 0;
                }, function (error) {
                    if (error.status === 400 &&
                        error.error.message === 'missing parameters') {
                        _this.displayErrorMessage('Missing parameters');
                    }
                    else if (error.status === 404 &&
                        error.error.message === 'car not found') {
                        _this.displayErrorMessage('Car not found');
                    }
                    else {
                        _this.displayErrorMessage('Unexpected error during offer placement');
                    }
                });
            }
        }
    };
    CarDetailsComponent.prototype.fetchOffersForCar = function (carId) {
        var _this = this;
        console;
        this.carService.getOffersForCar(carId).subscribe(function (offers) {
            _this.currentOffers = offers;
            console.log(offers);
        }, function (error) {
            _this.displayErrorMessage('Failed to load offers.');
        });
    };
    CarDetailsComponent.prototype.displayErrorMessage = function (message) {
        this.errorMessage = message;
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
