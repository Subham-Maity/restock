import * as express from "express";
import {createBrand, fetchBrand} from "../../controller/brand/brand.controller.js"
import {Router} from "express";


const router: Router = express.Router();


router
    .post("/", createBrand)
    .get("/", fetchBrand);


export default router;