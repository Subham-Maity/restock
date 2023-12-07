import * as express from "express";
import { createProduct } from "../../controller/product.controller.js";
import { fetchProduct } from "../../controller/product.controller.js";
const router = express.Router();
router.post('/', createProduct).get('/', fetchProduct);
export default router;
//# sourceMappingURL=product.router.js.map