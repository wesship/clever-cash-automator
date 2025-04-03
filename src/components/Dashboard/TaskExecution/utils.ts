
/**
 * Format seconds into mm:ss format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Estimate time remaining based on progress and elapsed time
 */
export const estimateTimeRemaining = (elapsedTime: number, overallProgress: number): string | null => {
  if (elapsedTime <= 0 || overallProgress <= 0) return null;
  
  // Calculate seconds per percent progress
  const secondsPerPercent = elapsedTime / overallProgress;
  // Calculate remaining seconds
  const remainingSeconds = Math.round(secondsPerPercent * (100 - overallProgress));
  
  if (remainingSeconds <= 0) return null;
  return formatTime(remainingSeconds);
};

/**
 * Count steps by status
 */
export const countStepsByStatus = (
  steps: Array<{ status: string }>
): Record<string, number> => {
  return steps.reduce((acc, step) => {
    acc[step.status] = (acc[step.status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};
