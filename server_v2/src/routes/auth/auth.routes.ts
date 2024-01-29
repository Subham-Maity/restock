import * as express from "express";
import { Router } from "express";

import passport from "passport";
import {
  checkUser,
  loginUser,
  registerUser,
} from "../../controller/auth/auth.controller";
import { RegisterSchema } from "../../validation/zod-validation/auth/auth.validation";
import { validate } from "../../middleware/zod/zod";

const auth: Router = express.Router();

auth
  .post("/signup", validate(RegisterSchema), registerUser)
  .post("/login", passport.authenticate("local"), loginUser)
  .get("/check", passport.authenticate("jwt"), checkUser);

export default auth;
