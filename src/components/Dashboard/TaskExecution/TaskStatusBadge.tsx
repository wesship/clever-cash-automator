
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Check, AlertTriangle, Clock, Pause, Ban } from "lucide-react";
import { cn } from "@/lib/utils";
import { PlatformError } from "@/lib/error-handling";

export const getTaskStatusDisplay = (
  isRunning: boolean,
  error: Error | PlatformError | undefined,
  progress: number
): {
  label: string;
  color: string;
  icon: React.ReactNode;
} => {
  if (isRunning) {
    return {
      label: "Running",
      color: "bg-blue-500",
      icon: <Clock className="w-3 h-3" />
    };
  }

  if (error) {
    return {
      label: "Failed",
      color: "bg-red-500",
      icon: <AlertTriangle className="w-3 h-3" />
    };
  }

  if (progress >= 100) {
    return {
      label: "Completed",
      color: "bg-green-500",
      icon: <Check className="w-3 h-3" />
    };
  }

  if (progress > 0) {
    return {
      label: "Paused",
      color: "bg-yellow-500",
      icon: <Pause className="w-3 h-3" />
    };
  }

  return {
    label: "Not Started",
    color: "bg-gray-500",
    icon: <Ban className="w-3 h-3" />
  };
};

interface TaskStatusBadgeProps {
  isRunning: boolean;
  error?: Error | PlatformError;
  progress: number;
  className?: string;
  lastError?: Error | PlatformError;
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({
  isRunning,
  error,
  lastError,
  progress,
  className
}) => {
  // Use either error or lastError, whichever is provided
  const actualError = error || lastError;
  
  const { label, color, icon } = getTaskStatusDisplay(isRunning, actualError, progress);

  return (
    <Badge 
      className={cn(
        "flex items-center gap-1 text-white",
        color,
        className
      )}
    >
      {icon}
      {label}
    </Badge>
  );
};

export default TaskStatusBadge;
