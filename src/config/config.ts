const serviceConfigs = {
  port: process.env.PORT || 3000,
  env: process.env.ENV_NAME || 'local',
  secret: process.env.JWT_KEY || 'secret'
}

const redisConfigs = {
  port: process.env.REDIS_PORT || 6379,
  host: process.env.REDIS_HOST || '0.0.0.0',
  expiry: process.env.REDIS_EXPIRY || 60
};

export { serviceConfigs, redisConfigs };