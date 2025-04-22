
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
}

export enum PlatformType {
  CUSTOM = 'custom',
  YOUTUBE = 'youtube',
  INSTAGRAM = 'instagram',
  FACEBOOK = 'facebook',
  TWITTER = 'twitter',
}

export enum TaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical',
}

export interface Task {
  id: string;
  name: string;
  description: string;
  type: TaskType;
  platform: PlatformType;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number;
  currentStep?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  logs?: Array<{
    timestamp: Date;
    message: string;
    type: 'info' | 'warning' | 'error' | 'debug';
    data?: any;
  }>;
}
