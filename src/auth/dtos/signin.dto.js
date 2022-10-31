"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignInDto = void 0;
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var SignInDto = /** @class */ (function () {
    function SignInDto() {
    }
    SignInDto.plainToClass = function (instance, object) {
        return (0, class_transformer_1.plainToInstance)(instance, object, {
            exposeUnsetFields: true,
            excludeExtraneousValues: true
        });
    };
    __decorate([
        (0, class_validator_1.IsEmail)(),
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Expose)()
    ], SignInDto.prototype, "email");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_transformer_1.Expose)(),
        (0, class_transformer_1.Transform)(function (_a) {
            var value = _a.value;
            return value.toString();
        })
    ], SignInDto.prototype, "password");
    return SignInDto;
}());
exports.SignInDto = SignInDto;
