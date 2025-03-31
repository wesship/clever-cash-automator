
/**
 * Helper method for creating delays in task execution
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Execute a function with a timeout
 * @param fn The function to execute
 * @param timeoutMs The timeout in milliseconds
 * @param timeoutMessage Custom timeout message
 * @returns A promise that resolves with the result of the function or rejects with a timeout error
 */
export function withTimeout<T>(
  fn: () => Promise<T>, 
  timeoutMs: number = 30000,
  timeoutMessage: string = "Operation timed out"
): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error(timeoutMessage));
    }, timeoutMs);
    
    fn().then(
      result => {
        clearTimeout(timeoutId);
        resolve(result);
      },
      error => {
        clearTimeout(timeoutId);
        reject(error);
      }
    );
  });
}

/**
 * Format a log message with timestamp
 */
export function formatLogMessage(message: string): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${message}`;
}
