
import { Task } from "@/lib/types";
import { getPlatformAdapter } from "@/lib/platforms";
import { TaskStateManager } from "./task-state-manager";
import { ProgressSimulator } from "./progress-simulator";
import { PlatformError } from "@/lib/error-handling";
import { delay } from "./utils";

/**
 * Responsible for pure task execution logic
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
}
