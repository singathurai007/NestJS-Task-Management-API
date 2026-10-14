import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import { AppModule } from './app.module.js';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter.js';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor.js';
import { TransformInterceptor } from './common/interceptors/transform.interceptor.js';

/**
 * Application bootstrap.
 * Demonstrates NestJS fundamentals:
 *  - Creates the app from AppModule
 *  - Sets a global API prefix from configuration
 *  - Registers a global ValidationPipe (DTO validation)
 *  - Registers a global exception filter
 *  - Registers global interceptors (logging + response transform)
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const apiPrefix = configService.get<string>('apiPrefix') ?? 'api';
  app.setGlobalPrefix(apiPrefix);

  // Global validation pipe — validates all DTOs via class-validator
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip unknown properties
      forbidNonWhitelisted: true, // reject unknown properties
      transform: true, // auto-transform payloads to DTO instances
    }),
  );

  // Global exception filter
  const httpAdapterHost = app.get(HttpAdapterHost) as unknown as HttpAdapterHost;
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapterHost));

  // Global interceptors
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  const port = configService.get<number>('port') ?? 3000;
  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(
    `${configService.get<string>('appName')} running on http://localhost:${port}/${apiPrefix}`,
  );
}

bootstrap();
