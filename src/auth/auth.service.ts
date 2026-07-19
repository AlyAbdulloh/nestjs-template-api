import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { DanainPrismaService } from '../prisma/danain/danain-prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private danainDb: DanainPrismaService,
    private jwtService: JwtService,
  ) { }

  get userModel() {
    return this.danainDb.user;
  }

  async register(registerDto: RegisterDto) {
    const { email, password, name } = registerDto;

    const existingUser = await this.userModel.findUnique({
      where: { email },
    });
    if (existingUser) {
      throw new ConflictException('Email address is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userModel.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: Role.USER,
      },
    });

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'User registered successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.userModel.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      message: 'Logged in successfully',
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
