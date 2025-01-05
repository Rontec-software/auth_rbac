import { prismaDB } from "../lib/prisma";

class RbacRepository {
  async verifyUserPermission(userid: string, permissionName: string) {
    const userProfiles = await prismaDB.userProfile.findFirst({
      where: {
        userId: userid,
      },
    });

    if (!userProfiles?.profileId) return null;

    const permission = await prismaDB.permission.findFirst({
      where: {
        name: permissionName,
      },
    });

    if (!permission?.id) return null;

    const profilePermission = await prismaDB.profilePermission.findFirst({
      where: {
        profileId: userProfiles.profileId,
        permissionId: permission.id,
      },
    });

    if (!profilePermission) return null;

    return true;
  }
}

export { RbacRepository };
