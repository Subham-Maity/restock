import * as express from "express";


import {fetchBrand} from "../../controller/brand/brand.controller.js"
import {Router} from "express";


const router: Router = express.Router();


router.get("/", fetchBrand);


export default router;