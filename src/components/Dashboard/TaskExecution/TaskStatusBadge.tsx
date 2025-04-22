
import React from "react";
import { 
  Check, 
  Clock, 
  Loader2, 
  AlertTriangle, 
  Pause 
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface TaskStatusBadgeProps {
  isRunning: boolean;
  progress: number;
  lastError?: Error | null;
  className?: string;
  showIcon?: boolean;
  showTooltip?: boolean;
  tooltipContent?: React.ReactNode;
  size?: "sm" | "default" | "lg";
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({
  isRunning,
  progress,
  lastError,
  className,
  showIcon = true,
  showTooltip = false,
  tooltipContent,
  size = "default"
}) => {
  // Determine the status based on the given props
  const getStatus = () => {
    if (isRunning) return "Running";
    if (lastError) return "Failed";
    if (progress === 100) return "Completed";
    if (progress > 0) return "Paused";
    return "Ready";
  };

  // Get the appropriate styling for each status
  const getStatusStyles = () => {
    const status = getStatus();
    switch (status) {
      case "Running":
        return "bg-vibrant-green/10 text-vibrant-green border-vibrant-green/20";
      case "Failed":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "Completed":
        return "bg-vibrant-blue/10 text-vibrant-blue border-vibrant-blue/20";
      case "Paused":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "Ready":
        return "bg-muted text-muted-foreground border-muted/20";
      default:
        return "bg-muted text-muted-foreground border-muted/20";
    }
  };

  // Get the appropriate icon for each status
  const getStatusIcon = () => {
    const status = getStatus();
    switch (status) {
      case "Running":
        return <Loader2 className="h-3 w-3 animate-spin mr-1" />;
      case "Failed":
        return <AlertTriangle className="h-3 w-3 mr-1" />;
      case "Completed":
        return <Check className="h-3 w-3 mr-1" />;
      case "Paused":
        return <Pause className="h-3 w-3 mr-1" />;
      case "Ready":
        return <Clock className="h-3 w-3 mr-1" />;
      default:
        return null;
    }
  };

  // Determine size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return "px-1.5 py-0.5 text-xs";
      case "lg":
        return "px-3 py-1 text-sm";
      default:
        return "px-2 py-0.5 text-xs";
    }
  };

  const badge = (
    <Badge 
      className={cn(
        "font-medium border",
        getStatusStyles(),
        getSizeClasses(),
        className
      )}
    >
      {showIcon && getStatusIcon()}
      {getStatus()}
    </Badge>
  );

  if (showTooltip) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {badge}
          </TooltipTrigger>
          <TooltipContent>
            {tooltipContent || getStatus()}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return badge;
};

export default TaskStatusBadge;
