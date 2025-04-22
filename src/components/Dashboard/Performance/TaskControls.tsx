
import React from "react";
import { Button } from "@/components/ui/button";
import { PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { TaskStatus } from "@/lib/types";

interface TaskControlsProps {
  status: TaskStatus;
  onPause?: () => void;
  onResume?: () => void;
  onRetry?: () => void;
  estimatedCompletion?: Date | null;
  config?: {
    schedule?: {
      endDate?: string;
    };
  };
}

export const TaskControls: React.FC<TaskControlsProps> = ({
  status,
  onPause,
  onResume,
  onRetry,
  config
}) => {
  const isRunning = status === TaskStatus.RUNNING;
  const isPaused = status === TaskStatus.PAUSED;
  const isFailed = status === TaskStatus.FAILED;
  const isCompleted = status === TaskStatus.COMPLETED;

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">Estimated completion:</span>
        <span className="text-sm font-medium">
          {isCompleted ? "Completed" : isFailed ? "Failed" : 
            config?.schedule?.endDate ? 
              new Date(config.schedule.endDate).toLocaleDateString() : 
              "Not specified"}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {isRunning && onPause && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onPause}
            className="flex items-center gap-1"
          >
            <PauseIcon className="h-4 w-4" />
            Pause
          </Button>
        )}
        {isPaused && onResume && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResume}
            className="flex items-center gap-1"
          >
            <PlayIcon className="h-4 w-4" />
            Resume
          </Button>
        )}
        {isFailed && onRetry && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onRetry}
            className="flex items-center gap-1"
          >
            <RotateCcwIcon className="h-4 w-4" />
            Retry
          </Button>
        )}
      </div>
    </div>
  );
};
