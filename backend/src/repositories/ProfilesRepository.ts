import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { prismaDB } from "../lib/prisma";
import { BadRequestError } from "../helpers/api-errors";
import {
  ICreateProfile,
  IUpdateProfile,
} from "../interfaces/ProfilesInterface";

class ProfilesRepository {
  async create({
    name,
    description,
    active,
    permissionsIds
  }: ICreateProfile) {
    const result = await prismaDB.profile.create({
      data: {
        name,
        description,
        active,
        ...(permissionsIds && {
          permissions: {
            create: permissionsIds.map((permissionId) => ({
              permission: { connect: { id: permissionId.toString() } },
            })),
          },
        }),
      },
    });

    return result;
  }

  async delete(id: string) {
    try {
      const result = await prismaDB.$transaction(async (prisma) => {
        await prisma.profilePermission.deleteMany({
          where: { profileId: id },
        });

        return prisma.profile.delete({
          where: { id },
        });
      });

      return result;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.error(error.message);

        if (error.code === "P2003")
          throw new BadRequestError("Foreign key constraint violated");

        throw new BadRequestError(error.message);
      }
    }
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
      ? { name: { contains: name } }
      : {};
    const result = await prismaDB.profile.findMany({
      where,
      skip,
      take,
      include: {
        permissions: {
          include: {
            permission: true,
          }
        },
      }
    });

    return result;
  }

  async countAll(name?: string) {
    const where = !!name
      ? { name: { contains: name } }
      : {};

    return await prismaDB.profile.count({
      where,
    });
  }

  async getById(id: string) {
    const result = await prismaDB.profile.findUnique({
      where: { id },
      include: {
        permissions: {
          include: {
            permission: true,
          }
        },
      }
    });

    return result;
  }

  async getByName(name: string) {
    const result = await prismaDB.profile.findFirst({ where: { name } });

    return result;
  }

  async nameExists(name: string) {
    const countRecords = await prismaDB.profile.count({ where: { name } });

    return !!countRecords;
  }

  async update({
    id,
    name,
    description,
    active,
    permissionsIds
  }: IUpdateProfile) {
    const result = await prismaDB.profile.update({
      where: { id },
      data: {
        name,
        description,
        active,
        ...(permissionsIds && {
          permissions: {
            deleteMany: {},
            create: permissionsIds.map((permissionId) => ({
              permission: { connect: { id: permissionId.toString() } },
            })),
          },
        }),
      },
    });

    return result;
  }
}

export { ProfilesRepository };
