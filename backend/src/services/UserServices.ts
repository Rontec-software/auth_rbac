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
      throw new Error("E-mail is required");
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

    delete created.password;

    return created;
  }

  async rename({ name, id }: { name: string; id: string }) {
    if (!name) {
      throw new Error("Name is required");
    }

    const updated = await this.repository.rename({ name, id });

    return updated;

  }
}

export { UsersServices };