
import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { PlatformError } from "@/lib/error-handling";

interface TaskErrorsTabProps {
  lastError: PlatformError;
  canRetry: boolean;
  onRetryTask: (taskId: string) => void;
  taskId: string;
}

const TaskErrorsTab: React.FC<TaskErrorsTabProps> = ({ 
  lastError, 
  canRetry, 
  onRetryTask, 
  taskId 
}) => {
  return (
    <div className="bg-destructive/10 border border-destructive/30 p-4 rounded-md space-y-3">
      <div className="flex items-center gap-2">
        <AlertTriangle className="h-5 w-5 text-destructive" />
        <p className="font-medium text-destructive">Error Details</p>
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-medium">Message</h3>
        <p className="text-sm bg-background/50 p-3 rounded-md">
          {lastError.getUserFriendlyMessage()}
        </p>
      </div>
      {lastError.recoverable && (
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Recovery Suggestion</h3>
          <p className="text-sm bg-background/50 p-3 rounded-md">
            {lastError.getRecoverySuggestion()}
          </p>
        </div>
      )}
      <div className="pt-2">
        {canRetry && (
          <Button 
            variant="outline" 
            onClick={() => onRetryTask(taskId)}
            className="gap-1"
          >
            <RefreshCw className="h-4 w-4" />
            Retry Task
          </Button>
        )}
      </div>
    </div>
  );
};

export default TaskErrorsTab;
