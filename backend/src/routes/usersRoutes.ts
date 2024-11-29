import { Request, Response, Router } from "express";
import { UsersController } from "../controllers/UsersController";

class UsersRoutes {
  private router: Router;
  private controller: UsersController;

  constructor() {
    this.router = Router();
    this.controller = new UsersController();
  }

  getRoutes() {
    this.router.post("/register", this.controller.create.bind(this.controller));
    return this.router;
  }
}

export { UsersRoutes };
