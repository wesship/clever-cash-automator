
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Play, Pause, XCircle, RotateCcw } from "lucide-react";
import { Task, TaskStatus } from "@/lib/types";

interface TaskDetailHeaderProps {
  task: Task;
  isRunning: boolean;
  handleStartTask: () => void;
  handleStopTask: () => void;
  handleRetryTask: () => void;
  handleCancelTask: () => void;
  setTemplateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const TaskDetailHeader = ({
  task,
  isRunning,
  handleStartTask,
  handleStopTask,
  handleRetryTask,
  handleCancelTask,
  setTemplateDialogOpen
}: TaskDetailHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="mb-6 flex items-center justify-between">
      <Button 
        variant="outline"
        className="gap-1"
        onClick={() => navigate(-1)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </Button>
      
      <div className="flex items-center gap-2">
        {isRunning ? (
          <Button 
            variant="outline"
            onClick={handleStopTask}
            className="gap-1"
          >
            <Pause className="h-4 w-4" />
            Pause Task
          </Button>
        ) : (
          <>
            {task.status === TaskStatus.FAILED ? (
              <Button 
                variant="outline"
                onClick={handleRetryTask}
                className="gap-1"
              >
                <RotateCcw className="h-4 w-4" />
                Retry Task
              </Button>
            ) : (
              <Button 
                variant="outline"
                onClick={handleStartTask}
                className="gap-1"
                disabled={task.status === TaskStatus.COMPLETED}
              >
                <Play className="h-4 w-4" />
                {task.status === TaskStatus.PAUSED ? "Resume Task" : "Start Task"}
              </Button>
            )}
            
            {task.status !== TaskStatus.COMPLETED && task.status !== TaskStatus.FAILED && (
              <Button 
                variant="outline"
                onClick={handleCancelTask}
                className="gap-1 text-destructive border-destructive/30 hover:bg-destructive/10"
              >
                <XCircle className="h-4 w-4" />
                Cancel Task
              </Button>
            )}
          </>
        )}
        
        <Button variant="secondary" onClick={() => setTemplateDialogOpen(true)}>
          Save as Template
        </Button>
      </div>
    </div>
  );
};

export default TaskDetailHeader;
