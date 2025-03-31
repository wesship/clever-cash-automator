
import { Task, TaskStatus, TaskType, PlatformType, Statistics } from "@/lib/types";

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
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 10,
      },
    },
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
    config: {
      proxyRequired: false,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 5,
      },
    },
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
    config: {
      proxyRequired: true,
      captchaHandling: false,
      schedule: {
        frequency: "hourly",
        maxRuns: 24,
      },
    },
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
    config: {
      proxyRequired: false,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 10,
      },
    },
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
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "weekly",
        maxRuns: 3,
      },
    },
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
    config: {
      proxyRequired: false,
      captchaHandling: false,
      schedule: {
        frequency: "hourly",
        maxRuns: 12,
      },
    },
  },
];

// Mock statistics data
export const mockStatistics: Statistics = {
  totalEarnings: 116.05,
  tasksCompleted: 124,
  activeAccounts: 8,
  earningsToday: 12.35,
  earningsThisWeek: 58.45,
  earningsThisMonth: 116.05,
  taskSuccessRate: 87,
};
