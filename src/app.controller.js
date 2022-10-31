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
exports.AppController = void 0;
var common_1 = require("@nestjs/common");
var cat_dto_1 = require("./dtos/cat.dto");
var AppController = /** @class */ (function () {
    function AppController(appService, configService) {
        this.appService = appService;
        this.configService = configService;
    }
    AppController.prototype.getHello = function (response) {
        var message = this.appService.getHello();
        response.json({ message: this.configService.authConfig });
    };
    AppController.prototype.updateCat = function (id, body) {
        var valueAfterValidate = cat_dto_1.CatDtoClass.plainToClass(cat_dto_1.CatDtoClass, body);
        console.log(valueAfterValidate);
        // this.userService.updateUser(id, body.name);
        return {
            message: "id: ".concat(id, " with name la con me no ").concat(body.name)
        };
    };
    __decorate([
        (0, common_1.Get)(),
        (0, common_1.HttpCode)(200),
        __param(0, (0, common_1.Res)())
    ], AppController.prototype, "getHello");
    __decorate([
        (0, common_1.Put)('cat/:id'),
        (0, common_1.HttpCode)(201),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], AppController.prototype, "updateCat");
    AppController = __decorate([
        (0, common_1.Controller)()
    ], AppController);
    return AppController;
}());
exports.AppController = AppController;
