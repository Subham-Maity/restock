import { check } from "express-validator";

// Input validation rules
export const categoryValidationRules = [
  check("label").notEmpty().withMessage("Label is required"),
  check("value").notEmpty().withMessage("Value is required"),
];
