
import { render, screen } from '@testing-library/react';
import TaskProgressTab from '../TaskProgressTab';

describe('TaskProgressTab', () => {
  const defaultProps = {
    progress: 60,
    currentStepDescription: 'Running step 2',
    executionSteps: [
      { name: 'Step 1', status: 'completed' as const },
      { name: 'Step 2', status: 'in-progress' as const },
      { name: 'Step 3', status: 'pending' as const }
    ],
    currentStepIndex: 1,
    isRunning: true,
    executionTime: 180
  };

  it('renders progress visualization', () => {
    render(<TaskProgressTab {...defaultProps} />);
    expect(screen.getByText('60%')).toBeInTheDocument();
    expect(screen.getByText('Running step 2')).toBeInTheDocument();
  });

  it('shows execution steps when provided', () => {
    render(<TaskProgressTab {...defaultProps} />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
  });

  it('handles empty steps array', () => {
    render(
      <TaskProgressTab 
        {...defaultProps}
        executionSteps={[]}
      />
    );
    // Should not render step progress section
    expect(screen.queryByText('Step 1')).not.toBeInTheDocument();
  });

  it('correctly identifies current step', () => {
    const { container } = render(<TaskProgressTab {...defaultProps} />);
    // Check for active step styling
    const activeStep = container.querySelector('.bg-primary/10');
    expect(activeStep).toHaveTextContent('Step 2');
  });

  it('shows correct execution time', () => {
    render(<TaskProgressTab {...defaultProps} />);
    expect(screen.getByText('Execution time: 03:00')).toBeInTheDocument();
  });
});
