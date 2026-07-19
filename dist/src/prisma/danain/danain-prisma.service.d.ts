import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@internal/prisma/danain';
export declare class DanainPrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
