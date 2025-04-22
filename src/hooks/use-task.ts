
import { useState, useCallback, useEffect } from 'react';
import { Task, TaskStatus } from '@/lib/types';
import { TaskExecutor } from '@/services/task-execution/task-executor';
import { TaskController } from '@/services/task-execution/task-controller';
import { PlatformError, ErrorType } from '@/lib/error-handling';
import { toast } from 'sonner';

export function useTask(taskId: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<PlatformError | null>(null);

  const handleError = useCallback((err: unknown, operation: string) => {
    const platformError = err instanceof PlatformError 
      ? err 
      : new PlatformError(
          err instanceof Error ? err.message : 'An unknown error occurred',
          {
            type: ErrorType.UNKNOWN,
            platformId: 'task-system',
            recoverable: true,
            cause: err instanceof Error ? err : undefined
          }
        );

    setError(platformError);
    toast.error(platformError.getUserFriendlyMessage());
    console.error(`Task ${operation} failed:`, platformError);
  }, []);

  const fetchTaskState = useCallback(() => {
    try {
      const state = TaskController.getTaskState(taskId);
      if (state) {
        setTask(state as unknown as Task);
        setError(null); // Clear any previous errors on successful fetch
      }
    } catch (err) {
      handleError(err, 'state fetch');
    }
  }, [taskId, handleError]);

  useEffect(() => {
    if (!taskId) return;

    fetchTaskState();
    const interval = setInterval(fetchTaskState, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [taskId, fetchTaskState]);

  const startTask = useCallback(async () => {
    if (!task) return;

    try {
      const taskModel = {
        config: {
          id: task.id,
          name: task.name,
          description: task.description,
          type: task.type.toString() as any,
          platform: task.platform.toString() as any,
          priority: task.priority.toString() as any,
          maxRetries: 3,
          timeout: 3600,
          parameters: {}
        },
        state: {
          status: task.status.toString() as any,
          progress: task.progress,
          currentStep: task.currentStep || '',
          logs: task.logs ? task.logs.map(log => ({
            timestamp: log.timestamp,
            message: log.message,
            type: log.type,
            data: log.data
          })) : [],
          retryCount: 0
        }
      };
      
      await TaskExecutor.executeTask(taskModel);
      toast.success('Task started successfully');
      setError(null); // Clear any previous errors on successful start
    } catch (err) {
      handleError(err, 'start');
    }
  }, [task, handleError]);

  const pauseTask = useCallback(() => {
    try {
      const success = TaskController.stopTask(taskId);
      if (success) {
        toast.success('Task paused successfully');
        setError(null); // Clear any previous errors on successful pause
      }
    } catch (err) {
      handleError(err, 'pause');
    }
  }, [taskId, handleError]);

  const retryTask = useCallback(async () => {
    try {
      const success = await TaskController.retryTask(taskId);
      if (success) {
        toast.success('Task retry initiated');
        setError(null); // Clear any previous errors on successful retry
      }
    } catch (err) {
      handleError(err, 'retry');
    }
  }, [taskId, handleError]);

  const cancelTask = useCallback(() => {
    try {
      const success = TaskController.cancelTask(taskId);
      if (success) {
        toast.success('Task cancelled successfully');
        setError(null); // Clear any previous errors on successful cancellation
      }
    } catch (err) {
      handleError(err, 'cancel');
    }
  }, [taskId, handleError]);

  return {
    task,
    error,
    startTask,
    pauseTask,
    retryTask,
    cancelTask,
    isLoading: !task && !error,
    isRunning: task?.status === TaskStatus.RUNNING,
  };
}
