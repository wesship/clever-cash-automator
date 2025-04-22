
import { Task } from "@/lib/task-models";
import { BaseExecutor } from "./base-executor";
import { TaskStateManager } from "../task-state-manager";
import { toast } from "sonner";

export class StandardExecutor extends BaseExecutor {
  async execute(task: Task): Promise<void> {
    TaskStateManager.logTaskProgress(this.taskId, "Starting task execution");

    try {
      // Setup phase
      await this.executeStep("Preparing execution environment", 10);
      
      // Main execution
      for (let step = 1; step <= 7; step++) {
        if (!TaskStateManager.isTaskRunning(this.taskId)) return;
        
        await this.executeStep(
          `Processing step ${step} of 7`,
          10
        );
      }

      // Completion phase
      if (TaskStateManager.isTaskRunning(this.taskId)) {
        await this.updateProgress(100, "Task completed successfully");
        TaskStateManager.logTaskProgress(this.taskId, "Task execution completed");
        toast.success("Task completed successfully");
      }

    } catch (error) {
      this.handleError(error);
    }
  }
}
