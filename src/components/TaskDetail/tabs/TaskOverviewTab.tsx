
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TagIcon } from "lucide-react";
import { Task, TaskStatus } from "@/lib/types";
import { TaskExecutionEngine } from "@/services/task-execution";

interface TaskOverviewTabProps {
  task: Task;
}

const TaskOverviewTab = ({ task }: TaskOverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Task Details</h3>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="bg-background/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Platform</p>
              <p className="text-sm font-medium">{task.platform}</p>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Type</p>
              <p className="text-sm font-medium">{task.type}</p>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Created</p>
              <p className="text-sm font-medium">{format(task.createdAt, 'MMM d, yyyy')}</p>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Last Run</p>
              <p className="text-sm font-medium">
                {task.lastRun ? format(task.lastRun, 'MMM d, yyyy HH:mm') : 'Never'}
              </p>
            </div>
          </div>
        </div>
        
        {/* Task Tags Section */}
        <div>
          <h3 className="text-sm font-medium">Tags</h3>
          <div className="mt-2 bg-background/50 p-3 rounded-md">
            {task.config.taskTags && task.config.taskTags.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {task.config.taskTags.map((tag, idx) => (
                  <Badge key={idx} variant="outline" className="flex items-center gap-1">
                    <TagIcon className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No tags assigned</p>
            )}
          </div>
        </div>
        
        {/* Task Dependencies Section */}
        {task.config.dependencies && (
          <div>
            <h3 className="text-sm font-medium">Dependencies</h3>
            <div className="mt-2 bg-background/50 p-3 rounded-md">
              {task.config.dependencies.length > 0 ? (
                <ul className="space-y-2">
                  {task.config.dependencies.map((dep, idx) => (
                    <li key={idx} className="text-sm">
                      {dep.taskId} - {dep.condition}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-muted-foreground">No dependencies</p>
              )}
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium">Performance</h3>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="bg-background/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Completions</p>
              <p className="text-sm font-medium">
                {task.completionCount}/{task.targetCompletions}
              </p>
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                <div 
                  className="h-full bg-blue-500" 
                  style={{ 
                    width: `${(task.completionCount / task.targetCompletions) * 100}%` 
                  }}
                ></div>
              </div>
            </div>
            <div className="bg-background/50 p-3 rounded-md">
              <p className="text-xs text-muted-foreground">Earnings</p>
              <p className="text-sm font-medium text-green-500">${task.earnings.toFixed(2)}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium">Schedule</h3>
          <div className="mt-2 bg-background/50 p-3 rounded-md">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Frequency</p>
                <p className="text-sm font-medium capitalize">
                  {task.config.schedule?.frequency || "Not scheduled"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Max Runs</p>
                <p className="text-sm font-medium">
                  {task.config.schedule?.maxRuns || "Unlimited"}
                </p>
              </div>
              {task.config.schedule?.timeOfDay && (
                <div className="col-span-2">
                  <p className="text-xs text-muted-foreground">Time of Day</p>
                  <p className="text-sm font-medium">
                    {task.config.schedule.timeOfDay}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {task.status === TaskStatus.FAILED && (
          <div>
            <h3 className="text-sm font-medium text-destructive">Last Error</h3>
            <div className="mt-2 bg-destructive/10 border border-destructive/30 p-3 rounded-md">
              <p className="text-sm">
                {TaskExecutionEngine.getLastError(task.id)?.getUserFriendlyMessage() || 
                  "Unknown error occurred"}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskOverviewTab;
