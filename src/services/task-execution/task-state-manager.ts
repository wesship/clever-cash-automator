
import { Task } from "@/lib/types";
import { PlatformError } from "@/lib/error-handling";
import { TaskExecutionState } from "./types";
import { formatLogMessage } from "./utils";

// Store for all running tasks
const runningTasks = new Map<string, TaskExecutionState>();

/**
 * Manages task execution state
 */
export class TaskStateManager {
  /**
   * Initialize task execution state
   */
  static initializeTaskState(taskId: string): TaskExecutionState {
    const executionState: TaskExecutionState = {
      isRunning: true,
      progress: 0,
      currentStepDescription: "Initializing task...",
      startTime: new Date(),
      logs: [],
      errors: [],
      retryAttempts: 0
    };

    // Store the task state
    runningTasks.set(taskId, executionState);
    
    return executionState;
  }

  /**
   * Get the current execution state of a task
   */
  static getTaskState(taskId: string): TaskExecutionState | null {
    return runningTasks.get(taskId) || null;
  }

  /**
   * Check if a task is currently running
   */
  static isTaskRunning(taskId: string): boolean {
    return runningTasks.has(taskId) && runningTasks.get(taskId)!.isRunning;
  }

  /**
   * Get the latest error for a task
   */
  static getLastError(taskId: string): PlatformError | undefined {
    return runningTasks.get(taskId)?.lastError;
  }

  /**
   * Update task progress
   */
  static updateProgress(taskId: string, progress: number, description: string): void {
    const state = runningTasks.get(taskId);
    if (state) {
      state.progress = progress;
      state.currentStepDescription = description;
    }
  }

  /**
   * Log a message for a task
   */
  static logTaskProgress(taskId: string, message: string, isError: boolean = false): void {
    const state = runningTasks.get(taskId);
    if (!state) return;

    const logMessage = formatLogMessage(message);
    
    state.logs.push(logMessage);
    if (isError) {
      state.errors.push(logMessage);
    }
    
    console.log(`Task ${taskId}: ${logMessage}`);
  }

  /**
   * Mark task as completed or failed
   */
  static finishTask(taskId: string, success: boolean, error?: PlatformError): void {
    const state = runningTasks.get(taskId);
    if (!state) return;

    state.isRunning = false;
    state.endTime = new Date();
    state.progress = success ? 100 : 0;
    
    if (!success && error) {
      state.lastError = error;
    }
  }

  /**
   * Mark task as stopped by user
   */
  static stopTask(taskId: string): boolean {
    if (!runningTasks.has(taskId)) {
      return false;
    }

    const state = runningTasks.get(taskId)!;
    state.isRunning = false;
    state.endTime = new Date();
    
    return true;
  }

  /**
   * Prepare task for retry
   */
  static prepareForRetry(taskId: string): number {
    const state = runningTasks.get(taskId);
    if (!state) return 0;
    
    // Increment retry attempts
    state.retryAttempts++;
    
    // Reset execution state for retry
    state.isRunning = true;
    state.progress = 0;
    state.lastError = undefined;
    
    return state.retryAttempts;
  }
}
