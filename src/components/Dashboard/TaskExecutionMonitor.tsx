
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Task } from "@/lib/types";
import useTaskExecution from "@/hooks/use-task-execution";
import { Button } from "@/components/ui/button";
import { Loader2, Terminal } from "lucide-react";

interface TaskExecutionMonitorProps {
  task: Task;
  onClose: () => void;
}

const TaskExecutionMonitor: React.FC<TaskExecutionMonitorProps> = ({ task, onClose }) => {
  const { isRunning, progress, currentStepDescription, logs } = useTaskExecution(task.id);

  return (
    <Card className="w-full max-w-3xl bg-card/50 backdrop-blur-sm border-border/50">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            {isRunning && <Loader2 className="h-4 w-4 animate-spin" />}
            {task.name}
          </CardTitle>
          <Button variant="ghost" onClick={onClose} size="sm">Close</Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="bg-background/50 p-3 rounded-md">
          <p className="text-sm font-medium">Current Operation:</p>
          <p className="text-sm">{currentStepDescription || "Not running"}</p>
        </div>
        
        <div>
          <div className="flex items-center gap-1 mb-2">
            <Terminal className="h-4 w-4" />
            <p className="text-sm font-medium">Execution Log</p>
          </div>
          <ScrollArea className="h-48 bg-background/50 rounded-md p-2">
            <div className="font-mono text-xs space-y-1">
              {logs.length === 0 ? (
                <p className="text-muted-foreground italic">No logs yet</p>
              ) : (
                logs.map((log, i) => (
                  <div key={i} className="border-b border-border/25 pb-1">
                    {log}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskExecutionMonitor;
