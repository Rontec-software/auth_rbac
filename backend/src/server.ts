import "express-async-errors";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { NotFoundError } from "./helpers/api-errors";
import { errorMiddleware } from "./middlewares/error";
import { UsersRoutes } from "./routes/usersRoutes";
import { AuthRoutes } from "./routes/authRoutes";
import { PermissionsRoutes } from "./routes/permissionsRoutes";
import { ProfilesRoutes } from "./routes/profilesRoutes";

dotenv.config();

const port = process.env.PORT || 3000;
const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

const authRoutes = new AuthRoutes().getRoutes();
const usersRoutes = new UsersRoutes().getRoutes();
const permissionsRoutes = new PermissionsRoutes().getRoutes();
const profilesRoutes = new ProfilesRoutes().getRoutes();

server.use("/auth", authRoutes);
server.use("/users", usersRoutes);
server.use("/permissions", permissionsRoutes);
server.use("/profiles", profilesRoutes);

server.use((req: Request, res: Response) => {
  throw new NotFoundError("Endpoint not found");
});

server.use(errorMiddleware);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
