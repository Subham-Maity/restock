import * as express from "express";

import {createProduct} from "../../controller/products/product.controller.js"
import {fetchProduct} from "../../controller/products/product.controller.js"
import {Router} from "express";

const router: Router = express.Router();

router.post('/', createProduct).get('/', fetchProduct);


export default router;