"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.apiUrl = 'https://h-cars-backend.azurewebsites.net/api';
    }
    UserService.prototype.getHeaders = function () {
        var token = localStorage.getItem('token');
        return new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        });
    };
    UserService.prototype.getUserProfile = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/user/profile", {
            headers: headers
        });
    };
    UserService.prototype.getAllUsers = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/user/all-users", {
            headers: headers
        });
    };
    UserService.prototype.followUser = function (userEmail) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/user/follow", { followingUser: userEmail }, { headers: headers });
    };
    UserService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
