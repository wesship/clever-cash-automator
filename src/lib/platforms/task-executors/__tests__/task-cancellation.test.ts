
import { TaskExecutionEngine } from "@/services/task-execution";
import { Task, TaskType, PlatformType, TaskStatus } from "@/lib/types";

describe('Task Cancellation', () => {
  let mockTask: Task;
  
  beforeEach(() => {
    // Create mock task for testing
    mockTask = {
      id: `test-${Date.now()}`,
      name: "Test Task",
      type: TaskType.VIDEO_WATCH,
      platform: PlatformType.YOUTUBE,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: 10,
      earnings: 0,
      description: "Test task for cancellation testing",
      config: {
        proxyRequired: false,
        captchaHandling: false,
        schedule: {
          frequency: "daily",
          maxRuns: 5
        }
      }
    };
  });
  
  it('should mark a task as cancelled when canceled', async () => {
    // Start the task
    await TaskExecutionEngine.startTask(mockTask);
    
    // Check that it's running
    expect(TaskExecutionEngine.isTaskRunning(mockTask.id)).toBe(true);
    
    // Cancel the task
    const result = TaskExecutionEngine.cancelTask(mockTask.id);
    expect(result).toBe(true);
    
    // Check that it's not running
    expect(TaskExecutionEngine.isTaskRunning(mockTask.id)).toBe(false);
    
    // Check that it was marked as cancelled
    const state = TaskExecutionEngine.getTaskState(mockTask.id);
    expect(state?.isCancelled).toBe(true);
  });
});
