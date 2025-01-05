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

  async rename({ name, id }: { name: string; id: string }) {
    const result = await prismaDB.user.update({
      where: { id },
      data: { name },
    });

    if (!result) {
      throw new Error('Update user failed');
    }

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
}

export { UsersRepository };
