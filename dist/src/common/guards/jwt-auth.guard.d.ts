import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
export declare class JwtAuthGuard implements CanActivate {
    private jwtService;
    private reflector;
    private config;
    constructor(jwtService: JwtService, reflector: Reflector, config: ConfigService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    private extractTokenFromRequest;
}
