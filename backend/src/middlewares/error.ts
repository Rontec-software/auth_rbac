import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  _req: Request,  //foi adicionado "_" pois o parâmetro não estava sendo usado
  resp: Response,
  _next: NextFunction
) => {
  const status = error.statusCode ?? 500;
  const message = error.message || "Internal Server Error";

  const response: { message: string; field?: string } = { message };
  if (error.field) response.field = error.field;

  return resp.status(status).json({ message });
};
