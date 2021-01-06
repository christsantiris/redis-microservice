import Redis from "ioredis";
import { redisConfigs } from '../config/config';

export default class RedisWrapper {
  client: Redis;

  constructor() {
    this.client = new Redis(redisConfigs.port, redisConfigs.host);
    this.initializeClient()
  }

  initializeClient() {
    this.onConnect()
    this.onReconnecting()
    this.onEnd()
    this.onClose()
    this.onError()
  }

  onConnect() {
    (<any>this.client).on('connect', () => {
      console.log('Redis - Connected to Redis');
    });
  }

  onReconnecting() {
    (<any>this.client).on('reconnecting', () => {
      console.log('Redis - Reconnectng to Redis');
    });
  }

  onEnd() {
    (<any>this.client).on('end', () => {
      console.log('Redis - Connection Ending');
    });
  }

  onClose() {
    (<any>this.client).on('close', () => {
      console.log('Redis - Connection Closed');
    });
  }

  onError() {
    (<any>this.client).on('close', () => {
      console.log('Redis - Redis Error');
    });
  }
}
