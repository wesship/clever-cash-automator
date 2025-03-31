import { Task } from "@/lib/types";
import { PlatformError, ErrorType } from "@/lib/error-handling";

/**
 * Common error handling for platform adapters
 */
export function handleExecutionError(error: unknown, task: Task): PlatformError {
  // If already a PlatformError, return it
  if (error instanceof PlatformError) {
    return error;
  }
  
  // Otherwise examine the error and categorize it
  const errorMessage = error instanceof Error ? error.message : String(error);
  
  if (errorMessage.includes('network') || errorMessage.includes('connection') || 
      errorMessage.includes('timeout') || errorMessage.includes('unreachable')) {
    return PlatformError.network(
      `Network error while executing task ${task.id}`, 
      task.platform, 
      { taskId: task.id },
      error instanceof Error ? error : undefined
    );
  }
  
  if (errorMessage.includes('credentials') || errorMessage.includes('login') || 
      errorMessage.includes('auth') || errorMessage.includes('password')) {
    return PlatformError.authentication(
      `Authentication failed while executing task ${task.id}`, 
      task.platform,
      { taskId: task.id },
      error instanceof Error ? error : undefined
    );
  }
  
  // Default to unknown error
  return new PlatformError(
    `Error executing task ${task.id}: ${errorMessage}`, 
    { 
      type: ErrorType.UNKNOWN, 
      recoverable: false, 
      platformId: task.platform,
      details: { taskId: task.id },
      cause: error instanceof Error ? error : undefined
    }
  );
}

/**
 * Determine if the error allows retry
 */
export function canRetryAfterError(error: PlatformError): boolean {
  return error.recoverable;
}
