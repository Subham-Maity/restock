import * as express from "express";

import {createProduct} from "../../controller/product.controller.js"
import {fetchProduct} from "../../controller/product.controller.js"
import {Router} from "express";

const router: Router = express.Router();

router.post('/products', createProduct);
router.get('/products/:id', fetchProduct);


export default router;