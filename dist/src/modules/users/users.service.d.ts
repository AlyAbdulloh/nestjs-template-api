import { DanainPrismaService } from '../../prisma/danain/danain-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
export declare class UsersService {
    private danainDb;
    constructor(danainDb: DanainPrismaService);
    get userModel(): import("@internal/prisma/danain").Prisma.UserDelegate<import("@internal/prisma/danain/runtime/library").DefaultArgs>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: {
            email: string;
            name: string;
            role: import("@internal/prisma/danain").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    }>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: {
            email: string;
            name: string;
            role: import("@internal/prisma/danain").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        }[];
        meta: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    findOne(id: number): Promise<{
        message: string;
        data: {
            email: string;
            name: string;
            role: import("@internal/prisma/danain").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: {
            email: string;
            name: string;
            role: import("@internal/prisma/danain").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
            id: number;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
