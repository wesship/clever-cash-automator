
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Terminal } from "lucide-react";

interface TaskLogsTabProps {
  logs: string[];
}

const TaskLogsTab: React.FC<TaskLogsTabProps> = ({ logs }) => {
  return (
    <div>
      <div className="flex items-center gap-1 mb-2">
        <Terminal className="h-4 w-4" />
        <p className="text-sm font-medium">Execution Log</p>
      </div>
      <ScrollArea className="h-64 bg-background/50 rounded-md p-2">
        <div className="font-mono text-xs space-y-1">
          {logs.length === 0 ? (
            <p className="text-muted-foreground italic">No logs yet</p>
          ) : (
            logs.map((log, i) => (
              <div 
                key={i} 
                className={`border-b border-border/25 pb-1 ${log.includes("Error") ? "text-destructive" : ""}`}
              >
                {log}
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TaskLogsTab;
