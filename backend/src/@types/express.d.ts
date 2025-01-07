import { ILoggedUser } from "../interfaces/LoggedUserInterface";

declare global {
  namespace Express {
    export interface Request {
      user: ILoggedUser;
    }
  }
}
