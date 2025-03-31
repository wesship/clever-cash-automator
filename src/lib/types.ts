
export enum TaskStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  PAUSED = "paused",
  CANCELLED = "cancelled"
}

export enum TaskType {
  AD_CLICK = "ad_click",
  SURVEY = "survey",
  VIDEO_WATCH = "video_watch",
  CONTENT_CREATION = "content_creation",
  AFFILIATE = "affiliate"
}

export enum PlatformType {
  SWAGBUCKS = "swagbucks",
  AMAZON_MECHANICAL_TURK = "amazon_mturk",
  UPWORK = "upwork",
  FIVERR = "fiverr",
  YOUTUBE = "youtube",
  CLICKWORKER = "clickworker",
  NEOBUX = "neobux",
  CUSTOM = "custom"
}

export interface Task {
  id: string;
  name: string;
  type: TaskType;
  platform: PlatformType;
  status: TaskStatus;
  createdAt: Date;
  lastRun?: Date;
  completionCount: number;
  targetCompletions: number;
  earnings: number;
  description: string;
  config: TaskConfig;
}

export interface TaskDependency {
  taskId: string;
  condition: "completed" | "failed" | "any";
}

export interface TaskConfig {
  accountIds?: string[];
  proxyRequired: boolean;
  captchaHandling: boolean;
  schedule?: {
    frequency: 'hourly' | 'daily' | 'weekly';
    timeOfDay?: string;
    daysOfWeek?: number[];
    maxRuns: number;
  };
  taskSpecific?: Record<string, any>;
  taskTags?: string[];
  dependencies?: TaskDependency[];
  templateId?: string;
  isTemplate?: boolean;
  notifyOnCompletion?: boolean;
  notifyOnFailure?: boolean;
  priority?: 'low' | 'normal' | 'high';
  retryStrategy?: {
    maxRetries: number;
    delayBetweenRetries: number;
  };
}

export interface Account {
  id: string;
  platform: PlatformType;
  username: string;
  status: 'active' | 'inactive' | 'flagged';
  lastUsed?: Date;
  proxy?: string;
  userAgent?: string;
}

export interface Statistics {
  totalEarnings: number;
  tasksCompleted: number;
  activeAccounts: number;
  earningsToday: number;
  earningsThisWeek: number;
  earningsThisMonth: number;
  taskSuccessRate: number;
}
