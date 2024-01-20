import * as express from "express";
import { Router } from "express";

import passport from "passport";
import {checkUser, createUser, loginUser} from "../../controller/auth/auth.controller";

const auth: Router = express.Router();

auth
  .post("/auth/signup", createUser)
  .post("/auth/login", passport.authenticate("local"), loginUser)
  .get("/auth/check", passport.authenticate("jwt"), checkUser);

export default auth;
