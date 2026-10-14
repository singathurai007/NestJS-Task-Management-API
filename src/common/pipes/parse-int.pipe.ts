import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * Custom ParseInt pipe.
 * Demonstrates Pipes.
 *
 * Transforms a route parameter string into an integer. Throws
 * BadRequestException if the value is not a valid integer.
 */
@Injectable()
export class ParseIntPipe implements PipeTransform<string, number> {
  transform(value: string, metadata: ArgumentMetadata): number {
    const parsed = parseInt(value, 10);
    if (isNaN(parsed)) {
      throw new BadRequestException(
        `Validation failed: "${value}" is not a valid integer for parameter "${metadata.data}"`,
      );
    }
    return parsed;
  }
}
