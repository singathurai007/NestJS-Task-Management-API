import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

/**
 * Logger middleware.
 * Demonstrates Middleware.
 *
 * Runs before route handlers. Logs the incoming request method,
 * path, and the resolved status code after the response finishes.
 */
@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl } = req;
    const start = Date.now();

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.logger.log(
        `[Middleware] ${method} ${originalUrl} -> ${res.statusCode} (${duration}ms)`,
      );
    });

    next();
  }
}
