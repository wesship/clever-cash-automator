
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
});
