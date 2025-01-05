import { NextFunction, Request, Response } from "express";
import { RbacServices } from "../services/RbacServices";
import { ForbiddenError, UnauthorizedError } from "../helpers/api-errors";

export const rbacMiddleware = (permission: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const rbac = new RbacServices();

    const havePermission = await rbac.havePermission(req.user.id, permission);

    if (!havePermission) throw new ForbiddenError("Unauthorized Profile");

    return next();
  };
};
