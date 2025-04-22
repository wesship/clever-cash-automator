
import { TaskController } from "../task-controller";
import { Task, TaskType, PlatformType, TaskStatus, TaskPriority } from "@/lib/types";
import { TaskStateManager } from "../task-state-manager";
import { PlatformError } from "@/lib/error-handling";
import { ErrorType } from "@/lib/error-handling/types";

describe('TaskController', () => {
  beforeEach(() => {
    // Clear task states before each test
    TaskStateManager.clearAllTaskStates();
  });
  
  afterEach(() => {
    // Ensure task states are cleared after each test
    TaskStateManager.clearAllTaskStates();
  });
  
  it('should start a task successfully', async () => {
    // Create a mock task
    const mockTask: Task = {
      id: "test-task",
      name: "Test Task",
      type: TaskType.VIDEO_WATCH,
      platform: PlatformType.YOUTUBE,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: 10,
      earnings: 0,
      description: "Test task for controller testing",
      priority: TaskPriority.MEDIUM,
      progress: 0, // Add progress property
      config: {
        proxyRequired: false,
        captchaHandling: false,
        schedule: {
          frequency: "daily",
          maxRuns: 5
        }
      }
    };
    
    // Start the task
    const result = await TaskController.startTask(mockTask);
    
    // Check that the task was started
    expect(result).toBe(true);
    
    // Check that the task state was initialized
    expect(TaskStateManager.isTaskRunning(mockTask.id)).toBe(true);
  });
  
  it('should stop a task successfully', () => {
    // Initialize a task state
    TaskStateManager.initializeTaskState("test-task");
    
    // Stop the task
    const result = TaskController.stopTask("test-task");
    
    // Check that the task was stopped
    expect(result).toBe(true);
    
    // Check that the task is no longer running
    expect(TaskStateManager.isTaskRunning("test-task")).toBe(false);
  });
  
  it('should cancel a task successfully', () => {
    // Initialize a task state
    TaskStateManager.initializeTaskState("test-task");
    
    // Cancel the task
    const result = TaskController.cancelTask("test-task");
    
    // Check that the task was cancelled
    expect(result).toBe(true);
    
    // Check that the task is no longer running
    expect(TaskStateManager.isTaskRunning("test-task")).toBe(false);
  });
  
  it('should retry a task successfully', async () => {
    // Initialize a task state
    TaskStateManager.initializeTaskState("test-task");
    
    // Mark the task as finished with an error
    TaskStateManager.finishTask("test-task", false, new PlatformError("Test error", {
      type: ErrorType.UNKNOWN,
      recoverable: true
    }));
    
    // Retry the task
    const result = await TaskController.retryTask("test-task");
    
    // Check that the task was retried
    expect(result).toBe(true);
    
    // Check that the task is running again
    expect(TaskStateManager.isTaskRunning("test-task")).toBe(true);
  });
});
