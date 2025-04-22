
import { Task, TaskType, PlatformType, TaskStatus, TaskPriority } from "@/lib/types";

export function createMockTask(overrides: Partial<Task> = {}): Task {
  return {
    id: `test-${Date.now()}`,
    name: "Test Task",
    description: "A test task",
    type: TaskType.VIDEO_WATCH,
    platform: PlatformType.YOUTUBE,
    status: TaskStatus.PENDING,
    priority: TaskPriority.MEDIUM,
    progress: 0, // Make progress required
    currentStep: undefined,
    createdAt: new Date(),
    startedAt: undefined,
    completedAt: undefined,
    lastRun: undefined,
    completionCount: 0,
    targetCompletions: 10,
    earnings: 0,
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

// More helper functions as needed
