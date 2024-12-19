import express, { Request, Response, NextFunction } from "express";

import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import { UsersRoutes } from "./routes/usersRoutes";

dotenv.config();

const port = process.env.PORT || 3000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const usersRoutes = new UsersRoutes().getRoutes();

server.use("/users", usersRoutes);

server.use((req: Request, res: Response) => {
  res.status(404);
  res.json({ error: "Endpoint não encontrado." });
});

server.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return resp.status(400).json({
      message: err.message,
    });
  }

  return resp.status(500).json({ message: "Internal Server Error" });
  console.log(err);
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
