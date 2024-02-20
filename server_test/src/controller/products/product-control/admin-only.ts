//Use for admin if admin is true then show all products including deleted products
import { Request } from "express";
import { QueryParams } from "../../../types/products/QueryParam";

export const buildCondition = (req: Request<{}, {}, {}, QueryParams>) => {
  let condition: any = {};
  if (!req.query.admin) {
    condition.deleted = { $ne: true };
  }
  return condition;
};
