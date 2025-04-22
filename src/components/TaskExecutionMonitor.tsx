
import React, { useState, useEffect } from 'react';
import { Task } from '../services/TaskExecutionService';
import TaskStatusBadge from './TaskStatusBadge';
import ErrorBoundary from '@/components/ui/error-boundary';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Play, Pause, RefreshCw } from "lucide-react";
import { useTaskExecution } from '@/hooks/use-task-execution';
import { TaskType, PlatformType, TaskPriority, TaskStatus } from '@/lib/types';

interface TaskExecutionMonitorProps {
  task: Task;
  onComplete?: () => void;
  onError?: (error: Error) => void;
  onClose?: () => void;
}

export const TaskExecutionMonitor: React.FC<TaskExecutionMonitorProps> = ({ 
  task, 
  onComplete, 
  onError,
  onClose
}) => {
  const [error, setError] = useState<Error | null>(null);
  const { 
    startTask: originalStartTask, 
    stopTask, 
    retryTask, 
    progress, 
    isRunning 
  } = useTaskExecution(task.id);
  
  // Create a function to convert our Task to the expected Task type
  const startTask = async () => {
    try {
      // We need to modify our task to work with the original startTask function
      const adaptedTask = {
        id: task.id,
        name: task.title,
        type: TaskType.SURVEY, // Using proper enum value
        platform: PlatformType.CUSTOM, // Using proper enum value
        status: TaskStatus.PENDING, // Using proper enum value
        createdAt: task.createdAt,
        description: task.description,
        completionCount: 0,
        targetCompletions: 1,
        earnings: 0,
        priority: TaskPriority.MEDIUM, // Using proper enum value
        config: {
          proxyRequired: false,
          captchaHandling: false,
          schedule: {
            frequency: "daily" as "daily" | "hourly" | "weekly" | "monthly" | "custom",
            maxRuns: 5
          }
        }
      };
      
      return await originalStartTask(adaptedTask);
    } catch (err) {
      throw err;
    }
  };
  
  useEffect(() => {
    if (progress >= 100 && onComplete) {
      onComplete();
    }
  }, [progress, onComplete]);
  
  const handleExecute = async () => {
    try {
      setError(null);
      await startTask();
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error occurred');
      setError(error);
      if (onError) onError(error);
    }
  };
  
  const handleAbort = () => {
    stopTask(task.id);
  };
  
  const handleRetry = () => {
    setError(null);
    retryTask(task.id);
  };
  
  // Map our task status to the required format
  const mapStatus = (): 'pending' | 'in_progress' | 'completed' | 'failed' => {
    if (isRunning) return 'in_progress';
    if (progress >= 100) return 'completed';
    if (error) return 'failed';
    if (progress > 0) return 'pending';
    return 'pending';
  };
  
  return (
    <ErrorBoundary>
      <Card className="w-full bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {task.title}
              <TaskStatusBadge 
                status={mapStatus()}
                animated={isRunning} 
              />
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              {task.description}
            </p>
          </div>
          
          <div className="flex items-center gap-2">
            {isRunning ? (
              <Button
                variant="outline"
                size="sm"
                onClick={handleAbort}
                className="gap-1"
              >
                <Pause className="h-4 w-4" />
                Pause
              </Button>
            ) : (
              <Button
                variant={progress >= 100 ? "outline" : "default"}
                size="sm"
                onClick={progress >= 100 ? handleRetry : handleExecute}
                className="gap-1"
              >
                {progress >= 100 ? (
                  <>
                    <RefreshCw className="h-4 w-4" />
                    Rerun
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    {progress > 0 ? 'Resume' : 'Execute'}
                  </>
                )}
              </Button>
            )}
            
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {error && (
            <div className="mb-2 p-2 bg-red-100 text-red-800 rounded text-sm">
              {error.message}
            </div>
          )}
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </ErrorBoundary>
  );
};

export default TaskExecutionMonitor;
