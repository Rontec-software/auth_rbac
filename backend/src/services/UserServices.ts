import validator from "validator";
import { BadRequestError } from "../helpers/api-errors";
import { ICreateUser, IUpdateUser } from "../interfaces/UsersInterface";
import ProvedorCriptografia from "../providers/ProvedorCriptografia";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersServices {
  private repository: UsersRepository;
  private cripto: ProvedorCriptografia;

  constructor() {
    this.repository = new UsersRepository();
    this.cripto = new ProvedorCriptografia();
  }

  async create({
    name,
    email,
    password,
    phoneNumber,
    profileIds,
    active,
  }: ICreateUser) {
    if (!email) {
      throw new BadRequestError("E-mail is required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Formato de email inválido!");
    }

    if (!phoneNumber || !validator.isMobilePhone(phoneNumber, "pt-BR")) {
      throw new Error("Formato de número de telefone inválido!");
    }

    const alreadExist = await this.repository.findByEmail(email);
    if (alreadExist) {
      throw new Error("User alread exists");
    }

    const hashPassword = await this.cripto.criptografar(password);

    const created = await this.repository.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
      profileIds,
      active,
    });

    created.password = "";

    return created;
  }

  async rename({ name, id }: { name: string; id: string }) {
    if (!name) {
      throw new Error("Name is required");
    }

    const updated = await this.repository.rename({ name, id });

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phoneNumber: updated.phoneNumber,
      active: updated.active,
      profilePicture: updated.profilePicture,
    };
  }

  async updatePassword({
    password,
    email,
  }: {
    password: string;
    email: string;
  }) {
    if (!password) {
      throw new Error("Password is required");
    }

    const hashPassword = await this.cripto.criptografar(password);

    const updated = await this.repository.changePassword(email, hashPassword);

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      phoneNumber: updated.phoneNumber,
      active: updated.active,
      profilePicture: updated.profilePicture,
    };
  }

  async getAllUsers({
    name,
    page = 1,
    limit = 10,
  }: {
    name?: string;
    page?: number;
    limit?: number;
  }) {
    const skip = (page - 1) * limit;

    const users = await this.repository.findAll({ name, skip, take: limit });
    const total = await this.repository.countAll(name);

    return {
      users,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  async getById(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
  async delete(id: string) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const result = await this.repository.delete(id);

    return result;
  }

  async update({
    id,
    name,
    email,
    password,
    phoneNumber,
    profileIds,
    active,
  }: IUpdateUser) {
    const user = await this.repository.findById(id);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const hashPassword = await this.cripto.criptografar(password);

    const updated = await this.repository.update({
      id,
      name,
      email,
      password: hashPassword,
      phoneNumber,
      profileIds,
      active,
    });

    return updated;
  }

  async getProfileById(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
}

export { UsersServices };
