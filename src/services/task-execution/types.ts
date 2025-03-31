
import { PlatformError } from "@/lib/error-handling";

/**
 * Task execution states and configuration
 */
export interface TaskExecutionState {
  isRunning: boolean;
  progress: number;
  currentStepDescription: string;
  startTime?: Date;
  endTime?: Date;
  logs: string[];
  errors: string[];
  lastError?: PlatformError;
  retryAttempts: number;
}
