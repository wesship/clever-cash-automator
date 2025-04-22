
import { 
  Task, 
  TaskConfiguration, 
  TaskState, 
  TaskLogEntry 
} from '@/lib/task-models';
import { ErrorService } from '../error-service';

export class TaskStateManager {
  initializeTaskState(config: TaskConfiguration): Task {
    const initialState: TaskState = {
      status: 'pending',
      progress: 0,
      currentStep: 'Waiting to start',
      logs: [this.createLogEntry('Task created and waiting to start', 'info')],
      retryCount: 0
    };
    
    return {
      config,
      state: initialState
    };
  }

  updateProgress(task: Task, progress: number, stepDescription: string): Task {
    if (task.state.status !== 'in_progress') {
      const error = new Error(`Cannot update progress for task in ${task.state.status} state`);
      ErrorService.log(error);
      throw error;
    }
    
    const validProgress = Math.max(0, Math.min(100, progress));
    
    const shouldLogUpdate = 
      stepDescription !== task.state.currentStep || 
      Math.abs(validProgress - task.state.progress) >= 10;
    
    const updatedLogs = shouldLogUpdate
      ? [...task.state.logs, this.createLogEntry(`Progress ${validProgress}%: ${stepDescription}`, 'info')]
      : task.state.logs;
    
    return {
      ...task,
      state: {
        ...task.state,
        progress: validProgress,
        currentStep: stepDescription,
        logs: updatedLogs
      }
    };
  }

  private createLogEntry(
    message: string, 
    type: TaskLogEntry['type'] = 'info',
    data?: any
  ): TaskLogEntry {
    return {
      timestamp: new Date(),
      message,
      type,
      data
    };
  }
}

export const taskStateManager = new TaskStateManager();
