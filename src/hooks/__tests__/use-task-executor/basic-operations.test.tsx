
import { renderHook, act } from '@testing-library/react';
import { useTaskExecutor } from '../../use-task-executor';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { toast } from 'sonner';

jest.mock('@/providers/TaskExecutionProvider');
jest.mock('sonner');

const mockUseTaskExecutionContext = useTaskExecutionContext as jest.MockedFunction<typeof useTaskExecutionContext>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('useTaskExecutor - Basic Operations', () => {
  const mockExecuteTask = jest.fn();
  const mockAbortTask = jest.fn();
  const mockUpdateTaskStatus = jest.fn();
  const mockGetTaskProgress = jest.fn();
  const mockAddTask = jest.fn();
  const mockTasks = {};

  beforeEach(() => {
    jest.clearAllMocks();
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
});
