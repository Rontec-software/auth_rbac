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

  async create({ name, email, password, phoneNumber }: ICreateUser) {
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
    });

    created.password = "";

    return created;
  }

  async getAllUsers() {
    const user = await this.repository.findAll();
    return user;
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
