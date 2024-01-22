// passport.ts

import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import session from "express-session";
import passport from "passport";
import passportLocal from "passport-local";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import User from "../../model/user/user.model";
import { sanitizeUser } from "../../middleware/protected/protected";
import { SECRET_KEY, sessionSecret } from "../../config/default";

interface JwtStrategyOptions {
  jwtFromRequest: any;
  secretOrKey: string;
}

const passportSetup = (app: any) => {
  /*❗~~~~PASSPORT~~~~❗*/

  //JWT Options
  const opts: JwtStrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "SECRET_KEY",
  };

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
      // by default passport uses username
      try {
        const user = await User.findOne({ email: username });
        console.log(username, password, user);
        if (!user) {
          return done(null, false, { message: "invalid credentials" }); // for safety
        }
        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password, hashedPassword)) {
              return done(null, false, { message: "invalid credentials" });
            }
            const token = jwt.sign(sanitizeUser(user), SECRET_KEY);
            done(null, token); // this lines sends to serializer
          },
        );
      } catch (err) {
        done(err);
      }
    }),
  );

  passport.use(
    "jwt",
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log({ jwt_payload });
      try {
        const user = await User.findOne({ id: jwt_payload.sub });
        if (user) {
          return done(null, sanitizeUser(user)); // this calls serializer
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
  passport.deserializeUser(function (user: any, cb) {
    console.log("de-serialize", user);
    process.nextTick(function () {
      return cb(null, user);
    });
  });
};

export default passportSetup;
