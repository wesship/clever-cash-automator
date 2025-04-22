import { Task, TaskType, PlatformType, TaskStatus, TaskPriority } from "@/lib/types";

export class MockTaskProvider {
  static tasks: Task[] = [
    {
      id: "task-1",
      name: "Complete Survey for $2",
      type: TaskType.SURVEY,
      platform: PlatformType.AMAZON_MECHANICAL_TURK,
      status: TaskStatus.RUNNING,
      createdAt: new Date(),
      completionCount: 5,
      targetCompletions: 10,
      earnings: 10,
      description: "Complete a 5-minute survey about shopping habits",
      priority: TaskPriority.MEDIUM,
      progress: 50, // Add progress property
      config: {
        proxyRequired: true,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 1
        }
      }
    },
    {
      id: "task-2",
      name: "Watch YouTube Video",
      type: TaskType.VIDEO_WATCH,
      platform: PlatformType.YOUTUBE,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: 1,
      earnings: 0.5,
      description: "Watch a 3-minute video and like it",
      priority: TaskPriority.LOW,
      progress: 0, // Add progress property
      config: {
        proxyRequired: false,
        captchaHandling: false,
        schedule: {
          frequency: "daily",
          maxRuns: 5
        }
      }
    },
    {
      id: "task-3",
      name: "Click Ads on Website",
      type: TaskType.AD_CLICK,
      platform: PlatformType.SWAGBUCKS,
      status: TaskStatus.COMPLETED,
      createdAt: new Date(),
      completionCount: 20,
      targetCompletions: 20,
      earnings: 5,
      description: "Click on 5 ads on a specific website",
      priority: TaskPriority.HIGH,
      progress: 100, // Add progress property
      config: {
        proxyRequired: true,
        captchaHandling: false,
        schedule: {
          frequency: "daily",
          maxRuns: 10
        }
      }
    },
    {
      id: "task-4",
      name: "Create Content for TikTok",
      type: TaskType.CONTENT_CREATION,
      platform: PlatformType.TIKTOK,
      status: TaskStatus.PAUSED,
      createdAt: new Date(),
      completionCount: 2,
      targetCompletions: 5,
      earnings: 15,
      description: "Create a short video about a product",
      priority: TaskPriority.MEDIUM,
      progress: 40, // Add progress property
      config: {
        proxyRequired: false,
        captchaHandling: true,
        schedule: {
          frequency: "weekly",
          maxRuns: 2
        }
      }
    },
    {
      id: "task-5",
      name: "Promote Affiliate Link",
      type: TaskType.AFFILIATE,
      platform: PlatformType.FACEBOOK,
      status: TaskStatus.FAILED,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: 100,
      earnings: 0,
      description: "Share an affiliate link in relevant Facebook groups",
      priority: TaskPriority.HIGH,
      progress: 0, // Add progress property
      config: {
        proxyRequired: true,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 1
        }
      }
    }
  ];

  static getTaskFromId(taskId: string): Task | undefined {
    return this.tasks.find(task => task.id === taskId);
  }
}
