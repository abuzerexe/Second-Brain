import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

interface AuthPayload extends jwt.JwtPayload {
  id: string;
}