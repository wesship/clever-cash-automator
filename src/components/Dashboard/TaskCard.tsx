
import React from "react";
import { Task, TaskStatus } from "@/lib/types";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle,
  CardDescription 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  PlayCircle, 
  PauseCircle, 
  RefreshCw, 
  Settings, 
  Trash2, 
  CheckCircle2, 
  XCircle, 
  Clock 
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

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
  const statusColors = {
    [TaskStatus.PENDING]: "bg-yellow-500",
    [TaskStatus.RUNNING]: "bg-green-500",
    [TaskStatus.COMPLETED]: "bg-blue-500",
    [TaskStatus.FAILED]: "bg-red-500",
    [TaskStatus.PAUSED]: "bg-gray-500"
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

  const progress = (task.completionCount / task.targetCompletions) * 100;

  const isRunning = task.status === TaskStatus.RUNNING;

  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-soft", className)}>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{task.name}</CardTitle>
            <CardDescription className="mt-1">
              {task.description.length > 60 
                ? `${task.description.substring(0, 60)}...` 
                : task.description}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={cn(
              "flex items-center gap-1 px-2 py-1 font-normal transition-opacity", 
              statusColors[task.status], 
              "text-white"
            )}
          >
            {statusIcons[task.status]}
            <span>{statusText[task.status]}</span>
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Platform</p>
              <p className="font-medium">{task.platform}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Earnings</p>
              <p className="font-medium">${task.earnings.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Last Run</p>
              <p className="font-medium">
                {task.lastRun 
                  ? new Date(task.lastRun).toLocaleDateString() 
                  : "Never"}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between items-center text-xs">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">
                {task.completionCount}/{task.targetCompletions}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onEdit?.(task.id)}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onDelete?.(task.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {isRunning ? (
            <Button 
              onClick={() => onPause?.(task.id)}
              variant="outline"
              className="gap-1"
            >
              <PauseCircle className="h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button 
              onClick={() => onStart?.(task.id)}
              variant={task.status === TaskStatus.COMPLETED ? "outline" : "default"}
              className="gap-1"
              disabled={task.status === TaskStatus.COMPLETED}
            >
              {task.status === TaskStatus.COMPLETED ? (
                <>
                  <RefreshCw className="h-4 w-4" />
                  Restart
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" />
                  Start
                </>
              )}
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
