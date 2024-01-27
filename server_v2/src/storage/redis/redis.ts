import Redis from "ioredis";

const redisClient: Redis = new Redis({
  host: "redis",
  port: 6379,
});

export default redisClient;
