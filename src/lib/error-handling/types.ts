
/**
 * Common error types for platform operations
 */
export enum ErrorType {
  NETWORK = "network",
  AUTHENTICATION = "authentication",
  AUTHORIZATION = "authorization",
  RATE_LIMIT = "rate_limit",
  PLATFORM_UNAVAILABLE = "platform_unavailable",
  VALIDATION = "validation",
  UNKNOWN = "unknown"
}
