import { z } from "zod";

export const productValidationRules = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  brand: z.string().min(1, "Brand is required"),
  category: z.string().min(1, "Category is required"),
  thumbnail: z.string().min(1, "Thumbnail is required"),
  images: z.array(z.string()).min(1, "Images must be an array"),
});
