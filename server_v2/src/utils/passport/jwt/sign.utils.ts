// jwt.utils.ts
import jwt from "jsonwebtoken";
import { IUser } from "../../../types/user/user";
import { SECRET_KEY } from "../../../config/default";
import { sanitizeUser } from "../sanitize/sanitize.utils";

export const signUser = (user: IUser) => {
  return jwt.sign(sanitizeUser(user), SECRET_KEY);
};
