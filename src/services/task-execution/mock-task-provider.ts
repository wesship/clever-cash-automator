
import { Task, TaskStatus, TaskType, PlatformType, TaskPriority } from "@/lib/types";

/**
 * Mock task data provider for development/testing
 */
export class MockTaskProvider {
  /**
   * Helper function to get a task by ID (in a real app, this would retrieve from database)
   */
  static getTaskFromId(taskId: string): Task | null {
    // This is a mock implementation
    // In a real application, this would retrieve the task from a store or database
    const mockTask: Task = {
      id: taskId,
      name: "Mock Task",
      type: TaskType.SURVEY,
      platform: PlatformType.AMAZON_MECHANICAL_TURK,
      status: TaskStatus.RUNNING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: 10,
      earnings: 0,
      description: "Mock task for retry testing",
      priority: TaskPriority.MEDIUM, // Add priority
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
}
