
import { TaskStateManager } from "./task-state-manager";
import { delay } from "./utils";

/**
 * Simulates progress updates during task execution
 */
export class ProgressSimulator {
  /**
   * Simulates progress updates during task execution
   */
  static async simulateProgress(
    taskId: string, 
    startPercent: number, 
    endPercent: number, 
    steps: number = 5
  ): Promise<void> {
    const progressStep = (endPercent - startPercent) / steps;
    
    for (let i = 0; i < steps; i++) {
      // Check if task was stopped
      if (!TaskStateManager.isTaskRunning(taskId)) return;
      
      await delay(1000);
      
      const newProgress = startPercent + (i + 1) * progressStep;
      const description = `Processing step ${i + 1} of ${steps}`;
      
      TaskStateManager.updateProgress(taskId, newProgress, description);
      TaskStateManager.logTaskProgress(taskId, `Completed step ${i + 1} of ${steps}`);
      
      // Check again after updating
      if (!TaskStateManager.isTaskRunning(taskId)) return;
    }
  }
}
