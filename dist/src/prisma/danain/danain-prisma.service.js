"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DanainPrismaService = void 0;
const common_1 = require("@nestjs/common");
const danain_1 = require("@internal/prisma/danain");
let DanainPrismaService = class DanainPrismaService extends danain_1.PrismaClient {
    async onModuleInit() {
        await this.$connect();
    }
    async onModuleDestroy() {
        await this.$disconnect();
    }
};
exports.DanainPrismaService = DanainPrismaService;
exports.DanainPrismaService = DanainPrismaService = __decorate([
    (0, common_1.Injectable)()
], DanainPrismaService);
//# sourceMappingURL=danain-prisma.service.js.map