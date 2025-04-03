
import React from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { TagIcon, BarChart3 } from "lucide-react";
import { Task, TaskStatus } from "@/lib/types";
import { TaskExecutionEngine } from "@/services/task-execution";
import TaskHistorySection from "@/components/TaskDetail/TaskHistorySection";
import TaskProgressIndicator from "@/components/TaskDetail/TaskProgressIndicator";

interface TaskOverviewTabProps {
  task: Task;
}

// Generate mock history events for demo purposes
const generateMockHistory = (task: Task) => {
  const events = [
    {
      timestamp: new Date(task.createdAt),
      event: "Task Created",
      user: "System",
    },
  ];
  
  if (task.lastRun) {
    events.push({
      timestamp: new Date(task.lastRun),
      event: "Task Executed",
      user: "System",
      details: `Execution started for ${task.name}`
    });
    
    // If task is completed or failed, add completion event
    if (task.status === TaskStatus.COMPLETED || task.status === TaskStatus.FAILED) {
      const completionDate = new Date(task.lastRun);
      completionDate.setMinutes(completionDate.getMinutes() + 10); // Add some time
      
      events.push({
        timestamp: completionDate,
        event: task.status === TaskStatus.COMPLETED ? "Task Completed Successfully" : "Task Failed",
        user: "System",
        details: task.status === TaskStatus.COMPLETED 
          ? `Successfully completed with ${task.completionCount} completions`
          : `Failed with error: ${TaskExecutionEngine.getLastError(task.id)?.getUserFriendlyMessage() || "Unknown error"}`
      });
    }
  }
  
  return events;
};

const TaskOverviewTab = ({ task }: TaskOverviewTabProps) => {
  const taskHistory = generateMockHistory(task);
  const progress = (task.completionCount / task.targetCompletions) * 100;
  
  return (
    <div className="space-y-6">
      <TaskProgressIndicator 
        status={task.status}
        progress={progress}
        className="mb-6"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium">Task Details</h3>
            <div className="mt-2 grid grid-cols-2 gap-3">
              <div className="bg-background/50 p-3 rounded-md border border-border/50">
                <p className="text-xs text-muted-foreground">Platform</p>
                <p className="text-sm font-medium">{task.platform}</p>
              </div>
              <div className="bg-background/50 p-3 rounded-md border border-border/50">
                <p className="text-xs text-muted-foreground">Type</p>
                <p className="text-sm font-medium">{task.type}</p>
              </div>
              <div className="bg-background/50 p-3 rounded-md border border-border/50">
                <p className="text-xs text-muted-foreground">Created</p>
                <p className="text-sm font-medium">{format(task.createdAt, 'MMM d, yyyy')}</p>
              </div>
              <div className="bg-background/50 p-3 rounded-md border border-border/50">
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
            <div className="mt-2 bg-background/50 p-3 rounded-md border border-border/50">
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
              <div className="mt-2 bg-background/50 p-3 rounded-md border border-border/50">
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
              <div className="bg-background/50 p-3 rounded-md border border-border/50">
                <div className="flex items-center gap-1 mb-1">
                  <p className="text-xs text-muted-foreground">Completions</p>
                </div>
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
              <div className="bg-background/50 p-3 rounded-md border border-border/50">
                <div className="flex items-center gap-1 mb-1">
                  <BarChart3 className="h-3 w-3 text-muted-foreground" />
                  <p className="text-xs text-muted-foreground">Earnings</p>
                </div>
                <p className="text-sm font-medium text-green-500">${task.earnings.toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Schedule</h3>
            <div className="mt-2 bg-background/50 p-3 rounded-md border border-border/50">
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
      
      {/* Add the task history section */}
      <TaskHistorySection events={taskHistory} />
    </div>
  );
};

export default TaskOverviewTab;
