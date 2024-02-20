"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateOrderSchema = void 0;
const zod_1 = require("zod");
//TODO: Define the schema for an order item
// // Define the schema for an order item
// const OrderItemSchema = z.object({
//   product: z.object({
//     id: z.string(),
//   }),
//   quantity: z.number(),
// });
//
// // Define the schema for creating an order
// export const CreateOrderSchema = z.object({
//   items: z.array(OrderItemSchema).nonempty("At least one item is required."),
//   totalAmount: z.number().optional(),
//   totalItems: z.number().optional(),
//   user: z.string().uuid("Invalid User ID."),
//   paymentMethod: z.enum(["card", "cash"]),
//   paymentStatus: z.string().default("pending"),
//   status: z.string().default("pending"),
//   selectedAddress: z
//     .array(z.unknown())
//     .nonempty("At least one address is required."),
// });
// Define the schema for updating an order
exports.UpdateOrderSchema = zod_1.z.object({
    status: zod_1.z
        .enum(["pending", "dispatched", "delivered", "cancelled"])
        .optional(),
});
