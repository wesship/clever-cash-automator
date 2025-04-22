
import { PlatformError } from "../platform-error";
import { ErrorType } from "../types";

export class ErrorClassifier {
  static isRetryable(error: PlatformError): boolean {
    // Check if explicitly marked as retryable
    if (error.context?.retryable !== undefined) {
      return error.context.retryable;
    }
    
    // Common network errors are usually retryable
    if (
      error.code === "NETWORK_ERROR" ||
      error.code === "TIMEOUT_ERROR" ||
      error.code === "RATE_LIMIT_ERROR" ||
      error.code === "SERVER_ERROR"
    ) {
      return true;
    }
    
    // Authentication errors usually not retryable without intervention
    if (
      error.code === "AUTH_ERROR" ||
      error.code === "PERMISSION_ERROR" ||
      error.code === "ACCESS_DENIED"
    ) {
      return false;
    }
    
    // By default, allow retry
    return true;
  }

  static getSeverity(error: PlatformError): ErrorSeverity {
    // Check if explicitly marked with severity
    if (error.context?.severity) {
      return error.context.severity;
    }
    
    // Determine severity based on error code
    switch (error.code) {
      case "AUTH_ERROR":
      case "PERMISSION_ERROR":
      case "ACCESS_DENIED":
      case "DATA_LOSS":
        return ErrorSeverity.HIGH;
        
      case "NETWORK_ERROR":
      case "TIMEOUT_ERROR":
      case "RATE_LIMIT_ERROR":
      case "SERVER_ERROR":
        return ErrorSeverity.MEDIUM;
        
      case "VALIDATION_ERROR":
      case "NOT_FOUND":
        return ErrorSeverity.LOW;
        
      default:
        return ErrorSeverity.MEDIUM;
    }
  }
}
