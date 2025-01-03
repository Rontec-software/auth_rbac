import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/UserServices";

type JwtPayload = {
  id: string;
};

class UsersController {
  private userServices: UsersServices;

  constructor() {
    this.userServices = new UsersServices();
  }

  findByEmail() {}

  async create(req: Request, resp: Response, next: NextFunction) {
    const { name, email, password, phoneNumber } = req.body;

    try {
      const result = await this.userServices.create({
        name,
        email,
        password,
        phoneNumber,
      });
      return resp.status(201).json(result);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getProfile(req: Request, resp: Response) {
    resp.status(200).json(req.user);
  }
}

export { UsersController };
