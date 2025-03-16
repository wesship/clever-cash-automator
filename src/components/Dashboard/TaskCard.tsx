
import React from "react";
import { Task } from "@/lib/types";
import Card3D, { CardContent3D, CardFooter3D, CardHeader3D, CardTitle3D } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import TaskStatusBadge from "./TaskStatusBadge";
import TaskProgress from "./TaskProgress";
import TaskMetadata from "./TaskMetadata";
import TaskActions from "./TaskActions";

interface TaskCardProps {
  task: Task;
  onStart?: (taskId: string) => void;
  onPause?: (taskId: string) => void;
  onDelete?: (taskId: string) => void;
  onEdit?: (taskId: string) => void;
  className?: string;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStart,
  onPause,
  onDelete,
  onEdit,
  className
}) => {
  const isMobile = useIsMobile();

  const handleStart = (taskId: string) => {
    onStart?.(taskId);
  };

  const handlePause = (taskId: string) => {
    onPause?.(taskId);
  };

  const handleDelete = (taskId: string) => {
    onDelete?.(taskId);
  };

  const handleEdit = (taskId: string) => {
    onEdit?.(taskId);
  };

  return (
    <Card3D 
      className={cn(
        "overflow-hidden transition-all duration-300 border border-border/40 bg-card/50 backdrop-blur-sm", 
        className
      )}
      hoverEffects
      glareEffect
    >
      <CardHeader3D className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle3D className="text-lg">{task.name}</CardTitle3D>
            <p className="text-sm text-muted-foreground mt-1">
              {task.description.length > (isMobile ? 40 : 60) 
                ? `${task.description.substring(0, isMobile ? 40 : 60)}...` 
                : task.description}
            </p>
          </div>
          <TaskStatusBadge status={task.status} />
        </div>
      </CardHeader3D>
      <CardContent3D>
        <div className="space-y-4">
          <TaskMetadata 
            platform={task.platform} 
            earnings={task.earnings} 
            lastRun={task.lastRun} 
          />
          <TaskProgress 
            completionCount={task.completionCount} 
            targetCompletions={task.targetCompletions} 
            status={task.status} 
          />
        </div>
      </CardContent3D>
      <CardFooter3D className="flex items-center justify-between">
        <TaskActions 
          taskId={task.id}
          status={task.status}
          onStart={handleStart}
          onPause={handlePause}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      </CardFooter3D>
    </Card3D>
  );
};

export default TaskCard;
