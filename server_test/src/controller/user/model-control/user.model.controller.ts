// Function to find a user by ID
import { IUser } from "../../../types/user/user";
import User from "../../../model/user/user.model";
// 💾 Function to find a user by ID
export const findUserById = async (id: string): Promise<IUser | null> => {
  try {
    return await User.findById(id);
  } catch (error: any) {
    throw new Error(`Error finding user: ${error.message}`);
  }
};

// 💾 Function to update a user
export const updateUserById = async (
  id: string,
  updateData: Record<string, any>,
): Promise<IUser | null> => {
  try {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  } catch (error: any) {
    throw new Error(`Error updating user: ${error.message}`);
  }
};

//Use it for finding user by email
export const findUserByEmail = async (email: string): Promise<IUser | null> => {
  return User.findOne({ email: email });
};

//Use it for finding user by id
export const findUserById_Token = async (id: string): Promise<IUser | null> => {
  return User.findById(id);
};
