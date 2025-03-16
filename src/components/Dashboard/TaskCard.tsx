
import React from "react";
import { Task, TaskStatus } from "@/lib/types";
import Card3D, { CardContent3D, CardFooter3D, CardHeader3D, CardTitle3D } from "@/components/ui/3d-card";
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

  const progress = (task.completionCount / task.targetCompletions) * 100;

  const isRunning = task.status === TaskStatus.RUNNING;

  const progressBarColors = {
    [TaskStatus.PENDING]: "bg-vibrant-yellow",
    [TaskStatus.RUNNING]: "bg-vibrant-green",
    [TaskStatus.COMPLETED]: "bg-vibrant-blue",
    [TaskStatus.FAILED]: "bg-destructive",
    [TaskStatus.PAUSED]: "bg-muted-foreground"
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
              {task.description.length > 60 
                ? `${task.description.substring(0, 60)}...` 
                : task.description}
            </p>
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
      </CardHeader3D>
      <CardContent3D>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-muted-foreground">Platform</p>
              <p className="font-medium">{task.platform}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Earnings</p>
              <p className="font-medium text-vibrant-green">${task.earnings.toFixed(2)}</p>
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
            <Progress 
              value={progress} 
              className="h-2" 
              indicatorClassName={progressBarColors[task.status]}
            />
          </div>
        </div>
      </CardContent3D>
      <CardFooter3D className="flex items-center justify-between pt-2">
        <div className="flex items-center space-x-2">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onEdit?.(task.id)}
            className="bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-all"
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => onDelete?.(task.id)}
            className="text-destructive hover:text-destructive bg-background/50 hover:bg-destructive/10 hover:border-destructive/50 transition-all"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex items-center space-x-2">
          {isRunning ? (
            <Button 
              onClick={() => onPause?.(task.id)}
              variant="outline"
              className="gap-1 bg-background/50 hover:bg-muted-foreground/10 transition-all hover:border-muted-foreground/50"
            >
              <PauseCircle className="h-4 w-4" />
              Pause
            </Button>
          ) : (
            <Button 
              onClick={() => onStart?.(task.id)}
              variant={task.status === TaskStatus.COMPLETED ? "outline" : "default"}
              className={cn("gap-1", 
                task.status === TaskStatus.COMPLETED 
                  ? "bg-background/50 hover:bg-vibrant-blue/10 transition-all hover:border-vibrant-blue/50" 
                  : "bg-gradient-purple-pink hover:opacity-90"
              )}
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
      </CardFooter3D>
    </Card3D>
  );
};

export default TaskCard;
