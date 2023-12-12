import * as express from "express";
import {Router} from "express";
import {createUser, loginUser} from "../../controller/auth/auth.controller.js";

const router: Router = express.Router();

router
    .post("/signup", createUser)
    .post("/login", loginUser);


export default router;