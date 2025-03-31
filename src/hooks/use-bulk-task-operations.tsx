
import { useState, useCallback } from 'react';
import { Task } from '@/lib/types';
import { TaskExecutionEngine } from '@/services/task-execution';
import { toast } from 'sonner';

export const useBulkTaskOperations = (allTasks: Task[] = []) => {
  const [selectedTaskIds, setSelectedTaskIds] = useState<string[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const selectTask = useCallback((taskId: string) => {
    setSelectedTaskIds(prev => {
      if (prev.includes(taskId)) {
        return prev.filter(id => id !== taskId);
      } else {
        return [...prev, taskId];
      }
    });
  }, []);
  
  const selectAllTasks = useCallback(() => {
    setSelectedTaskIds(allTasks.map(task => task.id));
  }, [allTasks]);
  
  const deselectAllTasks = useCallback(() => {
    setSelectedTaskIds([]);
  }, []);
  
  const getSelectedTasks = useCallback(() => {
    return allTasks.filter(task => selectedTaskIds.includes(task.id));
  }, [allTasks, selectedTaskIds]);
  
  const startSelectedTasks = useCallback(async () => {
    if (selectedTaskIds.length === 0) {
      toast.warning("No tasks selected");
      return 0;
    }
    
    setIsProcessing(true);
    try {
      const tasksToStart = allTasks.filter(task => selectedTaskIds.includes(task.id));
      const successCount = await TaskExecutionEngine.startMultipleTasks(tasksToStart);
      
      if (successCount > 0) {
        toast.success(`Started ${successCount} out of ${selectedTaskIds.length} tasks`);
      } else {
        toast.error("Failed to start any tasks");
      }
      
      return successCount;
    } catch (error) {
      toast.error(`Error starting tasks: ${error instanceof Error ? error.message : String(error)}`);
      return 0;
    } finally {
      setIsProcessing(false);
    }
  }, [allTasks, selectedTaskIds]);
  
  const stopSelectedTasks = useCallback(() => {
    if (selectedTaskIds.length === 0) {
      toast.warning("No tasks selected");
      return 0;
    }
    
    setIsProcessing(true);
    try {
      const successCount = TaskExecutionEngine.stopMultipleTasks(selectedTaskIds);
      
      if (successCount > 0) {
        toast.info(`Paused ${successCount} out of ${selectedTaskIds.length} tasks`);
      } else {
        toast.warning("No tasks were paused");
      }
      
      return successCount;
    } catch (error) {
      toast.error(`Error pausing tasks: ${error instanceof Error ? error.message : String(error)}`);
      return 0;
    } finally {
      setIsProcessing(false);
    }
  }, [selectedTaskIds]);
  
  const deleteSelectedTasks = useCallback((onDelete?: (taskIds: string[]) => void) => {
    if (selectedTaskIds.length === 0) {
      toast.warning("No tasks selected");
      return false;
    }
    
    setIsProcessing(true);
    try {
      // Stop any running tasks first
      TaskExecutionEngine.stopMultipleTasks(selectedTaskIds);
      
      // Call the provided delete handler
      if (onDelete) {
        onDelete(selectedTaskIds);
      }
      
      toast.success(`Deleted ${selectedTaskIds.length} tasks`);
      setSelectedTaskIds([]);
      return true;
    } catch (error) {
      toast.error(`Error deleting tasks: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    } finally {
      setIsProcessing(false);
    }
  }, [selectedTaskIds]);
  
  return {
    selectedTaskIds,
    selectTask,
    selectAllTasks,
    deselectAllTasks,
    getSelectedTasks,
    startSelectedTasks,
    stopSelectedTasks,
    deleteSelectedTasks,
    isProcessing
  };
};

export default useBulkTaskOperations;
