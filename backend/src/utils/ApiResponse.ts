import { Response } from "express";
import { PaginationMeta } from "../types";

export const sendSuccess = <T>(
  res: Response,
  statusCode: number,
  message: string,
  data: T
) => {
  res.status(statusCode).json({ success: true, message, data });
};

export const sendPaginated = <T>(
  res: Response,
  message: string,
  data: T[],
  pagination: PaginationMeta
) => {
  res.status(200).json({ success: true, message, data, pagination });
};
