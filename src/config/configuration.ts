/**
 * Custom configuration factory.
 * Demonstrates Configuration Management using @nestjs/config.
 *
 * Loads environment variables into a typed configuration object
 * so the rest of the app accesses config via ConfigService.
 */
export default () => ({
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
  appName: process.env.APP_NAME || 'NestJS Task API',
  apiPrefix: process.env.API_PREFIX || 'api',
  database: {
    type: process.env.DB_TYPE || 'memory',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'super-secret-dev-key',
    tokenTtl: parseInt(process.env.TOKEN_TTL || '3600', 10),
  },
});
