
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom';
import GenerationTypeSelect from '../GenerationTypeSelect';
import { GenerationType } from '@/types/ai-types';

describe('GenerationTypeSelect', () => {
  const mockOnChange = vi.fn();
  const defaultProps = {
    selectedType: 'description' as GenerationType,
    onTypeChange: mockOnChange
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders with default selection', () => {
    render(<GenerationTypeSelect {...defaultProps} />);
    expect(screen.getByRole('combobox')).toHaveValue('description');
  });

  it('calls onTypeChange when selection changes', () => {
    render(<GenerationTypeSelect {...defaultProps} />);
    const select = screen.getByRole('combobox');
    fireEvent.change(select, { target: { value: 'goals' } });
    expect(mockOnChange).toHaveBeenCalledWith('goals');
  });

  it('displays all generation options', () => {
    render(<GenerationTypeSelect {...defaultProps} />);
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    ['description', 'goals', 'responsibilities', 'metrics'].forEach(option => {
      const optionElement = screen.getByText(option);
      expect(optionElement).toBeInTheDocument();
    });
  });
});
