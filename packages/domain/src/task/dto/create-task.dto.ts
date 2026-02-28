export interface CreateTaskDTO {
  title: string;
  description?: string;
  projectId: string;
  priority?: string;
  dueDate?: Date;
}
