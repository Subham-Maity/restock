import Redis from "ioredis";
import { redis_host, redis_port } from "./redis-config";

const redisClient: Redis = new Redis({
  host: redis_host,
  port: redis_port,
});

export default redisClient;
