import { Module } from '@nestjs/common';
import { DanainPrismaService } from './danain/danain-prisma.service';

@Module({
  providers: [DanainPrismaService],
  exports: [DanainPrismaService],
})
export class PrismaModule { }
