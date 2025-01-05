import { RbacRepository } from "../repositories/RbacRepository";

class RbacServices {
  private repository: RbacRepository;

  constructor() {
    this.repository = new RbacRepository();
  }

  async havePermission(user: string, permissionName: string) {
    const permission = await this.repository.getPermission(
      user,
      permissionName
    );

    if (!permission) return false;

    return true;
  }
}

export { RbacServices };
