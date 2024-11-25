import express, { Application } from "express";
import { Request, Response } from "express";
import routes from "./routes";

const app: Application = express();
const port: number = 3000;

app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Olá, mundo!");
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
