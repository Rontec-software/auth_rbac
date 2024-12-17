import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  resp: Response,
  next: NextFunction
) => {
  const status = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : "Internal Server Error";

  console.log(error);
  return resp.status(status).json({ message });
};
