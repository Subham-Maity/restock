import { z } from "zod";

export const productValidationRules = z.object({
  title: z
    .string()
    .min(1, "A title-less product? That's like a pizza without cheese! 🍕")
    .max(100, "Whoa, keep the title short! It's not a novel! 📚"),
});
