
import { PlatformError } from "./platform-error";
import { ErrorType } from "./types";

/**
 * Utility to handle common errors in async operations
 */
export async function withErrorHandling<T>(
  platformId: string,
  operation: () => Promise<T>,
  errorTransformer?: (error: unknown) => PlatformError
): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    if (error instanceof PlatformError) {
      throw error;
    }

    if (errorTransformer) {
      throw errorTransformer(error);
    }

    // Default error handling if no transformer provided
    if (error instanceof Error) {
      if (error.message.includes('network') || error.message.includes('connection')) {
        throw PlatformError.network(error.message, platformId, undefined, error);
      } else if (error.message.includes('credentials') || error.message.includes('login') || 
                 error.message.includes('auth') || error.message.includes('password')) {
        throw PlatformError.authentication(error.message, platformId, undefined, error);
      } else if (error.message.includes('permission') || error.message.includes('access')) {
        throw PlatformError.authorization(error.message, platformId, undefined, error);
      } else if (error.message.includes('rate') || error.message.includes('limit') || 
                 error.message.includes('too many requests')) {
        throw PlatformError.rateLimit(error.message, platformId, undefined, error);
      }
    }

    // If we couldn't categorize the error, wrap it as an unknown platform error
    throw new PlatformError(
      error instanceof Error ? error.message : String(error),
      { 
        type: ErrorType.UNKNOWN, 
        recoverable: false, 
        platformId, 
        cause: error instanceof Error ? error : undefined 
      }
    );
  }
}
