import * as express from "express";

import {Router} from "express";
import {fetchCategory} from "../../controller/category/category.controller.js";


const router: Router = express.Router();


router.get("/", fetchCategory);


export default router;