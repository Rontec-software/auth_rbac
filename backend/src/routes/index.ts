import { Router } from "express";
import { Request, Response } from "express";

const router: Router = Router();

router.get("/api/health", (req: Request, res: Response) => {
  res.json({ message: "API funcionando!" });
});

export default router;
