import * as express from "express";
import { createProduct } from "../../controller/product.controller.js";
const router = express.Router();
router.post('/products', createProduct);
export default router;
//# sourceMappingURL=product.router.js.map