
import React, { createContext, useContext, useState, useCallback } from 'react';
import { TaskExecutionEngine } from '@/services/task-execution';
import { Task, TaskStatus } from '@/services/TaskExecutionService';
import { toast } from 'sonner';

interface TaskExecutionContextType {
  executeTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  abortTask: (taskId: string) => void;
  getTaskProgress: (taskId: string) => number;
  tasks: Record<string, Task>;
}

const TaskExecutionContext = createContext<TaskExecutionContextType | null>(null);

export const useTaskExecutionContext = () => {
  const context = useContext(TaskExecutionContext);
  if (!context) {
    throw new Error('useTaskExecutionContext must be used within a TaskExecutionProvider');
  }
  return context;
};

interface TaskExecutionProviderProps {
  children: React.ReactNode;
}

export const TaskExecutionProvider: React.FC<TaskExecutionProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Record<string, Task>>({});
  
  const executeTask = useCallback(async (taskId: string): Promise<void> => {
    try {
      if (!tasks[taskId]) {
        throw new Error(`Task with id ${taskId} not found`);
      }
      
      // Update task status
      setTasks(prev => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          status: 'in_progress' as TaskStatus,
          updatedAt: new Date()
        }
      }));
      
      // Use the existing TaskExecutionEngine
      const task = tasks[taskId];
      const result = await TaskExecutionEngine.startTask({
        id: task.id,
        name: task.title,
        // Map other fields to match the expected interface
        type: 'GENERIC',
        platform: 'DEFAULT',
        status: 'PENDING',
        createdAt: task.createdAt,
        description: task.description,
        completionCount: 0,
        targetCompletions: 1,
        earnings: 0,
        priority: 'MEDIUM',
        config: {}
      });
      
      if (!result) {
        throw new Error('Failed to start task');
      }
      
    } catch (error) {
      toast.error(`Task execution failed: ${error instanceof Error ? error.message : String(error)}`);
      
      // Update task status to failed
      setTasks(prev => ({
        ...prev,
        [taskId]: {
          ...prev[taskId],
          status: 'failed' as TaskStatus,
          updatedAt: new Date()
        }
      }));
      
      throw error;
    }
  }, [tasks]);
  
  const updateTaskStatus = useCallback((taskId: string, status: TaskStatus): void => {
    setTasks(prev => {
      if (!prev[taskId]) return prev;
      
      const updatedTask = {
        ...prev[taskId],
        status,
        updatedAt: new Date(),
        ...(status === 'completed' ? { completedAt: new Date() } : {})
      };
      
      return { ...prev, [taskId]: updatedTask };
    });
  }, []);
  
  const abortTask = useCallback((taskId: string): void => {
    try {
      TaskExecutionEngine.stopTask(taskId);
      
      updateTaskStatus(taskId, 'pending');
      
    } catch (error) {
      console.error('Failed to abort task:', error);
      toast.error(`Failed to abort task: ${error instanceof Error ? error.message : String(error)}`);
    }
  }, [updateTaskStatus]);
  
  const getTaskProgress = useCallback((taskId: string): number => {
    const taskState = TaskExecutionEngine.getTaskState(taskId);
    return taskState?.progress || 0;
  }, []);
  
  const contextValue = {
    executeTask,
    updateTaskStatus,
    abortTask,
    getTaskProgress,
    tasks
  };
  
  return (
    <TaskExecutionContext.Provider value={contextValue}>
      {children}
    </TaskExecutionContext.Provider>
  );
};
