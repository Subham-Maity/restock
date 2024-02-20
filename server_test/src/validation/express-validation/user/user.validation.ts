import { check } from "express-validator";

// Input validation rules
export const userUpdateValidationRules = [
  check("name").optional().notEmpty().withMessage("Name cannot be empty"),
  check("email")
    .optional()
    .isEmail()
    .withMessage("Must be a valid email address"),
];
