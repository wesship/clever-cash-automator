
import { renderHook } from '@testing-library/react';
import { useExecutionState } from '../use-execution-state';
import { TaskExecutionEngine } from '@/services/task-execution';

// Mock TaskExecutionEngine
jest.mock('@/services/task-execution', () => ({
  TaskExecutionEngine: {
    getTaskState: jest.fn()
  }
}));

describe('useExecutionState', () => {
  const mockTaskId = 'test-task-123';
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useExecutionState());
    
    expect(result.current).toEqual(expect.objectContaining({
      isRunning: false,
      progress: 0,
      currentStepDescription: '',
      logs: [],
      executionTime: 0,
      steps: [],
      currentStepIndex: 0
    }));
  });

  it('updates state when task is running', () => {
    const mockState = {
      isRunning: true,
      progress: 45,
      currentStepDescription: 'Processing',
      logs: ['Step 1: Started'],
      startTime: new Date()
    };

    (TaskExecutionEngine.getTaskState as jest.Mock).mockReturnValue(mockState);

    const { result } = renderHook(() => useExecutionState(mockTaskId));

    expect(result.current.isRunning).toBe(true);
    expect(result.current.progress).toBe(45);
    expect(result.current.currentStepDescription).toBe('Processing');
    expect(result.current.logs).toEqual(['Step 1: Started']);
  });

  it('parses steps from logs correctly', () => {
    const mockState = {
      isRunning: true,
      progress: 50,
      currentStepDescription: 'Step 2',
      logs: [
        'Step 1/3: Initialize',
        'Step 2/3: Process',
        'Step 3/3: Finalize'
      ],
      startTime: new Date()
    };

    (TaskExecutionEngine.getTaskState as jest.Mock).mockReturnValue(mockState);

    const { result } = renderHook(() => useExecutionState(mockTaskId));

    expect(result.current.steps).toHaveLength(3);
    expect(result.current.currentStepIndex).toBe(1);
  });

  it('calculates execution time correctly', () => {
    const startTime = new Date(Date.now() - 5000); // 5 seconds ago
    const mockState = {
      isRunning: true,
      progress: 50,
      currentStepDescription: 'Processing',
      logs: ['Started'],
      startTime
    };

    (TaskExecutionEngine.getTaskState as jest.Mock).mockReturnValue(mockState);

    const { result } = renderHook(() => useExecutionState(mockTaskId));

    expect(result.current.executionTime).toBeGreaterThanOrEqual(5);
  });
});
