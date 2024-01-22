// passport.ts
import { Strategy as JwtStrategy } from "passport-jwt";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import { sessionSecret } from "../../config/default";
import { findUserByEmail, findUserById } from "./Db/userDb";
import { verifyPassword } from "./security/password.utils";
import { signUser } from "./jwt/sign.utils";

import { Application } from "express";
import { opts } from "./jwt/option.utils";
import { sanitizeUser } from "./sanitize/sanitize.utils";
import { IUser } from "../../types/user/user";

const passportSetup = (app: Application) => {
  //Passport for authentication
  app.use(
    session({
      secret: sessionSecret,
      resave: false, // don't save session if unmodified
      saveUninitialized: false, // don't create session until something stored
    }),
  );

  app.use(passport.authenticate("session"));
  const LocalStrategy = passportLocal.Strategy;

  passport.use(
    "local",
    new LocalStrategy(async function (username, password, done) {
      try {
        const user = await findUserByEmail(username);
        if (!user) {
          return done(null, false, { message: "invalid credentials" });
        }
        const isPasswordValid = await verifyPassword(password, user);
        if (!isPasswordValid) {
          return done(null, false, { message: "invalid credentials" });
        }
        const token = signUser(user);
        done(null, token);
      } catch (err) {
        done(err);
      }
    }),
  );

  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await findUserById(jwt_payload.sub);
        if (user) {
          return done(null, sanitizeUser(user));
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    }),
  );

  //This creates a session variable for the user (req.user) when the first time user logs in
  passport.serializeUser(function (user: any, cb) {
    process.nextTick(function () {
      return cb(null, { id: user.id, role: user.role });
    });
  });
  passport.deserializeUser(function (user: IUser, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default passportSetup;
