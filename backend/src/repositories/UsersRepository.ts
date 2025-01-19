import { ICreateUser, IPasswordResetToken } from "../interfaces/UsersInterface";
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

  async setPasswordResetToken({ email, token, expToken }: IPasswordResetToken) {
    const result = await prismaDB.user.update({
      where: { email },
      data: {
        passwordResetToken: token,
        expPasswordResetToken: expToken,
      },
    });

    return result;
  }

  async changePassword(email: string, password: string) {
    const result = await prismaDB.user.update({
      where: { email },
      data: {
        password,
        passwordResetToken: null,
        expPasswordResetToken: null,
      },
    });
  }

  async findById(id: string) {
    const result = await prismaDB.user.findUnique({ where: { id } });

    return result;
  }

  async findAll({
    name,
    skip,
    take,
  }: {
    name?: string;
    skip: number;
    take: number;
  }) {
    const where = !!name
      ? { name: { contains: name, mode: "insensitive" } }
      : {};

    return await prismaDB.user.findMany({
      where,
      skip,
      take,
    });
  }

  async countAll(name?: string) {
    const where = !!name
      ? { name: { contains: name, mode: "insensitive" } }
      : {};

    return await prismaDB.user.count({
      where,
    });
  }
}

export { UsersRepository };
