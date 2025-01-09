import { Request, Response } from "express";
import { PermissionsServices } from "../services/PermissionsServices";

class PermissionsController {
  private permissionsServices: PermissionsServices;

  constructor() {
    this.permissionsServices = new PermissionsServices();
  }

  async create(req: Request, resp: Response) {
    const { name, descrition } = req.body;

    const result = await this.permissionsServices.create({
      name,
      descrition,
    });

    return resp.status(201).json(result);
  }

  async delete(req: Request, resp: Response) {
    const deleted = await this.permissionsServices.delete(req.params.id);

    if (deleted) resp.status(200).json({ result: "Record deleted" });
  }

  async getAllPermissions(req: Request, resp: Response) {
    const result = await this.permissionsServices.getAllPermissions();
    resp.status(200).json(result);
  }

  async getPermissionById(req: Request, resp: Response) {
    const result = await this.permissionsServices.getPermissionById(
      req.params.id
    );
    resp.status(200).json(result);
  }

  async update(req: Request, resp: Response) {
    const { name, descrition, active } = req.body;
    const id = req.params.id;

    const result = await this.permissionsServices.update({
      id,
      name,
      descrition,
      active,
    });

    return resp.status(200).json(result);
  }
}

export { PermissionsController };
