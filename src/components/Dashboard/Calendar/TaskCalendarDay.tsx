
import React from "react";
import { format, isToday } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskCalendarDayProps {
  date: Date;
  taskCount: number;
  props: any;
}

const TaskCalendarDay = ({ date, taskCount, props }: TaskCalendarDayProps) => {
  const isCurrentDay = isToday(date);
  
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
            isCurrentDay && "bg-primary/20",
            taskCount > 0 && "bg-blue-500/10 hover:bg-blue-500/20",
            props["aria-selected"] && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
          )}
          {...props}
        >
          <time dateTime={format(date, "yyyy-MM-dd")}>
            {format(date, "d")}
          </time>
          {taskCount > 0 && (
            <div className="absolute -bottom-0.5 inset-x-0 flex justify-center">
              <Badge variant="outline" className="h-1.5 w-1.5 rounded-full p-0 bg-blue-500" />
            </div>
          )}
        </Button>
      </TooltipTrigger>
      {taskCount > 0 && (
        <TooltipContent>
          <div className="text-xs">
            <p>{format(date, "EEEE, MMMM d, yyyy")}</p>
            <p>{taskCount} task(s) scheduled</p>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  );
};

export default TaskCalendarDay;
