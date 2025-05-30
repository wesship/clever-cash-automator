
import React, { createContext, useContext, useState, useCallback } from 'react';
import { TaskExecutionEngine } from '@/services/task-execution';
import { Task, TaskStatus } from '@/services/TaskExecutionService';
import { toast } from 'sonner';
import { TaskType, PlatformType, TaskPriority, TaskStatus as OriginalTaskStatus } from '@/lib/types';
import { mapTaskStatus, mapToOriginalTaskStatus } from '@/lib/task-types';

interface TaskExecutionContextType {
  executeTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  abortTask: (taskId: string) => void;
  getTaskProgress: (taskId: string) => number;
  tasks: Record<string, Task>;
  addTask: (task: Omit<Task, 'status' | 'updatedAt' | 'completedAt'>) => void;
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
  
  const addTask = useCallback((task: Omit<Task, 'status' | 'updatedAt' | 'completedAt'>) => {
    const now = new Date();
    const newTask: Task = {
      ...task,
      status: 'pending' as TaskStatus,
      updatedAt: now,
    };
    
    setTasks(prev => ({
      ...prev,
      [newTask.id]: newTask
    }));
    
    toast.success(`Task "${newTask.title}" added`);
  }, []);
  
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
        type: TaskType.AD_CLICK, // Using an actual enum value
        platform: PlatformType.CUSTOM, // Using an actual enum value
        status: OriginalTaskStatus.PENDING, // Using proper enum value
        createdAt: task.createdAt,
        description: task.description,
        completionCount: 0,
        targetCompletions: 1,
        earnings: 0,
        priority: TaskPriority.MEDIUM,
        progress: 0, // Add the required progress property
        config: {
          proxyRequired: false,
          captchaHandling: false,
          schedule: {
            frequency: "daily" as "daily" | "hourly" | "weekly" | "monthly" | "custom",
            maxRuns: 5
          }
        }
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
    tasks,
    addTask
  };
  
  return (
    <TaskExecutionContext.Provider value={contextValue}>
      {children}
    </TaskExecutionContext.Provider>
  );
};
