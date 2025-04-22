
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Info, AlertTriangle, Bug } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TaskLog {
  timestamp: Date;
  message: string;
  type: 'info' | 'warning' | 'error' | 'debug';
  data?: any;
}

interface TaskLogsProps {
  logs: TaskLog[];
  className?: string;
}

export function TaskLogs({ logs, className }: TaskLogsProps) {
  const getLogIcon = (type: TaskLog['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'debug':
        return <Bug className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getLogClass = (type: TaskLog['type']) => {
    switch (type) {
      case 'error':
        return "text-destructive";
      case 'warning':
        return "text-yellow-500";
      case 'debug':
        return "text-purple-500";
      default:
        return "text-blue-500";
    }
  };

  return (
    <div className={cn("rounded-md border", className)}>
      <ScrollArea className="h-[400px] p-4">
        <div className="space-y-2">
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              No logs available
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={index} className="flex gap-2 text-sm">
                <div className="flex-shrink-0 mt-1">{getLogIcon(log.type)}</div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {log.timestamp.toLocaleTimeString()}
                    </span>
                    <span className={cn("flex-1", getLogClass(log.type))}>
                      {log.message}
                    </span>
                  </div>
                  {log.data && (
                    <pre className="text-xs bg-muted p-2 rounded overflow-x-auto">
                      {JSON.stringify(log.data, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
