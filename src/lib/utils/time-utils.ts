
/**
 * Format seconds into mm:ss format
 */
export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

/**
 * Format duration in readable form
 * @param seconds Duration in seconds
 * @returns Formatted duration string
 */
export const formatDuration = (seconds: number): string => {
  if (seconds < 60) {
    return `${seconds}s`;
  }
  
  const mins = Math.floor(seconds / 60);
  const remainingSecs = seconds % 60;
  
  if (mins < 60) {
    return `${mins}m ${remainingSecs}s`;
  }
  
  const hours = Math.floor(mins / 60);
  const remainingMins = mins % 60;
  
  return `${hours}h ${remainingMins}m`;
};

/**
 * Estimate time remaining based on progress and elapsed time
 */
export const estimateTimeRemaining = (elapsedTime: number, overallProgress: number): string | null => {
  if (elapsedTime <= 0 || overallProgress <= 0) return null;
  
  const secondsPerPercent = elapsedTime / overallProgress;
  const remainingSeconds = Math.round(secondsPerPercent * (100 - overallProgress));
  
  if (remainingSeconds <= 0) return null;
  return formatTime(remainingSeconds);
};
