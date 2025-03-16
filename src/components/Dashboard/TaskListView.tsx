
import React from "react";
import { Task, TaskStatus } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskListViewProps {
  tasks: Task[];
  onStartTask: (taskId: string) => void;
  onPauseTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  onEditTask: (taskId: string) => void;
  isInView: boolean;
}

export const TaskListView: React.FC<TaskListViewProps> = ({
  tasks,
  onStartTask,
  onPauseTask,
  onDeleteTask,
  onEditTask,
  isInView
}) => {
  return (
    <div className="space-y-4 animate-fade-in">
      {tasks.map((task) => (
        <div key={task.id} className={cn(
          "flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-card rounded-lg border border-border transition-all",
          isInView ? "opacity-100" : "opacity-0"
        )}>
          <div className="flex flex-col mb-4 sm:mb-0">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-medium">{task.name}</h3>
              <Badge variant={
                task.status === TaskStatus.RUNNING ? 'default' :
                task.status === TaskStatus.COMPLETED ? 'secondary' :
                task.status === TaskStatus.FAILED ? 'destructive' :
                task.status === TaskStatus.PAUSED ? 'outline' : 'secondary'
              }>
                {task.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-1">{task.description}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm">
              <span className="flex items-center">
                <Clock className="h-3 w-3 mr-1 text-muted-foreground" />
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
              <span className="text-vibrant-green">${task.earnings.toFixed(2)}</span>
              <span>{task.completionCount}/{task.targetCompletions}</span>
            </div>
          </div>
          <div className="flex space-x-2">
            {task.status === TaskStatus.RUNNING ? (
              <Button variant="outline" size="sm" onClick={() => onPauseTask(task.id)}>Pause</Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => onStartTask(task.id)}>Start</Button>
            )}
            <Button variant="outline" size="sm" onClick={() => onEditTask(task.id)}>Edit</Button>
            <Button variant="destructive" size="sm" onClick={() => onDeleteTask(task.id)}>Delete</Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskListView;
