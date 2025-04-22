
import { v4 as uuidv4 } from 'uuid';
import { 
  TaskConfiguration, 
  TaskPriority, 
  TaskPlatform, 
  TaskType 
} from '@/lib/task-models';

export class TaskCreator {
  createTask(
    name: string,
    description: string,
    type: TaskType,
    platform: TaskPlatform,
    priority: TaskPriority,
    parameters: Record<string, any> = {},
    dependencies: string[] = [],
    maxRetries: number = 3,
    timeout: number = 300000
  ): TaskConfiguration {
    return {
      id: uuidv4(),
      name,
      description,
      type,
      platform,
      priority,
      maxRetries,
      timeout,
      parameters,
      dependencies
    };
  }

  duplicateTask(existingTask: TaskConfiguration, overrides: Partial<TaskConfiguration> = {}): TaskConfiguration {
    return {
      ...existingTask,
      id: uuidv4(),
      ...overrides
    };
  }
}

export const taskCreator = new TaskCreator();
