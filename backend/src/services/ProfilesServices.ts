import { AlreadyExistError, NotFoundError } from "../helpers/api-errors";
import {
  ICreateProfile,
  IUpdateProfile,
} from "../interfaces/ProfilesInterface";
import { ProfilesRepository } from "../repositories/ProfilesRepository";

class ProfilesServices {
  private repository: ProfilesRepository;

  constructor() {
    this.repository = new ProfilesRepository();
  }

  async create({ name, description }: ICreateProfile) {
    const alreadyExist = await this.repository.nameExists(name);

    if (alreadyExist)
      throw new AlreadyExistError("Profile Name already exists");

    const created = await this.repository.create({
      name,
      description,
    });

    return created;
  }

  async delete(id: string) {
    const result = await this.repository.getById(id);

    if (!result) throw new NotFoundError("Record not found.");

    const deleted = await this.repository.delete(id);
    return deleted;
  }

  async getAllProfiles() {
    const data = await this.repository.getAll();

    return data;
  }

  async getProfileById(id: string) {
    const profile = await this.repository.getById(id);

    return profile;
  }

  async update({ id, name, description, active }: IUpdateProfile) {
    const exist = await this.repository.getById(id);

    if (!exist) throw new NotFoundError("Profile Id not exists");

    const result = await this.repository.update({
      id,
      name,
      description,
      active,
    });

    return result;
  }
}

export { ProfilesServices };
