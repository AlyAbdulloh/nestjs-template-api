import { Role } from "@prisma/client";

export interface UserPayload {
  sub: number;
  email: string;
  role: Role;
}
