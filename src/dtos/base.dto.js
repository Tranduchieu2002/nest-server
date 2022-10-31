"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BaseDto = void 0;
var class_transformer_1 = require("class-transformer");
var BaseDto = /** @class */ (function () {
    function BaseDto() {
    }
    BaseDto.plainToClass = function (instance, object) {
        return (0, class_transformer_1.plainToInstance)(instance, object, {
            exposeUnsetFields: true,
            excludeExtraneousValues: true
        });
    };
    __decorate([
        (0, class_transformer_1.Expose)()
    ], BaseDto.prototype, "id");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], BaseDto.prototype, "createdAt");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], BaseDto.prototype, "updatedAt");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], BaseDto.prototype, "deletedAt");
    return BaseDto;
}());
exports.BaseDto = BaseDto;
