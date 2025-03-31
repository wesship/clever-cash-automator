
import { ErrorType } from "./types";

/**
 * Standardized error structure for platform operations
 */
export class PlatformError extends Error {
  public readonly type: ErrorType;
  public readonly recoverable: boolean;
  public readonly platformId: string;
  public readonly details?: Record<string, any>;

  constructor(message: string, options: {
    type: ErrorType,
    recoverable?: boolean,
    platformId: string,
    details?: Record<string, any>,
    cause?: Error
  }) {
    // Pass only the cause option to super
    super(message, { cause: options.cause });
    this.name = 'PlatformError';
    this.type = options.type;
    this.recoverable = options.recoverable ?? false;
    this.platformId = options.platformId;
    this.details = options.details;
  }

  /**
   * Helper for creating network errors
   */
  static network(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.NETWORK, 
      recoverable: true, 
      platformId,
      details,
      cause
    });
  }

  /**
   * Helper for creating authentication errors
   */
  static authentication(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.AUTHENTICATION, 
      recoverable: false, 
      platformId,
      details,
      cause
    });
  }

  /**
   * Helper for creating authorization errors
   */
  static authorization(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.AUTHORIZATION, 
      recoverable: false, 
      platformId,
      details,
      cause
    });
  }

  /**
   * Helper for creating rate limit errors
   */
  static rateLimit(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.RATE_LIMIT, 
      recoverable: true, 
      platformId,
      details,
      cause
    });
  }

  /**
   * Helper for creating platform unavailable errors
   */
  static platformUnavailable(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.PLATFORM_UNAVAILABLE, 
      recoverable: true, 
      platformId,
      details,
      cause
    });
  }

  /**
   * Helper for creating validation errors
   */
  static validation(message: string, platformId: string, details?: Record<string, any>, cause?: Error): PlatformError {
    return new PlatformError(message, { 
      type: ErrorType.VALIDATION, 
      recoverable: false, 
      platformId,
      details,
      cause
    });
  }

  /**
   * Get a user-friendly error message
   */
  getUserFriendlyMessage(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return `Network error on ${this.platformId}: Please check your internet connection and try again.`;
      case ErrorType.AUTHENTICATION:
        return `Authentication failed on ${this.platformId}: Please check your credentials and try again.`;
      case ErrorType.AUTHORIZATION:
        return `Authorization error on ${this.platformId}: Your account doesn't have permission for this action.`;
      case ErrorType.RATE_LIMIT:
        return `Rate limit exceeded on ${this.platformId}: Please wait before trying again.`;
      case ErrorType.PLATFORM_UNAVAILABLE:
        return `${this.platformId} is currently unavailable: Please try again later.`;
      case ErrorType.VALIDATION:
        return `Invalid task configuration for ${this.platformId}: Please check your settings.`;
      default:
        return this.message;
    }
  }

  /**
   * Get recovery suggestion based on error type
   */
  getRecoverySuggestion(): string {
    if (!this.recoverable) {
      return "This issue requires manual intervention.";
    }

    switch (this.type) {
      case ErrorType.NETWORK:
        return "Check your internet connection and try again.";
      case ErrorType.RATE_LIMIT:
        return "Wait a few minutes before attempting this task again.";
      case ErrorType.PLATFORM_UNAVAILABLE:
        return "Try again later or check if the platform is experiencing downtime.";
      default:
        return "Try again or check the task configuration.";
    }
  }
}
