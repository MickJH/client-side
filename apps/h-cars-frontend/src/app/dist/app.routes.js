"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = exports.appRoutes = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
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
var product_update_component_1 = require("./product/update/product-update.component");
var product_delete_component_1 = require("./product/delete/product-delete.component");
var product_details_component_1 = require("./product/details/product-details.component");
var user_list_component_1 = require("./user/user-list/user-list.component");
var user_profile_component_1 = require("./user/user-profile/user-profile.component");
exports.appRoutes = [
    { path: '', component: app_component_1.AppComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'register', component: registration_component_1.RegistrationComponent },
    { path: 'about', component: about_component_1.AboutComponent },
    //Car
    { path: 'car', component: car_component_1.CarComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    {
        path: 'car/details/:id',
        component: car_details_component_1.CarDetailsComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'car/create',
        component: car_create_component_1.CarCreateComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'car/update/:id',
        component: car_update_component_1.CarUpdateComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'car/delete/:id',
        component: car_delete_component_1.CarDeleteComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    //Product
    { path: 'product', component: product_component_1.ProductComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    {
        path: 'product/details/:id',
        component: product_details_component_1.ProductDetailsComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'product/create',
        component: product_create_component_1.ProductCreateComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'product/update/:id',
        component: product_update_component_1.ProductUpdateComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    {
        path: 'product/delete/:id',
        component: product_delete_component_1.ProductDeleteComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
    //User
    { path: 'users', component: user_list_component_1.UserListComponent, canActivate: [auth_guard_service_1.AuthGuard] },
    {
        path: 'user/profile',
        component: user_profile_component_1.UserProfileComponent,
        canActivate: [auth_guard_service_1.AuthGuard]
    },
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(exports.appRoutes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
