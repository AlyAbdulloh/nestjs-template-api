import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from "class-validator";
import { Role } from "@prisma/client";

export class CreateUserDto {
  @ApiProperty({
    example: "user@danain.com",
    description: "User email address",
  })
  @IsEmail({}, { message: "Please enter a valid email address" })
  @IsNotEmpty({ message: "Email is required" })
  email: string;

  @ApiProperty({
    example: "password123",
    description: "Password (minimum 6 characters)",
  })
  @IsString()
  @IsNotEmpty({ message: "Password is required" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;

  @ApiProperty({
    example: "John Doe",
    description: "User full name",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    example: Role.USER,
    enum: Role,
    description: "User access role",
    required: false,
  })
  @IsOptional()
  @IsEnum(Role, { message: "Role must be either ADMIN or USER" })
  role?: Role = Role.USER;
}
