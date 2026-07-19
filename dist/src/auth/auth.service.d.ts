import { DanainPrismaService } from '../prisma/danain/danain-prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthService {
    private danainDb;
    private jwtService;
    constructor(danainDb: DanainPrismaService, jwtService: JwtService);
    get userModel(): import("@internal/prisma/danain").Prisma.UserDelegate<import("@internal/prisma/danain/runtime/library").DefaultArgs>;
    register(registerDto: RegisterDto): Promise<{
        message: string;
        access_token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        message: string;
        access_token: string;
    }>;
}
