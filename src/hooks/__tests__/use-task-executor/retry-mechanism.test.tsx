
import { renderHook, act } from '@testing-library/react';
import { useTaskExecutor } from '../../use-task-executor';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { toast } from 'sonner';

jest.mock('@/providers/TaskExecutionProvider');
jest.mock('sonner');

const mockUseTaskExecutionContext = useTaskExecutionContext as jest.MockedFunction<typeof useTaskExecutionContext>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('useTaskExecutor - Retry Mechanism', () => {
  const mockExecuteTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskExecutionContext.mockReturnValue({
      executeTask: mockExecuteTask,
      abortTask: jest.fn(),
      updateTaskStatus: jest.fn(),
      getTaskProgress: jest.fn(),
      tasks: {},
      addTask: jest.fn(),
    });
  });

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
    
    expect(mockExecuteTask).toHaveBeenCalledTimes(4);
    expect(success).toBe(false);
    expect(mockToast.error).toHaveBeenCalledWith(
      expect.stringContaining('Max retry attempts reached')
    );
  });
});
