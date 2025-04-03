
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

/**
 * Parse step status from logs
 * @param logs Array of log strings
 * @returns Object with step status and current step
 */
export const parseStepsFromLogs = (logs: string[]): {
  steps: Array<{
    name: string;
    status: "pending" | "in-progress" | "completed" | "error";
    duration?: number;
    message?: string;
  }>;
  currentStepIndex: number;
} => {
  if (logs.length === 0) return { steps: [], currentStepIndex: 0 };
  
  const stepRegex = /Step(?:\s+(\d+)\/(\d+))?:?\s+(.+?)(?:\s+\((\d+)%.*\))?$/;
  const steps: Record<string, {
    name: string;
    status: "pending" | "in-progress" | "completed" | "error";
    index?: number;
    totalSteps?: number;
    progress?: number;
    duration?: number;
    message?: string;
  }> = {};
  
  let currentActive = 0;
  
  // Process logs to extract step information
  logs.forEach((log, i) => {
    const match = log.match(stepRegex);
    if (match) {
      const [_, stepNumStr, totalStepsStr, stepName, progressStr] = match;
      
      const stepIndex = stepNumStr ? parseInt(stepNumStr, 10) - 1 : Object.keys(steps).length;
      const progress = progressStr ? parseInt(progressStr, 10) : undefined;
      
      steps[stepName] = {
        name: stepName,
        status: "completed",
        index: stepIndex,
        totalSteps: totalStepsStr ? parseInt(totalStepsStr, 10) : undefined,
        progress
      };
      
      // If this log is from the last 3 entries, consider it active
      if (i >= logs.length - 3) {
        currentActive = stepIndex;
        steps[stepName].status = "in-progress";
      }
    }
    
    // Check for error logs
    if (log.toLowerCase().includes("error")) {
      // Find which step had the error
      Object.values(steps).forEach(step => {
        if (step.status === "in-progress") {
          step.status = "error";
          step.message = log;
        }
      });
    }
  });
  
  // Convert to array and sort by index
  const stepsArray = Object.values(steps)
    .sort((a, b) => (a.index || 0) - (b.index || 0))
    .map(step => ({
      name: step.name,
      status: step.status,
      duration: step.duration,
      message: step.message
    }));
  
  return { 
    steps: stepsArray,
    currentStepIndex: currentActive
  };
};

/**
 * Get task execution status display properties
 * @param isRunning Is the task currently running
 * @param lastError Last error if any
 * @param progress Current progress percentage
 */
export const getTaskStatusDisplay = (
  isRunning: boolean,
  lastError?: any,
  progress?: number
): {
  label: string;
  color: string;
  icon: string;
} => {
  if (isRunning) {
    return {
      label: "Running",
      color: "text-blue-500",
      icon: "play"
    };
  }
  
  if (lastError) {
    return {
      label: "Failed",
      color: "text-destructive",
      icon: "alert-triangle"
    };
  }
  
  if (progress && progress >= 100) {
    return {
      label: "Completed",
      color: "text-green-500",
      icon: "check-circle"
    };
  }
  
  if (progress && progress > 0) {
    return {
      label: "Paused",
      color: "text-amber-500",
      icon: "pause-circle"
    };
  }
  
  return {
    label: "Ready",
    color: "text-muted-foreground",
    icon: "circle"
  };
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
 * Get abbreviated log message for display
 * @param message The original log message
 * @param maxLength Maximum allowed length
 * @returns Abbreviated log message
 */
export const abbreviateLogMessage = (message: string, maxLength: number = 100): string => {
  if (message.length <= maxLength) return message;
  
  // Try to find a good break point
  const breakPoint = message.lastIndexOf(' ', maxLength - 3);
  if (breakPoint > maxLength * 0.7) {
    return message.substring(0, breakPoint) + '...';
  }
  
  return message.substring(0, maxLength - 3) + '...';
};

/**
 * Extract timestamp from formatted log message
 * @param logMessage Log message with timestamp
 * @returns Extracted timestamp or null
 */
export const extractTimestamp = (logMessage: string): Date | null => {
  const match = logMessage.match(/^\[(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\]/);
  if (match && match[1]) {
    return new Date(match[1]);
  }
  return null;
};

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
