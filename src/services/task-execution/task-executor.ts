import { Task } from '@/lib/task-models';
import { PlatformError } from '@/lib/error-handling';
import { ErrorType } from '@/lib/error-handling';
import { TaskStateManager } from './task-state-manager';
import { delay } from './utils';
import { toast } from 'sonner';
import { StandardExecutor } from './executors/standard-executor';

export class TaskExecutor {
  // Store a map of tasks by ID for retrieval
  private static taskRegistry: Map<string, Task> = new Map();

  static async executeTask(task: Task): Promise<void> {
    const taskId = task.config.id;
    
    // Register the task so we can retrieve it later
    this.taskRegistry.set(taskId, task);
    
    // Initialize task state
    TaskStateManager.initializeTaskState(taskId);
    
    // Create and execute the appropriate executor
    const executor = new StandardExecutor(taskId);
    await executor.execute(task);
  }

  static async executeTaskInBackground(task: Task): Promise<void> {
    try {
      await this.executeTask(task);
    } catch (error) {
      console.error('Background execution error:', error);
    }
  }
  
  /**
   * Retrieve a task by its ID
   */
  static getTaskFromId(taskId: string): Task | undefined {
    return this.taskRegistry.get(taskId);
  }
  
  /**
   * Determine if a task can be retried after an error
   */
  static canRetryTask(task: Task, error: PlatformError): boolean {
    // Basic checks - we could add more sophisticated logic based on error type
    // or platform-specific retry policies
    
    // Don't retry if explicitly marked as not recoverable
    if (error.recoverable === false) {
      return false;
    }
    
    // Don't retry if we've exceeded max retries in the task config
    const currentRetries = task.state.retryCount || 0;
    const maxRetries = task.config.maxRetries || 3;
    
    if (currentRetries >= maxRetries) {
      return false;
    }
    
    // Add specific error type handling
    if (error.type === ErrorType.AUTHORIZATION) {
      // Auth errors typically can't be fixed by retrying
      return false;
    }
    
    // Network and temporary errors are good candidates for retry
    if (error.type === ErrorType.NETWORK || error.type === ErrorType.RATE_LIMIT) {
      return true;
    }
    
    // By default, allow retry for most errors
    return true;
  }
}
