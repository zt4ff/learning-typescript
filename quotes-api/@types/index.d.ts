import { Request } from "express";
import session from "express-session";
import { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {

    interface Application {
      closeConnection: typeof import("mongoose")
    }
    interface Request {
      user: UserModel;
      authUser: any
    }
  }
  interface Session {
    token: string;
  }

  interface UserModel {
    username: string;
    quotes: Array<String>;
    password: string;
  }
}

declare module "jsonwebtoken" {
  interface JwtPayload {
    username: string;
  }
}

declare module "express-session" {
  interface Session {
    token: string;
  }
}
