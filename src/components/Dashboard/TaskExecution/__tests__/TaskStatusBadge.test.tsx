
import { render, screen } from '@testing-library/react';
import TaskStatusBadge from '../TaskStatusBadge';
import { PlatformError } from '@/lib/error-handling';
import { ErrorType } from '@/lib/error-handling/types';

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
    const platformError = new PlatformError('Test error', {
      type: ErrorType.UNKNOWN,
      platformId: 'test',
      recoverable: false
    });

    render(
      <TaskStatusBadge 
        isRunning={false}
        error={platformError}
        progress={50}
      />
    );
    expect(screen.getByText('Failed')).toBeInTheDocument();
  });

  it('shows error state with lastError prop', () => {
    const platformError = new PlatformError('Test error', {
      type: ErrorType.UNKNOWN,
      platformId: 'test',
      recoverable: false
    });

    render(
      <TaskStatusBadge 
        isRunning={false}
        lastError={platformError}
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
    expect(screen.getByText('Not Started')).toBeInTheDocument();
  });
});
