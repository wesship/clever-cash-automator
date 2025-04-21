
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import DepartmentAIHelperError from '../DepartmentAIHelperError';

describe('DepartmentAIHelperError', () => {
  const mockResetErrorBoundary = vi.fn();
  const mockError = new Error('Test error message');

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders error message', () => {
    render(
      <DepartmentAIHelperError 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );
    
    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
  });

  it('calls resetErrorBoundary when try again button is clicked', () => {
    render(
      <DepartmentAIHelperError 
        error={mockError} 
        resetErrorBoundary={mockResetErrorBoundary} 
      />
    );
    
    const tryAgainButton = screen.getByRole('button', { name: /Try again/i });
    fireEvent.click(tryAgainButton);
    
    expect(mockResetErrorBoundary).toHaveBeenCalled();
  });
});
