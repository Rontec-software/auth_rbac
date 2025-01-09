import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  ICreatePermission,
  IUpdatePermission,
} from "../interfaces/PermissionsInterface";
import { prismaDB } from "../lib/prisma";
import { BadRequestError } from "../helpers/api-errors";

class PermissionsRepository {
  async create({ name, descrition }: ICreatePermission) {
    const result = await prismaDB.permission.create({
      data: {
        name,
        descrition,
      },
    });

    return result;
  }

  async delete(id: string) {
    try {
      const deleted = await prismaDB.permission.delete({ where: { id } });

      if (!deleted) return false;

      return true;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        console.log(error.message);

        if (error.code === "P2003")
          throw new BadRequestError("Foreign key constraint violated");

        throw new BadRequestError(error.message);
      }
    }
  }

  async getAll() {
    const result = await prismaDB.permission.findMany();

    return result;
  }

  async getById(id: string) {
    const result = await prismaDB.permission.findUnique({ where: { id } });

    return result;
  }

  async getByName(name: string) {
    const result = await prismaDB.permission.findFirst({ where: { name } });

    return result;
  }

  async update({ id, name, descrition, active }: IUpdatePermission) {
    const result = await prismaDB.permission.update({
      where: { id },
      data: {
        name,
        descrition,
        active,
      },
    });
    console.log(result);
    return result;
  }
}

export { PermissionsRepository };
