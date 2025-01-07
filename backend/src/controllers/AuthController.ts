import { Request, Response, NextFunction } from "express";
import { AuthServices } from "../services/AuthServices";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

class AuthController {
  private authServices: AuthServices;

  constructor() {
    this.authServices = new AuthServices();
    dotenv.config();
  }

  async login(req: Request, resp: Response) {
    const { email, password } = req.body;

    const user = await this.authServices.login({ email, password });

    const secretKey: string | undefined = process.env.JWT_SECRET_KEY ?? "";

    if (!secretKey) {
      return resp.status(500).json({ error: "JWT secret key is not defined" });
    }

    const token = jwt.sign(user, secretKey, {
      expiresIn: "4h",
    });

    return resp.status(200).json({ token: token });
  }

  async recoverPassword(req: Request, resp: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      await this.authServices.recoverPassword(email);
      return resp.status(204).send({});
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, resp: Response, next: NextFunction) {
    const { email, token, password } = req.body;

    try {
      await this.authServices.resetPassword({ email, token, password });
      return resp.status(204).send({});
    } catch (error) {
      next(error);
    }
  }
}

export { AuthController };
