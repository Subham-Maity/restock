import * as express from "express";
import {Router} from "express";
import {createCategory, fetchCategory} from "../../controller/category/category.controller.js";


const router: Router = express.Router();


router
    .post("/", createCategory)
    .get("/", fetchCategory);


export default router;