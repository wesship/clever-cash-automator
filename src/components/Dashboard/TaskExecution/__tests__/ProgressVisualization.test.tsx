
import { render, screen } from '@testing-library/react';
import ProgressVisualization from '../ProgressVisualization';

describe('ProgressVisualization', () => {
  const defaultProps = {
    progress: 50,
    currentStepDescription: 'Processing task',
    executionTime: 120
  };

  it('renders progress percentage correctly', () => {
    render(<ProgressVisualization {...defaultProps} />);
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('displays current operation description', () => {
    render(<ProgressVisualization {...defaultProps} />);
    expect(screen.getByText('Processing task')).toBeInTheDocument();
  });

  it('shows execution time when provided', () => {
    render(<ProgressVisualization {...defaultProps} />);
    expect(screen.getByText('Execution time: 02:00')).toBeInTheDocument();
  });

  it('hides execution time when zero', () => {
    render(
      <ProgressVisualization 
        {...defaultProps} 
        executionTime={0} 
      />
    );
    expect(screen.queryByText(/Execution time/)).not.toBeInTheDocument();
  });

  it('shows "Not running" when no description provided', () => {
    render(
      <ProgressVisualization 
        {...defaultProps} 
        currentStepDescription="" 
      />
    );
    expect(screen.getByText('Not running')).toBeInTheDocument();
  });
});
