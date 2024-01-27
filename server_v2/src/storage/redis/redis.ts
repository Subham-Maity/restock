import Redis from "ioredis";

const redisClient: Redis = new Redis({
  host: "localhost",
  port: 6379,
});

export default redisClient;
