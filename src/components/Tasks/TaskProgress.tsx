
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Clock, Loader2, CheckCircle2, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";
import { TaskStatus } from "@/lib/types";

interface TaskProgressProps {
  status: TaskStatus;
  progress: number;
  currentStep?: string;
  className?: string;
}

export function TaskProgress({ status, progress, currentStep, className }: TaskProgressProps) {
  const getStatusIcon = () => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case TaskStatus.FAILED:
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case TaskStatus.RUNNING:
        return <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getProgressColor = () => {
    switch (status) {
      case TaskStatus.COMPLETED:
        return "bg-green-500";
      case TaskStatus.FAILED:
        return "bg-destructive";
      case TaskStatus.RUNNING:
        return "bg-blue-500";
      default:
        return "bg-muted";
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <span className="font-medium">
            {currentStep || status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <span className="text-muted-foreground">{progress}%</span>
      </div>
      <Progress 
        value={progress} 
        className="h-2"
        indicatorClassName={getProgressColor()}
      />
    </div>
  );
}
