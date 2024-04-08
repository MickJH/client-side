"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var CarService = /** @class */ (function () {
    function CarService(http) {
        this.http = http;
        this.apiUrl = 'https://h-cars-backend.azurewebsites.net/api';
    }
    CarService.prototype.getHeaders = function () {
        var token = localStorage.getItem('token');
        return new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        });
    };
    CarService.prototype.getAllCars = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/car/all", {
            headers: headers
        });
    };
    CarService.prototype.getCarById = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/car/id/" + id, {
            headers: headers
        });
    };
    CarService.prototype.createCar = function (car) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/car/create", car, {
            headers: headers
        });
    };
    CarService.prototype.updateCar = function (id, car) {
        var headers = this.getHeaders();
        return this.http.put(this.apiUrl + "/car/update/" + id, car, {
            headers: headers
        });
    };
    CarService.prototype.deleteCar = function (id) {
        var headers = this.getHeaders();
        return this.http["delete"](this.apiUrl + "/car/delete/" + id, {
            headers: headers
        });
    };
    CarService.prototype.getUserCars = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/car/my-cars", { headers: headers });
    };
    CarService.prototype.likeCar = function (carId) {
        var headers = this.getHeaders();
        var body = { carId: carId };
        return this.http.post(this.apiUrl + "/user/like-car", body, {
            headers: headers
        });
    };
    CarService.prototype.getLikedCars = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/user/liked-cars", {
            headers: headers
        });
    };
    CarService.prototype.placeOffer = function (carId, price) {
        var headers = this.getHeaders();
        var body = { carId: carId, price: price };
        return this.http.post(this.apiUrl + "/user/offer", body, { headers: headers });
    };
    CarService.prototype.getOffersForCar = function (carId) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/user/offers-for-car/" + carId, {
            headers: headers
        });
    };
    CarService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], CarService);
    return CarService;
}());
exports.CarService = CarService;
