
import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';
import DepartmentAIHelper from '../DepartmentAIHelper';

describe('DepartmentAIHelper', () => {
  const mockOnDescriptionGenerated = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the AI helper card', () => {
    render(<DepartmentAIHelper onDescriptionGenerated={mockOnDescriptionGenerated} />);
    expect(screen.getByText(/AI Department Assistant/i)).toBeInTheDocument();
  });

  it('renders child components', () => {
    render(<DepartmentAIHelper onDescriptionGenerated={mockOnDescriptionGenerated} />);
    expect(screen.getByPlaceholderText(/Enter your Perplexity API key/i)).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });
});
