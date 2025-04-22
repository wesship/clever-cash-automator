
import { Task } from "@/lib/task-models";
import { delay } from "../utils";
import { TaskStateManager } from "../task-state-manager";
import { PlatformError, ErrorType } from "@/lib/error-handling";
import { toast } from "sonner";

export abstract class BaseExecutor {
  protected readonly taskId: string;
  protected progress: number = 0;

  constructor(taskId: string) {
    this.taskId = taskId;
  }

  protected async updateProgress(progress: number, step: string): Promise<void> {
    this.progress = progress;
    TaskStateManager.updateProgress(this.taskId, progress, step);
    TaskStateManager.logTaskProgress(this.taskId, step);
  }

  protected async executeStep(step: string, progressIncrement: number): Promise<void> {
    await delay(1000);
    this.progress += progressIncrement;
    await this.updateProgress(this.progress, step);
  }

  abstract execute(task: Task): Promise<void>;

  protected handleError(error: unknown): never {
    const platformError = error instanceof PlatformError 
      ? error 
      : new PlatformError(
          error instanceof Error ? error.message : 'Task execution failed',
          {
            type: ErrorType.UNKNOWN,
            platformId: 'task-executor',
            recoverable: true,
            cause: error instanceof Error ? error : undefined
          }
        );

    toast.error(platformError.getUserFriendlyMessage());
    throw platformError;
  }
}
