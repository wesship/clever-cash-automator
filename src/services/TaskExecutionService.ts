import { Task, TaskStatus, TaskType } from "@/lib/types";
import { toast } from "sonner";

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
 * Simulates the execution of browser-based tasks
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
   * Execute the task based on its type
   */
  private static async executeTaskInBackground(task: Task): Promise<void> {
    switch (task.type) {
      case TaskType.AD_CLICK:
        await this.executeAdClickTask(task);
        break;
      case TaskType.SURVEY:
        await this.executeSurveyTask(task);
        break;
      case TaskType.VIDEO_WATCH:
        await this.executeVideoWatchTask(task);
        break;
      case TaskType.CONTENT_CREATION:
        await this.executeContentCreationTask(task);
        break;
      case TaskType.AFFILIATE:
        await this.executeAffiliateTask(task);
        break;
      default:
        this.logTaskProgress(task.id, `Unsupported task type: ${task.type}`);
        this.finishTask(task.id, false);
    }
  }

  /**
   * Execute ad clicking task
   */
  private static async executeAdClickTask(task: Task): Promise<void> {
    const steps = [
      "Opening browser with configured user agent",
      "Connecting to proxy server",
      "Loading target platform",
      "Logging in to account",
      "Navigating to ads section",
      "Scanning for available ads",
      "Clicking on ad",
      "Waiting for page to load",
      "Verifying ad view counted",
      "Moving to next ad"
    ];
    
    await this.executeTaskSteps(task, steps, 8000, 15000);
  }

  /**
   * Execute survey completion task
   */
  private static async executeSurveyTask(task: Task): Promise<void> {
    const steps = [
      "Opening browser with configured user agent",
      "Loading survey platform",
      "Logging into account",
      "Scanning for available surveys",
      "Selecting appropriate survey",
      "Answering screening questions",
      "Processing survey questions",
      "Submitting survey responses",
      "Verifying completion credit"
    ];
    
    await this.executeTaskSteps(task, steps, 10000, 20000);
  }

  /**
   * Execute video watching task
   */
  private static async executeVideoWatchTask(task: Task): Promise<void> {
    const steps = [
      "Opening browser with configured user agent",
      "Loading video platform",
      "Authenticating account",
      "Searching for target videos",
      "Starting video playback",
      "Ensuring video volume is appropriate",
      "Monitoring video playback",
      "Handling any ads or interruptions",
      "Logging engagement actions",
      "Verifying view was counted"
    ];
    
    await this.executeTaskSteps(task, steps, 15000, 30000);
  }

  /**
   * Execute content creation task
   */
  private static async executeContentCreationTask(task: Task): Promise<void> {
    const steps = [
      "Initializing content generation module",
      "Analyzing task requirements",
      "Gathering source material",
      "Generating content outline",
      "Creating content draft",
      "Optimizing content",
      "Proofreading content",
      "Formatting output",
      "Submitting to platform",
      "Verifying submission"
    ];
    
    await this.executeTaskSteps(task, steps, 12000, 25000);
  }

  /**
   * Execute affiliate marketing task
   */
  private static async executeAffiliateTask(task: Task): Promise<void> {
    const steps = [
      "Initializing affiliate module",
      "Loading target platform",
      "Authenticating user account",
      "Identifying promotion opportunities",
      "Generating promotional content",
      "Inserting affiliate links",
      "Posting content to platform",
      "Verifying link functionality",
      "Monitoring initial engagement"
    ];
    
    await this.executeTaskSteps(task, steps, 10000, 20000);
  }

  /**
   * Generic step execution with progress tracking
   */
  private static async executeTaskSteps(
    task: Task, 
    steps: string[], 
    minStepTime: number, 
    maxStepTime: number
  ): Promise<void> {
    const state = runningTasks.get(task.id);
    if (!state) return;

    // Execute each step
    for (let i = 0; i < steps.length; i++) {
      if (!state.isRunning) {
        // Task was stopped by user
        return;
      }

      const stepDescription = steps[i];
      state.currentStepDescription = stepDescription;
      state.progress = (i / steps.length) * 100;
      
      this.logTaskProgress(task.id, stepDescription);
      
      // Simulate work being done for this step
      const stepTime = Math.floor(Math.random() * (maxStepTime - minStepTime)) + minStepTime;
      await this.delay(stepTime);

      // Random chance of error to simulate real-world conditions
      if (Math.random() < 0.05) { // 5% chance of error
        const errorMessage = `Error during step: ${stepDescription}`;
        state.errors.push(errorMessage);
        this.logTaskProgress(task.id, errorMessage, true);
        
        // 50% chance to recover from error
        if (Math.random() < 0.5) {
          this.logTaskProgress(task.id, "Attempting to recover from error");
          await this.delay(5000);
          this.logTaskProgress(task.id, "Recovered successfully, continuing execution");
        } else {
          this.logTaskProgress(task.id, "Failed to recover from error, stopping task");
          this.finishTask(task.id, false);
          return;
        }
      }
    }

    // Task completed successfully
    this.finishTask(task.id, true);
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
