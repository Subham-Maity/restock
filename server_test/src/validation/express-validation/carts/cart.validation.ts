import { check } from "express-validator";

export const cartValidationRules = [
  check("product").notEmpty().withMessage("Product is required"),
];
export const cartUserValidationRules = [
  check("user").notEmpty().withMessage("User is required"),
];

export const cartIdValidationRules = [
  check("id").notEmpty().withMessage("Cart ID is required"),
];
export const cartUpdateValidationRules = [
  check("id").notEmpty().withMessage("Cart ID is required"),
];
