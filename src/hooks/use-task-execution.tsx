
import { useState, useEffect, useCallback } from 'react';
import TaskExecutionEngine from '@/services/TaskExecutionService';
import { Task } from '@/lib/types';

export const useTaskExecution = (taskId?: string) => {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentStepDescription, setCurrentStepDescription] = useState('');
  const [logs, setLogs] = useState<string[]>([]);
  
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
  
  return {
    isRunning,
    progress,
    currentStepDescription,
    logs,
    startTask,
    stopTask
  };
};

export default useTaskExecution;
