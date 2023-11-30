"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserListComponent = void 0;
var core_1 = require("@angular/core");
var UserListComponent = /** @class */ (function () {
    function UserListComponent(userService) {
        this.userService = userService;
        this.users = [];
        this.errorMessage = '';
    }
    UserListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.getAllUsers().subscribe(function (users) {
            _this.users = users;
        });
    };
    UserListComponent.prototype.followUser = function (userId) {
        var _this = this;
        this.userService.followUser(userId).subscribe(function () {
            _this.errorMessage = 'User followed successfully';
        }, function (error) {
            if (error.status === 400 &&
                error.error.message === 'missing parameters') {
                _this.displayErrorMessage('Missing parameters');
            }
            else if (error.status === 404 &&
                error.error.message === 'user doesnt exist') {
                _this.displayErrorMessage('User not found');
            }
            else if (error.status === 400 &&
                error.error.message === 'cannot follow yourself') {
                _this.displayErrorMessage('Cannot follow yourself');
            }
            else if (error.status === 400 &&
                error.error.message === 'You are already following this user') {
                _this.displayErrorMessage('You are already following this user');
            }
            else {
                _this.displayErrorMessage('Unexpected error during follow operation');
            }
        });
    };
    UserListComponent.prototype.displayErrorMessage = function (message) {
        this.errorMessage = message;
    };
    UserListComponent = __decorate([
        core_1.Component({
            selector: 'client-side-user-list',
            templateUrl: './user-list.component.html',
            styleUrls: ['./user-list.component.css']
        })
    ], UserListComponent);
    return UserListComponent;
}());
exports.UserListComponent = UserListComponent;
