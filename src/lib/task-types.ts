
import { TaskStatus as OriginalTaskStatus } from './types';
import { TaskStatus as CentralizedTaskStatus } from '@/services/TaskExecutionService';

// Map between centralized and original task status types
export const mapTaskStatus = (status: OriginalTaskStatus): CentralizedTaskStatus => {
  switch (status) {
    case 'PENDING': return 'pending';
    case 'RUNNING': return 'in_progress';
    case 'COMPLETED': return 'completed';
    case 'FAILED': return 'failed';
    case 'PAUSED': return 'pending';
    default: return 'pending';
  }
};

// Map from centralized task status to original task status
export const mapToOriginalTaskStatus = (status: CentralizedTaskStatus): OriginalTaskStatus => {
  switch (status) {
    case 'pending': return 'PENDING';
    case 'in_progress': return 'RUNNING';
    case 'completed': return 'COMPLETED';
    case 'failed': return 'FAILED';
    default: return 'PENDING';
  }
};
