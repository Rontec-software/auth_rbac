import { Request, Response } from "express";
import { ProfilesServices } from "../services/ProfilesServices";

class ProfilesController {
  private profilesServices: ProfilesServices;

  constructor() {
    this.profilesServices = new ProfilesServices();
  }

  async create(req: Request, resp: Response) {
    const { name, description } = req.body;

    const result = await this.profilesServices.create({
      name,
      description,
    });

    return resp.status(201).json(result);
  }

  async delete(req: Request, resp: Response) {
    const deleted = await this.profilesServices.delete(req.params.id);

    if (deleted) resp.status(200).json({ result: "Record deleted" });
  }

  async getAll(req: Request, resp: Response) {
    const { name, page, limit } = req.query;
    try {

      const result = await this.profilesServices.getAllProfiles({
        name: name as string,
        page: page ? Number(page) : 1,
        limit: limit ? Number(limit) : 10,
      });
      resp.status(200).json(result);
    } catch (error) {
      resp.status(500).json(error);
    }
  }

  async getById(req: Request, resp: Response) {
    const result = await this.profilesServices.getProfileById(req.params.id);
    resp.status(200).json(result);
  }

  async update(req: Request, resp: Response) {
    const { name, description, active } = req.body;
    const id = req.params.id;

    const result = await this.profilesServices.update({
      id,
      name,
      description,
      active,
    });

    return resp.status(200).json(result);
  }
}

export { ProfilesController };
