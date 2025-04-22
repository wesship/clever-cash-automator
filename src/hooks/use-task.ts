
import { useState, useCallback, useEffect } from 'react';
import { Task, TaskStatus } from '@/lib/types';
import { TaskExecutor } from '@/services/task-execution/task-executor';
import { TaskController } from '@/services/task-execution/task-controller';
import { toast } from 'sonner';

export function useTask(taskId: string) {
  const [task, setTask] = useState<Task | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const fetchTaskState = useCallback(() => {
    try {
      const state = TaskController.getTaskState(taskId);
      if (state) {
        setTask(state as unknown as Task); // Type assertion due to state manager differences
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch task state'));
    }
  }, [taskId]);

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
      // Convert Task to TaskModel format that TaskExecutor expects
      const taskModel = {
        config: {
          id: task.id,
          name: task.name,
          description: task.description,
          type: task.type,
          platform: task.platform,
          priority: task.priority,
          maxRetries: 3,
          timeout: 3600,
          parameters: {}
        },
        state: {
          status: task.status,
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
    } catch (err) {
      toast.error('Failed to start task');
      setError(err instanceof Error ? err : new Error('Failed to start task'));
    }
  }, [task]);

  const pauseTask = useCallback(() => {
    try {
      const success = TaskController.stopTask(taskId);
      if (success) {
        toast.success('Task paused successfully');
      }
    } catch (err) {
      toast.error('Failed to pause task');
      setError(err instanceof Error ? err : new Error('Failed to pause task'));
    }
  }, [taskId]);

  const retryTask = useCallback(async () => {
    try {
      const success = await TaskController.retryTask(taskId);
      if (success) {
        toast.success('Task retry initiated');
      }
    } catch (err) {
      toast.error('Failed to retry task');
      setError(err instanceof Error ? err : new Error('Failed to retry task'));
    }
  }, [taskId]);

  const cancelTask = useCallback(() => {
    try {
      const success = TaskController.cancelTask(taskId);
      if (success) {
        toast.success('Task cancelled successfully');
      }
    } catch (err) {
      toast.error('Failed to cancel task');
      setError(err instanceof Error ? err : new Error('Failed to cancel task'));
    }
  }, [taskId]);

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
