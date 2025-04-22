
import { useCallback, useState, useEffect } from 'react';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { TaskExecutionEngine } from '@/services/task-execution';
import { Task, TaskStatus } from '@/services/TaskExecutionService';
import { toast } from 'sonner';

export const useCentralizedTaskExecution = (taskId?: string) => {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const { executeTask, abortTask, getTaskProgress, updateTaskStatus } = useTaskExecutionContext();
  
  // Poll for task progress if we have a taskId
  useEffect(() => {
    if (!taskId) return;
    
    const intervalId = setInterval(() => {
      // Get progress
      const currentProgress = getTaskProgress(taskId);
      setProgress(currentProgress);
      
      // Check if task is running
      const isCurrentlyRunning = TaskExecutionEngine.isTaskRunning(taskId);
      setIsRunning(isCurrentlyRunning);
      
      // Check for errors
      const lastError = TaskExecutionEngine.getLastError(taskId);
      if (lastError) {
        setError(lastError instanceof Error ? lastError : new Error(String(lastError)));
        
        // Update task status if error and not running
        if (!isCurrentlyRunning) {
          updateTaskStatus(taskId, 'failed');
        }
      }
      
      // Update task status if complete
      if (currentProgress >= 100 && !isCurrentlyRunning && !lastError) {
        updateTaskStatus(taskId, 'completed');
      }
    }, 500);
    
    return () => clearInterval(intervalId);
  }, [taskId, getTaskProgress, updateTaskStatus]);
  
  const startTask = useCallback(async (task: any) => {
    if (!task) return false;
    
    try {
      setError(null);
      await executeTask(task.id);
      toast.success(`Started task: ${task.title || task.name}`);
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      return false;
    }
  }, [executeTask]);
  
  const stopTask = useCallback((id: string) => {
    if (!id) return false;
    
    try {
      abortTask(id);
      toast.info(`Task paused`);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      return false;
    }
  }, [abortTask]);
  
  const retryTask = useCallback((id: string) => {
    if (!id) return false;
    
    try {
      // Reset error
      setError(null);
      
      // Update status to pending
      updateTaskStatus(id, 'pending');
      
      // Retry the task
      executeTask(id);
      
      toast.info(`Retrying task...`);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error occurred'));
      return false;
    }
  }, [executeTask, updateTaskStatus]);
  
  return {
    progress,
    isRunning,
    error,
    startTask,
    stopTask,
    retryTask
  };
};

export default useCentralizedTaskExecution;
