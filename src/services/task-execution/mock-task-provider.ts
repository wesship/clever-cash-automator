import { Task, TaskType, PlatformType, TaskStatus, TaskPriority } from '@/lib/types';

// Mock task data provider
export class MockTaskProvider {
  static getTasks(): Task[] {
    const now = new Date();

    // Replace TIKTOK with an existing platform type
    const platforms = [
      PlatformType.YOUTUBE,
      PlatformType.INSTAGRAM,
      PlatformType.FACEBOOK,
      PlatformType.TWITTER,
      PlatformType.CUSTOM
    ];
    
    const taskTypes = Object.values(TaskType);
    const taskPriorities = Object.values(TaskPriority);

    const generateRandomTask = (index: number): Task => {
      const randomPlatform = platforms[Math.floor(Math.random() * platforms.length)];
      const randomTaskType = taskTypes[Math.floor(Math.random() * taskTypes.length)];
      const randomPriority = taskPriorities[Math.floor(Math.random() * taskPriorities.length)];

      return {
        id: `task-${index + 1}`,
        name: `Task ${index + 1}`,
        description: `This is a mock task ${index + 1} for ${randomPlatform}`,
        type: randomTaskType,
        platform: randomPlatform,
        status: TaskStatus.PENDING,
        priority: randomPriority,
        progress: Math.floor(Math.random() * 100),
        createdAt: new Date(now.getTime() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Up to 7 days ago
        completionCount: Math.floor(Math.random() * 10),
        targetCompletions: 10,
        earnings: Math.random() * 10,
        config: {
          proxyRequired: Math.random() < 0.5,
          captchaHandling: Math.random() < 0.5,
          schedule: {
            frequency: "daily",
            maxRuns: 5
          }
        },
        logs: [],
      };
    };

    const numberOfTasks = 15;
    const tasks = Array.from({ length: numberOfTasks }, (_, i) => generateRandomTask(i));
    return tasks;
  }

  // Add the getTaskFromId method
  static getTaskFromId(id: string): Task | null {
    const tasks = this.getTasks();
    return tasks.find(task => task.id === id) || null;
  }
}
