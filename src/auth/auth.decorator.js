"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.UUIDParam = exports.Auth = void 0;
var common_1 = require("@nestjs/common");
var jwt_guard_1 = require("./jwt.guard");
function Auth(options) {
    var isPublicRoute = options === null || options === void 0 ? void 0 : options.public;
    return (0, common_1.applyDecorators)((0, common_1.UseGuards)(jwt_guard_1.JwtGuard));
}
exports.Auth = Auth;
function UUIDParam(property) {
    var pipes = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        pipes[_i - 1] = arguments[_i];
    }
    return common_1.Param.apply(void 0, __spreadArray([property, new common_1.ParseUUIDPipe({ version: '4' })], pipes, false));
}
exports.UUIDParam = UUIDParam;
