
import React from "react";
import { Badge } from "@/components/ui/badge";
import { TaskPriority } from "@/lib/types";

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const TaskPriorityBadge: React.FC<TaskPriorityBadgeProps> = ({ priority }) => {
  const getPriorityColor = () => {
    switch (priority) {
      case TaskPriority.HIGH:
        return "bg-destructive/10 text-destructive border-destructive/20";
      case TaskPriority.MEDIUM:
        return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
      case TaskPriority.LOW:
        return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    }
  };

  return (
    <Badge variant="outline" className={`${getPriorityColor()} font-medium`}>
      {priority}
    </Badge>
  );
};

export default TaskPriorityBadge;
