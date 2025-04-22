
import { renderHook, act } from '@testing-library/react';
import { useTaskExecutor } from '../../use-task-executor';
import { useTaskExecutionContext } from '@/providers/TaskExecutionProvider';

jest.mock('@/providers/TaskExecutionProvider');

const mockUseTaskExecutionContext = useTaskExecutionContext as jest.MockedFunction<typeof useTaskExecutionContext>;

describe('useTaskExecutor - Task Status', () => {
  const mockUpdateTaskStatus = jest.fn();
  const mockGetTaskProgress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTaskExecutionContext.mockReturnValue({
      executeTask: jest.fn(),
      abortTask: jest.fn(),
      updateTaskStatus: mockUpdateTaskStatus,
      getTaskProgress: mockGetTaskProgress,
      tasks: {},
      addTask: jest.fn(),
    });
  });

  it('should track task progress', () => {
    mockGetTaskProgress.mockReturnValue(75);
    
    const { result } = renderHook(() => useTaskExecutor());
    
    expect(result.current.getTaskProgress('task-123')).toBe(75);
    expect(mockGetTaskProgress).toHaveBeenCalledWith('task-123');
  });

  it('should update task status', () => {
    const { result } = renderHook(() => useTaskExecutor());
    
    act(() => {
      result.current.updateTaskStatus('task-123', 'completed');
    });
    
    expect(mockUpdateTaskStatus).toHaveBeenCalledWith('task-123', 'completed');
  });
});
