import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      ...(err.errors && { errors: err.errors }),
    });
    return;
  }

  if (err.name === "ValidationError") {
    res.status(400).json({ success: false, message: err.message });
    return;
  }

  if (err.name === "CastError") {
    res.status(400).json({ success: false, message: "Invalid ID format" });
    return;
  }

  console.error(err);
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === "production" ? "Internal server error" : err.message,
  });
};
