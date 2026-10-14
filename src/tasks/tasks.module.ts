import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module.js';
import { TasksController } from './tasks.controller.js';
import { TasksService } from './tasks.service.js';

/**
 * Tasks feature module.
 * Demonstrates Modules.
 *
 * Imports AuthModule so the AuthGuard can be used on protected routes.
 * Exports TasksService so other modules can use it if needed.
 */
@Module({
  imports: [AuthModule],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
