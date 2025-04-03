
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Loader2, XCircle, CheckCircle, Pause, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskStatusBadgeProps {
  isRunning: boolean;
  lastError?: any;
  progress: number;
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ isRunning, lastError, progress }) => {
  // Determine task status
  const getTaskStatusInfo = () => {
    if (isRunning) {
      return { 
        label: "Running", 
        icon: <Loader2 className="h-4 w-4 animate-spin" />,
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20"
      };
    } else if (lastError) {
      return { 
        label: "Failed", 
        icon: <XCircle className="h-4 w-4" />,
        color: "bg-destructive/10 text-destructive border-destructive/20"
      };
    } else if (progress >= 100) {
      return { 
        label: "Completed", 
        icon: <CheckCircle className="h-4 w-4" />,
        color: "bg-green-500/10 text-green-500 border-green-500/20" 
      };
    } else if (progress > 0) {
      return { 
        label: "Paused", 
        icon: <Pause className="h-4 w-4" />,
        color: "bg-amber-500/10 text-amber-500 border-amber-500/20"
      };
    }
    return { 
      label: "Pending", 
      icon: <Clock className="h-4 w-4" />,
      color: "bg-muted text-muted-foreground border-muted-foreground/20"
    };
  };

  const statusInfo = getTaskStatusInfo();

  return (
    <Badge className={cn("ml-2 text-xs", statusInfo.color)}>
      <span className="flex items-center gap-1">
        {statusInfo.icon}
        {statusInfo.label}
      </span>
    </Badge>
  );
};

export default TaskStatusBadge;
