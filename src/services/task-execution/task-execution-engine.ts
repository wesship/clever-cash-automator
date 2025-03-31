
import { Task } from "@/lib/types";
import { toast } from "sonner";
import { PlatformError, ErrorType } from "@/lib/error-handling";
import { TaskStateManager } from "./task-state-manager";
import { MockTaskProvider } from "./mock-task-provider";
import { TaskExecutionState } from "./types";
import { getPlatformAdapter } from "@/lib/platforms";
import { TaskExecutor } from "./task-executor";
import { ErrorHandler } from "./error-handler";
import { TaskFinisher } from "./task-finisher";

/**
 * Orchestrates task execution workflow
 */
export class TaskExecutionEngine {
  
  // Maximum number of retry attempts
  private static MAX_RETRY_ATTEMPTS = 3;
  
  /**
   * Start executing a task
   */
  public static async startTask(task: Task): Promise<boolean> {
    // Don't start already running tasks
    if (TaskStateManager.isTaskRunning(task.id)) {
      toast.error(`Task "${task.name}" is already running`);
      return false;
    }

    // Initialize task execution state
    TaskStateManager.initializeTaskState(task.id);
    
    // Log the start
    TaskStateManager.logTaskProgress(task.id, "Task execution started");
    
    // Begin the execution in the background
    this.executeTaskInBackground(task);

    toast.success(`Started task "${task.name}"`);
    return true;
  }

  /**
   * Stop executing a task
   */
  public static stopTask(taskId: string): boolean {
    const result = TaskStateManager.stopTask(taskId);
    if (result) {
      TaskStateManager.logTaskProgress(taskId, "Task execution stopped by user");
      TaskStateManager.updateProgress(taskId, 0, "Task stopped by user");
      toast.info("Task paused successfully");
    }
    return result;
  }

  /**
   * Retry a failed task
   */
  public static async retryTask(taskId: string): Promise<boolean> {
    const state = TaskStateManager.getTaskState(taskId);
    if (!state || state.isRunning) {
      return false;
    }
    
    const task = MockTaskProvider.getTaskFromId(taskId);
    if (!task) {
      return false;
    }
    
    // Check if error is retryable
    const lastError = state.lastError;
    if (!lastError) {
      return false;
    }
    
    const adapter = getPlatformAdapter(task.platform);
    if (!adapter.canRetryAfterError(lastError)) {
      toast.error(`Cannot retry task "${task.name}": ${lastError.getUserFriendlyMessage()}`);
      return false;
    }
    
    // Increment retry attempts and prepare for retry
    const retryAttempt = TaskStateManager.prepareForRetry(taskId);
    if (retryAttempt > this.MAX_RETRY_ATTEMPTS) {
      toast.error(`Maximum retry attempts (${this.MAX_RETRY_ATTEMPTS}) reached for task "${task.name}"`);
      return false;
    }
    
    // Update progress with retry message
    TaskStateManager.updateProgress(
      taskId, 
      0, 
      `Retrying task (attempt ${retryAttempt} of ${this.MAX_RETRY_ATTEMPTS})...`
    );
    
    // Log retry
    TaskStateManager.logTaskProgress(
      taskId, 
      `Retrying task execution (attempt ${retryAttempt} of ${this.MAX_RETRY_ATTEMPTS})`
    );
    
    // Execute the task
    this.executeTaskInBackground(task);
    
    toast.info(`Retrying task "${task.name}"`);
    return true;
  }

  /**
   * Execute the task using the appropriate adapter
   */
  private static async executeTaskInBackground(task: Task): Promise<void> {
    try {
      const taskId = task.id;
      if (!TaskStateManager.isTaskRunning(taskId)) return;
      
      // Execute the task with the TaskExecutor
      try {
        await TaskExecutor.executeTask(task);
        
        // If execution completed successfully
        if (TaskStateManager.isTaskRunning(taskId)) {
          TaskFinisher.finishTask(taskId, true);
        }
      } catch (error) {
        // Handle execution error
        const platformError = ErrorHandler.handleExecutionError(error, task);
        
        // Log the error
        ErrorHandler.logErrorToTask(taskId, platformError);
        
        // Show error notification
        ErrorHandler.showErrorNotification(platformError);
        
        // Finish the task with error
        TaskFinisher.finishTask(taskId, false, platformError);
      }
    } catch (error) {
      // Handle preparation error
      const taskId = task.id;
      const errorMessage = error instanceof Error ? error.message : String(error);
      TaskStateManager.logTaskProgress(taskId, `Preparation error: ${errorMessage}`, true);
      
      // Create generic error
      const platformError = new PlatformError(
        `Error preparing task execution: ${errorMessage}`,
        { 
          type: ErrorType.UNKNOWN, 
          recoverable: true, 
          platformId: task.platform,
          cause: error instanceof Error ? error : undefined
        }
      );
      
      TaskFinisher.finishTask(taskId, false, platformError);
    }
  }

  /**
   * Get the current execution state of a task
   */
  public static getTaskState(taskId: string): TaskExecutionState | null {
    return TaskStateManager.getTaskState(taskId);
  }

  /**
   * Check if a task is currently running
   */
  public static isTaskRunning(taskId: string): boolean {
    return TaskStateManager.isTaskRunning(taskId);
  }

  /**
   * Get the latest error for a task
   */
  public static getLastError(taskId: string): PlatformError | undefined {
    return TaskStateManager.getLastError(taskId);
  }
}
