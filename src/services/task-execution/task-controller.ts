
import { Task } from "@/lib/types";
import { toast } from "sonner";
import { TaskStateManager } from "./task-state-manager";
import { TaskExecutor } from "./task-executor";
import { PlatformError } from "@/lib/error-handling";
import { Task as TaskModel } from "@/lib/task-models";

/**
 * Provides the public API for controlling task execution
 */
export class TaskController {
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
    // Convert Task from lib/types to TaskModel from lib/task-models
    const taskModel: TaskModel = {
      config: {
        id: task.id,
        name: task.name,
        description: task.description,
        type: task.type as any,
        platform: task.platform as any,
        priority: task.priority as any,
        maxRetries: 3, // Default value
        timeout: 3600, // Default timeout in seconds
        parameters: {} // Default empty parameters
      },
      state: {
        status: task.status as any,
        progress: task.progress,
        currentStep: task.currentStep || '',
        logs: task.logs ? task.logs.map(log => ({
          timestamp: log.timestamp,
          message: log.message,
          type: log.type,
          data: log.data
        })) : [],
        retryCount: 0
      }
    };
    
    TaskExecutor.executeTaskInBackground(taskModel);

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
   * Cancel a task completely
   */
  public static cancelTask(taskId: string): boolean {
    // First stop the task if it's running
    if (TaskStateManager.isTaskRunning(taskId)) {
      this.stopTask(taskId);
    }
    
    const result = TaskStateManager.cancelTask(taskId);
    if (result) {
      TaskStateManager.logTaskProgress(taskId, "Task cancelled by user");
      toast.info("Task cancelled successfully");
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
    
    // Check if retry attempts exceeded
    const retryAttempt = state.retryAttempts + 1;
    if (retryAttempt > this.MAX_RETRY_ATTEMPTS) {
      toast.error(`Maximum retry attempts (${this.MAX_RETRY_ATTEMPTS}) reached`);
      return false;
    }
    
    // Get the original task details
    // Since getTaskFromId isn't part of TaskExecutor, we'll get the task details from state
    const taskState = TaskStateManager.getTaskState(taskId);
    if (!taskState) {
      return false;
    }
    
    // Check if error is retryable
    const lastError = taskState.lastError;
    if (!lastError) {
      return false;
    }
    
    // We'll implement a simple check instead of depending on the missing method
    const canRetry = lastError.recoverable !== false; // Default to true if not specified
    if (!canRetry) {
      toast.error(`Cannot retry task: ${lastError.message}`);
      return false;
    }
    
    // Prepare for retry and update progress
    TaskStateManager.prepareForRetry(taskId);
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
    
    // Execute the task - we need to reconstruct it from the state
    // This is a simplified version that would need enhancement in production
    const task: TaskModel = {
      config: {
        id: taskId,
        name: taskState.taskName || "Unknown Task",
        description: taskState.taskDescription || "",
        type: "extraction" as any, // Default
        platform: "web" as any, // Default
        priority: "medium" as any, // Default
        maxRetries: 3,
        timeout: 3600,
        parameters: {}
      },
      state: {
        status: "pending" as any,
        progress: 0,
        currentStep: "Initializing retry",
        logs: [],
        retryCount: retryAttempt
      }
    };
    
    TaskExecutor.executeTaskInBackground(task);
    
    toast.info(`Retrying task`);
    return true;
  }
  
  /**
   * Start multiple tasks at once
   */
  public static async startMultipleTasks(tasks: Task[]): Promise<number> {
    let successCount = 0;
    
    for (const task of tasks) {
      const success = await this.startTask(task);
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast.success(`Started ${successCount} out of ${tasks.length} tasks`);
    }
    
    return successCount;
  }
  
  /**
   * Stop multiple tasks at once
   */
  public static stopMultipleTasks(taskIds: string[]): number {
    let successCount = 0;
    
    for (const taskId of taskIds) {
      const success = this.stopTask(taskId);
      if (success) successCount++;
    }
    
    if (successCount > 0) {
      toast.info(`Paused ${successCount} out of ${taskIds.length} tasks`);
    }
    
    return successCount;
  }
  
  /**
   * Get the current execution state of a task
   */
  public static getTaskState(taskId: string) {
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
  
  /**
   * Get the execution logs for a task
   */
  public static getTaskLogs(taskId: string): string[] {
    const state = TaskStateManager.getTaskState(taskId);
    return state?.logs || [];
  }
  
  /**
   * Get the error logs for a task
   */
  public static getTaskErrorLogs(taskId: string): string[] {
    const state = TaskStateManager.getTaskState(taskId);
    return state?.errors || [];
  }
}
