
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export interface TaskHistoryEvent {
  timestamp: Date;
  event: string;
  user?: string;
  details?: string;  // Added the optional details property here
}

interface TaskHistoryProps {
  events: TaskHistoryEvent[];
}

const TaskHistorySection = ({ events }: TaskHistoryProps) => {
  const sortedEvents = [...events].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium mb-1">Task History</h3>
      <div className="bg-background/50 rounded-md border border-border/50">
        {events.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No history available</div>
        ) : (
          <ScrollArea className="h-[200px]">
            <div className="p-4">
              {sortedEvents.map((event, index) => (
                <div key={index} className="mb-3">
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-xs font-medium">{event.event}</span>
                    <span className="text-xs text-muted-foreground">
                      {format(event.timestamp, "MMM d, yyyy HH:mm")}
                    </span>
                  </div>
                  {event.user && (
                    <div className="text-xs text-muted-foreground mb-1">By: {event.user}</div>
                  )}
                  {event.details && (
                    <div className="text-xs bg-background/80 p-2 rounded-sm">{event.details}</div>
                  )}
                  {index < sortedEvents.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default TaskHistorySection;
