import { ICreateUser } from "../interfaces/UsersInterface";
import { prismaDB } from "../lib/prisma";

class UsersRepository {
  async create({ name, email, password }: ICreateUser) {
    const result = await prismaDB.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await prismaDB.user.findUnique({ where: { email } });

    return result;
  }
}

export { UsersRepository };
