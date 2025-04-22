
import { TaskStatus as OriginalTaskStatus } from './types';
import { TaskStatus as CentralizedTaskStatus } from '@/services/TaskExecutionService';

// Map between centralized and original task status types
export const mapTaskStatus = (status: OriginalTaskStatus): CentralizedTaskStatus => {
  switch (status) {
    case OriginalTaskStatus.PENDING: return 'pending';
    case OriginalTaskStatus.RUNNING: return 'in_progress';
    case OriginalTaskStatus.COMPLETED: return 'completed';
    case OriginalTaskStatus.FAILED: return 'failed';
    case OriginalTaskStatus.PAUSED: return 'pending';
    default: return 'pending';
  }
};

// Map from centralized task status to original task status
export const mapToOriginalTaskStatus = (status: CentralizedTaskStatus): OriginalTaskStatus => {
  switch (status) {
    case 'pending': return OriginalTaskStatus.PENDING;
    case 'in_progress': return OriginalTaskStatus.RUNNING;
    case 'completed': return OriginalTaskStatus.COMPLETED;
    case 'failed': return OriginalTaskStatus.FAILED;
    default: return OriginalTaskStatus.PENDING;
  }
};
