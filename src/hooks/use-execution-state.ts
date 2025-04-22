
import { useState, useEffect, useCallback, useMemo } from 'react';
import { TaskExecutionEngine } from '@/services/task-execution';
import { parseStepsFromLogs } from '@/components/Dashboard/TaskExecution/utils';

export const useExecutionState = (taskId?: string) => {
  const [state, setState] = useState({
    isRunning: false,
    progress: 0,
    currentStepDescription: '',
    logs: [] as string[],
    executionTime: 0,
    startTime: undefined as Date | undefined
  });

  // Memoize parsed steps
  const { steps, currentStepIndex } = useMemo(() => 
    parseStepsFromLogs(state.logs), [state.logs]
  );

  // Optimization: Use a single update function
  const updateState = useCallback(() => {
    if (!taskId) return;

    const executionState = TaskExecutionEngine.getTaskState(taskId);
    if (executionState) {
      setState(prev => {
        // Only update if values have changed
        if (
          prev.isRunning === executionState.isRunning &&
          prev.progress === executionState.progress &&
          prev.currentStepDescription === executionState.currentStepDescription &&
          prev.logs.length === executionState.logs.length
        ) {
          return prev;
        }

        return {
          isRunning: executionState.isRunning,
          progress: executionState.progress,
          currentStepDescription: executionState.currentStepDescription,
          logs: [...executionState.logs],
          executionTime: executionState.startTime ? 
            Math.floor((Date.now() - executionState.startTime.getTime()) / 1000) : 
            prev.executionTime,
          startTime: executionState.startTime
        };
      });
    }
  }, [taskId]);

  // Optimized polling with cleanup
  useEffect(() => {
    if (!taskId) return;

    updateState();
    const interval = setInterval(updateState, 1000);
    return () => clearInterval(interval);
  }, [taskId, updateState]);

  return {
    ...state,
    steps,
    currentStepIndex
  };
};
