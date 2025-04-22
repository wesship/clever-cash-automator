
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import TaskMetadata from '../TaskMetadata';
import { PlatformType } from '@/lib/types';

describe('TaskMetadata', () => {
  const defaultProps = {
    platform: PlatformType.YOUTUBE,
    earnings: 150,
    lastRun: new Date('2024-01-01T10:00:00')
  };

  it('renders platform information', () => {
    render(<TaskMetadata {...defaultProps} />);
    expect(screen.getByText(/YouTube/i)).toBeInTheDocument();
  });

  it('renders earnings correctly', () => {
    render(<TaskMetadata {...defaultProps} />);
    expect(screen.getByText(/\$150/)).toBeInTheDocument();
  });

  it('renders last run date', () => {
    render(<TaskMetadata {...defaultProps} />);
    expect(screen.getByText(/Jan 1, 2024/)).toBeInTheDocument();
  });

  it('handles null lastRun date', () => {
    render(<TaskMetadata {...defaultProps} lastRun={null} />);
    expect(screen.getByText(/Never/)).toBeInTheDocument();
  });
});
