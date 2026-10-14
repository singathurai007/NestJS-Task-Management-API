import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller.js';
import { AuthGuard } from './auth.guard.js';
import { AuthService } from './auth.service.js';

/**
 * Auth feature module.
 * Demonstrates Modules + Dependency Injection.
 *
 * Exports AuthService and AuthGuard so other modules can reuse them.
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
