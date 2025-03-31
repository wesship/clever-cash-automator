
import { Task } from "@/lib/types";
import { toast } from "sonner";
import { getPlatformAdapter } from "@/lib/platforms";
import { PlatformError, ErrorType } from "@/lib/error-handling";
import { TaskStateManager } from "./task-state-manager";
import { ProgressSimulator } from "./progress-simulator";
import { MockTaskProvider } from "./mock-task-provider";
import { delay } from "./utils";
import { TaskExecutionState } from "./types";

/**
 * Manages execution of tasks using platform-specific adapters
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
      
      // Update current step
      TaskStateManager.updateProgress(taskId, 10, "Preparing execution environment");
      TaskStateManager.logTaskProgress(taskId, "Setting up execution environment");
      
      // Get the platform adapter for this task
      const adapter = getPlatformAdapter(task.platform);
      
      // Simulate preparation time
      await delay(1000);
      
      if (!TaskStateManager.isTaskRunning(taskId)) return; // Check if task was stopped
      
      // Update progress
      TaskStateManager.updateProgress(taskId, 20, "Starting task execution");
      TaskStateManager.logTaskProgress(taskId, `Using ${task.platform} adapter for execution`);
      
      // Execute the task with the appropriate adapter
      try {
        // Update progress during execution
        await ProgressSimulator.simulateProgress(taskId, 20, 90);
        
        if (!TaskStateManager.isTaskRunning(taskId)) return; // Check if task was stopped
        
        // Execute the task via the adapter
        await adapter.executeTask(task);
        
        // If execution completed successfully
        if (TaskStateManager.isTaskRunning(taskId)) {
          this.finishTask(taskId, true);
        }
      } catch (error) {
        // Handle execution error using the adapter's error handling
        let platformError: PlatformError;
        
        try {
          platformError = adapter.handleExecutionError(error, task);
        } catch (handlingError) {
          // Fallback if error handling itself fails
          platformError = new PlatformError(
            `Unhandled error during task execution: ${error instanceof Error ? error.message : String(error)}`,
            { 
              type: ErrorType.UNKNOWN, 
              recoverable: false, 
              platformId: task.platform,
              cause: error instanceof Error ? error : undefined
            }
          );
        }
        
        // Log the error with user-friendly message
        TaskStateManager.logTaskProgress(
          taskId, 
          `Execution error: ${platformError.getUserFriendlyMessage()}`, 
          true
        );
        
        // Show appropriate toast message based on error type
        if (platformError.recoverable) {
          toast.error(`${platformError.getUserFriendlyMessage()} ${platformError.getRecoverySuggestion()}`);
        } else {
          toast.error(platformError.getUserFriendlyMessage());
        }
        
        this.finishTask(taskId, false, platformError);
      }
    } catch (error) {
      const taskId = task.id;
      // Handle preparation error
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
      
      this.finishTask(taskId, false, platformError);
    }
  }

  /**
   * Complete a task execution
   */
  private static finishTask(taskId: string, success: boolean, error?: PlatformError): void {
    TaskStateManager.finishTask(taskId, success, error);
    
    if (success) {
      TaskStateManager.updateProgress(taskId, 100, "Task completed successfully");
      TaskStateManager.logTaskProgress(taskId, "Task execution completed successfully");
      toast.success("Task completed successfully");
    } else {
      TaskStateManager.updateProgress(taskId, 0, "Task failed");
      TaskStateManager.logTaskProgress(taskId, "Task execution failed");
      
      // Don't show another toast here since we already show specific error toasts
      // We only want to show a generic one if we didn't catch a specific error
      if (!error) {
        toast.error("Task failed to complete");
      }
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
