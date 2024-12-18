import { NextFunction, Request, Response } from "express";
import { UsersServices } from "../services/UserServices";

class UsersController {
  private userServices: UsersServices;

  constructor() {
    this.userServices = new UsersServices();
  }

  findByEmail() {}

  async create(req: Request, resp: Response, next: NextFunction) {
    const { nome, email, senha, telefone } = req.body;

    try {
      const result = await this.userServices.create({
        nome,
        email,
        senha,
        telefone,
      });
      return resp.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
}

export { UsersController };
