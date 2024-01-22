import User from "../../../model/user/user.model";
import { IUser } from "../../../types/user/user";

//Use it for finding user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email: email });
};

//Use it for finding user by id
export const findUserById = async (id: string): Promise<IUser | null> => {
  return User.findOne({ id: id });
};
