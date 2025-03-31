
import { delay, withTimeout, formatLogMessage } from "../utils";
import { TaskExecutionEngine } from "@/services/task-execution";
import { Task, TaskType, PlatformType, TaskStatus } from "@/lib/types";
import { NotificationManager } from "@/services/notification-manager";

describe('Task Executor Utilities', () => {
  // Test the delay function
  describe('delay', () => {
    it('should resolve after the specified time', async () => {
      const start = Date.now();
      await delay(100);
      const elapsed = Date.now() - start;
      
      // Allow some flexibility in timing (at least 90ms)
      expect(elapsed).toBeGreaterThanOrEqual(90);
    });
  });
  
  // Test the withTimeout function
  describe('withTimeout', () => {
    it('should resolve if the function completes before timeout', async () => {
      const result = await withTimeout(
        async () => {
          await delay(50);
          return 'success';
        },
        200
      );
      
      expect(result).toBe('success');
    });
    
    it('should reject if the function times out', async () => {
      await expect(
        withTimeout(
          () => delay(300),
          100,
          'Custom timeout message'
        )
      ).rejects.toThrow('Custom timeout message');
    });
    
    it('should reject with the default message if none provided', async () => {
      await expect(
        withTimeout(
          () => delay(300),
          100
        )
      ).rejects.toThrow('Operation timed out');
    });
    
    it('should propagate errors from the execution function', async () => {
      await expect(
        withTimeout(
          async () => {
            await delay(50);
            throw new Error('Function error');
          },
          200
        )
      ).rejects.toThrow('Function error');
    });
  });
  
  // Test the formatLogMessage function
  describe('formatLogMessage', () => {
    it('should format a log message with timestamp', () => {
      const message = 'Test message';
      const formattedMessage = formatLogMessage(message);
      
      // Should match pattern [ISO timestamp] Message
      expect(formattedMessage).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] Test message$/);
    });
    
    it('should handle empty messages', () => {
      const formattedMessage = formatLogMessage('');
      expect(formattedMessage).toMatch(/^\[\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\] $/);
    });
    
    it('should include nested structure in messages', () => {
      const nestedMessage = 'Parent > Child > Grandchild';
      const formattedMessage = formatLogMessage(nestedMessage);
      expect(formattedMessage).toContain('Parent > Child > Grandchild');
    });
    
    it('should properly format messages with special characters', () => {
      const specialMessage = 'Test: "quotes" and [brackets] & symbols!';
      const formattedMessage = formatLogMessage(specialMessage);
      expect(formattedMessage).toContain('Test: "quotes" and [brackets] & symbols!');
    });
  });

  // Test task cancellation functionality
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
  
  // Test notification functionality (mocked)
  describe('Notification Manager', () => {
    // Mock toast function
    const originalToast = global.toast;
    beforeEach(() => {
      global.toast = {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
      };
    });
    
    afterEach(() => {
      global.toast = originalToast;
    });
    
    it('should send notifications when enabled', () => {
      // Enable notifications
      NotificationManager.setNotificationsEnabled(true);
      
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
        description: "Test task for notification testing",
        config: {
          proxyRequired: false,
          captchaHandling: false,
          schedule: {
            frequency: "daily",
            maxRuns: 5
          }
        }
      };
      
      // Send notification
      NotificationManager.notifyTaskStatus(mockTask, TaskStatus.COMPLETED);
      
      // Verify toast was called
      expect(global.toast.success).toHaveBeenCalled();
    });
    
    it('should not send notifications when disabled', () => {
      // Disable notifications
      NotificationManager.setNotificationsEnabled(false);
      
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
        description: "Test task for notification testing",
        config: {
          proxyRequired: false,
          captchaHandling: false,
          schedule: {
            frequency: "daily",
            maxRuns: 5
          }
        }
      };
      
      // Send notification
      NotificationManager.notifyTaskStatus(mockTask, TaskStatus.COMPLETED);
      
      // Verify toast was not called
      expect(global.toast.success).not.toHaveBeenCalled();
    });
    
    it('should re-enable notifications', () => {
      // Re-enable notifications for other tests
      NotificationManager.setNotificationsEnabled(true);
      expect(NotificationManager.notificationsEnabled).toBe(true);
    });
  });
});
