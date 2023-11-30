"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductDetailsComponent = void 0;
var core_1 = require("@angular/core");
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(productService, route, router) {
        this.productService = productService;
        this.route = route;
        this.router = router;
        this.product = null;
        this.errorMessage = '';
    }
    ProductDetailsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap.subscribe(function (params) {
            var productId = params.get('id');
            if (productId) {
                _this.productService.getProductById(productId).subscribe(function (product) {
                    _this.product = product;
                });
            }
        });
    };
    ProductDetailsComponent.prototype.updateProduct = function () {
        if (this.product) {
            this.router.navigate(['/product/update', this.product._id]);
        }
    };
    ProductDetailsComponent.prototype.deleteProduct = function () {
        if (this.product) {
            this.router.navigate(['/product/delete', this.product._id]);
        }
    };
    ProductDetailsComponent.prototype.likeProduct = function (carId) {
        var _this = this;
        this.productService.likeProduct(carId).subscribe(function () {
            _this.errorMessage = 'Product liked successfully';
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
                _this.displayErrorMessage('Product not found');
            }
            else if (error.status === 400 &&
                error.error.message === 'You have already liked this product') {
                _this.displayErrorMessage('You have already liked this product');
            }
            else {
                _this.displayErrorMessage('Unexpected error during like operation');
            }
        });
    };
    ProductDetailsComponent.prototype.displayErrorMessage = function (message) {
        this.errorMessage = message;
    };
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'client-side-product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.css']
        })
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
