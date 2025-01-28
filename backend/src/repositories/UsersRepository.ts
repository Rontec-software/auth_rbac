import {
  ICreateUser,
  IPasswordResetToken,
  IUpdateUser,
} from "../interfaces/UsersInterface";
import { prismaDB } from "../lib/prisma";

class UsersRepository {
  async create({
    name,
    email,
    password,
    phoneNumber,
    profileIds,
    active,
  }: ICreateUser) {
    const result = await prismaDB.user.create({
      data: {
        name,
        email,
        password,
        phoneNumber,
        active,
        ...(profileIds && {
          profiles: {
            create: profileIds.map((profileId) => ({
              profile: { connect: { id: profileId.toString() } },
            })),
          },
        }),
      },
    });

    return result;
  }

  async update({
    id,
    name,
    email,
    password,
    phoneNumber,
    profileIds,
    active,
  }: IUpdateUser) {
    const result = await prismaDB.user.update({
      where: { id },
      data: {
        name,
        email,
        password,
        phoneNumber,
        active,
        ...(profileIds && {
          profiles: {
            deleteMany: {},
            create: profileIds.map((profileId) => ({
              profile: { connect: { id: profileId.toString() } },
            })),
          },
        }),
      },
    });

    return result;
  }

  async findByEmail(email: string) {
    const result = await prismaDB.user.findUnique({ where: { email } });

    return result;
  }

  async rename({ name, id }: { name: string; id: string }) {
    try {
      const result = await prismaDB.user.update({
        where: { id },
        data: { name },
      });


      if (!result) {
        throw new Error('Update user failed');
      }
      return result;
    } catch (error) {
      console.log('error', error);
      throw new Error('Update user failed');
    }
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

    return result;
  }

  async delete(id: string) {
    try {
      const result = await prismaDB.$transaction(async (prisma) => {
        await prisma.userProfile.deleteMany({
          where: { userId: id },
        });

        return prisma.user.delete({
          where: { id },
        });
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: string) {
    const result = await prismaDB.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        phoneNumber: true,
        active: true,
        profiles: {
          select: {
            profile: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

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
