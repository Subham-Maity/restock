import bcrypt from "bcrypt";
import { IUser } from "../../../src/types/user/user";

export const verifyPassword = async (
  password: string,
  user: IUser,
): Promise<boolean> => {
  const match = await bcrypt.compare(password, user.password);
  return await bcrypt.compare(password, user.password);
};
