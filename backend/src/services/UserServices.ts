import { BadRequestError } from "../helpers/api-errors";
import { ICreateUser } from "../interfaces/UsersInterface";
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

    const alreadyExist = await this.repository.findByEmail(email);
    if (alreadyExist) {
      throw new BadRequestError("User already exists");
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

  async getProfileById(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
}

export { UsersServices };
