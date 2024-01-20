import * as express from "express";
import { Router } from "express";
import {createBrand, fetchBrand} from "../../controller/brand/brand.controller";


const brand: Router = express.Router();

brand.post("/brands", createBrand).get("/brands", fetchBrand);

export default brand;
