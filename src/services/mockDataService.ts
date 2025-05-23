import { Task, TaskStatus, TaskType, PlatformType, Statistics, TaskPriority } from "@/lib/types";

// Mock tasks data
export const mockTasks: Task[] = [
  {
    id: "1",
    name: "Swagbucks Ad Clicks",
    type: TaskType.AD_CLICK,
    platform: PlatformType.SWAGBUCKS,
    status: TaskStatus.RUNNING,
    createdAt: new Date(Date.now() - 86400000 * 2),
    lastRun: new Date(Date.now() - 3600000),
    completionCount: 42,
    targetCompletions: 100,
    earnings: 12.50,
    description: "Automatically click on Swagbucks ads to earn SB points.",
    priority: TaskPriority.HIGH,
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 10,
      },
    },
    progress: 75,
  },
  {
    id: "2",
    name: "MTurk Survey Completion",
    type: TaskType.SURVEY,
    platform: PlatformType.AMAZON_MECHANICAL_TURK,
    status: TaskStatus.PENDING,
    createdAt: new Date(Date.now() - 86400000),
    completionCount: 0,
    targetCompletions: 20,
    earnings: 0,
    description: "Automatically complete simple surveys on Amazon Mechanical Turk.",
    priority: TaskPriority.MEDIUM,
    config: {
      proxyRequired: false,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 5,
      },
    },
    progress: 0,
  },
  {
    id: "3",
    name: "YouTube Video Views",
    type: TaskType.VIDEO_WATCH,
    platform: PlatformType.YOUTUBE,
    status: TaskStatus.COMPLETED,
    createdAt: new Date(Date.now() - 86400000 * 5),
    lastRun: new Date(Date.now() - 86400000),
    completionCount: 50,
    targetCompletions: 50,
    earnings: 25.75,
    description: "Watch YouTube videos to increase view count and engagement metrics.",
    priority: TaskPriority.LOW,
    config: {
      proxyRequired: true,
      captchaHandling: false,
      schedule: {
        frequency: "hourly",
        maxRuns: 24,
      },
    },
    progress: 100,
  },
  {
    id: "4",
    name: "Upwork Proposal Automation",
    type: TaskType.CONTENT_CREATION,
    platform: PlatformType.UPWORK,
    status: TaskStatus.PAUSED,
    createdAt: new Date(Date.now() - 86400000 * 10),
    lastRun: new Date(Date.now() - 86400000 * 2),
    completionCount: 15,
    targetCompletions: 30,
    earnings: 0,
    description: "Automatically generate and submit proposals for relevant Upwork jobs.",
    priority: TaskPriority.MEDIUM,
    config: {
      proxyRequired: false,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 10,
      },
    },
    progress: 45,
  },
  {
    id: "5",
    name: "Affiliate Link Posting",
    type: TaskType.AFFILIATE,
    platform: PlatformType.CUSTOM,
    status: TaskStatus.FAILED,
    createdAt: new Date(Date.now() - 86400000 * 3),
    lastRun: new Date(Date.now() - 43200000),
    completionCount: 5,
    targetCompletions: 40,
    earnings: 32.20,
    description: "Post affiliate links on relevant forums and social media groups.",
    priority: TaskPriority.HIGH,
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "weekly",
        maxRuns: 3,
      },
    },
    progress: 85,
  },
  {
    id: "6",
    name: "Fiverr Order Management",
    type: TaskType.CONTENT_CREATION,
    platform: PlatformType.FIVERR,
    status: TaskStatus.RUNNING,
    createdAt: new Date(Date.now() - 86400000 * 7),
    lastRun: new Date(Date.now() - 21600000),
    completionCount: 12,
    targetCompletions: 25,
    earnings: 45.60,
    description: "Automatically manage and respond to Fiverr orders and messages.",
    priority: TaskPriority.HIGH,
    config: {
      proxyRequired: false,
      captchaHandling: false,
      schedule: {
        frequency: "hourly",
        maxRuns: 12,
      },
    },
    progress: 60,
  },
  {
    id: "7",
    name: "Clickworker Microtasks",
    platform: PlatformType.CLICKWORKER,
    type: TaskType.CONTENT_CREATION,
    status: TaskStatus.PENDING,
    createdAt: new Date(Date.now() - 86400000 * 1),
    completionCount: 0,
    targetCompletions: 50,
    earnings: 0,
    description: "Complete data labeling and text creation microtasks on Clickworker.",
    priority: TaskPriority.LOW,
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 8,
      },
      taskSpecific: {
        clickworkerQualificationLevel: "intermediate",
        taskMinimumPayment: 0.50,
        taskMaxDuration: 10,
        useSpecificBrowser: "chrome"
      }
    },
    progress: 0,
  },
  {
    id: "8",
    name: "Neobux Ad Clicking",
    platform: PlatformType.NEOBUX,
    type: TaskType.AD_CLICK,
    status: TaskStatus.PENDING,
    createdAt: new Date(Date.now() - 86400000 * 1),
    completionCount: 0,
    targetCompletions: 30,
    earnings: 0,
    description: "Automatically click ads on Neobux to generate daily revenue.",
    priority: TaskPriority.MEDIUM,
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 1,
      },
      taskSpecific: {
        neobuxMembershipType: "golden",
        neobuxAdTypes: ["standard", "micro", "fixed", "adprize"],
        neobuxClickDelay: 7,
        neobuxAutoRecycle: true,
        useSpecificBrowser: "firefox"
      }
    },
    progress: 0,
  }
];

// Mock statistics data
export const mockStatistics = {
  totalTasks: 35,
  completedTasks: 21,
  pendingTasks: 7,
  failedTasks: 4,
  totalEarnings: 512.75,
  successRate: 87.5,
  
  // Additional properties used in StatisticsPanel
  tasksCompleted: 21,
  taskSuccessRate: 87.5,
  activeAccounts: 4,
  earningsToday: 78.50,
  earningsThisWeek: 238.25,
  earningsThisMonth: 512.75
};

// Add the missing progress property to all tasks
export const getMockTasks = (): Task[] => {
  return [
    {
      id: "1",
      name: "Swagbucks Ad Clicks",
      type: TaskType.AD_CLICK,
      platform: PlatformType.SWAGBUCKS,
      status: TaskStatus.RUNNING,
      createdAt: new Date(Date.now() - 86400000 * 2),
      lastRun: new Date(Date.now() - 3600000),
      completionCount: 42,
      targetCompletions: 100,
      earnings: 12.50,
      description: "Automatically click on Swagbucks ads to earn SB points.",
      priority: TaskPriority.HIGH,
      config: {
        proxyRequired: true,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 10,
        },
      },
      progress: 75,
    },
    {
      id: "2",
      name: "MTurk Survey Completion",
      type: TaskType.SURVEY,
      platform: PlatformType.AMAZON_MECHANICAL_TURK,
      status: TaskStatus.PENDING,
      createdAt: new Date(Date.now() - 86400000),
      completionCount: 0,
      targetCompletions: 20,
      earnings: 0,
      description: "Automatically complete simple surveys on Amazon Mechanical Turk.",
      priority: TaskPriority.MEDIUM,
      config: {
        proxyRequired: false,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 5,
        },
      },
      progress: 0,
    },
    {
      id: "3",
      name: "YouTube Video Views",
      type: TaskType.VIDEO_WATCH,
      platform: PlatformType.YOUTUBE,
      status: TaskStatus.COMPLETED,
      createdAt: new Date(Date.now() - 86400000 * 5),
      lastRun: new Date(Date.now() - 86400000),
      completionCount: 50,
      targetCompletions: 50,
      earnings: 25.75,
      description: "Watch YouTube videos to increase view count and engagement metrics.",
      priority: TaskPriority.LOW,
      config: {
        proxyRequired: true,
        captchaHandling: false,
        schedule: {
          frequency: "hourly",
          maxRuns: 24,
        },
      },
      progress: 100,
    },
    {
      id: "4",
      name: "Upwork Proposal Automation",
      type: TaskType.CONTENT_CREATION,
      platform: PlatformType.UPWORK,
      status: TaskStatus.PAUSED,
      createdAt: new Date(Date.now() - 86400000 * 10),
      lastRun: new Date(Date.now() - 86400000 * 2),
      completionCount: 15,
      targetCompletions: 30,
      earnings: 0,
      description: "Automatically generate and submit proposals for relevant Upwork jobs.",
      priority: TaskPriority.MEDIUM,
      config: {
        proxyRequired: false,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 10,
        },
      },
      progress: 45,
    },
    {
      id: "5",
      name: "Affiliate Link Posting",
      type: TaskType.AFFILIATE,
      platform: PlatformType.CUSTOM,
      status: TaskStatus.FAILED,
      createdAt: new Date(Date.now() - 86400000 * 3),
      lastRun: new Date(Date.now() - 43200000),
      completionCount: 5,
      targetCompletions: 40,
      earnings: 32.20,
      description: "Post affiliate links on relevant forums and social media groups.",
      priority: TaskPriority.HIGH,
      config: {
        proxyRequired: true,
        captchaHandling: true,
        schedule: {
          frequency: "weekly",
          maxRuns: 3,
        },
      },
      progress: 85,
    },
    {
      id: "6",
      name: "Fiverr Order Management",
      type: TaskType.CONTENT_CREATION,
      platform: PlatformType.FIVERR,
      status: TaskStatus.RUNNING,
      createdAt: new Date(Date.now() - 86400000 * 7),
      lastRun: new Date(Date.now() - 21600000),
      completionCount: 12,
      targetCompletions: 25,
      earnings: 45.60,
      description: "Automatically manage and respond to Fiverr orders and messages.",
      priority: TaskPriority.HIGH,
      config: {
        proxyRequired: false,
        captchaHandling: false,
        schedule: {
          frequency: "hourly",
          maxRuns: 12,
        },
      },
      progress: 60,
    },
    {
      id: "7",
      name: "Clickworker Microtasks",
      platform: PlatformType.CLICKWORKER,
      type: TaskType.CONTENT_CREATION,
      status: TaskStatus.PENDING,
      createdAt: new Date(Date.now() - 86400000 * 1),
      completionCount: 0,
      targetCompletions: 50,
      earnings: 0,
      description: "Complete data labeling and text creation microtasks on Clickworker.",
      priority: TaskPriority.LOW,
      config: {
        proxyRequired: true,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 8,
        },
        taskSpecific: {
          clickworkerQualificationLevel: "intermediate",
          taskMinimumPayment: 0.50,
          taskMaxDuration: 10,
          useSpecificBrowser: "chrome"
        }
      },
      progress: 0,
    },
    {
      id: "8",
      name: "Neobux Ad Clicking",
      platform: PlatformType.NEOBUX,
      type: TaskType.AD_CLICK,
      status: TaskStatus.PENDING,
      createdAt: new Date(Date.now() - 86400000 * 1),
      completionCount: 0,
      targetCompletions: 30,
      earnings: 0,
      description: "Automatically click ads on Neobux to generate daily revenue.",
      priority: TaskPriority.MEDIUM,
      config: {
        proxyRequired: true,
        captchaHandling: true,
        schedule: {
          frequency: "daily",
          maxRuns: 1,
        },
        taskSpecific: {
          neobuxMembershipType: "golden",
          neobuxAdTypes: ["standard", "micro", "fixed", "adprize"],
          neobuxClickDelay: 7,
          neobuxAutoRecycle: true,
          useSpecificBrowser: "firefox"
        }
      },
      progress: 0,
    }
  ];
};

// Update mock statistics to include earningsThisMonth
export const getMockStatistics = (): Statistics => {
  return {
    totalTasks: 35,
    completedTasks: 21,
    pendingTasks: 7,
    failedTasks: 4,
    totalEarnings: 512.75,
    successRate: 87.5,
    tasksCompleted: 21,
    taskSuccessRate: 87.5,
    activeAccounts: 4,
    earningsToday: 78.50,
    earningsThisWeek: 238.25,
    earningsThisMonth: 512.75
  };
};
