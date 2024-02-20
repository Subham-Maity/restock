export const isProduction = process.env.NODE_ENV === "production";

export const redis_port = 6379;

export const prod_docker_redis_host = "redis";
export const prod_without_docker_redis_host = "localhost";
export const redis_host = isProduction
  ? prod_without_docker_redis_host
  : "localhost";
