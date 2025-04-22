
import { ErrorType } from './types';

// Interface for error options
export interface PlatformErrorOptions {
  type: ErrorType;
  recoverable: boolean;
  platformId?: string;
  code?: string;
  details?: any;
  cause?: Error;  // Added cause property
}

/**
 * Custom error class for platform operations
 */
export class PlatformError extends Error {
  public type: ErrorType;
  public recoverable: boolean;
  public platformId: string;
  public code?: string;
  public details?: any;
  public cause?: Error;  // Added cause property

  constructor(message: string, options: PlatformErrorOptions) {
    super(message);
    this.name = 'PlatformError';
    this.type = options.type;
    this.recoverable = options.recoverable;
    this.platformId = options.platformId || 'unknown';
    this.code = options.code;
    this.details = options.details;
    this.cause = options.cause; // Store the cause
    
    // Ensure prototype chain is properly maintained
    Object.setPrototypeOf(this, PlatformError.prototype);
  }

  // Helper static methods
  static network(message: string, platformId: string, details?: any, cause?: Error): PlatformError {
    return new PlatformError(message, {
      type: ErrorType.NETWORK,
      recoverable: true,
      platformId,
      details,
      cause
    });
  }

  static authentication(message: string, platformId: string, details?: any, cause?: Error): PlatformError {
    return new PlatformError(message, {
      type: ErrorType.AUTHENTICATION,
      recoverable: false,
      platformId,
      details,
      cause
    });
  }

  static authorization(message: string, platformId: string, details?: any, cause?: Error): PlatformError {
    return new PlatformError(message, {
      type: ErrorType.AUTHORIZATION,
      recoverable: false,
      platformId,
      details,
      cause
    });
  }

  static validation(message: string, platformId: string, details?: any, cause?: Error): PlatformError {
    return new PlatformError(message, {
      type: ErrorType.VALIDATION,
      recoverable: false,
      platformId,
      details,
      cause
    });
  }

  static platformUnavailable(message: string, platformId: string, details?: any, cause?: Error): PlatformError {
    return new PlatformError(message, {
      type: ErrorType.PLATFORM_UNAVAILABLE,
      recoverable: true,
      platformId,
      details,
      cause
    });
  }

  static rateLimit(message: string, platformId: string, details?: any, cause?: Error): PlatformError {
    return new PlatformError(message, {
      type: ErrorType.RATE_LIMIT,
      recoverable: true,
      platformId,
      details,
      cause
    });
  }

  // Get a user-friendly message
  getUserFriendlyMessage(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return `Network error: ${this.message}`;
      case ErrorType.AUTHENTICATION:
        return `Authentication failed: ${this.message}`;
      case ErrorType.AUTHORIZATION:
        return `Authorization failed: ${this.message}`;
      case ErrorType.RATE_LIMIT:
        return `Rate limit exceeded: ${this.message}`;
      case ErrorType.PLATFORM_UNAVAILABLE:
        return `Platform unavailable: ${this.message}`;
      case ErrorType.VALIDATION:
        return `Validation error: ${this.message}`;
      default:
        return this.message;
    }
  }

  // Get recovery suggestion
  getRecoverySuggestion(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return "Check your internet connection and try again.";
      case ErrorType.AUTHENTICATION:
        return "Try logging in again with your credentials.";
      case ErrorType.RATE_LIMIT:
        return "Please wait a few minutes before trying again.";
      case ErrorType.PLATFORM_UNAVAILABLE:
        return "The platform might be down for maintenance. Please try again later.";
      default:
        return "Try again or contact support if the issue persists.";
    }
  }
}

// Utility function for handling platform errors
export const withErrorHandling = async <T>(
  platformId: string,
  fn: () => Promise<T>,
  errorHandler?: (error: unknown) => PlatformError
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    // If custom error handler provided, use it
    if (errorHandler) {
      throw errorHandler(error);
    }
    
    // Default error handling
    if (error instanceof PlatformError) {
      throw error;
    }
    
    // Convert unknown errors to PlatformError
    throw new PlatformError(
      error instanceof Error ? error.message : String(error),
      {
        type: ErrorType.UNKNOWN,
        recoverable: false,
        platformId
      }
    );
  }
};
