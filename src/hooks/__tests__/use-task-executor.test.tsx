import { renderHook, act } from '@testing-library/react';
import { useTaskExecutor } from '../use-task-executor';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';
import { toast } from 'sonner';

// Mock dependencies
jest.mock('@/providers/TaskExecutionProvider');
jest.mock('sonner');

const mockUseTaskExecutionContext = useTaskExecutionContext as jest.MockedFunction<typeof useTaskExecutionContext>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('useTaskExecutor', () => {
  // Setup mock context data
  const mockExecuteTask = jest.fn();
  const mockAbortTask = jest.fn();
  const mockUpdateTaskStatus = jest.fn();
  const mockGetTaskProgress = jest.fn();
  const mockAddTask = jest.fn();
  const mockTasks = {};

  beforeEach(() => {
    jest.clearAllMocks();
    
    // Setup default mock implementation
    mockUseTaskExecutionContext.mockReturnValue({
      executeTask: mockExecuteTask,
      abortTask: mockAbortTask,
      updateTaskStatus: mockUpdateTaskStatus,
      getTaskProgress: mockGetTaskProgress,
      tasks: mockTasks,
      addTask: mockAddTask,
    });
  });

  it('should execute a task successfully', async () => {
    mockExecuteTask.mockResolvedValueOnce(undefined);
    
    const { result } = renderHook(() => useTaskExecutor());
    
    let success;
    await act(async () => {
      success = await result.current.executeTask('task-123');
    });
    
    expect(success).toBe(true);
    expect(mockExecuteTask).toHaveBeenCalledWith('task-123');
  });

  it('should handle task execution failure', async () => {
    const error = new Error('Task execution failed');
    mockExecuteTask.mockRejectedValueOnce(error);
    
    const { result } = renderHook(() => useTaskExecutor());
    
    let success;
    await act(async () => {
      success = await result.current.executeTask('task-123');
    });
    
    expect(success).toBe(false);
    expect(mockExecuteTask).toHaveBeenCalledWith('task-123');
  });

  it('should abort a task successfully', () => {
    mockAbortTask.mockImplementationOnce(() => {});
    
    const { result } = renderHook(() => useTaskExecutor());
    
    act(() => {
      const success = result.current.abortTask('task-123');
      expect(success).toBe(true);
    });
    
    expect(mockAbortTask).toHaveBeenCalledWith('task-123');
  });

  it('should create and execute a task successfully', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
      type: TaskType.SURVEY,
      platform: PlatformType.CUSTOM,
      priority: TaskPriority.MEDIUM,
    };

    mockExecuteTask.mockResolvedValueOnce(undefined);
    
    const { result } = renderHook(() => useTaskExecutor());
    
    let taskId: string | null = null;
    await act(async () => {
      taskId = await result.current.createAndExecuteTask(taskData);
    });
    
    expect(taskId).toBeTruthy();
    expect(mockAddTask).toHaveBeenCalledWith(expect.objectContaining({
      title: taskData.title,
      description: taskData.description,
    }));
    expect(mockExecuteTask).toHaveBeenCalledWith(taskId);
  });

  it('should handle create and execute task failure', async () => {
    const taskData = {
      title: 'Test Task',
      description: 'Test Description',
    };

    const error = new Error('Task creation failed');
    mockAddTask.mockImplementationOnce(() => {
      throw error;
    });
    
    const { result } = renderHook(() => useTaskExecutor());
    
    let taskId: string | null = null;
    await act(async () => {
      taskId = await result.current.createAndExecuteTask(taskData);
    });
    
    expect(taskId).toBeNull();
    expect(mockToast.error).toHaveBeenCalledWith(
      expect.stringContaining('Failed to create and execute task')
    );
  });

  describe('Task Dependencies', () => {
    it('should validate task dependencies before execution', async () => {
      const dependentTask = {
        title: 'Dependent Task',
        description: 'Task with dependencies',
        type: TaskType.SURVEY,
        platform: PlatformType.CUSTOM,
        priority: TaskPriority.MEDIUM,
        dependencies: ['task-456']
      };

      // Mock task dependency check
      mockGetTaskProgress.mockReturnValue(100); // Dependency is completed
      
      const { result } = renderHook(() => useTaskExecutor());
      
      let taskId: string | null = null;
      await act(async () => {
        taskId = await result.current.createAndExecuteTask(dependentTask);
      });
      
      expect(taskId).toBeTruthy();
      expect(mockGetTaskProgress).toHaveBeenCalledWith('task-456');
      expect(mockAddTask).toHaveBeenCalledWith(expect.objectContaining({
        title: dependentTask.title,
        dependencies: ['task-456']
      }));
    });

    it('should not execute task if dependencies are not met', async () => {
      const dependentTask = {
        title: 'Blocked Task',
        description: 'Task with unmet dependencies',
        dependencies: ['task-789']
      };

      // Mock unmet dependency
      mockGetTaskProgress.mockReturnValue(50); // Dependency not completed
      
      const { result } = renderHook(() => useTaskExecutor());
      
      let taskId: string | null = null;
      await act(async () => {
        taskId = await result.current.createAndExecuteTask(dependentTask);
      });
      
      expect(taskId).toBeNull();
      expect(mockToast.error).toHaveBeenCalledWith(
        expect.stringContaining('Dependencies not met')
      );
    });
  });

  describe('Retry Mechanism', () => {
    it('should retry failed task execution', async () => {
      mockExecuteTask
        .mockRejectedValueOnce(new Error('First attempt failed'))
        .mockResolvedValueOnce(undefined);
      
      const taskData = {
        title: 'Retry Task',
        description: 'Task with retry',
        retryStrategy: {
          maxRetries: 3,
          delayBetweenRetries: 1000
        }
      };
      
      const { result } = renderHook(() => useTaskExecutor());
      
      let success;
      await act(async () => {
        success = await result.current.executeTask('task-123');
      });
      
      expect(mockExecuteTask).toHaveBeenCalledTimes(2);
      expect(success).toBe(true);
    });

    it('should respect max retry attempts', async () => {
      const error = new Error('Persistent failure');
      mockExecuteTask.mockRejectedValue(error);
      
      const { result } = renderHook(() => useTaskExecutor());
      
      let success;
      await act(async () => {
        success = await result.current.executeTask('task-123');
      });
      
      expect(mockExecuteTask).toHaveBeenCalledTimes(4); // Initial + 3 retries
      expect(success).toBe(false);
      expect(mockToast.error).toHaveBeenCalledWith(
        expect.stringContaining('Max retry attempts reached')
      );
    });
  });

  describe('Task Progress Updates', () => {
    it('should track task progress', () => {
      mockGetTaskProgress.mockReturnValue(75);
      
      const { result } = renderHook(() => useTaskExecutor());
      
      expect(result.current.getTaskProgress('task-123')).toBe(75);
      expect(mockGetTaskProgress).toHaveBeenCalledWith('task-123');
    });
  });

  describe('Task Status Updates', () => {
    it('should update task status', () => {
      const { result } = renderHook(() => useTaskExecutor());
      
      act(() => {
        result.current.updateTaskStatus('task-123', 'completed');
      });
      
      expect(mockUpdateTaskStatus).toHaveBeenCalledWith('task-123', 'completed');
    });
  });
});
