// user.interface.ts
import { Document } from "mongoose";

export interface IUser extends Document {
  id?: any;
  email: string;
  password: any;
  role: any;
  addresses?: Array<any>;
  name?: string;
  salt?: any;
  resetPasswordToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
  orders?: Array<any>;
  token?: any;
}
