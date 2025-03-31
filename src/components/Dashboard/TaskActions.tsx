
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlayCircle, PauseCircle, RefreshCw, Settings, Trash2, MonitorCheck } from "lucide-react";
import { TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import TaskExecutionMonitor from "./TaskExecutionMonitor";
import useTaskExecution from "@/hooks/use-task-execution";

interface TaskActionsProps {
  taskId: string;
  status: TaskStatus;
  onStart: (taskId: string) => void;
  onPause: (taskId: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export const TaskActions: React.FC<TaskActionsProps> = ({
  taskId,
  status,
  onStart,
  onPause,
  onDelete,
  onEdit
}) => {
  const isMobile = useIsMobile();
  const isRunning = status === TaskStatus.RUNNING;
  const { startTask, stopTask } = useTaskExecution();
  const [monitorOpen, setMonitorOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<any>(null);

  const handleStart = async (taskId: string) => {
    // Here we simulate getting the full task object
    // In a real app, we would have access to the full task object already
    import('@/hooks/use-dashboard-data').then(module => {
      const { default: useDashboardData } = module;
      const { tasks } = useDashboardData();
      const task = tasks.find(t => t.id === taskId);
      
      if (task) {
        startTask(task);
        setCurrentTask(task);
        setMonitorOpen(true);
        onStart(taskId);
      }
    });
  };

  const handlePause = (taskId: string) => {
    stopTask(taskId);
    onPause(taskId);
  };

  const handleMonitor = () => {
    // Here we simulate getting the full task object
    import('@/hooks/use-dashboard-data').then(module => {
      const { default: useDashboardData } = module;
      const { tasks } = useDashboardData();
      const task = tasks.find(t => t.id === taskId);
      
      if (task) {
        setCurrentTask(task);
        setMonitorOpen(true);
      }
    });
  };
  
  return (
    <div className="flex items-center justify-between w-full pt-2">
      <div className="flex items-center space-x-2">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onEdit(taskId)}
          className="bg-background/50 hover:bg-primary/10 hover:border-primary/50 transition-all"
          aria-label="Edit task"
        >
          <Settings className="h-4 w-4" />
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={() => onDelete(taskId)}
          className="text-destructive hover:text-destructive bg-background/50 hover:bg-destructive/10 hover:border-destructive/50 transition-all"
          aria-label="Delete task"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
        {isRunning && (
          <Button
            variant="outline"
            size="icon"
            onClick={handleMonitor}
            className="bg-background/50 hover:bg-vibrant-blue/10 hover:border-vibrant-blue/50 transition-all"
            aria-label="Monitor task"
          >
            <MonitorCheck className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {isRunning ? (
          <Button 
            onClick={() => handlePause(taskId)}
            variant="outline"
            className="gap-1 bg-background/50 hover:bg-muted-foreground/10 transition-all hover:border-muted-foreground/50"
            aria-label="Pause task"
          >
            <PauseCircle className="h-4 w-4" />
            {isMobile ? null : "Pause"}
          </Button>
        ) : (
          <Button 
            onClick={() => handleStart(taskId)}
            variant={status === TaskStatus.COMPLETED ? "outline" : "default"}
            className={cn("gap-1", 
              status === TaskStatus.COMPLETED 
                ? "bg-background/50 hover:bg-vibrant-blue/10 transition-all hover:border-vibrant-blue/50" 
                : "bg-gradient-purple-pink hover:opacity-90"
            )}
            disabled={status === TaskStatus.COMPLETED}
            aria-label={status === TaskStatus.COMPLETED ? "Restart task" : "Start task"}
          >
            {status === TaskStatus.COMPLETED ? (
              <>
                <RefreshCw className="h-4 w-4" />
                {isMobile ? null : "Restart"}
              </>
            ) : (
              <>
                <PlayCircle className="h-4 w-4" />
                {isMobile ? null : "Start"}
              </>
            )}
          </Button>
        )}
      </div>
      
      {/* Task Execution Monitor Dialog */}
      <Dialog open={monitorOpen && !!currentTask} onOpenChange={setMonitorOpen}>
        <DialogContent className="sm:max-w-3xl">
          {currentTask && (
            <TaskExecutionMonitor 
              task={currentTask} 
              onClose={() => setMonitorOpen(false)} 
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TaskActions;
