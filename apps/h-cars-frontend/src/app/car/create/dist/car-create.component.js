"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CarCreateComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CarCreateComponent = /** @class */ (function () {
    function CarCreateComponent(formBuilder, carService, authService, router) {
        var _this = this;
        this.formBuilder = formBuilder;
        this.carService = carService;
        this.authService = authService;
        this.router = router;
        this.carForm = this.formBuilder.group({
            userEmail: ['', forms_1.Validators.required],
            carModel: ['', forms_1.Validators.required],
            imageUrl: ['', forms_1.Validators.required],
            counter: ['', forms_1.Validators.required],
            typeOfFuel: ['', forms_1.Validators.required],
            transmissionType: ['', forms_1.Validators.required],
            apk: [false],
            apkExpires: [null],
            numberPlate: ['', forms_1.Validators.required],
            constructionYear: ['', forms_1.Validators.required]
        });
        this.authService.getCurrentUser().subscribe(function (user) {
            _this.carForm.patchValue({
                userEmail: user.email
            });
        });
    }
    CarCreateComponent.prototype.createCar = function () {
        var _this = this;
        if (this.carForm.valid) {
            this.carService.createCar(this.carForm.value).subscribe(function () {
                // Car creation successful
                _this.router.navigate(['/car']);
            }, function (error) {
                // Handle error, e.g., display an error message
                console.error('Error creating car:', error);
            });
        }
    };
    CarCreateComponent = __decorate([
        core_1.Component({
            selector: 'client-side-car-create',
            templateUrl: './car-create.component.html',
            styleUrls: ['./car-create.component.css']
        })
    ], CarCreateComponent);
    return CarCreateComponent;
}());
exports.CarCreateComponent = CarCreateComponent;
