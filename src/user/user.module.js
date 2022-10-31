"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserModule = void 0;
var common_1 = require("@nestjs/common");
var user_controller_1 = require("./user.controller");
var user_service_1 = require("./user.service");
var userConfigs = {
    name: 'hieu',
    password: '1234'
};
var UserModule = /** @class */ (function () {
    function UserModule() {
    }
    UserModule_1 = UserModule;
    UserModule.register = function (data) {
        return {
            module: UserModule_1,
            // imports: [forwardRef(() => AuthModule)],
            exports: [user_service_1.UserService],
            controllers: [user_controller_1.UserController],
            providers: [
                user_service_1.UserService,
                {
                    provide: 'USER_CONFIGS',
                    useValue: data
                },
            ]
        };
    };
    var UserModule_1;
    UserModule = UserModule_1 = __decorate([
        (0, common_1.Module)({})
    ], UserModule);
    return UserModule;
}());
exports.UserModule = UserModule;
