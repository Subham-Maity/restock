import { z } from "zod";
// Define the schema for an order item
const OrderItemSchema = z.object({
  product: z.object({
    id: z.string(),
  }),
  quantity: z.number(),
});

// Define the schema for creating an order
export const CreateOrderSchema = z.object({
  items: z.array(OrderItemSchema).nonempty("At least one item is required."),
  totalAmount: z.number().optional(),
  totalItems: z.number().optional(),
  user: z.string().uuid("Invalid User ID."),
  paymentMethod: z.enum(["card", "cash"]),
  paymentStatus: z.string().default("pending"),
  status: z.string().default("pending"),
  selectedAddress: z
    .array(z.unknown())
    .nonempty("At least one address is required."),
});

export const productValidationRules = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  images: z.array(z.string()).min(1, "Images must be an array"),
});
