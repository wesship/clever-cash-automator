import { 
  Task, 
  TaskConfiguration, 
  TaskState, 
  TaskLogEntry 
} from '@/lib/task-models';
import { ErrorService } from '../error-service';
import { PlatformError } from '@/lib/error-handling';

// Tracking task execution states
const taskStates: Map<string, {
  isRunning: boolean;
  progress: number;
  currentStepDescription: string;
  logs: string[];
  errors: string[];
  startTime?: Date;
  endTime?: Date;
  lastError?: PlatformError;
  isCancelled?: boolean;
  retryAttempts: number;
}> = new Map();

export class TaskStateManager {
  // Initialize a new task's state
  static initializeTaskState(taskId: string): void {
    taskStates.set(taskId, {
      isRunning: true,
      progress: 0,
      currentStepDescription: 'Waiting to start',
      logs: ['Task created and waiting to start'],
      errors: [],
      startTime: new Date(),
      retryAttempts: 0
    });
  }

  initializeTaskState(config: TaskConfiguration): Task {
    const initialState: TaskState = {
      status: 'pending',
      progress: 0,
      currentStep: 'Waiting to start',
      logs: [this.createLogEntry('Task created and waiting to start', 'info')],
      retryCount: 0
    };
    
    const task = {
      config,
      state: initialState
    };
    
    // Also store the state in our tracking map
    TaskStateManager.initializeTaskState(config.id);
    
    return task;
  }

  // Check if a task is currently running
  static isTaskRunning(taskId: string): boolean {
    const state = taskStates.get(taskId);
    return !!state?.isRunning;
  }

  // Stop a running task
  static stopTask(taskId: string): boolean {
    const state = taskStates.get(taskId);
    if (!state || !state.isRunning) {
      return false;
    }
    
    state.isRunning = false;
    taskStates.set(taskId, state);
    return true;
  }

  // Cancel a task completely
  static cancelTask(taskId: string): boolean {
    const state = taskStates.get(taskId);
    if (!state) {
      return false;
    }
    
    state.isRunning = false;
    state.isCancelled = true;
    state.endTime = new Date();
    taskStates.set(taskId, state);
    return true;
  }

  // Get the current state of a task
  static getTaskState(taskId: string) {
    return taskStates.get(taskId);
  }

  // Get the last error for a task
  static getLastError(taskId: string): PlatformError | undefined {
    return taskStates.get(taskId)?.lastError;
  }

  // Complete a task execution
  static finishTask(taskId: string, success: boolean, error?: PlatformError): void {
    const state = taskStates.get(taskId);
    if (!state) {
      return;
    }
    
    state.isRunning = false;
    state.endTime = new Date();
    
    if (!success && error) {
      state.lastError = error;
      state.errors.push(`Error: ${error.getUserFriendlyMessage()}`);
    }
    
    taskStates.set(taskId, state);
  }

  // Prepare a task for retry
  static prepareForRetry(taskId: string): void {
    const state = taskStates.get(taskId);
    if (!state) {
      return;
    }
    
    state.isRunning = true;
    state.progress = 0;
    state.retryAttempts++;
    state.lastError = undefined;
    state.startTime = new Date();
    state.endTime = undefined;
    
    taskStates.set(taskId, state);
  }

  // Update task progress
  static updateProgress(taskId: string, progress: number, description: string): void {
    const state = taskStates.get(taskId);
    if (!state) {
      return;
    }
    
    // Clamp progress between 0-100
    const validProgress = Math.max(0, Math.min(100, progress));
    
    state.progress = validProgress;
    state.currentStepDescription = description;
    
    taskStates.set(taskId, state);
  }

  // Log progress to task history
  static logTaskProgress(taskId: string, message: string, isError: boolean = false): void {
    const state = taskStates.get(taskId);
    if (!state) {
      return;
    }
    
    if (isError) {
      state.errors.push(message);
    } else {
      state.logs.push(message);
    }
    
    taskStates.set(taskId, state);
  }

  updateProgress(task: Task, progress: number, stepDescription: string): Task {
    if (task.state.status !== 'in_progress') {
      const error = new Error(`Cannot update progress for task in ${task.state.status} state`);
      ErrorService.log(error);
      throw error;
    }
    
    const validProgress = Math.max(0, Math.min(100, progress));
    
    const shouldLogUpdate = 
      stepDescription !== task.state.currentStep || 
      Math.abs(validProgress - task.state.progress) >= 10;
    
    const updatedLogs = shouldLogUpdate
      ? [...task.state.logs, this.createLogEntry(`Progress ${validProgress}%: ${stepDescription}`, 'info')]
      : task.state.logs;
    
    // Update the task state in our static tracking as well
    TaskStateManager.updateProgress(task.config.id, validProgress, stepDescription);
    if (shouldLogUpdate) {
      TaskStateManager.logTaskProgress(task.config.id, `Progress ${validProgress}%: ${stepDescription}`);
    }
    
    return {
      ...task,
      state: {
        ...task.state,
        progress: validProgress,
        currentStep: stepDescription,
        logs: updatedLogs
      }
    };
  }

  private createLogEntry(
    message: string, 
    type: TaskLogEntry['type'] = 'info',
    data?: any
  ): TaskLogEntry {
    return {
      timestamp: new Date(),
      message,
      type,
      data
    };
  }
}

export const taskStateManager = new TaskStateManager();
