"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransformInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
let TransformInterceptor = class TransformInterceptor {
    intercept(context, next) {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        return next.handle().pipe((0, operators_1.map)((data) => {
            if (data &&
                typeof data === "object" &&
                "data" in data &&
                "meta" in data) {
                return {
                    success: true,
                    statusCode,
                    message: data.message || "Request successful",
                    data: data.data,
                    meta: data.meta,
                };
            }
            const hasMessage = data && typeof data === "object" && "message" in data;
            const message = hasMessage
                ? data.message
                : "Request successful";
            let responseData = data;
            if (hasMessage) {
                const { message: _, ...rest } = data;
                responseData = Object.keys(rest).length > 0 ? rest : null;
            }
            if (responseData &&
                typeof responseData === "object" &&
                "data" in responseData &&
                Object.keys(responseData).length === 1) {
                responseData = responseData.data;
            }
            return {
                success: true,
                statusCode,
                message,
                data: responseData,
            };
        }));
    }
};
exports.TransformInterceptor = TransformInterceptor;
exports.TransformInterceptor = TransformInterceptor = __decorate([
    (0, common_1.Injectable)()
], TransformInterceptor);
//# sourceMappingURL=transform.interceptor.js.map