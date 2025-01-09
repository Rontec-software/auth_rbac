import {
  AlreadyExistError,
  BadRequestError,
  NotFoundError,
} from "../helpers/api-errors";
import {
  ICreatePermission,
  IUpdatePermission,
} from "../interfaces/PermissionsInterface";
import { PermissionsRepository } from "../repositories/PermissionsRepository";

class PermissionsServices {
  private repository: PermissionsRepository;

  constructor() {
    this.repository = new PermissionsRepository();
  }

  async create({ name, descrition }: ICreatePermission) {
    const alreadyExist = await this.repository.getByName(name);

    if (alreadyExist)
      throw new AlreadyExistError("Permission Name already exists");

    const created = await this.repository.create({
      name,
      descrition,
    });

    return created;
  }

  async delete(id: string) {
    const result = await this.repository.getById(id);

    if (!result) throw new NotFoundError("Record not found.");

    const deleted = await this.repository.delete(id);
    return deleted;
  }

  async getAllPermissions() {
    const data = await this.repository.getAll();

    return data;
  }

  async getPermissionById(id: string) {
    const permission = await this.repository.getById(id);

    return permission;
  }

  async update({ id, name, descrition, active }: IUpdatePermission) {
    const exist = await this.repository.getById(id);

    if (!exist) throw new NotFoundError("Permission Id not exists");

    const result = await this.repository.update({
      id,
      name,
      descrition,
      active,
    });

    return result;
  }
}

export { PermissionsServices };
