
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw, XCircle } from "lucide-react";
import { TaskProgress } from "./TaskProgress";
import { TaskLogs, type TaskLog } from "./TaskLogs";
import { Task, TaskStatus } from "@/lib/types";

interface TaskMonitorProps {
  task: Task;
  onStart?: () => void;
  onPause?: () => void;
  onRetry?: () => void;
  onCancel?: () => void;
  className?: string;
}

export function TaskMonitor({
  task,
  onStart,
  onPause,
  onRetry,
  onCancel,
  className
}: TaskMonitorProps) {
  const logs: TaskLog[] = task.logs?.map(log => ({
    timestamp: log.timestamp,
    message: log.message,
    type: log.type,
    data: log.data
  })) || [];

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle>{task.name}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {task.status === TaskStatus.RUNNING ? (
              <Button
                size="sm"
                variant="outline"
                onClick={onPause}
              >
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
            ) : task.status === TaskStatus.FAILED ? (
              <Button
                size="sm"
                variant="outline"
                onClick={onRetry}
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Retry
              </Button>
            ) : task.status === TaskStatus.PENDING ? (
              <Button
                size="sm"
                variant="default"
                onClick={onStart}
              >
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
            ) : null}
            
            {task.status !== TaskStatus.COMPLETED && (
              <Button
                size="sm"
                variant="destructive"
                onClick={onCancel}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <TaskProgress
          status={task.status}
          progress={task.progress}
          currentStep={task.currentStep}
        />
        
        <TaskLogs logs={logs} />
      </CardContent>
    </Card>
  );
}
