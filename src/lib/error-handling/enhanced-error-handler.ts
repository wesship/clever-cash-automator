
import { PlatformError } from "@/lib/error-handling";
import { toast } from "sonner";
import { ErrorType } from "./types";

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

export class EnhancedErrorHandler {
  private static errors: Map<string, PlatformError[]> = new Map();
  private static errorListeners: Set<(error: PlatformError) => void> = new Set();
  
  /**
   * Handle an error with enhanced options
   */
  public static handleError(error: Error | PlatformError, options: EnhancedErrorOptions = {}): PlatformError {
    // Convert to PlatformError if it's a regular Error
    const platformError = error instanceof PlatformError 
      ? error 
      : new PlatformError(error.message, {
          type: ErrorType.UNKNOWN,
          platformId: "unknown",
          code: "UNKNOWN_ERROR",
          cause: error
        });
    
    // Add context to the error
    if (options.context) {
      platformError.context = {
        ...platformError.context,
        ...options.context
      };
    }
    
    // Add task ID if provided
    if (options.taskId) {
      platformError.context = {
        ...platformError.context,
        taskId: options.taskId
      };
      
      // Store the error for the task
      const taskErrors = this.errors.get(options.taskId) || [];
      taskErrors.push(platformError);
      this.errors.set(options.taskId, taskErrors);
    }
    
    // Add severity if provided
    if (options.severity) {
      platformError.context = {
        ...platformError.context,
        severity: options.severity
      };
    }
    
    // Add retryable flag if provided
    if (options.retryable !== undefined) {
      platformError.context = {
        ...platformError.context,
        retryable: options.retryable
      };
    }
    
    // Log to console
    console.error(`[${options.severity || 'MEDIUM'}] Error:`, platformError.message, platformError);
    
    // Display to user if requested
    if (options.displayToUser) {
      toast.error(platformError.getUserFriendlyMessage());
    }
    
    // Log to server if requested (mock implementation)
    if (options.logToServer) {
      this.logErrorToServer(platformError);
    }
    
    // Notify listeners
    this.notifyListeners(platformError);
    
    return platformError;
  }
  
  /**
   * Get all errors for a task
   */
  public static getErrorsForTask(taskId: string): PlatformError[] {
    return this.errors.get(taskId) || [];
  }
  
  /**
   * Clear errors for a task
   */
  public static clearErrorsForTask(taskId: string): void {
    this.errors.delete(taskId);
  }
  
  /**
   * Add an error listener
   */
  public static addErrorListener(listener: (error: PlatformError) => void): void {
    this.errorListeners.add(listener);
  }
  
  /**
   * Remove an error listener
   */
  public static removeErrorListener(listener: (error: PlatformError) => void): void {
    this.errorListeners.delete(listener);
  }
  
  /**
   * Determine if an error is retryable
   */
  public static isRetryable(error: PlatformError): boolean {
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
  
  /**
   * Get the severity of an error
   */
  public static getSeverity(error: PlatformError): ErrorSeverity {
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
  
  /**
   * Create a descriptive error message with recovery steps
   */
  public static getRecoverySteps(error: PlatformError): string[] {
    const steps: string[] = [];
    
    switch (error.code) {
      case "AUTH_ERROR":
        steps.push("Check your account credentials");
        steps.push("Ensure your account is not locked");
        steps.push("Try logging out and logging back in");
        break;
        
      case "NETWORK_ERROR":
        steps.push("Check your internet connection");
        steps.push("Ensure your proxy settings are correct (if used)");
        steps.push("Try again in a few minutes");
        break;
        
      case "TIMEOUT_ERROR":
        steps.push("The operation timed out, try again");
        steps.push("Consider increasing timeout settings");
        steps.push("Check if the platform is experiencing high load");
        break;
        
      case "RATE_LIMIT_ERROR":
        steps.push("You've reached a rate limit, wait before trying again");
        steps.push("Consider reducing concurrent task execution");
        steps.push("Distribute tasks across more accounts if available");
        break;
        
      case "VALIDATION_ERROR":
        steps.push("Check the task parameters for errors");
        steps.push("Ensure all required fields are provided");
        steps.push("Verify that values are within allowed ranges");
        break;
        
      default:
        steps.push("Try the operation again");
        steps.push("Check task configuration for errors");
        steps.push("Contact support if the issue persists");
        break;
    }
    
    return steps;
  }
  
  /**
   * Mock implementation of logging to server
   */
  private static logErrorToServer(error: PlatformError): void {
    // In a real app, this would send the error to a server
    console.log("Logging error to server:", error);
  }
  
  /**
   * Notify all listeners about an error
   */
  private static notifyListeners(error: PlatformError): void {
    this.errorListeners.forEach(listener => {
      try {
        listener(error);
      } catch (listenerError) {
        console.error("Error in error listener:", listenerError);
      }
    });
  }
}

export default EnhancedErrorHandler;
