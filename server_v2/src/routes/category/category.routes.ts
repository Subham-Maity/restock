import * as express from "express";
import { Router } from "express";
import {createCategory, fetchCategory} from "../../controller/category/category.controller";


const category: Router = express.Router();

category.post("/categories", createCategory).get("/categories", fetchCategory);

export default category;
