import bcrypt from "bcryptjs";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { AuthRequest } from "../middleware/auth";
import { User } from "../models/User";
import { ApiError } from "../utils/ApiError";
import { sendSuccess } from "../utils/ApiResponse";

const signToken = (userId: string, role: string) =>
  jwt.sign({ userId, role }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn as jwt.SignOptions["expiresIn"],
  });

export const register = async (req: AuthRequest, res: Response) => {
  const { name, email, password, role } = req.body as {
    name: string;
    email: string;
    password: string;
    role?: "admin" | "sales";
  };

  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict("Email already registered");
  }

  let assignedRole: "admin" | "sales" = "sales";
  if (role === "admin") {
    if (!req.user || req.user.role !== "admin") {
      throw ApiError.forbidden("Only admins can create admin accounts");
    }
    assignedRole = "admin";
  }

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: assignedRole,
  });

  const token = signToken(user._id.toString(), user.role);

  sendSuccess(res, 201, "Registration successful", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export const login = async (req: AuthRequest, res: Response) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await User.findOne({ email });
  if (!user) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized("Invalid email or password");
  }

  const token = signToken(user._id.toString(), user.role);

  sendSuccess(res, 200, "Login successful", {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

export const getMe = async (req: AuthRequest, res: Response) => {
  if (!req.user) {
    throw ApiError.unauthorized();
  }

  sendSuccess(res, 200, "Profile fetched", {
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    role: req.user.role,
  });
};
