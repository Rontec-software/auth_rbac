import { ICreateUser } from "../interfaces/UsersInterface";
import { prismaDB } from "../lib/prisma";

class UsersRepository {
  async create({ nome, email, senha, telefone }: ICreateUser) {
    const result = await prismaDB.usuario.create({
      data: {
        nome,
        email,
        senha,
        telefone,
      },
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await prismaDB.usuario.findUnique({ where: { email } });

    return result;
  }
}

export { UsersRepository };
