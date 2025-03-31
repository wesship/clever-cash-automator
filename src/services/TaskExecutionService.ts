import { Task, TaskStatus } from "@/lib/types";
import { toast } from "sonner";
import { getPlatformAdapter } from "@/lib/platforms";

// Task execution states and configuration
interface TaskExecutionState {
  isRunning: boolean;
  progress: number;
  currentStepDescription: string;
  startTime?: Date;
  endTime?: Date;
  logs: string[];
  errors: string[];
}

// Store for all running tasks
const runningTasks = new Map<string, TaskExecutionState>();

/**
 * Manages execution of tasks using platform-specific adapters
 */
class TaskExecutionEngine {
  
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
      errors: []
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
        // Handle execution error
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        this.logTaskProgress(task.id, `Execution error: ${errorMessage}`, true);
        this.finishTask(task.id, false);
      }
    } catch (error) {
      // Handle preparation error
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      this.logTaskProgress(task.id, `Preparation error: ${errorMessage}`, true);
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
   * Complete a task execution
   */
  private static finishTask(taskId: string, success: boolean): void {
    const state = runningTasks.get(taskId);
    if (!state) return;

    state.isRunning = false;
    state.endTime = new Date();
    state.progress = 100;
    
    if (success) {
      state.currentStepDescription = "Task completed successfully";
      this.logTaskProgress(taskId, "Task execution completed successfully");
      toast.success("Task completed successfully");
    } else {
      state.currentStepDescription = "Task failed";
      this.logTaskProgress(taskId, "Task execution failed");
      toast.error("Task failed to complete");
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
