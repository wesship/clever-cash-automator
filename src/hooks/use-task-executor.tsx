
import { useCallback } from 'react';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { Task } from '@/services/TaskExecutionService';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';
import { toast } from 'sonner';

export const useTaskExecutor = () => {
  const { 
    executeTask: contextExecuteTask, 
    abortTask: contextAbortTask,
    updateTaskStatus,
    getTaskProgress,
    tasks,
    addTask
  } = useTaskExecutionContext();

  const executeTask = useCallback(async (taskId: string) => {
    try {
      await contextExecuteTask(taskId);
      return true;
    } catch (error) {
      console.error('Error executing task:', error);
      return false;
    }
  }, [contextExecuteTask]);

  const abortTask = useCallback((taskId: string) => {
    try {
      contextAbortTask(taskId);
      return true;
    } catch (error) {
      console.error('Error aborting task:', error);
      return false;
    }
  }, [contextAbortTask]);

  const createAndExecuteTask = useCallback(async (taskData: {
    title: string;
    description: string;
    type?: TaskType;
    platform?: PlatformType;
    priority?: TaskPriority;
  }) => {
    try {
      // Create a new unique ID
      const taskId = `task-${Date.now()}-${Math.round(Math.random() * 10000)}`;
      
      // Add the task
      addTask({
        id: taskId,
        title: taskData.title,
        description: taskData.description,
        createdAt: new Date(),
        dependencies: []
      });
      
      // Execute immediately
      await executeTask(taskId);
      
      return taskId;
    } catch (error) {
      toast.error(`Failed to create and execute task: ${error instanceof Error ? error.message : String(error)}`);
      return null;
    }
  }, [addTask, executeTask]);
  
  return {
    executeTask,
    abortTask,
    createAndExecuteTask,
    updateTaskStatus,
    getTaskProgress,
    tasks
  };
};

export default useTaskExecutor;
