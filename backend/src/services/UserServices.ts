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

    const alreadExist = await this.repository.findByEmail(email);
    if (alreadExist) {
      throw new BadRequestError("User alread exists");
    }

    const hashPassword = await this.cripto.criptografar(password);

    const created = await this.repository.create({
      name,
      email,
      password: hashPassword,
      phoneNumber,
    });

<<<<<<< HEAD
    //! Estava causando erro, informa que o operador delete deve ser opcional
    // delete created.password;

    delete (created as {password?: string}).password
=======
    created.password = "";
>>>>>>> 1057338d213695120cbb76b81ef611719f36ddc4

    return created;
  }

  async getProfileById(id: string) {
    const user = await this.repository.findById(id);

    return user;
  }
}

export { UsersServices };
