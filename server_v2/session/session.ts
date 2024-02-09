import session from "express-session";
import MongoStore from "connect-mongo";
import { Application } from "express";
import config from "../config/default";
import { Passport_Session_Secret } from "../auth/passport/passport.setting";

export const configureSession = (app: Application) => {
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.db,
      }),
      secret: Passport_Session_Secret,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, //don't create session until something stored
    }),
  );
};
