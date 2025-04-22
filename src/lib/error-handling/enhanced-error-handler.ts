
import { PlatformError } from "./platform-error";
import { ErrorType } from "./types";
import { ErrorSeverity, EnhancedErrorOptions } from "./types/error-severity";
import { ErrorClassifier } from "./services/error-classifier";
import { RecoverySuggestions } from "./services/recovery-suggestions";
import { ErrorNotifier } from "./services/error-notifier";

export { ErrorSeverity, type EnhancedErrorOptions };

export class EnhancedErrorHandler {
  private static errors: Map<string, PlatformError[]> = new Map();
  private static errorListeners: Set<(error: PlatformError) => void> = new Set();
  
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
      ErrorNotifier.showErrorNotification(platformError);
    }
    
    // Log to server if requested
    if (options.logToServer) {
      ErrorNotifier.logErrorToServer(platformError);
    }
    
    // Notify listeners
    this.notifyListeners(platformError);
    
    return platformError;
  }
  
  public static getErrorsForTask(taskId: string): PlatformError[] {
    return this.errors.get(taskId) || [];
  }
  
  public static clearErrorsForTask(taskId: string): void {
    this.errors.delete(taskId);
  }
  
  public static addErrorListener(listener: (error: PlatformError) => void): void {
    this.errorListeners.add(listener);
  }
  
  public static removeErrorListener(listener: (error: PlatformError) => void): void {
    this.errorListeners.delete(listener);
  }
  
  public static isRetryable(error: PlatformError): boolean {
    return ErrorClassifier.isRetryable(error);
  }
  
  public static getSeverity(error: PlatformError): ErrorSeverity {
    return ErrorClassifier.getSeverity(error);
  }
  
  public static getRecoverySteps(error: PlatformError): string[] {
    return RecoverySuggestions.getRecoverySteps(error);
  }
  
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
