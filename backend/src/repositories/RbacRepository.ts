import { prismaDB } from "../lib/prisma";

class RbacRepository {
  async verifyUserPermission(userid: string, permissionName: string) {
    const userProfiles = await prismaDB.userProfile.findMany({
      where: {
        userId: userid,
      },
    });

    if (!userProfiles) return null;

    const permission = await prismaDB.permission.findFirst({
      where: {
        name: permissionName,
      },
    });

    if (!permission?.id) return null;

    for (const userProfile of userProfiles) {
      const profilePermission = await prismaDB.profilePermission.findFirst({
        where: {
          profileId: userProfile.profileId,
          permissionId: permission.id,
        },
      });

      if (profilePermission) return true;
    }

    return null;
  }
}

export { RbacRepository };
