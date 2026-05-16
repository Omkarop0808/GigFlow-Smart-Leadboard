import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { User } from "../models/User";
import { JwtPayload, UserRole } from "../types";
import { ApiError } from "../utils/ApiError";

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    email: string;
    name: string;
  };
}

export const authenticate = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      throw ApiError.unauthorized("Access token required");
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env.jwtSecret) as JwtPayload;

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      throw ApiError.unauthorized("User not found");
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    };
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      next(error);
      return;
    }
    next(ApiError.unauthorized("Invalid or expired token"));
  }
};

export const authorize = (...roles: UserRole[]) => {
  return (req: AuthRequest, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(ApiError.unauthorized());
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(ApiError.forbidden("Insufficient permissions"));
      return;
    }
    next();
  };
};
