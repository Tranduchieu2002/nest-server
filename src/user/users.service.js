"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersService = void 0;
var user_dto_1 = require("./dto/user.dto");
/*
https://docs.nestjs.com/providers#services
*/
var common_1 = require("@nestjs/common");
/**
 * Creates a signed jwt token based on IProfile payload
 * @param {Profile} param dto to generate token from
 * @returns {Promise<ITokenReturnBody>} token body
 */
var UsersService = /** @class */ (function () {
    function UsersService() {
        this.users = [];
    }
    UsersService.prototype.createNewUser = function (_id, name) {
        console.log(_id);
        var newUser = new user_dto_1.userDto(_id, name, new Date());
        this.users.push(newUser);
    };
    UsersService.prototype.getAll = function () {
        return this.users;
    };
    UsersService = __decorate([
        (0, common_1.Injectable)()
    ], UsersService);
    return UsersService;
}());
exports.UsersService = UsersService;
