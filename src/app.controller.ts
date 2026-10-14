import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service.js';

/**
 * App controller.
 * Demonstrates Controllers + Dependency Injection.
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('info')
  getInfo() {
    return this.appService.getAppInfo();
  }
}
