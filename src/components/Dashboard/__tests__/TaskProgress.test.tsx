
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TaskProgress from '../TaskProgress';
import { TaskStatus } from '@/lib/types';

describe('TaskProgress', () => {
  it('renders progress correctly', () => {
    render(
      <TaskProgress 
        completionCount={5} 
        targetCompletions={10}
        status={TaskStatus.RUNNING}
      />
    );
    
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
    expect(screen.getByText('5/10')).toBeInTheDocument();
  });

  it('shows completed state', () => {
    render(
      <TaskProgress 
        completionCount={10} 
        targetCompletions={10}
        status={TaskStatus.COMPLETED}
      />
    );
    
    expect(screen.getByText('Completed')).toBeInTheDocument();
  });

  it('shows proper progress percentage', () => {
    render(
      <TaskProgress 
        completionCount={3} 
        targetCompletions={10}
        status={TaskStatus.RUNNING}
      />
    );
    
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-valuenow', '30');
  });
});
