import * as express from "express";
import {Router} from "express";
import {fetchUserById, updateUser} from "../../controller/user/user.controller.js";


const router: Router = express.Router();


router
    .get("/:id", fetchUserById)
    .patch("/:id", updateUser);


export default router;