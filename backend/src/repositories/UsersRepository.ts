import { ICreateUser } from "../interfaces/UsersInterface";
import { prismaDB } from "../lib/prisma";

class UsersRepository {
  async create({ name, email, password, phoneNumber }: ICreateUser) {
    const result = await prismaDB.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
      },
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await prismaDB.user.findUnique({ where: { email } });

    return result;
  }

  async rename({ name, id }: { name: string; id: string }) {
    const result = await prismaDB.user.update({
      where: { id },
      data: { name },
    });
  }

  async findById(id: string) {
    const result = await prismaDB.user.findUnique({ where: { id } });

    return result;
  }
}

export { UsersRepository };
