
import React from 'react';
import { TaskStatus } from '../services/TaskExecutionService';
import { Badge } from "@/components/ui/badge";
import { Clock, AlertTriangle, CheckCircle2, PlayCircle, Ban } from "lucide-react";

interface TaskStatusBadgeProps {
  status: TaskStatus;
  animated?: boolean;
}

export const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status, animated = false }) => {
  const getStatusColor = (): string => {
    switch (status) {
      case 'pending': return 'bg-gray-200';
      case 'in_progress': return animated ? 'bg-blue-400 animate-pulse' : 'bg-blue-400';
      case 'completed': return 'bg-green-500';
      case 'failed': return 'bg-red-500';
      default: return 'bg-gray-200';
    }
  };

  const getStatusText = (): string => {
    switch (status) {
      case 'pending': return 'Pending';
      case 'in_progress': return 'In Progress';
      case 'completed': return 'Completed';
      case 'failed': return 'Failed';
      default: return 'Unknown';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'pending': return <Clock className="h-3 w-3" />;
      case 'in_progress': return <PlayCircle className="h-3 w-3" />;
      case 'completed': return <CheckCircle2 className="h-3 w-3" />;
      case 'failed': return <AlertTriangle className="h-3 w-3" />;
      default: return <Ban className="h-3 w-3" />;
    }
  };

  return (
    <Badge 
      className={`flex items-center gap-1 text-white ${getStatusColor()}`}
    >
      {getStatusIcon()}
      {getStatusText()}
    </Badge>
  );
};

export default TaskStatusBadge;
