
import { createContext, useContext } from 'react';
import { TaskExecutionEngine } from './task-execution';
import { TaskStatus as OriginalTaskStatus, TaskType, PlatformType, TaskPriority } from '@/lib/types';

// Redefine TaskStatus to match our centralized schema
export type TaskStatus = 'pending' | 'in_progress' | 'completed' | 'failed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
  dependencies?: string[];
}

interface TaskExecutionContext {
  executeTask: (taskId: string) => Promise<void>;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  abortTask: (taskId: string) => void;
  getTaskProgress: (taskId: string) => number;
}

const TaskExecutionContext = createContext<TaskExecutionContext | null>(null);

export const useTaskExecution = () => {
  const context = useContext(TaskExecutionContext);
  if (!context) {
    throw new Error('useTaskExecution must be used within a TaskExecutionProvider');
  }
  return context;
};

// Re-export TaskExecutionEngine as the default export for backward compatibility
export default TaskExecutionEngine;
