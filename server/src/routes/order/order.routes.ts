import * as express from "express";
import {Router} from "express";
import {
    createOrder,
    deleteOrder,
    fetchAllOrders,
    fetchOrdersByUser,
    updateOrder
} from "../../controller/order/order.controller.js";


const router: Router = express.Router();


router.post('/', createOrder)
    .get('/user/:userId', fetchOrdersByUser)
    .delete('/:id', deleteOrder)
    .patch('/:id', updateOrder)
    .get('/',fetchAllOrders)


export default router;