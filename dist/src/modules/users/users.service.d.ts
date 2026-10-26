import { DanainPrismaService } from "../../prisma/danain/danain-prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
export declare class UsersService {
    private danainDb;
    constructor(danainDb: DanainPrismaService);
    get userModel(): import(".prisma/client").Prisma.UserDelegate<import("@prisma/client/runtime/library").DefaultArgs>;
    create(createUserDto: CreateUserDto): Promise<{
        message: string;
        data: {
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: {
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
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
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    update(id: number, updateUserDto: UpdateUserDto): Promise<{
        message: string;
        data: {
            id: number;
            email: string;
            name: string;
            role: import(".prisma/client").$Enums.Role;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
    remove(id: number): Promise<{
        message: string;
    }>;
}
