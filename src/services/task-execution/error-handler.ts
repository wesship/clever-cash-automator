
import { Task } from "@/lib/types";
import { getPlatformAdapter } from "@/lib/platforms";
import { PlatformError, ErrorType } from "@/lib/error-handling";
import { toast } from "sonner";
import { TaskStateManager } from "./task-state-manager";

/**
 * Centralizes error handling for task execution
 */
export class ErrorHandler {
  /**
   * Handle execution errors and convert to platform-specific errors
   */
  public static handleExecutionError(error: unknown, task: Task): PlatformError {
    const adapter = getPlatformAdapter(task.platform);
    
    try {
      // Use the adapter's error handling logic
      return adapter.handleExecutionError(error, task);
    } catch (handlingError) {
      // Fallback if error handling itself fails
      return new PlatformError(
        `Unhandled error during task execution: ${error instanceof Error ? error.message : String(error)}`,
        { 
          type: ErrorType.UNKNOWN, 
          recoverable: false, 
          platformId: task.platform,
          cause: error instanceof Error ? error : undefined
        }
      );
    }
  }
  
  /**
   * Show appropriate toast messages based on error type
   */
  public static showErrorNotification(error: PlatformError): void {
    if (error.recoverable) {
      toast.error(`${error.getUserFriendlyMessage()} ${error.getRecoverySuggestion()}`);
    } else {
      toast.error(error.getUserFriendlyMessage());
    }
  }
  
  /**
   * Log error to task progress
   */
  public static logErrorToTask(taskId: string, error: PlatformError): void {
    TaskStateManager.logTaskProgress(
      taskId,
      `Execution error: ${error.getUserFriendlyMessage()}`,
      true
    );
  }
}
