import * as express from "express";
import {Router} from "express";
import {createUser} from "../../controller/auth/auth.controller.js";

const router: Router = express.Router();

router.post("/", createUser);


export default router;