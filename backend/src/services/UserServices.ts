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

  async create({ nome, email, senha, telefone }: ICreateUser) {
    if (!email) {
      throw new Error("Um e-mail é necessário!");
    }

    const alreadExist = await this.repository.findByEmail(email);
    if (alreadExist) {
      throw new Error("Usuário já existe!");
    }

    const hashPassword = await this.cripto.criptografar(senha);

    const created = await this.repository.create({
      nome,
      email,
      senha: hashPassword,
      telefone,
    });

    //delete created.senha;

    return created;
  }
}

export { UsersServices };
