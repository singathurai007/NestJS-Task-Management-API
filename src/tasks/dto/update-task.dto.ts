import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskDto } from './create-task.dto.js';

/**
 * UpdateTask DTO.
 * Reuses CreateTaskDto validation rules but makes every field
 * optional, thanks to PartialType from @nestjs/mapped-types.
 */
export class UpdateTaskDto extends PartialType(CreateTaskDto) {}
