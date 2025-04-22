
import { NotificationManager } from "@/services/notification-manager";
import { Task, TaskType, PlatformType, TaskStatus, TaskPriority } from "@/lib/types";

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
      priority: TaskPriority.MEDIUM, // Add priority
      progress: 0, // Add required progress property
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
      priority: TaskPriority.LOW, // Add priority
      progress: 0, // Add required progress property
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
