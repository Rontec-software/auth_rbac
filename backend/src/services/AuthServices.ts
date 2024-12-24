import { UnauthorizedError } from "../helpers/api-errors";
import { IAuthLogin } from "../interfaces/AuthLoginInterface";
import ProvedorCriptografia from "../providers/ProvedorCriptografia";
import { UsersRepository } from "../repositories/UsersRepository";

class AuthServices {
  private repository: UsersRepository;
  private cripto: ProvedorCriptografia;

  constructor() {
    this.repository = new UsersRepository();
    this.cripto = new ProvedorCriptografia();
  }

  async login({ email, password }: IAuthLogin) {
    const user = await this.repository.findByEmail(email);

    if (!user) throw new UnauthorizedError("Invalid credentials");

    const matchPassword = await this.cripto.comparar(password, user.password);

    if (!matchPassword) throw new UnauthorizedError("Invalid credentials");

    delete user.password;
    delete user.passwordResetToken;
    delete user.expPasswordResetToken;
    delete user.createdAt;
    delete user.twoFactorAuthEnable;
    //delete user.active;

    return user;
  }
}

export { AuthServices };
