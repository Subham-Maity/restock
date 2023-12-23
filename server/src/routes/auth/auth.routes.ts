import * as express from "express";
import {Router} from "express";
import {checkUser, createUser, loginUser} from "../../controller/auth/auth.controller.js";
import passport from "passport";

const router: Router = express.Router();

router
    .post("/signup", createUser)
    .post("/login", passport.authenticate("local"), loginUser)
    .get('/check',passport.authenticate('jwt'), checkUser);


export default router;