
export enum ErrorType {
  UNKNOWN = 'unknown',
  NETWORK = 'network',
  TIMEOUT = 'timeout',
  RATE_LIMIT = 'rate_limit',
  AUTHORIZATION = 'authorization',
  NOT_FOUND = 'not_found',
  VALIDATION = 'validation',
  SERVER = 'server',
  CLIENT = 'client'
}

export class PlatformError extends Error {
  type: ErrorType;
  recoverable: boolean;
  platformId?: string;
  code?: string;
  details?: any;

  constructor(
    message: string,
    options: {
      type: ErrorType;
      recoverable: boolean;
      platformId?: string;
      code?: string;
      details?: any;
    }
  ) {
    super(message);
    this.name = 'PlatformError';
    this.type = options.type;
    this.recoverable = options.recoverable;
    this.platformId = options.platformId;
    this.code = options.code;
    this.details = options.details;
  }

  getUserFriendlyMessage(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return 'Network error occurred. Please check your internet connection.';
      case ErrorType.TIMEOUT:
        return 'The operation timed out. Please try again later.';
      case ErrorType.RATE_LIMIT:
        return 'Rate limit exceeded. Please try again later.';
      case ErrorType.AUTHORIZATION:
        return 'Authorization error. Please check your credentials.';
      case ErrorType.NOT_FOUND:
        return 'The requested resource was not found.';
      case ErrorType.VALIDATION:
        return 'Validation error. Please check your input.';
      case ErrorType.SERVER:
        return 'Server error occurred. Please try again later.';
      case ErrorType.CLIENT:
        return 'Client error occurred. Please try again.';
      default:
        return this.message;
    }
  }
  
  // Add getRecoverySuggestion method
  getRecoverySuggestion(): string {
    switch (this.type) {
      case ErrorType.NETWORK:
        return 'Check your internet connection and try again.';
      case ErrorType.TIMEOUT:
        return 'The server might be experiencing high load. Try again later or reduce the number of concurrent tasks.';
      case ErrorType.RATE_LIMIT:
        return 'You have reached a rate limit. Wait for a while before trying again or use a different proxy.';
      case ErrorType.AUTHORIZATION:
        return 'Your authorization may have expired. Try logging in again.';
      case ErrorType.NOT_FOUND:
        return 'The requested resource no longer exists. Try refreshing your data.';
      case ErrorType.VALIDATION:
        return 'Check your input parameters for errors and try again.';
      case ErrorType.SERVER:
        return 'This is likely a temporary server issue. Try again later.';
      case ErrorType.CLIENT:
        return 'Review your request and try again. If the problem persists, contact support.';
      default:
        return 'Try the operation again. If the problem persists, contact support.';
    }
  }
}

// Higher order function for wrapping functions with error handling
export function withErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T,
  errorHandler?: (error: Error, ...args: Parameters<T>) => Promise<ReturnType<T> | null>
): (...args: Parameters<T>) => Promise<ReturnType<T>> {
  return async (...args: Parameters<T>): Promise<ReturnType<T>> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (errorHandler) {
        const result = await errorHandler(error instanceof Error ? error : new Error(String(error)), ...args);
        if (result !== null) {
          return result;
        }
      }
      throw error;
    }
  };
}
