
import { useState, useEffect, useCallback } from 'react';
import TaskExecutionEngine from '@/services/TaskExecutionService';
import { Task } from '@/lib/types';
import { PlatformError } from '@/lib/error-handling';

export const useTaskExecution = (taskId?: string) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepDescription, setCurrentStepDescription] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [lastError, setLastError] = useState<PlatformError | undefined>(undefined);
  const [canRetry, setCanRetry] = useState(false);
  
  // Poll for updates if we're watching a specific task
  useEffect(() => {
    if (!taskId) return;
    
    const interval = setInterval(() => {
      const state = TaskExecutionEngine.getTaskState(taskId);
      if (state) {
        setIsRunning(state.isRunning);
        setProgress(state.progress);
        setCurrentStepDescription(state.currentStepDescription);
        setLogs([...state.logs]);
        
        // Get error information
        const error = state.lastError;
        setLastError(error);
        
        // Determine if the task can be retried
        setCanRetry(!state.isRunning && !!error && error.recoverable && state.retryAttempts < 3);
      } else {
        setIsRunning(false);
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [taskId]);
  
  // Execution control functions
  const startTask = useCallback(async (task: Task) => {
    const result = await TaskExecutionEngine.startTask(task);
    return result;
  }, []);
  
  const stopTask = useCallback((taskId: string) => {
    return TaskExecutionEngine.stopTask(taskId);
  }, []);
  
  const retryTask = useCallback((taskId: string) => {
    return TaskExecutionEngine.retryTask(taskId);
  }, []);
  
  return {
    isRunning,
    progress,
    currentStepDescription,
    logs,
    lastError,
    canRetry,
    startTask,
    stopTask,
    retryTask
  };
};

export default useTaskExecution;
