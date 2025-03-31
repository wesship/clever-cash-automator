
import { TaskStateManager } from "./task-state-manager";
import { PlatformError } from "@/lib/error-handling";
import { toast } from "sonner";

/**
 * Handles task completion logic
 */
export class TaskFinisher {
  /**
   * Complete a task execution
   */
  public static finishTask(taskId: string, success: boolean, error?: PlatformError): void {
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
}
