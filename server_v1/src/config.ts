export const port: string | number = process.env.PORT || 5050;
export const timezone = process.env.TZ;

export const corsUrl = process.env.CORS_URL || "http://localhost:3000";

export const sessionSecret = process.env.SESSION_SECRET || "keyboard cat";
export const SECRET_KEY = process.env.SECRET_KEY || "SECRET_KEY";