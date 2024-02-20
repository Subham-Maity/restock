import { IUser } from "../../../types/user/user";
import User from "../../../model/user/user.model";

export const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};
