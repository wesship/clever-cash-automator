
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
      errorMessage.includes("socket") ||
      errorMessage.includes("unreachable") ||
      errorMessage.includes("DNS") ||
      errorMessage.includes("proxy")
    ) {
      return {
        type: ErrorType.NETWORK,
        recoverable: true,
        message: `Network error while connecting to ${platformId}: ${errorMessage}`,
        suggestion: "Check your internet connection or proxy settings and try again"
      };
    }
    
    // Authentication errors
    if (
      errorMessage.includes("auth") ||
      errorMessage.includes("login") ||
      errorMessage.includes("credentials") ||
      errorMessage.includes("password") ||
      errorMessage.includes("unauthorized") ||
      errorMessage.includes("401") ||
      errorMessage.includes("token")
    ) {
      return {
        type: ErrorType.AUTHENTICATION,
        recoverable: false,
        message: `Authentication failed on ${platformId}: ${errorMessage}`,
        suggestion: "Verify your login credentials or reset your account authentication"
      };
    }
    
    // Rate limiting
    if (
      errorMessage.includes("rate") ||
      errorMessage.includes("limit") ||
      errorMessage.includes("too many") ||
      errorMessage.includes("429") ||
      errorMessage.includes("throttled") ||
      errorMessage.includes("quota")
    ) {
      return {
        type: ErrorType.RATE_LIMIT,
        recoverable: true,
        message: `Rate limit reached on ${platformId}: ${errorMessage}`,
        suggestion: "Wait a moment before trying again or reduce request frequency"
      };
    }
    
    // Platform availability issues
    if (
      errorMessage.includes("unavailable") ||
      errorMessage.includes("down") ||
      errorMessage.includes("maintenance") ||
      errorMessage.includes("503") ||
      errorMessage.includes("502") ||
      errorMessage.includes("overloaded") ||
      errorMessage.includes("server")
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
      errorMessage.includes("robot") ||
      errorMessage.includes("human") ||
      errorMessage.includes("prove")
    ) {
      return {
        type: ErrorType.VALIDATION,
        recoverable: true,
        message: `Captcha or verification challenge encountered: ${errorMessage}`,
        suggestion: "You may need to manually verify your account or solve a captcha"
      };
    }
    
    // Content restrictions or violations
    if (
      errorMessage.includes("content") ||
      errorMessage.includes("violation") ||
      errorMessage.includes("policy") ||
      errorMessage.includes("guidelines") ||
      errorMessage.includes("terms") ||
      errorMessage.includes("banned") ||
      errorMessage.includes("restricted")
    ) {
      return {
        type: ErrorType.VALIDATION,
        recoverable: false,
        message: `Content policy violation: ${errorMessage}`,
        suggestion: "Review the platform's content policies and adjust your task accordingly"
      };
    }
    
    // Browser or rendering issues
    if (
      errorMessage.includes("browser") ||
      errorMessage.includes("render") ||
      errorMessage.includes("display") ||
      errorMessage.includes("screen") ||
      errorMessage.includes("element") ||
      errorMessage.includes("DOM") ||
      errorMessage.includes("script")
    ) {
      return {
        type: ErrorType.UNKNOWN,
        recoverable: true,
        message: `Browser rendering issue: ${errorMessage}`,
        suggestion: "Try using a different browser or update your browser settings"
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
