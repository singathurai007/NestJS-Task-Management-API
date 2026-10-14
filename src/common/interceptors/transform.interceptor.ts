import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

/**
 * Transform interceptor.
 * Demonstrates Interceptors.
 *
 * Wraps every successful response in a standard envelope:
 *   { "statusCode": 200, "data": ... }
 * making the API response shape consistent.
 */
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, { statusCode: number; data: T }>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<{ statusCode: number; data: T }> {
    const statusCode = context.switchToHttp().getResponse().statusCode ?? 200;

    return next
      .handle()
      .pipe(map((data) => ({ statusCode, data })));
  }
}
