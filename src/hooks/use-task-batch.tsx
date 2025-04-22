
import { useCallback } from 'react';
import { useTaskExecutor } from './use-task-executor';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';
import { toast } from 'sonner';

export interface BatchTaskOptions {
  count?: number;
  type?: TaskType;
  platform?: PlatformType;
  priority?: TaskPriority;
  autoStart?: boolean;
}

export const useTaskBatch = () => {
  const { createAndExecuteTask, executeTask } = useTaskExecutor();

  const createBatchTasks = useCallback(async (
    baseTitle: string,
    baseDescription: string,
    options: BatchTaskOptions = {}
  ) => {
    const {
      count = 1,
      type = TaskType.SURVEY,
      platform = PlatformType.CUSTOM,
      priority = TaskPriority.MEDIUM,
      autoStart = false
    } = options;

    const taskIds: string[] = [];

    try {
      for (let i = 0; i < count; i++) {
        const taskId = await createAndExecuteTask({
          title: `${baseTitle} ${i + 1}`,
          description: `${baseDescription} ${i + 1}`,
          type,
          platform,
          priority
        });

        if (taskId) {
          taskIds.push(taskId);
          if (autoStart) {
            await executeTask(taskId);
          }
        }
      }

      toast.success(`Created ${taskIds.length} tasks successfully`);
      return taskIds;
    } catch (error) {
      toast.error(`Failed to create batch tasks: ${error instanceof Error ? error.message : String(error)}`);
      return taskIds;
    }
  }, [createAndExecuteTask, executeTask]);

  const executeBatch = useCallback(async (taskIds: string[]) => {
    let successCount = 0;

    for (const taskId of taskIds) {
      try {
        const success = await executeTask(taskId);
        if (success) successCount++;
      } catch (error) {
        console.error(`Failed to execute task ${taskId}:`, error);
      }
    }

    toast.success(`Successfully executed ${successCount} out of ${taskIds.length} tasks`);
    return successCount;
  }, [executeTask]);

  return {
    createBatchTasks,
    executeBatch
  };
};

export default useTaskBatch;
