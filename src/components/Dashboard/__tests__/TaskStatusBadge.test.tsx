
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TaskStatusBadge from '../TaskStatusBadge';
import { TaskStatus } from '@/lib/types';

describe('TaskStatusBadge', () => {
  it('renders running status correctly', () => {
    render(<TaskStatusBadge status={TaskStatus.RUNNING} />);
    const badge = screen.getByText('Running');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-blue-500/10');
  });

  it('renders completed status correctly', () => {
    render(<TaskStatusBadge status={TaskStatus.COMPLETED} />);
    const badge = screen.getByText('Completed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-500/10');
  });

  it('renders failed status correctly', () => {
    render(<TaskStatusBadge status={TaskStatus.FAILED} />);
    const badge = screen.getByText('Failed');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-500/10');
  });

  it('renders pending status correctly', () => {
    render(<TaskStatusBadge status={TaskStatus.PENDING} />);
    const badge = screen.getByText('Pending');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-500/10');
  });
});
