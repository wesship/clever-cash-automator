
import { render, act } from '@testing-library/react';
import { TaskExecutionProvider, useTaskExecutionContext } from '../TaskExecutionProvider';
import { TaskType, PlatformType, TaskPriority } from '@/lib/types';

describe('TaskExecutionProvider Integration', () => {
  const TestComponent = () => {
    const { executeTask, addTask, tasks } = useTaskExecutionContext();
    
    return (
      <div>
        <button onClick={() => {
          addTask({
            id: 'test-task',
            title: 'Test Task',
            description: 'Test Description',
            createdAt: new Date(),
            dependencies: []
          });
        }}>
          Add Task
        </button>
        <button onClick={() => executeTask('test-task')}>
          Execute Task
        </button>
        <div data-testid="task-count">{Object.keys(tasks).length}</div>
      </div>
    );
  };

  it('should provide task execution context', () => {
    const { getByText, getByTestId } = render(
      <TaskExecutionProvider>
        <TestComponent />
      </TaskExecutionProvider>
    );
    
    // Initial state
    expect(getByTestId('task-count')).toHaveTextContent('0');
    
    // Add task
    act(() => {
      getByText('Add Task').click();
    });
    
    // Verify task was added
    expect(getByTestId('task-count')).toHaveTextContent('1');
    
    // Execute task
    act(() => {
      getByText('Execute Task').click();
    });
  });
});
