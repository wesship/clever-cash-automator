
import { Task } from '@/lib/task-models';
import { PlatformError } from '@/lib/error-handling';
import { ErrorType } from '@/lib/error-handling';
import { TaskStateManager } from './task-state-manager';
import { delay } from './utils';
import { toast } from 'sonner';

export class TaskExecutor {
  static async executeTask(task: Task): Promise<void> {
    const taskId = task.config.id;
    
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
}
