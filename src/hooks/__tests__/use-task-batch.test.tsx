
import { renderHook, act } from '@testing-library/react';
import { useTaskBatch } from '../use-task-batch';
import { TaskExecutionProvider } from '@/providers/TaskExecutionProvider';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';

jest.mock('sonner');

describe('useTaskBatch', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <TaskExecutionProvider>{children}</TaskExecutionProvider>
  );

  it('should create multiple tasks', async () => {
    const { result } = renderHook(() => useTaskBatch(), { wrapper });

    let taskIds: string[] = [];
    await act(async () => {
      taskIds = await result.current.createBatchTasks(
        'Batch Task',
        'Batch Description',
        { count: 3 }
      );
    });

    expect(taskIds.length).toBe(3);
  });

  it('should execute multiple tasks', async () => {
    const { result } = renderHook(() => useTaskBatch(), { wrapper });

    let taskIds: string[] = [];
    await act(async () => {
      taskIds = await result.current.createBatchTasks(
        'Batch Task',
        'Batch Description',
        { count: 2 }
      );
    });

    let successCount = 0;
    await act(async () => {
      successCount = await result.current.executeBatch(taskIds);
    });

    expect(successCount).toBe(2);
  });
});
