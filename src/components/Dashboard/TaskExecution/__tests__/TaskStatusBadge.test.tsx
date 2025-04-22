
import { render, screen } from '@testing-library/react';
import TaskStatusBadge from '../TaskStatusBadge';

describe('TaskStatusBadge', () => {
  it('shows running state correctly', () => {
    render(
      <TaskStatusBadge 
        isRunning={true}
        progress={50}
      />
    );
    expect(screen.getByText('Running')).toBeInTheDocument();
  });

  it('shows error state when there is an error', () => {
    render(
      <TaskStatusBadge 
        isRunning={false}
        lastError={new Error('Test error')}
        progress={50}
      />
    );
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('shows completed state when progress is 100', () => {
    render(
      <TaskStatusBadge 
        isRunning={false}
        progress={100}
      />
    );
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows paused state when progress is between 0 and 100', () => {
    render(
      <TaskStatusBadge 
        isRunning={false}
        progress={50}
      />
    );
    expect(screen.getByText('Paused')).toBeInTheDocument();
  });

  it('shows ready state when progress is 0', () => {
    render(
      <TaskStatusBadge 
        isRunning={false}
        progress={0}
      />
    );
    expect(screen.getByText('Ready')).toBeInTheDocument();
  });
});
