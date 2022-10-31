"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppConfigService = void 0;
var common_1 = require("@nestjs/common");
var AppConfigService = /** @class */ (function () {
    function AppConfigService(configService) {
        this.configService = configService;
    }
    Object.defineProperty(AppConfigService.prototype, "isDevelopment", {
        get: function () {
            return this.nodeEnv === 'development';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "isProduction", {
        get: function () {
            return this.nodeEnv === 'production';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "authConfig", {
        get: function () {
            return {
                privateKey: this.getString('JWT_PRIVATE_KEY'),
                publicKey: this.getString('JWT_PUBLIC_KEY'),
                jwtExpirationTime: this.getNumber('JWT_EXPIRATION_TIME')
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "appConfig", {
        get: function () {
            return {
                port: this.getString('PORT')
            };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AppConfigService.prototype, "nodeEnv", {
        get: function () {
            return this.getString('NODE_ENV');
        },
        enumerable: false,
        configurable: true
    });
    AppConfigService.prototype.getString = function (key) {
        var value = this.get(key);
        return value.replace(/\\n/gm, '\n');
    };
    AppConfigService.prototype.getNumber = function (key) {
        var value = this.get(key);
        try {
            return Number(value);
        }
        catch (_a) {
            throw new Error(key + ' environment variable is not a number');
        }
    };
    AppConfigService.prototype.get = function (key) {
        var value = this.configService.get(key);
        if (!value) {
            throw new Error(key + ' environment variable does not set'); // probably we should call process.exit() too to avoid locking the service
        }
        return value;
    };
    AppConfigService = __decorate([
        (0, common_1.Injectable)()
    ], AppConfigService);
    return AppConfigService;
}());
exports.AppConfigService = AppConfigService;
