
import { ErrorType } from "./types";

// Error properties interface
interface PlatformErrorOptions {
  type: ErrorType;
  platformId: string;
  details?: Record<string, any>;
  recoverable?: boolean; // Indicates if retrying the operation might succeed
  cause?: Error;
}

/**
 * Custom error class for platform-related errors
 */
export class PlatformError extends Error {
  readonly type: ErrorType;
  readonly platformId: string;
  readonly details: Record<string, any>;
  readonly recoverable: boolean;
  readonly cause?: Error;

  constructor(message: string, options: PlatformErrorOptions) {
    super(message);
    this.name = 'PlatformError';
    this.type = options.type;
    this.platformId = options.platformId;
    this.details = options.details || {};
    this.recoverable = options.recoverable !== undefined ? options.recoverable : false;
    this.cause = options.cause;

    // Maintains proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PlatformError);
    }
  }

  // Factory methods for common error types
  static network(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.NETWORK, 
      platformId, 
      details, 
      recoverable: true, 
      cause 
    });
  }

  static authentication(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.AUTHENTICATION, 
      platformId, 
      details, 
      recoverable: false, 
      cause 
    });
  }

  static authorization(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.AUTHORIZATION, 
      platformId, 
      details, 
      recoverable: false, 
      cause 
    });
  }

  static rateLimit(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.RATE_LIMIT, 
      platformId, 
      details, 
      recoverable: true, 
      cause 
    });
  }

  static platformUnavailable(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.PLATFORM_UNAVAILABLE, 
      platformId, 
      details, 
      recoverable: true, 
      cause 
    });
  }

  static validation(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.VALIDATION, 
      platformId, 
      details, 
      recoverable: false, 
      cause 
    });
  }

  // Returns a user-friendly error message 
  getUserFriendlyMessage(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return `Network error: ${this.message}`;
      case ErrorType.AUTHENTICATION:
        return `Authentication error: ${this.message}`;
      case ErrorType.AUTHORIZATION:
        return `Authorization error: ${this.message}`;
      case ErrorType.RATE_LIMIT:
        return `Rate limit exceeded: ${this.message}`;
      case ErrorType.PLATFORM_UNAVAILABLE:
        return `Platform unavailable: ${this.message}`;
      case ErrorType.VALIDATION:
        return `Validation error: ${this.message}`;
      default:
        return `Error: ${this.message}`;
    }
  }

  // Returns a suggestion for recovery if applicable
  getRecoverySuggestion(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return "Please check your internet connection and try again.";
      case ErrorType.AUTHENTICATION:
        return "Please verify your login credentials.";
      case ErrorType.AUTHORIZATION:
        return "You don't have permission to perform this action.";
      case ErrorType.RATE_LIMIT:
        return "Please wait a moment before trying again.";
      case ErrorType.PLATFORM_UNAVAILABLE:
        return "The platform may be temporarily unavailable. Try again later.";
      default:
        return "";
    }
  }
}
