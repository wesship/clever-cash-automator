
import { z } from "zod";

export enum TaskStatus {
  PENDING = 'pending',
  RUNNING = 'running',
  COMPLETED = 'completed',
  FAILED = 'failed',
  PAUSED = 'paused',
}

export enum TaskType {
  SURVEY = 'survey',
  DATA_COLLECTION = 'data_collection',
  VALIDATION = 'validation',
  PROCESSING = 'processing',
  REPORTING = 'reporting',
  
  // Additional task types that seem to be used in the application
  VIDEO_WATCH = 'video_watch',
  AD_CLICK = 'ad_click',
  CONTENT_CREATION = 'content_creation',
  AFFILIATE = 'affiliate',
  CUSTOM = 'custom',
}

export enum PlatformType {
  CUSTOM = 'custom',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
  
  // Additional platform types that seem to be used in the application
  SWAGBUCKS = 'swagbucks',
  AMAZON_MECHANICAL_TURK = 'amazon_mechanical_turk',
  CLICKWORKER = 'clickworker',
  FIVERR = 'fiverr',
  UPWORK = 'upwork',
  NEOBUX = 'neobux',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

// Add the missing RecurrencePattern enum
export enum RecurrencePattern {
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  CUSTOM = 'custom',
}

// Add TaskSchedule interface
export interface TaskSchedule {
  frequency: string;
  timeOfDay?: string;
  maxRuns: number;
  startDate?: Date;
  endDate?: Date;
  daysOfWeek?: number[];
  daysOfMonth?: number[];
  recurrencePattern?: RecurrencePattern;
  repeatEvery?: number;
  recurrenceEndAfter?: number;
  customCron?: string;
}

// Define TaskDependency interface which is used in DependenciesField.tsx
export interface TaskDependency {
  taskId: string;
  condition: "completed" | "failed" | "any";
}

export interface Task {
  id: string;
  name: string;
  description: string;
  type: TaskType;
  platform: PlatformType;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number; // This was missing but is required
  currentStep?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  
  // Additional properties used in various components
  config?: {
    proxyRequired?: boolean;
    captchaHandling?: boolean;
    schedule?: TaskSchedule;
    id?: string;
    platform?: string;
    // Add taskSpecific and taskTags properties
    taskSpecific?: {
      category?: string;
      labels?: string[];
      estimatedDuration?: number;
      [key: string]: any;
    };
    taskTags?: string[];
    dependencies?: TaskDependency[];
    notifyOnCompletion?: boolean;
    notifyOnFailure?: boolean;
    retryStrategy?: {
      maxRetries: number;
      delayBetweenRetries: number;
    };
  };
  lastRun?: Date;
  completionCount?: number;
  targetCompletions?: number;
  earnings?: number;
  
  logs?: Array<{
    timestamp: Date;
    message: string;
    type: 'info' | 'warning' | 'error' | 'debug';
    data?: any;
  }>;
}

// Update Statistics interface for DashboardOverview.tsx with all required fields
export interface Statistics {
  totalTasks: number;
  completedTasks: number;
  pendingTasks: number;
  failedTasks: number;
  totalEarnings: number;
  successRate: number;
  
  // Additional properties used in StatisticsPanel.tsx
  tasksCompleted: number;
  taskSuccessRate: number;
  activeAccounts: number;
  earningsToday: number;
  earningsThisWeek: number;
}
