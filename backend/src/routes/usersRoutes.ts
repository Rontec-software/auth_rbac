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
    this.router.get(
      "/",
      authMiddleware,
      rbacMiddleware("read_user"),
      this.controller.getAll.bind(this.controller)
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
