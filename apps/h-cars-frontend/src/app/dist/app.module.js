"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/common/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var app_routes_1 = require("./app.routes");
var login_component_1 = require("./login/login.component");
var registration_component_1 = require("./registration/registration.component");
var car_component_1 = require("./car/car.component");
var car_details_component_1 = require("./car/details/car-details.component");
var car_create_component_1 = require("./car/create/car-create.component");
var car_update_component_1 = require("./car/update/car-update.component");
var car_delete_component_1 = require("./car/delete/car-delete.component");
var auth_guard_service_1 = require("./auth/auth-guard.service");
var about_component_1 = require("./about/about.component");
var product_component_1 = require("./product/product.component");
var product_create_component_1 = require("./product/create/product-create.component");
var product_delete_component_1 = require("./product/delete/product-delete.component");
var product_details_component_1 = require("./product/details/product-details.component");
var product_update_component_1 = require("./product/update/product-update.component");
var user_list_component_1 = require("./user/user-list/user-list.component");
var user_profile_component_1 = require("./user/user-profile/user-profile.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
        console.log('AppModule loaded.');
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                login_component_1.LoginComponent,
                registration_component_1.RegistrationComponent,
                about_component_1.AboutComponent,
                //Car
                car_component_1.CarComponent,
                car_details_component_1.CarDetailsComponent,
                car_create_component_1.CarCreateComponent,
                car_update_component_1.CarUpdateComponent,
                car_delete_component_1.CarDeleteComponent,
                //Product
                product_component_1.ProductComponent,
                product_create_component_1.ProductCreateComponent,
                product_delete_component_1.ProductDeleteComponent,
                product_update_component_1.ProductUpdateComponent,
                product_details_component_1.ProductDetailsComponent,
                //User
                user_list_component_1.UserListComponent,
                user_profile_component_1.UserProfileComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                router_1.RouterModule,
                app_routes_1.AppRoutingModule,
            ],
            providers: [auth_guard_service_1.AuthGuard],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
