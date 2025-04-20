
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import APIKeyManager from '../APIKeyManager';
import { usePerplexityApi } from '@/hooks/use-perplexity-api';

// Mock the usePerplexityApi hook
vi.mock('@/hooks/use-perplexity-api', () => ({
  usePerplexityApi: vi.fn()
}));

describe('APIKeyManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders API key input field', () => {
    const mockHook = {
      apiKey: '',
      setApiKey: vi.fn(),
      removeApiKey: vi.fn()
    };
    
    (usePerplexityApi as any).mockReturnValue(mockHook);
    
    render(<APIKeyManager />);
    expect(screen.getByPlaceholderText(/Enter your Perplexity API key/i)).toBeInTheDocument();
  });

  it('shows remove button when API key exists', () => {
    const mockHook = {
      apiKey: 'test-api-key',
      setApiKey: vi.fn(),
      removeApiKey: vi.fn()
    };
    
    (usePerplexityApi as any).mockReturnValue(mockHook);
    
    render(<APIKeyManager />);
    expect(screen.getByText(/Remove API Key/i)).toBeInTheDocument();
  });

  it('handles API key changes', () => {
    const setApiKey = vi.fn();
    const mockHook = {
      apiKey: '',
      setApiKey,
      removeApiKey: vi.fn()
    };
    
    (usePerplexityApi as any).mockReturnValue(mockHook);
    
    render(<APIKeyManager />);
    const input = screen.getByPlaceholderText(/Enter your Perplexity API key/i);
    fireEvent.change(input, { target: { value: 'pplx-test-key' } });
    
    expect(setApiKey).toHaveBeenCalledWith('pplx-test-key');
  });

  it('shows error message when invalid API key is entered', () => {
    const setApiKey = vi.fn().mockImplementation(() => {
      throw new Error('Invalid API key format');
    });
    
    const mockHook = {
      apiKey: '',
      setApiKey,
      removeApiKey: vi.fn()
    };
    
    (usePerplexityApi as any).mockReturnValue(mockHook);
    
    render(<APIKeyManager />);
    const input = screen.getByPlaceholderText(/Enter your Perplexity API key/i);
    fireEvent.change(input, { target: { value: 'invalid-key' } });
    
    expect(screen.getByText(/Invalid API key format/i)).toBeInTheDocument();
  });
});
