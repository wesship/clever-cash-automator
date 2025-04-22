
export enum ErrorSeverity {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  CRITICAL = "critical"
}

export interface EnhancedErrorOptions {
  taskId?: string;
  severity?: ErrorSeverity;
  retryable?: boolean;
  context?: Record<string, any>;
  displayToUser?: boolean;
  logToServer?: boolean;
}
