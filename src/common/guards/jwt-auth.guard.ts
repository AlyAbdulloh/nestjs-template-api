import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { UserPayload } from "../interfaces/user-payload.interface";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private config: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    if (!token) {
      throw new UnauthorizedException("Missing authentication token");
    }
    try {
      const payload = (await this.jwtService.verifyAsync(token, {
        secret: this.config.getOrThrow<string>("JWT_SECRET"),
      })) as UserPayload;
      // Attach user to request object
      request.user = payload;
    } catch {
      throw new UnauthorizedException(
        "Invalid or expired authentication token",
      );
    }
    return true;
  }

  private extractTokenFromRequest(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    if (type === "Bearer") {
      return token;
    }

    const cookieName =
      this.config.get<string>("JWT_COOKIE_NAME") || "access_token";
    return request.cookies?.[cookieName] as string | undefined;
  }
}
