
import { TaskStatus as OriginalTaskStatus, TaskType as OriginalTaskType } from './types';
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

// Helper to map task types from original to centralized format
export const mapTaskType = (type: OriginalTaskType): string => {
  switch (type) {
    case OriginalTaskType.SURVEY: return 'survey';
    case OriginalTaskType.DATA_COLLECTION: return 'data_collection';
    case OriginalTaskType.VALIDATION: return 'validation';
    case OriginalTaskType.PROCESSING: return 'processing';
    case OriginalTaskType.REPORTING: return 'reporting';
    case OriginalTaskType.VIDEO_WATCH: return 'video_watch';
    case OriginalTaskType.AD_CLICK: return 'ad_click';
    case OriginalTaskType.CONTENT_CREATION: return 'content_creation';
    case OriginalTaskType.AFFILIATE: return 'affiliate';
    case OriginalTaskType.CUSTOM: return 'custom';
    default: return 'survey';
  }
};
