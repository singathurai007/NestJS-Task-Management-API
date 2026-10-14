import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { TaskStatus } from '../entities/task.entity.js';

/**
 * TaskStatus validation pipe.
 * Demonstrates Pipes.
 *
 * Validates that a provided status value is one of the allowed
 * TaskStatus enum members. Used on the PATCH /tasks/:id/status route.
 */
@Injectable()
export class TaskStatusValidationPipe
  implements PipeTransform<string, TaskStatus>
{
  private readonly allowedStatuses = Object.values(TaskStatus);

  transform(value: string, _metadata: ArgumentMetadata): TaskStatus {
    const upper = value?.toUpperCase();
    if (!this.allowedStatuses.includes(upper as TaskStatus)) {
      throw new BadRequestException(
        `"${value}" is not a valid status. Allowed: ${this.allowedStatuses.join(', ')}`,
      );
    }
    return upper as TaskStatus;
  }
}
