import { Router } from "express";
import { rbacMiddleware } from "../middlewares/rbacMiddleware";
import { authMiddleware } from "../middlewares/authMiddleware";
import { ProfilesController } from "../controllers/ProfilesController";

class ProfilesRoutes {
  private router: Router;
  private controller: ProfilesController;

  constructor() {
    this.router = Router();
    this.controller = new ProfilesController();
  }

  getRoutes() {
    this.router.delete(
      "/:id",
      authMiddleware,
      rbacMiddleware("update_profile"),
      this.controller.delete.bind(this.controller)
    );

    this.router.get(
      "/",
      authMiddleware,
      rbacMiddleware("read_profile"),
      this.controller.getAll.bind(this.controller)
    );

    this.router.get(
      "/:id",
      authMiddleware,
      rbacMiddleware("read_profile"),
      this.controller.getById.bind(this.controller)
    );

    this.router.post(
      "/",
      authMiddleware,
      rbacMiddleware("create_profile"),
      this.controller.create.bind(this.controller)
    );

    this.router.put(
      "/:id",
      authMiddleware,
      rbacMiddleware("update_profile"),
      this.controller.update.bind(this.controller)
    );

    return this.router;
  }
}

export { ProfilesRoutes };
