
import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { Task } from "@/lib/types";

interface TaskControlButtonsProps {
  isRunning: boolean;
  lastError?: any;
  canRetry: boolean;
  taskId: string;
  taskName: string;
  onStartTask: ((taskId: string) => void) | ((task: Task) => Promise<boolean>);
  onStopTask: (taskId: string) => void;
  onRetryTask: (taskId: string) => void;
  onClose: () => void;
  progress: number;
  task?: Task;
}

const TaskControlButtons: React.FC<TaskControlButtonsProps> = ({
  isRunning,
  lastError,
  canRetry,
  taskId,
  taskName,
  onStartTask,
  onStopTask,
  onRetryTask,
  onClose,
  progress,
  task
}) => {
  // Handle task control
  const handleTaskControl = () => {
    if (isRunning) {
      onStopTask(taskId);
      toast.info(`Paused task: ${taskName}`);
    } else {
      if (lastError && canRetry) {
        onRetryTask(taskId);
        toast.info(`Retrying task: ${taskName}`);
      } else if (!lastError) {
        // Check if we have a task object and if onStartTask expects a task
        if (task) {
          // Call with task object if available
          (onStartTask as (task: Task) => Promise<boolean>)(task);
        } else {
          // Fall back to using the taskId
          (onStartTask as (taskId: string) => void)(taskId);
        }
        toast.success(`Started task: ${taskName}`);
      }
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={isRunning ? "outline" : "default"}
        onClick={handleTaskControl}
        disabled={!isRunning && lastError && !canRetry}
        size="sm"
        className="gap-1"
      >
        {isRunning ? (
          <>
            <Pause className="h-4 w-4" />
            Pause
          </>
        ) : lastError && canRetry ? (
          <>
            <RefreshCw className="h-4 w-4" />
            Retry
          </>
        ) : (
          <>
            <Play className="h-4 w-4" />
            {progress > 0 ? "Resume" : "Start"}
          </>
        )}
      </Button>
      <Button variant="ghost" onClick={onClose} size="sm">Close</Button>
    </div>
  );
};

export default TaskControlButtons;
