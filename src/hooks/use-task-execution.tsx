
import { useState, useEffect, useCallback } from 'react';
import { TaskExecutionEngine } from '@/services/task-execution';
import { Task } from '@/lib/types';
import { PlatformError } from '@/lib/error-handling';
import { toast } from 'sonner';

export const useTaskExecution = (taskId?: string) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepDescription, setCurrentStepDescription] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  const [lastError, setLastError] = useState<PlatformError | undefined>(undefined);
  const [canRetry, setCanRetry] = useState(false);
  const [startTime, setStartTime] = useState<Date | undefined>(undefined);
  const [endTime, setEndTime] = useState<Date | undefined>(undefined);
  const [executionTime, setExecutionTime] = useState<number>(0);
  const [recentLogs, setRecentLogs] = useState<string[]>([]);
  const [isCancelled, setIsCancelled] = useState(false);
  const [errorLogs, setErrorLogs] = useState<string[]>([]);
  
  // Poll for updates if we're watching a specific task
  useEffect(() => {
    if (!taskId) return;
    
    const interval = setInterval(() => {
      const state = TaskExecutionEngine.getTaskState(taskId);
      if (state) {
        // Basic state updates
        setIsRunning(state.isRunning);
        setProgress(state.progress);
        setCurrentStepDescription(state.currentStepDescription);
        setIsCancelled(state.isCancelled || false);
        
        // Set logs and track recent logs (last 3)
        setLogs([...state.logs]);
        if (state.logs.length > 0) {
          setRecentLogs(state.logs.slice(-3));
        }
        
        // Set error logs
        setErrorLogs(state.errors || []);
        
        // Get error information
        const error = state.lastError;
        setLastError(error);
        
        // Determine if the task can be retried
        setCanRetry(!state.isRunning && !!error && error.recoverable && state.retryAttempts < 3);
        
        // Track execution time
        if (state.startTime) {
          setStartTime(state.startTime);
          
          if (state.isRunning) {
            const currentTime = new Date();
            const elapsedMs = currentTime.getTime() - state.startTime.getTime();
            setExecutionTime(Math.floor(elapsedMs / 1000));
          } else if (state.endTime) {
            const elapsedMs = state.endTime.getTime() - state.startTime.getTime();
            setExecutionTime(Math.floor(elapsedMs / 1000));
          }
        }
        
        if (state.endTime) {
          setEndTime(state.endTime);
        }
      } else {
        setIsRunning(false);
      }
    }, 500); // Poll more frequently for smoother updates
    
    return () => clearInterval(interval);
  }, [taskId]);
  
  // Execution control functions
  const startTask = useCallback(async (task: Task) => {
    try {
      const result = await TaskExecutionEngine.startTask(task);
      if (result) {
        toast.success(`Started task: ${task.name}`);
      }
      return result;
    } catch (error) {
      toast.error(`Failed to start task: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }, []);
  
  const stopTask = useCallback((taskId: string) => {
    try {
      const result = TaskExecutionEngine.stopTask(taskId);
      if (result) {
        toast.info(`Task paused`);
      }
      return result;
    } catch (error) {
      toast.error(`Failed to stop task: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }, []);
  
  const retryTask = useCallback((taskId: string) => {
    try {
      const result = TaskExecutionEngine.retryTask(taskId);
      if (result) {
        toast.info(`Retrying task...`);
        // Reset some states on retry
        setLastError(undefined);
        setProgress(0);
      }
      return result;
    } catch (error) {
      toast.error(`Failed to retry task: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }, []);
  
  const cancelTask = useCallback((taskId: string) => {
    try {
      const result = TaskExecutionEngine.cancelTask(taskId);
      if (result) {
        toast.info(`Task cancelled`);
        setIsCancelled(true);
      }
      return result;
    } catch (error) {
      toast.error(`Failed to cancel task: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
  }, []);
  
  const startMultipleTasks = useCallback(async (tasks: Task[]) => {
    try {
      return await TaskExecutionEngine.startMultipleTasks(tasks);
    } catch (error) {
      toast.error(`Failed to start multiple tasks: ${error instanceof Error ? error.message : String(error)}`);
      return 0;
    }
  }, []);
  
  const stopMultipleTasks = useCallback((taskIds: string[]) => {
    try {
      return TaskExecutionEngine.stopMultipleTasks(taskIds);
    } catch (error) {
      toast.error(`Failed to stop multiple tasks: ${error instanceof Error ? error.message : String(error)}`);
      return 0;
    }
  }, []);
  
  return {
    isRunning,
    progress,
    currentStepDescription,
    logs,
    errorLogs,
    recentLogs,
    lastError,
    canRetry,
    startTime,
    endTime,
    executionTime,
    isCancelled,
    startTask,
    stopTask,
    retryTask,
    cancelTask,
    startMultipleTasks,
    stopMultipleTasks
  };
};

export default useTaskExecution;
