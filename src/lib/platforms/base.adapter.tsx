
import React from "react";
import { z } from "zod";
import { PlatformAdapter } from "./types";
import { Task, TaskType } from "@/lib/types";
import { PlatformError, withErrorHandling } from "@/lib/error-handling";
import { BaseFormFields } from "./components/BaseFormFields";
import { handleExecutionError, canRetryAfterError } from "./error-handling/adapter-error-handling";
import {
  executeAdClickTask,
  executeSurveyTask,
  executeVideoWatchTask,
  executeContentCreationTask,
  executeAffiliateTask
} from "./task-executors";

export class BaseAdapter implements PlatformAdapter {
  getTaskSchema() {
    return z.object({
      useSpecificBrowser: z.enum(["chrome", "firefox", "edge"]).optional(),
    });
  }

  getDefaultValues() {
    return {
      useSpecificBrowser: "chrome" as const,
    };
  }

  async executeTask(task: Task): Promise<void> {
    console.log("Executing basic task with ID:", task.id);
    
    // Execute with error handling
    await withErrorHandling(
      task.platform,
      async () => {
        // Execute based on task type
        switch (task.type) {
          case TaskType.AD_CLICK:
            await executeAdClickTask();
            break;
          case TaskType.SURVEY:
            await executeSurveyTask();
            break;
          case TaskType.VIDEO_WATCH:
            await executeVideoWatchTask();
            break;
          case TaskType.CONTENT_CREATION:
            await executeContentCreationTask();
            break;
          case TaskType.AFFILIATE:
            await executeAffiliateTask();
            break;
          default:
            throw new Error(`Unsupported task type: ${task.type}`);
        }
      },
      (error) => this.handleExecutionError(error, task)
    );
  }

  // Implementation of error handling method from the interface
  handleExecutionError(error: unknown, task: Task): PlatformError {
    return handleExecutionError(error, task);
  }

  // Determine if the error allows retry
  canRetryAfterError(error: PlatformError): boolean {
    return canRetryAfterError(error);
  }

  getFormFields(form: any) {
    return <BaseFormFields {...form} />;
  }
}
