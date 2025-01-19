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

    if(!phoneNumber || !validator.isMobilePhone(phoneNumber, 'pt-BR')) {
      throw new Error("Formato de número de telefone inválido!")
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

  async getProfileById(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
}

export { UsersServices };
