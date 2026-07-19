import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    findOne(id: number, currentUser: any): Promise<{
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
    update(id: number, updateUserDto: UpdateUserDto, currentUser: any): Promise<{
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
