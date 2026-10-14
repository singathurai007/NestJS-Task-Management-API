import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { TaskStatus } from '../entities/task.entity.js';

/**
 * CreateTask DTO.
 * Demonstrates DTOs + Validation via class-validator decorators.
 * The global ValidationPipe enforces these rules on incoming bodies.
 */
export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  @IsOptional()
  status?: TaskStatus;
}
