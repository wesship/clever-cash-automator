
import { 
  formatTime, 
  estimateTimeRemaining, 
  countStepsByStatus,
  parseStepsFromLogs,
  getTaskStatusDisplay
} from '../utils';

describe('Task Execution Utilities', () => {
  describe('formatTime', () => {
    it('formats seconds correctly', () => {
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(3600)).toBe('60:00');
      expect(formatTime(0)).toBe('00:00');
    });
  });

  describe('estimateTimeRemaining', () => {
    it('calculates remaining time correctly', () => {
      expect(estimateTimeRemaining(60, 50)).toBe('01:00');
      expect(estimateTimeRemaining(0, 50)).toBeNull();
      expect(estimateTimeRemaining(60, 0)).toBeNull();
    });
  });

  describe('countStepsByStatus', () => {
    it('counts steps correctly', () => {
      const steps = [
        { status: 'completed' },
        { status: 'in-progress' },
        { status: 'completed' },
        { status: 'error' }
      ];

      const counts = countStepsByStatus(steps);
      expect(counts.completed).toBe(2);
      expect(counts['in-progress']).toBe(1);
      expect(counts.error).toBe(1);
    });
  });

  describe('parseStepsFromLogs', () => {
    it('parses step information from logs', () => {
      const logs = [
        'Step 1/3: Initialize (33%)',
        'Step 2/3: Process (66%)',
        'Error during processing'
      ];

      const { steps, currentStepIndex } = parseStepsFromLogs(logs);
      expect(steps).toHaveLength(2);
      expect(currentStepIndex).toBe(1);
      expect(steps[1].status).toBe('error');
    });

    it('handles empty logs', () => {
      const { steps, currentStepIndex } = parseStepsFromLogs([]);
      expect(steps).toHaveLength(0);
      expect(currentStepIndex).toBe(0);
    });
  });

  describe('getTaskStatusDisplay', () => {
    it('returns correct status for running task', () => {
      const status = getTaskStatusDisplay(true, undefined, 50);
      expect(status.label).toBe('Running');
    });

    it('returns correct status for failed task', () => {
      const status = getTaskStatusDisplay(false, new Error(), 50);
      expect(status.label).toBe('Failed');
    });

    it('returns correct status for completed task', () => {
      const status = getTaskStatusDisplay(false, undefined, 100);
      expect(status.label).toBe('Completed');
    });
  });
});
