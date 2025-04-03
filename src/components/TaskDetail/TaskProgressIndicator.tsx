
import React from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, Clock } from "lucide-react";
import { TaskStatus } from "@/lib/types";

interface TaskProgressIndicatorProps {
  status: TaskStatus;
  progress: number;
  className?: string;
}

const TaskProgressIndicator = ({ status, progress, className }: TaskProgressIndicatorProps) => {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          {status === TaskStatus.COMPLETED ? (
            <CheckCircle2 className="h-4 w-4 text-green-500" />
          ) : status === TaskStatus.FAILED ? (
            <XCircle className="h-4 w-4 text-destructive" />
          ) : (
            <Clock className="h-4 w-4 text-blue-500" />
          )}
          <span>
            {status === TaskStatus.COMPLETED
              ? "Task completed"
              : status === TaskStatus.FAILED
              ? "Task failed"
              : status === TaskStatus.RUNNING
              ? "Running..."
              : status === TaskStatus.PAUSED
              ? "Paused"
              : "Pending"}
          </span>
        </div>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress 
        value={progress} 
        className={cn(
          "h-2",
          status === TaskStatus.COMPLETED && "bg-green-500/20",
          status === TaskStatus.FAILED && "bg-destructive/20",
          status === TaskStatus.PAUSED && "bg-amber-500/20"
        )}
        indicatorClassName={cn(
          status === TaskStatus.COMPLETED && "bg-green-500",
          status === TaskStatus.FAILED && "bg-destructive",
          status === TaskStatus.PAUSED && "bg-amber-500"
        )}
      />
    </div>
  );
};

export default TaskProgressIndicator;
