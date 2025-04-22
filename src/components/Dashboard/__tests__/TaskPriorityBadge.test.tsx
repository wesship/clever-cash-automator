
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TaskPriorityBadge from '../TaskPriorityBadge';
import { TaskPriority } from '@/lib/types';

describe('TaskPriorityBadge', () => {
  it('renders high priority badge correctly', () => {
    render(<TaskPriorityBadge priority={TaskPriority.HIGH} />);
    const badge = screen.getByText('High Priority');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-500/10');
  });

  it('renders medium priority badge correctly', () => {
    render(<TaskPriorityBadge priority={TaskPriority.MEDIUM} />);
    const badge = screen.getByText('Medium Priority');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-yellow-500/10');
  });

  it('renders low priority badge correctly', () => {
    render(<TaskPriorityBadge priority={TaskPriority.LOW} />);
    const badge = screen.getByText('Low Priority');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-500/10');
  });
});
