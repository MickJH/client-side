"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var AuthService = /** @class */ (function () {
    function AuthService(http) {
        this.http = http;
        this.apiUrl = 'https://h-cars-backend.azurewebsites.net/api';
    }
    AuthService.prototype.getHeaders = function () {
        var token = localStorage.getItem('token');
        return new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        });
    };
    AuthService.prototype.register = function (user) {
        return this.http.post(this.apiUrl + "/auth/register", user);
    };
    AuthService.prototype.login = function (credentials) {
        return this.http.post(this.apiUrl + "/auth/login", credentials);
    };
    AuthService.prototype.checkEmailAvailability = function (email) {
        return this.http.get(this.apiUrl + "/auth/check-email/" + email);
    };
    AuthService.prototype.getCurrentUser = function () {
        var _this = this;
        var headers = this.getHeaders();
        return this.http
            .get(this.apiUrl + "/auth/current-user", { headers: headers })
            .pipe(operators_1.map(function (user) {
            _this.currentUser = user;
            return user;
        }));
    };
    AuthService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
