
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskPlatform = 'web' | 'mobile' | 'desktop' | 'api' | 'batch';
export type TaskType = 'extraction' | 'transformation' | 'analysis' | 'reporting' | 'notification';

export interface TaskConfiguration {
  id: string;
  name: string;
  description: string;
  type: TaskType;
  platform: TaskPlatform;
  priority: TaskPriority;
  maxRetries: number;
  timeout: number;
  parameters: Record<string, any>;
  dependencies?: string[];
}

export interface TaskState {
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  currentStep: string;
  logs: TaskLogEntry[];
  startTime?: Date;
  endTime?: Date;
  error?: Error;
  result?: any;
  retryCount: number;
}

export interface TaskLogEntry {
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'debug';
  data?: any;
}

export interface Task {
  config: TaskConfiguration;
  state: TaskState;
}
