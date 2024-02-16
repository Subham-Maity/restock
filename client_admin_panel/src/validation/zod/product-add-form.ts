import { z } from "zod";
import { set_max_price, title_max_length } from "@/constant/constants";

export const productValidationRules = z.object({
  title: z
    .string()
    .min(1, "A title-less product? That's like a pizza without cheese! 🍕")
    .max(title_max_length, "Whoa, keep the title short! It's not a novel! 📚"),
  description: z
    .string()
    .min(
      1,
      "A product without a description is like a book without a cover! 📖",
    ),
  brand: z.string().min(1, "No brand? Is it a secret agent product? 🕵️‍♀️"),
  category: z
    .string()
    .min(1, "Category missing! It's like a fish out of water! 🐠"),
  thumbnail: z
    .string()
    .url("That doesn't look like a URL! It's like a fish on a bicycle! 🐠🚲"),
  images: z.array(
    z
      .string()
      .url("That doesn't look like a URL! It's like a fish on a bicycle! 🐠🚲"),
  ),
  price: z.coerce
    .number()
    .min(0, "Free stuff? Nice! But we need a price. 💰")
    .max(set_max_price, "Whoa, that's pricey! Is it made of gold? 🤑"),
  stock: z.coerce
    .number()
    .min(0, "Negative stock? Did we enter the Twilight Zone? 🌀")
    .max(1000, "That's a lot of stock! Are we opening a mall? 🏬"),
  discountPercentage: z.coerce
    .number()
    .min(0, "Negative discount? That's a surcharge in disguise! 🎭")
    .max(100, "100% discount? Everything is free! 🎉"),
});
