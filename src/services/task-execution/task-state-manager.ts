
import { PlatformError } from "@/lib/error-handling";

interface TaskExecutionState {
  isRunning: boolean;
  progress: number;
  currentStepDescription: string;
  logs: string[];
  errors: string[];
  startTime?: Date;
  endTime?: Date;
  lastError?: PlatformError;
  retryAttempts: number;
  taskName?: string;
  taskDescription?: string;
  isCancelled?: boolean;
}

// In-memory state store for task execution
// In a real application, this could be backed by a persistent store
export class TaskStateManager {
  private static taskStates: Map<string, TaskExecutionState> = new Map();

  /**
   * Initialize the state for a new task execution
   */
  public static initializeTaskState(taskId: string): void {
    this.taskStates.set(taskId, {
      isRunning: true,
      progress: 0,
      currentStepDescription: "Initializing...",
      logs: ["Task initialized"],
      errors: [],
      startTime: new Date(),
      retryAttempts: 0
    });
  }

  /**
   * Check if a task is currently running
   */
  public static isTaskRunning(taskId: string): boolean {
    return this.taskStates.get(taskId)?.isRunning || false;
  }

  /**
   * Update the progress of a task
   */
  public static updateProgress(taskId: string, progress: number, stepDescription: string): void {
    const state = this.taskStates.get(taskId);
    if (state) {
      state.progress = progress;
      state.currentStepDescription = stepDescription;
    }
  }

  /**
   * Add a log entry to the task's execution log
   */
  public static logTaskProgress(taskId: string, message: string, isError: boolean = false): void {
    const state = this.taskStates.get(taskId);
    if (state) {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] ${message}`;
      
      state.logs.push(logMessage);
      
      if (isError) {
        state.errors.push(logMessage);
      }
    }
  }

  /**
   * Stop a task
   */
  public static stopTask(taskId: string): boolean {
    const state = this.taskStates.get(taskId);
    if (state && state.isRunning) {
      state.isRunning = false;
      return true;
    }
    return false;
  }

  /**
   * Cancel a task
   */
  public static cancelTask(taskId: string): boolean {
    const state = this.taskStates.get(taskId);
    if (state) {
      state.isRunning = false;
      state.isCancelled = true;
      return true;
    }
    return false;
  }

  /**
   * Mark a task as finished
   */
  public static finishTask(taskId: string, success: boolean, error?: PlatformError): void {
    const state = this.taskStates.get(taskId);
    if (state) {
      state.isRunning = false;
      state.endTime = new Date();
      
      if (!success && error) {
        state.lastError = error;
      }
    }
  }

  /**
   * Prepare a task for retry
   */
  public static prepareForRetry(taskId: string): void {
    const state = this.taskStates.get(taskId);
    if (state) {
      state.isRunning = true;
      state.progress = 0;
      state.retryAttempts += 1;
      state.startTime = new Date();
      state.endTime = undefined;
    }
  }

  /**
   * Get the execution state of a task
   */
  public static getTaskState(taskId: string): TaskExecutionState | undefined {
    return this.taskStates.get(taskId);
  }

  /**
   * Get the last error for a task
   */
  public static getLastError(taskId: string): PlatformError | undefined {
    return this.taskStates.get(taskId)?.lastError;
  }

  /**
   * Clear the state for a task
   */
  public static clearTaskState(taskId: string): void {
    this.taskStates.delete(taskId);
  }

  /**
   * Clear all task states
   */
  public static clearAllTaskStates(): void {
    this.taskStates.clear();
  }
}
