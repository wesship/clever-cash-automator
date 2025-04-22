import { render, act, waitFor } from '@testing-library/react';
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

  it('should provide task execution context', async () => {
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
    await act(async () => {
      getByText('Execute Task').click();
    });
  });

  it('should handle multiple tasks correctly', async () => {
    const MultipleTaskComponent = () => {
      const { addTask, executeTask, tasks } = useTaskExecutionContext();
      
      const addMultipleTasks = () => {
        ['task-1', 'task-2', 'task-3'].forEach((id) => {
          addTask({
            id,
            title: `Task ${id}`,
            description: 'Test Description',
            createdAt: new Date(),
            dependencies: []
          });
        });
      };
      
      return (
        <div>
          <button onClick={addMultipleTasks}>Add Multiple Tasks</button>
          <button onClick={() => executeTask('task-1')}>Execute Task 1</button>
          <button onClick={() => executeTask('task-2')}>Execute Task 2</button>
          <div data-testid="task-count">{Object.keys(tasks).length}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <TaskExecutionProvider>
        <MultipleTaskComponent />
      </TaskExecutionProvider>
    );

    // Add multiple tasks
    act(() => {
      getByText('Add Multiple Tasks').click();
    });

    expect(getByTestId('task-count')).toHaveTextContent('3');

    // Execute tasks
    await act(async () => {
      getByText('Execute Task 1').click();
    });

    await act(async () => {
      getByText('Execute Task 2').click();
    });
  });

  it('should handle task dependencies', async () => {
    const DependentTasksComponent = () => {
      const { addTask, executeTask, tasks, getTaskProgress } = useTaskExecutionContext();
      
      const addDependentTasks = () => {
        addTask({
          id: 'parent-task',
          title: 'Parent Task',
          description: 'Must complete first',
          createdAt: new Date(),
          dependencies: []
        });

        addTask({
          id: 'child-task',
          title: 'Child Task',
          description: 'Depends on parent task',
          createdAt: new Date(),
          dependencies: ['parent-task']
        });
      };
      
      return (
        <div>
          <button onClick={addDependentTasks}>Add Dependent Tasks</button>
          <button onClick={() => executeTask('parent-task')}>Execute Parent</button>
          <button onClick={() => executeTask('child-task')}>Execute Child</button>
          <div data-testid="task-count">{Object.keys(tasks).length}</div>
          <div data-testid="parent-progress">
            {getTaskProgress('parent-task')}
          </div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <TaskExecutionProvider>
        <DependentTasksComponent />
      </TaskExecutionProvider>
    );

    // Add dependent tasks
    act(() => {
      getByText('Add Dependent Tasks').click();
    });

    expect(getByTestId('task-count')).toHaveTextContent('2');

    // Execute parent task
    await act(async () => {
      getByText('Execute Parent').click();
    });

    // Try to execute child task
    await act(async () => {
      getByText('Execute Child').click();
    });
  });

  it('should handle task abortion', async () => {
    const AbortableTaskComponent = () => {
      const { addTask, executeTask, abortTask, tasks } = useTaskExecutionContext();
      
      return (
        <div>
          <button onClick={() => {
            addTask({
              id: 'abort-test',
              title: 'Abortable Task',
              description: 'Test Description',
              createdAt: new Date(),
              dependencies: []
            });
          }}>Add Task</button>
          <button onClick={() => executeTask('abort-test')}>Start Task</button>
          <button onClick={() => abortTask('abort-test')}>Abort Task</button>
          <div data-testid="task-count">{Object.keys(tasks).length}</div>
        </div>
      );
    };

    const { getByText, getByTestId } = render(
      <TaskExecutionProvider>
        <AbortableTaskComponent />
      </TaskExecutionProvider>
    );

    // Add task
    act(() => {
      getByText('Add Task').click();
    });

    expect(getByTestId('task-count')).toHaveTextContent('1');

    // Start and abort task
    await act(async () => {
      getByText('Start Task').click();
    });

    act(() => {
      getByText('Abort Task').click();
    });
  });
});
