// jwt.utils.ts
import jwt, { SignOptions } from "jsonwebtoken";

export const signPayload = (
  payload: Record<string, any>,
  secret: string,
  options: SignOptions = {},
): string => {
  try {
    return jwt.sign(payload, secret, options);
  } catch (error: any) {
    throw new Error(`Error signing token: ${error.message}`);
  }
};
