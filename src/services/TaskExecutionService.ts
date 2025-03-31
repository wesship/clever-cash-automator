import { Task, TaskStatus } from "@/lib/types";
import { toast } from "sonner";
import { getPlatformAdapter } from "@/lib/platforms";
import { PlatformError, ErrorType } from "@/lib/error-handling";

// Task execution states and configuration
interface TaskExecutionState {
  isRunning: boolean;
  progress: number;
  currentStepDescription: string;
  startTime?: Date;
  endTime?: Date;
  logs: string[];
  errors: string[];
  lastError?: PlatformError;
  retryAttempts: number;
}

// Store for all running tasks
const runningTasks = new Map<string, TaskExecutionState>();

/**
 * Manages execution of tasks using platform-specific adapters
 */
class TaskExecutionEngine {
  
  // Maximum number of retry attempts
  private static MAX_RETRY_ATTEMPTS = 3;
  
  /**
   * Start executing a task
   */
  public static async startTask(task: Task): Promise<boolean> {
    // Don't start already running tasks
    if (runningTasks.has(task.id)) {
      toast.error(`Task "${task.name}" is already running`);
      return false;
    }

    // Initialize task execution state
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
    runningTasks.set(task.id, executionState);
    
    // Log the start
    this.logTaskProgress(task.id, "Task execution started");
    
    // Begin the execution in the background
    this.executeTaskInBackground(task);

    toast.success(`Started task "${task.name}"`);
    return true;
  }

  /**
   * Stop executing a task
   */
  public static stopTask(taskId: string): boolean {
    if (!runningTasks.has(taskId)) {
      return false;
    }

    const state = runningTasks.get(taskId)!;
    state.isRunning = false;
    state.endTime = new Date();
    state.currentStepDescription = "Task stopped by user";
    
    this.logTaskProgress(taskId, "Task execution stopped by user");
    toast.info("Task paused successfully");
    return true;
  }

  /**
   * Get the current execution state of a task
   */
  public static getTaskState(taskId: string): TaskExecutionState | null {
    return runningTasks.get(taskId) || null;
  }

  /**
   * Check if a task is currently running
   */
  public static isTaskRunning(taskId: string): boolean {
    return runningTasks.has(taskId) && runningTasks.get(taskId)!.isRunning;
  }

  /**
   * Get the latest error for a task
   */
  public static getLastError(taskId: string): PlatformError | undefined {
    return runningTasks.get(taskId)?.lastError;
  }

  /**
   * Retry a failed task
   */
  public static async retryTask(taskId: string): Promise<boolean> {
    const state = runningTasks.get(taskId);
    if (!state || state.isRunning || !state.lastError) {
      return false;
    }
    
    const task = this.getTaskFromId(taskId);
    if (!task) {
      return false;
    }
    
    // Check if error is retryable
    const adapter = getPlatformAdapter(task.platform);
    if (!adapter.canRetryAfterError(state.lastError)) {
      toast.error(`Cannot retry task "${task.name}": ${state.lastError.getUserFriendlyMessage()}`);
      return false;
    }
    
    // Increment retry attempts
    state.retryAttempts++;
    if (state.retryAttempts > this.MAX_RETRY_ATTEMPTS) {
      toast.error(`Maximum retry attempts (${this.MAX_RETRY_ATTEMPTS}) reached for task "${task.name}"`);
      return false;
    }
    
    // Reset execution state for retry
    state.isRunning = true;
    state.progress = 0;
    state.currentStepDescription = `Retrying task (attempt ${state.retryAttempts} of ${this.MAX_RETRY_ATTEMPTS})...`;
    state.lastError = undefined;
    
    // Log retry
    this.logTaskProgress(taskId, `Retrying task execution (attempt ${state.retryAttempts} of ${this.MAX_RETRY_ATTEMPTS})`);
    
    // Execute the task
    this.executeTaskInBackground(task);
    
    toast.info(`Retrying task "${task.name}"`);
    return true;
  }

  /**
   * Execute the task using the appropriate adapter
   */
  private static async executeTaskInBackground(task: Task): Promise<void> {
    try {
      const state = runningTasks.get(task.id);
      if (!state || !state.isRunning) return;
      
      // Update current step
      state.currentStepDescription = "Preparing execution environment";
      state.progress = 10;
      this.logTaskProgress(task.id, "Setting up execution environment");
      
      // Get the platform adapter for this task
      const adapter = getPlatformAdapter(task.platform);
      
      // Simulate preparation time
      await this.delay(1000);
      
      if (!state.isRunning) return; // Check if task was stopped
      
      // Update progress
      state.currentStepDescription = "Starting task execution";
      state.progress = 20;
      this.logTaskProgress(task.id, `Using ${task.platform} adapter for execution`);
      
      // Execute the task with the appropriate adapter
      try {
        // Update progress during execution
        this.simulateProgress(task.id, 20, 90);
        
        // Execute the task via the adapter
        await adapter.executeTask(task);
        
        // If execution completed successfully
        if (state.isRunning) {
          this.finishTask(task.id, true);
        }
      } catch (error) {
        // Handle execution error using the adapter's error handling
        let platformError: PlatformError;
        
        try {
          platformError = adapter.handleExecutionError(error, task);
        } catch (handlingError) {
          // Fallback if error handling itself fails
          platformError = new PlatformError(
            `Unhandled error during task execution: ${error instanceof Error ? error.message : String(error)}`,
            { 
              type: ErrorType.UNKNOWN, 
              recoverable: false, 
              platformId: task.platform,
              cause: error instanceof Error ? error : undefined
            }
          );
        }
        
        // Store the error in state
        state.lastError = platformError;
        
        // Log the error with user-friendly message
        this.logTaskProgress(task.id, `Execution error: ${platformError.getUserFriendlyMessage()}`, true);
        
        // Show appropriate toast message based on error type
        if (platformError.recoverable) {
          toast.error(`${platformError.getUserFriendlyMessage()} ${platformError.getRecoverySuggestion()}`);
        } else {
          toast.error(platformError.getUserFriendlyMessage());
        }
        
        this.finishTask(task.id, false);
      }
    } catch (error) {
      // Handle preparation error
      const errorMessage = error instanceof Error ? error.message : String(error);
      this.logTaskProgress(task.id, `Preparation error: ${errorMessage}`, true);
      
      // Store generic error
      const state = runningTasks.get(task.id);
      if (state) {
        state.lastError = new PlatformError(
          `Error preparing task execution: ${errorMessage}`,
          { 
            type: ErrorType.UNKNOWN, 
            recoverable: true, 
            platformId: task.platform,
            cause: error instanceof Error ? error : undefined
          }
        );
      }
      
      this.finishTask(task.id, false);
    }
  }

  /**
   * Simulates progress updates during task execution
   */
  private static async simulateProgress(taskId: string, startPercent: number, endPercent: number): Promise<void> {
    const state = runningTasks.get(taskId);
    if (!state) return;

    const steps = 5;
    const progressStep = (endPercent - startPercent) / steps;
    
    for (let i = 0; i < steps && state.isRunning; i++) {
      await this.delay(1000);
      state.progress = startPercent + (i + 1) * progressStep;
      state.currentStepDescription = `Processing step ${i + 1} of ${steps}`;
      this.logTaskProgress(taskId, `Completed step ${i + 1} of ${steps}`);
    }
  }

  /**
   * Helper function to get a task by ID (in a real app, this would retrieve from database)
   */
  private static getTaskFromId(taskId: string): Task | null {
    // This is a mock implementation
    // In a real application, this would retrieve the task from a store or database
    const mockTask: Task = {
      id: taskId,
      name: "Mock Task",
      type: "survey" as any, // Using 'as any' for brevity in this mock
      platform: "amazon_mturk" as any,
      status: TaskStatus.RUNNING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: 10,
      earnings: 0,
      description: "Mock task for retry testing",
      config: {
        proxyRequired: false,
        captchaHandling: false,
        schedule: {
          frequency: "daily",
          maxRuns: 5
        }
      }
    };
    
    return mockTask;
  }

  /**
   * Complete a task execution
   */
  private static finishTask(taskId: string, success: boolean): void {
    const state = runningTasks.get(taskId);
    if (!state) return;

    state.isRunning = false;
    state.endTime = new Date();
    state.progress = success ? 100 : 0;
    
    if (success) {
      state.currentStepDescription = "Task completed successfully";
      this.logTaskProgress(taskId, "Task execution completed successfully");
      toast.success("Task completed successfully");
    } else {
      state.currentStepDescription = "Task failed";
      this.logTaskProgress(taskId, "Task execution failed");
      
      // Don't show another toast here since we already show specific error toasts
      // We only want to show a generic one if we didn't catch a specific error
      if (!state.lastError) {
        toast.error("Task failed to complete");
      }
    }

    // Keep the task in the running tasks map for history/reference
    // In a real app, we'd store this in a database
  }

  /**
   * Log a message for a task
   */
  private static logTaskProgress(taskId: string, message: string, isError: boolean = false): void {
    const state = runningTasks.get(taskId);
    if (!state) return;

    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ${message}`;
    
    state.logs.push(logMessage);
    if (isError) {
      state.errors.push(logMessage);
    }
    
    console.log(`Task ${taskId}: ${logMessage}`);
  }

  /**
   * Helper to create a delay
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default TaskExecutionEngine;
