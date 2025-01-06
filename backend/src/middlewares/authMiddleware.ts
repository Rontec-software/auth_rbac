import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../helpers/api-errors";
import * as jwt from "jsonwebtoken";
import 'dotenv/config';
import { UsersServices } from "../services/UserServices";
import { ILoggedUser } from "../interfaces/LoggedUserInterface";

type JwtPayload = {
  id: string;
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const userServices = new UsersServices();

  const { authorization } = req.headers;

  if (!authorization) throw new UnauthorizedError("Unauthorized");

  const token = authorization.split(" ")[1];

  const secretKey: string = process.env.JWT_SECRET_KEY ?? "";

  try {
    const { id } = jwt.verify(token, secretKey) as JwtPayload;

    if (!id) throw new UnauthorizedError("Unauthorized");

    const user = await userServices.getProfileById(id);

    if (!user) throw new UnauthorizedError("User not found");

    const { password: _, ...loggedUser } = user;

    req.user = loggedUser as ILoggedUser;

    next();
  } catch (error) {
    throw new UnauthorizedError(error.message);
  }
};
