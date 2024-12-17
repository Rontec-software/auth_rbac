import { Request, Response } from "express";
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

    const secretKey: string = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(user, secretKey, {
      expiresIn: "4h",
    });

    return resp.status(200).json({ token: token });
  }
}

export { AuthController };
