"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
/*
https://docs.nestjs.com/controllers#controllers
*/
var common_2 = require("@nestjs/common");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.createUser = function (_id, name) {
        console.log(_id, name);
        this.usersService.createNewUser(_id, name);
        return "ok";
    };
    UsersController.prototype.getUsers = function (res) {
        var a = this.usersService.getAll();
        res.status(common_1.HttpStatus.OK).send(a);
    };
    UsersController.prototype.deleteAll = function () {
        this.usersService.users = [];
        return this.usersService.users;
    };
    __decorate([
        (0, common_1.Post)('create'),
        __param(0, (0, common_1.Body)("_id")),
        __param(1, (0, common_1.Body)("name"))
    ], UsersController.prototype, "createUser");
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Res)())
    ], UsersController.prototype, "getUsers");
    __decorate([
        (0, common_1.Delete)("")
    ], UsersController.prototype, "deleteAll");
    UsersController = __decorate([
        (0, common_2.Controller)('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
