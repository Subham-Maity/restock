import redisClient from "./redis";

// Function to get a value from Redis based on a key
export const getFromRedis = async (key: string) => {
  const result = await redisClient.get(key);
  return result ? JSON.parse(result) : null;
};

// Function to set a key-value pair in Redis with an expiration time
export const setInRedis = async (
  key: string,
  value: any,
  expireTimeInSeconds: number,
) => {
  await redisClient.set(key, JSON.stringify(value), "EX", expireTimeInSeconds);
};

// Function to generate a unique key for each request
export const generateUniqueKey = (
  condition: any,
  query: any,
  baseKey: string,
) => {
  return `${baseKey}:${JSON.stringify(condition)}:${JSON.stringify(query)}`;
};
