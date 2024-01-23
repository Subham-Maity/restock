import { Response } from "express";

export const setCookie = (
  res: Response,
  name: string,
  token: string,
  cookieOptions: Record<string, any> = {},
) => {
  res.cookie(name, token, {
    ...cookieOptions,
  });
};
