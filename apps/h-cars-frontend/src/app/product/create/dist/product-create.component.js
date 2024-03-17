"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductCreateComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var ProductCreateComponent = /** @class */ (function () {
    function ProductCreateComponent(formBuilder, productService, authService, router) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.productService = productService;
        this.authService = authService;
        this.router = router;
        this.cars = [];
        this.isUniversal = false;
        this.productForm = this.formBuilder.group({
            userEmail: ['', forms_1.Validators.required],
            productName: ['', forms_1.Validators.required],
            price: [0, forms_1.Validators.required],
            description: ['', forms_1.Validators.required],
            car: ['', forms_1.Validators.required],
            imageUrl: ['', forms_1.Validators.required],
            category: ['', forms_1.Validators.required],
            brand: ['', forms_1.Validators.required],
            createdAt: [new Date()],
            isUniversal: [false]
        });
        this.authService.getCurrentUser().subscribe(function (user) {
            _this.productForm.patchValue({
                userEmail: user.email
            });
        });
        this.productService.getAllCars().subscribe(function (cars) {
            _this.cars = cars;
        });
    }
    ProductCreateComponent.prototype.createProduct = function () {
        var _this = this;
        if (this.productForm.valid) {
            this.productService.createProduct(this.productForm.value).subscribe(function () {
                // Product creation successful
                _this.router.navigate(['/product']);
            }, function (error) {
                // Handle error, e.g., display an error message
                console.error('Error creating product:', error);
            });
        }
    };
    ProductCreateComponent.prototype.toggleUniversal = function () {
        var _a, _b, _c, _d;
        this.isUniversal = !this.isUniversal;
        if (this.isUniversal) {
            (_a = this.productForm.get('car')) === null || _a === void 0 ? void 0 : _a.setValue('Universal');
            (_b = this.productForm.get('car')) === null || _b === void 0 ? void 0 : _b.disable();
        }
        else {
            (_c = this.productForm.get('car')) === null || _c === void 0 ? void 0 : _c.setValue('');
            (_d = this.productForm.get('car')) === null || _d === void 0 ? void 0 : _d.enable();
        }
    };
    ProductCreateComponent = __decorate([
        core_1.Component({
            selector: 'client-side-product-create',
            templateUrl: './product-create.component.html',
            styleUrls: ['./product-create.component.css']
        })
    ], ProductCreateComponent);
    return ProductCreateComponent;
}());
exports.ProductCreateComponent = ProductCreateComponent;
