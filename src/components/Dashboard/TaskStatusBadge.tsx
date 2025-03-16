
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskStatus } from "@/lib/types";
import { Clock, PlayCircle, CheckCircle2, XCircle, PauseCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status, className }) => {
  const isMobile = useIsMobile();

  const statusColors = {
    [TaskStatus.PENDING]: "bg-vibrant-yellow/90",
    [TaskStatus.RUNNING]: "bg-vibrant-green/90",
    [TaskStatus.COMPLETED]: "bg-vibrant-blue/90",
    [TaskStatus.FAILED]: "bg-destructive/90",
    [TaskStatus.PAUSED]: "bg-muted-foreground/90"
  };

  const statusIcons = {
    [TaskStatus.PENDING]: <Clock className="h-4 w-4" />,
    [TaskStatus.RUNNING]: <PlayCircle className="h-4 w-4" />,
    [TaskStatus.COMPLETED]: <CheckCircle2 className="h-4 w-4" />,
    [TaskStatus.FAILED]: <XCircle className="h-4 w-4" />,
    [TaskStatus.PAUSED]: <PauseCircle className="h-4 w-4" />
  };

  const statusText = {
    [TaskStatus.PENDING]: "Pending",
    [TaskStatus.RUNNING]: "Running",
    [TaskStatus.COMPLETED]: "Completed",
    [TaskStatus.FAILED]: "Failed",
    [TaskStatus.PAUSED]: "Paused"
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        "flex items-center gap-1 px-2 py-1 font-normal transition-opacity", 
        statusColors[status], 
        "text-white",
        className
      )}
    >
      {statusIcons[status]}
      <span>{isMobile ? null : statusText[status]}</span>
    </Badge>
  );
};

export default TaskStatusBadge;
