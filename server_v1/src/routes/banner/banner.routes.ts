import * as express from "express";
// import {createProduct, fetchProductById, updateProduct} from "../../controller/products/product.controller.js"
// import {fetchProduct} from "../../controller/products/product.controller.js"
import {fetchBanner, updateBanner} from "../../controller/banner/banner.controller.js"
import {Router} from "express";


const router: Router = express.Router();

router
    .post('/', updateBanner)
    .get('/', fetchBanner)


export default router;