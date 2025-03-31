
import { Task, TaskStatus, TaskType, PlatformType } from "@/lib/types";
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
   * Execute the task based on its type and platform
   */
  private static async executeTaskInBackground(task: Task): Promise<void> {
    // First check if we have a specialized executor for this platform
    if (this.hasSpecializedPlatformExecutor(task.platform)) {
      await this.executePlatformSpecificTask(task);
      return;
    }
    
    // Otherwise, fall back to task type execution
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
   * Check if we have a specialized executor for this platform
   */
  private static hasSpecializedPlatformExecutor(platform: PlatformType): boolean {
    return platform === PlatformType.CLICKWORKER || platform === PlatformType.NEOBUX;
  }

  /**
   * Execute platform-specific task logic
   */
  private static async executePlatformSpecificTask(task: Task): Promise<void> {
    switch (task.platform) {
      case PlatformType.CLICKWORKER:
        await this.executeClickworkerTask(task);
        break;
      case PlatformType.NEOBUX:
        await this.executeNeobuxTask(task);
        break;
      default:
        // Fallback if we somehow get here
        this.logTaskProgress(task.id, `No specialized executor for: ${task.platform}`);
        this.finishTask(task.id, false);
    }
  }

  /**
   * Execute a Neobux task with specialized logic
   */
  private static async executeNeobuxTask(task: Task): Promise<void> {
    const state = runningTasks.get(task.id);
    if (!state) return;

    this.logTaskProgress(task.id, "Starting Neobux task execution");
    
    const browserType = task.config.taskSpecific?.useSpecificBrowser || "chrome";
    this.logTaskProgress(task.id, `Using browser: ${browserType}`);

    // Get Neobux-specific parameters
    const membershipType = task.config.taskSpecific?.neobuxMembershipType || "standard";
    const adTypes = task.config.taskSpecific?.neobuxAdTypes || ["standard"];
    const clickDelay = task.config.taskSpecific?.neobuxClickDelay || 7;
    const autoRecycle = task.config.taskSpecific?.neobuxAutoRecycle || false;
    
    // Log the configuration
    this.logTaskProgress(task.id, `Account membership: ${membershipType}`);
    this.logTaskProgress(task.id, `Selected ad types: ${adTypes.join(", ")}`);
    this.logTaskProgress(task.id, `Click delay: ${clickDelay} seconds`);
    this.logTaskProgress(task.id, `Auto-recycle enabled: ${autoRecycle}`);

    const steps = [
      "Opening Neobux in specified browser",
      "Logging in with account credentials",
      "Navigating to advertisement page",
      "Scanning available advertisements",
      "Filtering for selected ad types",
      "Beginning ad click sequence",
      "Waiting for verification images",
      "Processing verification prompts",
      "Waiting for required view time",
      "Confirming ad credit"
    ];

    if (autoRecycle) {
      steps.push("Checking for recyclable ads");
      steps.push("Processing recyclable advertisements");
    }

    // Custom step execution for Neobux with variable timing based on membership
    const baseStepTime = membershipType === "standard" ? 10000 : 
                        (membershipType === "golden" ? 8000 :
                        (membershipType === "ultimate" ? 7000 : 6000));
                        
    // Execute steps with custom timing based on membership level
    await this.executeTaskSteps(task, steps, baseStepTime - 2000, baseStepTime + 5000);

    // If the task completed successfully and we're still running
    const taskState = runningTasks.get(task.id);
    if (taskState && taskState.isRunning) {
      // Log earnings based on membership and ad types
      let totalClicks = Math.floor(Math.random() * 20) + 10; // Random number of ad clicks
      let totalEarnings = 0;
      
      // Calculate earnings based on membership type and ad types
      const adValues = {
        standard: membershipType === "standard" ? 0.001 : 
                 (membershipType === "golden" ? 0.01 : 
                 (membershipType === "ultimate" ? 0.02 : 0.03)),
        micro: 0.001,
        fixed: 0.001,
        adprize: membershipType === "standard" ? 0 : 0.05
      };

      // Log each ad type clicked
      adTypes.forEach(adType => {
        const adTypeClicks = Math.floor(totalClicks / adTypes.length);
        const adValue = adValues[adType as keyof typeof adValues];
        const adEarnings = adTypeClicks * adValue;
        totalEarnings += adEarnings;
        
        this.logTaskProgress(task.id, `Clicked ${adTypeClicks} ${adType} ads for $${adEarnings.toFixed(4)}`);
      });

      this.logTaskProgress(task.id, `Total earnings: $${totalEarnings.toFixed(4)}`);
      
      // Handle auto-recycling if enabled
      if (autoRecycle) {
        this.logTaskProgress(task.id, "Performing auto-recycle operation");
        await this.delay(5000);
        const recycledAds = Math.floor(Math.random() * 5);
        this.logTaskProgress(task.id, `Recycled ${recycledAds} advertisements for next session`);
      }
    }
  }

  /**
   * Execute a Clickworker task with specialized logic
   */
  private static async executeClickworkerTask(task: Task): Promise<void> {
    const state = runningTasks.get(task.id);
    if (!state) return;

    this.logTaskProgress(task.id, "Starting Clickworker task execution");
    
    const browserType = task.config.taskSpecific?.useSpecificBrowser || "chrome";
    this.logTaskProgress(task.id, `Using browser: ${browserType}`);

    const steps = [
      "Opening Clickworker in specified browser",
      "Logging in with credentials",
      "Navigating to available jobs section",
      "Filtering tasks by qualification level",
      "Setting minimum payment threshold",
      "Scanning for eligible tasks",
      "Checking task duration requirements",
      "Starting highest paying eligible task",
      "Reading task instructions carefully",
      "Executing task requirements",
      "Submitting work for review",
      "Verifying submission status",
      "Scanning for next available task"
    ];
    
    // Log qualification level if it's set
    const qualificationLevel = task.config.taskSpecific?.clickworkerQualificationLevel;
    if (qualificationLevel) {
      this.logTaskProgress(task.id, `Filtering for ${qualificationLevel} level tasks`);
    }
    
    // Log minimum payment if it's set
    const minPayment = task.config.taskSpecific?.taskMinimumPayment;
    if (minPayment !== undefined && minPayment > 0) {
      this.logTaskProgress(task.id, `Looking for tasks paying at least $${minPayment}`);
    }
    
    // Execute with custom step timings for Clickworker
    await this.executeTaskSteps(task, steps, 8000, 20000);
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
