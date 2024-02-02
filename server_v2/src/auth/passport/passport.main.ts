// passport.ts
import { Strategy as JwtStrategy } from "passport-jwt";
import passport from "passport";
import passportLocal from "passport-local";
import { JWT_EXPIRATION_TIME, JWT_SECRET_KEY } from "../../config/default";
import { verifyPassword } from "../hash/crypto/verify.password.utils";
import { Application } from "express";
import { opts } from "../../services/extractor/jwt/option.utils";
import { sanitizeUser } from "../../services/sanitize/sanitize.utils";
import { IUser } from "../../types/user/user";
import {
  findUserByEmail,
  findUserById_Token,
} from "../../controller/user/model-control/user.model.controller";
import { signPayload } from "../jwt/sign.utils";

const passportSetup = (app: Application) => {
  //Initialize passport and session
  app.use(passport.authenticate("session"));

  //Passport for authentication and session management - Local Strategy
  const LocalStrategy = passportLocal.Strategy;

  //Passport for authentication and session management - JWT Strategy
  //Passport for authentication and session management - JWT Strategy
  passport.use(
    "local", // name of the strategy (used to authenticate requests)
    //we change the default usernameField from "username" to "email"
    new LocalStrategy({ usernameField: "email" }, async function (
      email,
      password,
      done,
    ) {
      try {
        //Find the user associated with the email provided by the user
        const user = await findUserByEmail(email);

        //If the user isn't found in the database, return a message
        if (!user) {
          return done(null, false, { message: "invalid credentials" });
        }

        //Verify the password and if it doesn't match, return a message
        const isPasswordValid = await verifyPassword(password, user);

        //If the password doesn't match, return a message
        if (!isPasswordValid) {
          return done(null, false, { message: "invalid credentials" });
        }

        // If credentials are correct, pass a user object to signPayload function
        // to create a JWT token for the user and return the JWT token
        const token = signPayload(sanitizeUser(user), JWT_SECRET_KEY, {
          expiresIn: JWT_EXPIRATION_TIME,
        });
        done(null, { token });
      } catch (err) {
        done(err);
      }
    }),
  );

  //Passport for authentication and session management - JWT Strategy
  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      try {
        const user = await findUserById_Token(jwt_payload.id);
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

  //This is used to retrieve the user object based on the session variable (req.user)
  //and attach it to the request object as req.user
  passport.deserializeUser(function (user: IUser, cb) {
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default passportSetup;
