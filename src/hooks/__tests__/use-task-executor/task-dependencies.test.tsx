
import { renderHook, act } from '@testing-library/react';
import { useTaskExecutor } from '../../use-task-executor';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';
import { toast } from 'sonner';

jest.mock('@/providers/TaskExecutionProvider');
jest.mock('sonner');

const mockUseTaskExecutionContext = useTaskExecutionContext as jest.MockedFunction<typeof useTaskExecutionContext>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('useTaskExecutor - Task Dependencies', () => {
  const mockExecuteTask = jest.fn();
  const mockGetTaskProgress = jest.fn();
  const mockAddTask = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskExecutionContext.mockReturnValue({
      executeTask: mockExecuteTask,
      addTask: mockAddTask,
      getTaskProgress: mockGetTaskProgress,
      abortTask: jest.fn(),
      updateTaskStatus: jest.fn(),
      tasks: {},
    });
  });

  it('should validate task dependencies before execution', async () => {
    const dependentTask = {
      title: 'Dependent Task',
      description: 'Task with dependencies',
      type: TaskType.SURVEY,
      platform: PlatformType.CUSTOM,
      priority: TaskPriority.MEDIUM,
      dependencies: ['task-456']
    };

    mockGetTaskProgress.mockReturnValue(100);
    
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

    mockGetTaskProgress.mockReturnValue(50);
    
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
