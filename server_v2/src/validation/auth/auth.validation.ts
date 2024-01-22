import { check } from "express-validator";

export const userRegistrationRules = [
  check("email").notEmpty().withMessage("Email is required"),
  check("password").notEmpty().withMessage("Password is required"),
];
