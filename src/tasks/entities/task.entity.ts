/**
 * Task entity (domain model).
 * In a real app this would be a TypeORM / Prisma model.
 * Here we keep it as a plain interface for the in-memory store.
 */
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
}
