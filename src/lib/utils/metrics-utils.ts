
/**
 * Calculate computation speed (operations per second)
 * @param completedSteps Number of completed steps
 * @param executionTimeSeconds Total execution time in seconds
 * @returns Operations per second or null if invalid input
 */
export const calculateOperationSpeed = (
  completedSteps: number, 
  executionTimeSeconds: number
): number | null => {
  if (completedSteps <= 0 || executionTimeSeconds <= 0) return null;
  return Math.round((completedSteps / executionTimeSeconds) * 100) / 100;
};
