import { prismaDB } from "../lib/prisma";

class RbacRepository {
  async getPermission(user: string, permissionName: string) {
    const userProfiles = await prismaDB.userProfile.findFirst({
      where: {
        userId: user,
      },
    });

    if (!userProfiles?.profileId) return null;

    const permission = await prismaDB.permition.findFirst({
      where: {
        name: permissionName,
      },
    });

    if (!permission?.id) return null;

    const profilePermission = await prismaDB.profilePermition.findFirst({
      where: {
        profileId: userProfiles.profileId,
        permitionId: permission.id,
      },
    });

    if (!profilePermission) return null;

    return true;
  }
}

export { RbacRepository };
