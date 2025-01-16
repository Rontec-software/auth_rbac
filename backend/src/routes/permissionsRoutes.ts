import { Router } from "express";
import { PermissionsController } from "../controllers/PermissionsController";

import { rbacMiddleware } from "../middlewares/rbacMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";

class PermissionsRoutes {
  private router: Router;
  private controller: PermissionsController;

  constructor() {
    this.router = Router();
    this.controller = new PermissionsController();
  }

  getRoutes() {
    this.router.delete(
      "/:id",
      authMiddleware,
      rbacMiddleware("update_permission"),
      this.controller.delete.bind(this.controller)
    );

    this.router.get(
      "/",
      authMiddleware,
      rbacMiddleware("read_permission"),
      this.controller.getAllPermissions.bind(this.controller)
    );

    this.router.get(
      "/:id",
      authMiddleware,
      rbacMiddleware("read_permission"),
      this.controller.getPermissionById.bind(this.controller)
    );

    this.router.post(
      "/",
      authMiddleware,
      rbacMiddleware("create_permission"),
      this.controller.create.bind(this.controller)
    );

    this.router.put(
      "/:id",
      authMiddleware,
      rbacMiddleware("update_permission"),
      this.controller.update.bind(this.controller)
    );

    return this.router;
  }
}

export { PermissionsRoutes };
