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
    return this.router;
  }
}

export { AuthRoutes };
