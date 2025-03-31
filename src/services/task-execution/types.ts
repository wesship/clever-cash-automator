
import { PlatformError } from "@/lib/error-handling";

export interface TaskExecutionState {
  isRunning: boolean;
  progress: number; // 0-100
  currentStepDescription: string;
  startTime: Date;
  endTime?: Date;
  logs: string[];
  errors: string[];
  lastError?: PlatformError;
  retryAttempts: number;
  isCancelled?: boolean;
}

export interface TaskExecutionResult {
  success: boolean;
  message: string;
  error?: PlatformError;
  logs: string[];
  executionTime: number; // in milliseconds
}

export interface TaskExecutionOptions {
  timeout?: number; // in milliseconds
  retryOnError?: boolean;
  maxRetries?: number;
  retryDelay?: number; // in milliseconds
}

export interface TaskScheduleOptions {
  startAt?: Date;
  repeatEvery?: number; // in minutes
  maxRuns?: number;
}
