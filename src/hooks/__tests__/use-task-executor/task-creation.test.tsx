
import { renderHook, act } from '@testing-library/react';
import { useTaskExecutor } from '../../use-task-executor';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';
import { toast } from 'sonner';

jest.mock('@/providers/TaskExecutionProvider');
jest.mock('sonner');

const mockUseTaskExecutionContext = useTaskExecutionContext as jest.MockedFunction<typeof useTaskExecutionContext>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('useTaskExecutor - Task Creation', () => {
  const mockExecuteTask = jest.fn();
  const mockAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskExecutionContext.mockReturnValue({
      executeTask: mockExecuteTask,
      addTask: mockAddTask,
      abortTask: jest.fn(),
      updateTaskStatus: jest.fn(),
      getTaskProgress: jest.fn(),
      tasks: {},
    });
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
