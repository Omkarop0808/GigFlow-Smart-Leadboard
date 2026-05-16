import { NextFunction, Request, Response } from "express";
import { ValidationChain, validationResult } from "express-validator";
import { ApiError } from "../utils/ApiError";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.all(validations.map((v) => v.run(req)));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const formatted: Record<string, string[]> = {};
      errors.array().forEach((err) => {
        if (err.type === "field") {
          const field = err.path;
          if (!formatted[field]) formatted[field] = [];
          formatted[field].push(err.msg);
        }
      });
      next(ApiError.badRequest("Validation failed", formatted));
      return;
    }
    next();
  };
};
