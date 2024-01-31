import * as express from "express";
import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  fetchAllOrders,
  fetchOrdersByUser,
  updateOrder,
} from "../../controller/order/order.controller";
import { validate } from "../../middleware/zod/zod";
import { UpdateOrderSchema } from "../../validation/zod-validation/order/order.validation";

const order: Router = express.Router();

order
  .post("/", createOrder)
  .get("/own", fetchOrdersByUser)
  .delete("/:id", deleteOrder)
  .patch("/:id", validate(UpdateOrderSchema), updateOrder)
  .get("/", fetchAllOrders);

export default order;
