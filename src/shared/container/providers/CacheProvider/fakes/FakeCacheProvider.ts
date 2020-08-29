import ICacheProvider from '../models/ICacheProvider';

interface ICacheData {
  [key: string]: string;
}

class FakeCacheProvider implements ICacheProvider {
  private cache: ICacheData;

  public async save(key: string, value: any): Promise<void> {
    this.cache[key] = JSON.stringify(value);
  }

  public async recover<T>(key: string): Promise<T | undefined> {
    const data = this.cache[key];

    if (!data) {
      return undefined;
    }
    const parsedData = JSON.parse(data) as T;

    return parsedData;
  }
}

export default FakeCacheProvider;
