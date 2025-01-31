import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

class AuthRoutes {
  private router: Router;
  private controller: AuthController;

  constructor() {
    this.router = Router();
    this.controller = new AuthController();
  }

  getRoutes() {
    this.router.post("/login", this.controller.login.bind(this.controller));
    this.router.post("/recover-password", this.controller.recoverPassword.bind(this.controller));
    this.router.post("/reset-password", this.controller.resetPassword.bind(this.controller));
    return this.router;
  }
}

export { AuthRoutes };
