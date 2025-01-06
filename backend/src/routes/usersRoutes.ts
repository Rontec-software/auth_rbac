import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { rbacMiddleware } from "../middlewares/rbacMiddleware";

class UsersRoutes {
  private router: Router;
  private controller: UsersController;

  constructor() {
    this.router = Router();
    this.controller = new UsersController();
  }

  getRoutes() {
    this.router.post("/register", this.controller.create.bind(this.controller));
    this.router.put(
      "/rename",
      authMiddleware,
      rbacMiddleware("update_user"),
      this.controller.rename.bind(this.controller)
    );
    this.router.put(
      "/password",
      authMiddleware,
      rbacMiddleware("update_user"),
      this.controller.updatePassword.bind(this.controller)
    );
    this.router.get(
      "/profile",
      authMiddleware,
      rbacMiddleware("read_profile"),
      this.controller.getProfile.bind(this.controller)
    );

    return this.router;
  }
}

export { UsersRoutes };
