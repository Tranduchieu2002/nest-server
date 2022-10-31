"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthModule = void 0;
var common_1 = require("@nestjs/common");
var jwt_1 = require("@nestjs/jwt");
var passport_1 = require("@nestjs/passport");
var app_configs_service_1 = require("shared/services/app-configs.service");
var shared_module_1 = require("shared/shared.module");
var user_module_1 = require("user/user.module");
var auth_controller_1 = require("./auth.controller");
var jwt_strategy_1 = require("./jwt.strategy");
var local_strategy_1 = require("./local.strategy");
var auth_service_1 = require("./services/auth.service");
var AuthModule = /** @class */ (function () {
    function AuthModule() {
    }
    AuthModule = __decorate([
        (0, common_1.Module)({
            exports: [auth_service_1.AuthService, jwt_1.JwtModule],
            imports: [
                (0, common_1.forwardRef)(function () { return user_module_1.UserModule; }),
                passport_1.PassportModule.register({ session: false }),
                jwt_1.JwtModule.registerAsync({
                    useFactory: function (configService) {
                        return {
                            privateKey: configService.authConfig.privateKey,
                            publicKey: configService.authConfig.publicKey,
                            signOptions: {
                                algorithm: 'RS256',
                                expiresIn: configService.authConfig.jwtExpirationTime
                            },
                            verifyOptions: {
                                algorithms: ['RS256']
                            }
                        };
                    },
                    inject: [app_configs_service_1.AppConfigService]
                }),
                user_module_1.UserModule.register({ name: 'duma', password: '1' }),
                shared_module_1.SharedModule,
            ],
            controllers: [auth_controller_1.AuthController],
            providers: [auth_service_1.AuthService, local_strategy_1.LocalStrategy, jwt_strategy_1.JwtStrategy]
        })
    ], AuthModule);
    return AuthModule;
}());
exports.AuthModule = AuthModule;
