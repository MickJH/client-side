"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductComponent = void 0;
var core_1 = require("@angular/core");
var ProductComponent = /** @class */ (function () {
    function ProductComponent(productService) {
        this.productService = productService;
        this.products = [];
        this.myProducts = [];
        this.likedProducts = [];
        this.selectedProduct = null;
        this.activeTab = 'allProducts';
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.showAllProducts();
    };
    ProductComponent.prototype.showAllProducts = function () {
        var _this = this;
        this.activeTab = 'allProducts';
        this.productService.getAllProducts().subscribe(function (products) {
            _this.products = products;
        });
    };
    ProductComponent.prototype.showMyProducts = function () {
        var _this = this;
        this.activeTab = 'myProducts';
        this.productService.getUserProducts().subscribe(function (myProducts) {
            _this.myProducts = myProducts;
        });
    };
    ProductComponent.prototype.showLikedProducts = function () {
        var _this = this;
        this.activeTab = 'likedProducts';
        this.productService.getLikedProducts().subscribe(function (likedProducts) {
            _this.likedProducts = likedProducts;
        });
    };
    ProductComponent = __decorate([
        core_1.Component({
            selector: 'client-side-product',
            templateUrl: './product.component.html',
            styleUrls: ['./product.component.css']
        })
    ], ProductComponent);
    return ProductComponent;
}());
exports.ProductComponent = ProductComponent;
