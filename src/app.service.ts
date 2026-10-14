import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * App service.
 * Demonstrates Services + Dependency Injection + Configuration Management.
 *
 * Injects ConfigService to read application name from configuration.
 */
@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}

  getHello(): string {
    return 'Hello World!';
  }

  /**
   * Returns application metadata read from configuration.
   */
  getAppInfo() {
    return {
      name: this.configService.get<string>('appName'),
      environment: this.configService.get<string>('env'),
      version: '1.0.0',
    };
  }
}
