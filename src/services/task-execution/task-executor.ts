
import { Task } from '@/lib/task-models';
import { PlatformError } from '@/lib/error-handling';
import { ErrorType } from '@/lib/error-handling';
import { TaskStateManager } from './task-state-manager';
import { delay } from './utils';
import { toast } from 'sonner';

export class TaskExecutor {
  // Store a map of tasks by ID for retrieval
  private static taskRegistry: Map<string, Task> = new Map();

  static async executeTask(task: Task): Promise<void> {
    const taskId = task.config.id;
    
    // Register the task so we can retrieve it later
    this.taskRegistry.set(taskId, task);
    
    // Update current step
    TaskStateManager.updateProgress(taskId, 10, "Preparing execution environment");
    TaskStateManager.logTaskProgress(taskId, "Setting up execution environment");
    
    // Simulate preparation time
    await delay(1000);
    
    // Check if task was stopped during preparation
    if (!TaskStateManager.isTaskRunning(taskId)) return;
    
    try {
      // Simulating task execution with progress updates
      for (let progress = 20; progress <= 90; progress += 10) {
        if (!TaskStateManager.isTaskRunning(taskId)) return;
        
        TaskStateManager.updateProgress(taskId, progress, `Processing step ${progress/10} of 9`);
        TaskStateManager.logTaskProgress(taskId, `Completed step ${progress/10}`);
        
        await delay(1000); // Simulate work
      }
      
      // Complete the task
      if (TaskStateManager.isTaskRunning(taskId)) {
        TaskStateManager.updateProgress(taskId, 100, "Task completed successfully");
        TaskStateManager.logTaskProgress(taskId, "Task execution completed");
        TaskStateManager.finishTask(taskId, true);
        
        toast.success("Task completed successfully");
      }
    } catch (error) {
      // Handle execution error
      console.error(`Task ${taskId} failed:`, error);
      
      const platformError = new PlatformError(
        error instanceof Error ? error.message : 'Task execution failed',
        {
          type: ErrorType.UNKNOWN,
          recoverable: true,
          platformId: task.config.platform
        }
      );
      
      TaskStateManager.logTaskProgress(taskId, `Error: ${platformError.message}`, true);
      TaskStateManager.finishTask(taskId, false, platformError);
      
      toast.error(`Task failed: ${platformError.message}`);
    }
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
