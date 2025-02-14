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

  findByEmail() { }

  async create(req: Request, resp: Response, next: NextFunction) {
    const { name, email, password, phoneNumber, profileIds, active } = req.body;

    try {
      const result = await this.userServices.create({
        name,
        email,
        password,
        phoneNumber,
        profileIds,
        active,
      });
      return resp.status(201).json(result);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

  async rename(req: Request, resp: Response, next: NextFunction) {
    const { name } = req.body;
    const id = req.user.id;

    try {
      const result = await this.userServices.rename({ id, name });
      return resp.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async updatePassword(req: Request, resp: Response, next: NextFunction) {
    const { password } = req.body;
    const email = req.user.email;

    try {
      const result = await this.userServices.updatePassword({
        email,
        password,
      });
      return resp.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, resp: Response) {
    const { name, page, limit } = req.query;

    try {
      const result = await this.userServices.getAllUsers({
        name: name as string | undefined,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });
      resp.status(200).json(result);
    } catch (error) {
      resp.status(500).json(error);
    }
  }

  async getById(req: Request, resp: Response) {
    try {
      const result = await this.userServices.getById(req.params.id);
      resp.status(200).json(result);
    } catch (error) {
      resp.status(500).json(error);
    }
  }

  async delete(req: Request, resp: Response) {
    try {
      const result = await this.userServices.delete(req.params.id);
      resp.status(200).json(result);
    } catch (error) {
      resp.status(500).json(error);
    }
  }

  async update(req: Request, resp: Response) {
    const { name, email, password, phoneNumber, profileIds, active } = req.body;

    try {
      const result = await this.userServices.update({
        id: req.params.id,
        name,
        email,
        password,
        phoneNumber,
        profileIds,
        active,
      });
      resp.status(200).json(result);
    } catch (error) {
      resp.status(500).json(error);
    }
  }

  async getProfile(req: Request, resp: Response) {
    resp.status(200).json(req.user);
  }
}

export { UsersController };
