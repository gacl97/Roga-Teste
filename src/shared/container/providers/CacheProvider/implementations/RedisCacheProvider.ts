import Redis, { Redis as RedisClientType } from 'ioredis';

import CacheConfig from '@config/redis';
import ICacheProvider from '../models/ICacheProvider';

class RedisCacheProvider implements ICacheProvider {
  private client: RedisClientType;

  constructor() {
    this.client = new Redis(CacheConfig.config);
  }

  public async save(key: string, value: any): Promise<void> {
    this.client.set(key, JSON.stringify(value));
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const data = await this.client.get(key);

    if (!data) {
      return undefined;
    }

    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}

export default RedisCacheProvider;
