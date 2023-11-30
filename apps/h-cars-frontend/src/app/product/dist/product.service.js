"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductService = void 0;
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var ProductService = /** @class */ (function () {
    function ProductService(http) {
        this.http = http;
        this.apiUrl = 'https://h-cars-backend.azurewebsites.net/api';
    }
    ProductService.prototype.getHeaders = function () {
        var token = localStorage.getItem('token');
        return new http_1.HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: "Bearer " + token
        });
    };
    ProductService.prototype.getAllProducts = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/product/all-products", {
            headers: headers
        });
    };
    ProductService.prototype.getProductById = function (id) {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/product/id/" + id, {
            headers: headers
        });
    };
    ProductService.prototype.createProduct = function (product) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/product/create-product", product, { headers: headers });
    };
    ProductService.prototype.updateProduct = function (id, product) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/product/update-product/" + id, product, {
            headers: headers
        });
    };
    ProductService.prototype.deleteProduct = function (id) {
        var headers = this.getHeaders();
        return this.http.post(this.apiUrl + "/product/delete-product/" + id, {}, { headers: headers });
    };
    ProductService.prototype.getUserProducts = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/product/my-products", {
            headers: headers
        });
    };
    ProductService.prototype.likeProduct = function (productId) {
        var headers = this.getHeaders();
        var body = { productId: productId };
        return this.http.post(this.apiUrl + "/user/like-product", body, {
            headers: headers
        });
    };
    ProductService.prototype.getLikedProducts = function () {
        var headers = this.getHeaders();
        return this.http.get(this.apiUrl + "/user/liked-products", {
            headers: headers
        });
    };
    ProductService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
