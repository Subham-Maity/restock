// isAdmin.ts
import { NextFunction, Request, Response } from "express";
import { sanitizeUser } from "../sanitize/sanitize.utils";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = sanitizeUser(req.user);
  if (user && user.role === "admin") {
    console.log(user.role + "User is an admin");
    next();
  } else {
    res
      .status(403)
      .json({ message: "Forbidden: You do not have sufficient permissions" });
  }
};
