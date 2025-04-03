
import { Task } from "@/lib/types";
import { getPlatformAdapter } from "@/lib/platforms";
import { TaskStateManager } from "./task-state-manager";
import { ProgressSimulator } from "./progress-simulator";
import { PlatformError } from "@/lib/error-handling";
import { delay } from "./utils";
import { ErrorHandler } from "./error-handler";
import { TaskFinisher } from "./task-finisher";
import { MockTaskProvider } from "./mock-task-provider";

/**
 * Responsible for task execution logic
 */
export class TaskExecutor {
  /**
   * Execute a task using the appropriate platform adapter
   */
  public static async executeTask(task: Task): Promise<void> {
    const taskId = task.id;
    
    // Update current step
    TaskStateManager.updateProgress(taskId, 10, "Preparing execution environment");
    TaskStateManager.logTaskProgress(taskId, "Setting up execution environment");
    
    // Get the platform adapter for this task
    const adapter = getPlatformAdapter(task.platform);
    
    // Simulate preparation time
    await delay(1000);
    
    // Check if task was stopped during preparation
    if (!TaskStateManager.isTaskRunning(taskId)) return;
    
    // Update progress
    TaskStateManager.updateProgress(taskId, 20, "Starting task execution");
    TaskStateManager.logTaskProgress(taskId, `Using ${task.platform} adapter for execution`);
    
    // Simulate progress updates during execution
    await ProgressSimulator.simulateProgress(taskId, 20, 90);
    
    // Check if task was stopped during progress simulation
    if (!TaskStateManager.isTaskRunning(taskId)) return;
    
    // Execute the task via the adapter
    await adapter.executeTask(task);
  }
  
  /**
   * Execute a task in the background
   */
  public static async executeTaskInBackground(task: Task): Promise<void> {
    try {
      const taskId = task.id;
      if (!TaskStateManager.isTaskRunning(taskId)) return;
      
      // Execute the task
      try {
        await this.executeTask(task);
        
        // If execution completed successfully
        if (TaskStateManager.isTaskRunning(taskId)) {
          TaskFinisher.finishTask(taskId, true);
          
          // Send notification if configured
          if (task.config.notifyOnCompletion) {
            toast.success(`Task "${task.name}" completed successfully!`);
          }
        }
      } catch (error) {
        // Handle execution error
        const platformError = ErrorHandler.handleExecutionError(error, task);
        
        // Log the error
        ErrorHandler.logErrorToTask(taskId, platformError);
        
        // Show error notification
        ErrorHandler.showErrorNotification(platformError);
        
        // Send notification if configured
        if (task.config.notifyOnFailure) {
          toast.error(`Task "${task.name}" failed: ${platformError.getUserFriendlyMessage()}`);
        }
        
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
   * Get a task by ID using the task provider
   */
  public static getTaskFromId(taskId: string): Task | null {
    return MockTaskProvider.getTaskFromId(taskId);
  }
  
  /**
   * Check if a task can be retried after an error
   */
  public static canRetryTask(task: Task, error: PlatformError): boolean {
    const adapter = getPlatformAdapter(task.platform);
    return adapter.canRetryAfterError(error);
  }
}

// Add toast import and ErrorType
import { toast } from "sonner";
import { ErrorType } from "@/lib/error-handling";
