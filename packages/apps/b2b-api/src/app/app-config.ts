import { ConfigType, registerAs } from '@nestjs/config';

export const mongoConfig = registerAs('mongo', () => {
  if (!process.env.MONGODB_HOST || !process.env.MONGODB_PORT) {
    throw new Error('MongoDB host or port is not provided in the environment');
  }
  return {
    host: process.env.MONGODB_HOST,
    port: parseInt(process.env.MONGODB_PORT, 10),
  };
});

export type MongoConfig = ConfigType<typeof mongoConfig>;

export const redisConfig = registerAs('redis', () => {
  if (!process.env.REDIS_HOST || !process.env.REDIS_PORT) {
    throw new Error('Redis host or port is not provided in the environment');
  }
  return {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT, 10),
  };
});

export type RedisConfig = ConfigType<typeof redisConfig>;
