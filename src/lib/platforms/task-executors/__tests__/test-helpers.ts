
import { Task, TaskType, PlatformType, TaskStatus } from "@/lib/types";

/**
 * Creates a mock task for testing purposes
 */
export function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: `test-${Date.now()}`,
    name: "Test Task",
    type: TaskType.VIDEO_WATCH,
    platform: PlatformType.YOUTUBE,
    status: TaskStatus.PENDING,
    createdAt: new Date(),
    completionCount: 0,
    targetCompletions: 10,
    earnings: 0,
    description: "Test task for testing",
    config: {
      proxyRequired: false,
      captchaHandling: false,
      schedule: {
        frequency: "daily",
        maxRuns: 5
      }
    },
    ...overrides
  };
}
