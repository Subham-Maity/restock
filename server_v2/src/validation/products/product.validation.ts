import { check } from "express-validator"; // Input validation rules

// Input validation rules
export const productValidationRules = [
  check("title").notEmpty().withMessage("Title is required"),
  check("description").notEmpty().withMessage("Description is required"),
  check("brand").notEmpty().withMessage("Brand is required"),
  check("category").notEmpty().withMessage("Category is required"),
  check("thumbnail").notEmpty().withMessage("Thumbnail is required"),
  check("images").isArray().withMessage("Images must be an array"),
];
