import { PrismaClient } from "@prisma/client";

class RbacRepository {
  async verifyUserPermission(userid: string, permissionName: string) {
    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        AND: [
          { id: userid, active: true },
          {
            profiles: {
              some: {
                profile: {
                  permissions: {
                    some: {
                      permission: { name: permissionName, active: true },
                    },
                  },
                },
              },
            },
          },
        ],
      },
    });

    return !!user;
  }
}

export { RbacRepository };