import { RbacRepository } from "../repositories/RbacRepository";

class RbacServices {
  private repository: RbacRepository;

  constructor() {
    this.repository = new RbacRepository();
  }

  async havePermission(userid: string, permissionName: string) {
    const permission = await this.repository.verifyUserPermission(
      userid,
      permissionName
    );

    if (!permission) return false;

    return true;
  }
}

export { RbacServices };
