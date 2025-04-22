
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
      
      if (i >= logs.length - 3) {
        currentActive = stepIndex;
        steps[stepName].status = "in-progress";
      }
    }
    
    if (log.toLowerCase().includes("error")) {
      Object.values(steps).forEach(step => {
        if (step.status === "in-progress") {
          step.status = "error";
          step.message = log;
        }
      });
    }
  });
  
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
