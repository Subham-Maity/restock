export const isProduction = process.env.NODE_ENV === "production";

export const redis_port = 6379;

export const redis_host = isProduction ? "redis" : "localhost";
