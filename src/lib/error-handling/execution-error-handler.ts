
import { ErrorType } from "./types";
import { PlatformError } from "./platform-error";

interface ErrorClassification {
  type: ErrorType;
  recoverable: boolean;
  message: string;
  suggestion?: string;
}

/**
 * Enhanced error analysis and classification for task execution errors
 */
export class ExecutionErrorHandler {
  /**
   * Classify an error based on its message and stack trace
   */
  static classifyError(error: Error | unknown, platformId: string): ErrorClassification {
    const errorMessage = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack || "" : "";
    
    // Network errors
    if (
      errorMessage.includes("network") || 
      errorMessage.includes("connection") ||
      errorMessage.includes("timeout") ||
      errorMessage.includes("ECONNREFUSED") ||
      errorMessage.includes("socket")
    ) {
      return {
        type: ErrorType.NETWORK,
        recoverable: true,
        message: `Network error while connecting to ${platformId}: ${errorMessage}`,
        suggestion: "Check your internet connection and try again"
      };
    }
    
    // Authentication errors
    if (
      errorMessage.includes("auth") ||
      errorMessage.includes("login") ||
      errorMessage.includes("credentials") ||
      errorMessage.includes("password") ||
      errorMessage.includes("unauthorized") ||
      errorMessage.includes("401")
    ) {
      return {
        type: ErrorType.AUTHENTICATION,
        recoverable: false,
        message: `Authentication failed on ${platformId}: ${errorMessage}`,
        suggestion: "Verify your login credentials"
      };
    }
    
    // Rate limiting
    if (
      errorMessage.includes("rate") ||
      errorMessage.includes("limit") ||
      errorMessage.includes("too many") ||
      errorMessage.includes("429")
    ) {
      return {
        type: ErrorType.RATE_LIMIT,
        recoverable: true,
        message: `Rate limit reached on ${platformId}: ${errorMessage}`,
        suggestion: "Wait a moment before trying again"
      };
    }
    
    // Platform availability issues
    if (
      errorMessage.includes("unavailable") ||
      errorMessage.includes("down") ||
      errorMessage.includes("maintenance") ||
      errorMessage.includes("503")
    ) {
      return {
        type: ErrorType.PLATFORM_UNAVAILABLE,
        recoverable: true,
        message: `Platform unavailable: ${errorMessage}`,
        suggestion: "The platform may be temporarily unavailable. Try again later"
      };
    }
    
    // Captcha or verification challenges
    if (
      errorMessage.includes("captcha") ||
      errorMessage.includes("verification") ||
      errorMessage.includes("challenge") ||
      errorMessage.includes("robot")
    ) {
      return {
        type: ErrorType.VALIDATION,
        recoverable: true,
        message: `Captcha or verification challenge encountered: ${errorMessage}`,
        suggestion: "You may need to manually verify your account"
      };
    }
    
    // Default case - unknown error
    return {
      type: ErrorType.UNKNOWN,
      recoverable: false,
      message: `Unexpected error: ${errorMessage}`,
      suggestion: "Check the task configuration and try again"
    };
  }
  
  /**
   * Create a PlatformError from an unknown error
   */
  static createPlatformError(error: unknown, platformId: string): PlatformError {
    const classification = this.classifyError(error, platformId);
    
    return new PlatformError(
      classification.message,
      {
        type: classification.type,
        platformId,
        recoverable: classification.recoverable,
        cause: error instanceof Error ? error : undefined,
        details: { suggestion: classification.suggestion }
      }
    );
  }
}
