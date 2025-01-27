import { BadRequestError } from "../helpers/api-errors";
import { ICreateUser } from "../interfaces/UsersInterface";
import ProvedorCriptografia from "../providers/ProvedorCriptografia";
import { UsersRepository } from "../repositories/UsersRepository";
import validator from "validator"

class UsersServices {
  private repository: UsersRepository;
  private cripto: ProvedorCriptografia;

  constructor() {
    this.repository = new UsersRepository();
    this.cripto = new ProvedorCriptografia();
  }

  async create({ name, email, password, phoneNumber }: ICreateUser) {
    if (!email) {
      throw new BadRequestError("E-mail is required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("Formato de email inválido!")
    }

    if (!phoneNumber || !validator.isMobilePhone(phoneNumber, 'pt-BR')) {
      throw new Error("Formato de número de telefone inválido!")
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

  async updatePassword({ password, email }: { password: string; email: string }) {
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

  async getProfileById(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
}

export { UsersServices };
