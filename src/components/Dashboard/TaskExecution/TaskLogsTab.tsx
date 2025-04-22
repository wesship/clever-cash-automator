import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { extractTimestamp, abbreviateLogMessage } from "@/lib/utils/log-utils";

interface TaskLogsTabProps {
  logs: string[];
}

const TaskLogsTab: React.FC<TaskLogsTabProps> = ({ logs }) => {
  return (
    <div className="bg-black/90 text-green-500 font-mono text-xs rounded-md overflow-hidden border border-gray-800">
      <ScrollArea className="h-[400px] w-full p-4">
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            No logs available
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => {
              const timestamp = extractTimestamp(log);
              const formattedTime = timestamp ? 
                timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 
                '';
              
              // Clean up the log message by removing timestamp if present
              const cleanMessage = log.replace(/^\[.*?\]\s*/, '');
              
              return (
                <div key={index} className="flex">
                  {timestamp && (
                    <span className="text-gray-500 mr-2 shrink-0">{formattedTime}</span>
                  )}
                  <span className={
                    log.toLowerCase().includes("error") ? "text-red-400" : 
                    log.toLowerCase().includes("warn") ? "text-yellow-400" : 
                    log.toLowerCase().includes("success") ? "text-green-400" : 
                    "text-green-500"
                  }>
                    {cleanMessage}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default TaskLogsTab;
