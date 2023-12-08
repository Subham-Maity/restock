import * as express from "express";
import { createProduct } from "../../controller/products/product.controller.js";
import { fetchProduct } from "../../controller/products/product.controller.js";
const router = express.Router();
router.post('/', createProduct).get('/', fetchProduct);
export default router;
//# sourceMappingURL=product.router.js.map