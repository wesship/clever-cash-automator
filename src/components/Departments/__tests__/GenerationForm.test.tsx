
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import GenerationForm from '../GenerationForm';
import { GenerationType } from '@/types/ai-types';

describe('GenerationForm', () => {
  const mockOnGenerate = vi.fn();
  const defaultProps = {
    apiKey: 'test-api-key',
    selectedType: 'description' as GenerationType,
    onGenerate: mockOnGenerate
  };

  beforeEach(() => {
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('renders form elements correctly', () => {
    render(<GenerationForm {...defaultProps} />);
    expect(screen.getByPlaceholderText(/Generate a description/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Generate/i })).toBeInTheDocument();
  });

  it('handles form submission', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({
        choices: [{ message: { content: 'Generated content' } }]
      })
    });

    render(<GenerationForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Generate a description/i);
    const button = screen.getByRole('button', { name: /Generate/i });

    fireEvent.change(input, { target: { value: 'Test prompt' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockOnGenerate).toHaveBeenCalledWith('Generated content');
    });
  });

  it('handles API errors', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('API Error'));

    render(<GenerationForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Generate a description/i);
    const button = screen.getByRole('button', { name: /Generate/i });

    fireEvent.change(input, { target: { value: 'Test prompt' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Failed to generate content/i)).toBeInTheDocument();
    });
  });

  it('disables form when loading', async () => {
    (global.fetch as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));

    render(<GenerationForm {...defaultProps} />);
    const input = screen.getByPlaceholderText(/Generate a description/i);
    const button = screen.getByRole('button', { name: /Generate/i });

    fireEvent.change(input, { target: { value: 'Test prompt' } });
    fireEvent.click(button);

    expect(input).toBeDisabled();
    expect(button).toBeDisabled();
  });
});

