import {
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { HelloController } from './hello.controller.js';
import { AuthModule } from './auth/auth.module.js';
import { TasksModule } from './tasks/tasks.module.js';
import configuration from './config/configuration.js';
import { LoggerMiddleware } from './common/middleware/logger.middleware.js';

/**
 * Root application module.
 * Demonstrates Modules + Configuration Management + Middleware.
 *
 * - Registers ConfigModule globally with a custom configuration factory
 * - Imports feature modules (AuthModule, TasksModule)
 * - Applies LoggerMiddleware to all routes via configure()
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AuthModule,
    TasksModule,
  ],
  controllers: [AppController, HelloController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
