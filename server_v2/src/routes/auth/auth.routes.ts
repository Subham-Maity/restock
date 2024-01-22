import * as express from "express";
import { Router } from "express";

import passport from "passport";
import {
  checkUser,
  loginUser,
  registerUser,
} from "../../controller/auth/auth.controller";
import { userRegistrationRules } from "../../validation/auth/auth.validation";

const auth: Router = express.Router();

auth
  .post("/signup", userRegistrationRules, registerUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

export default auth;
