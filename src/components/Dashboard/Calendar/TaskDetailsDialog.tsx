
import React from "react";
import { format } from "date-fns";
import { Task } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

interface TaskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  tasks: Task[];
  onViewTask: (taskId: string) => void;
}

const TaskDetailsDialog = ({
  open,
  onOpenChange,
  selectedDate,
  tasks,
  onViewTask,
}: TaskDetailsDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Tasks for {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
          </DialogTitle>
        </DialogHeader>
        <Separator />
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-4">
            {tasks.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">No tasks scheduled for this day</p>
            ) : (
              tasks.map((task) => (
                <div 
                  key={task.id} 
                  className="p-3 border border-border/50 rounded-lg hover:bg-background/50 cursor-pointer"
                  onClick={() => onViewTask(task.id)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">{task.name}</h4>
                    <Badge variant={task.status === "RUNNING" ? "default" : "outline"}>
                      {task.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                    <div>
                      Time: {task.config.schedule?.timeOfDay || "N/A"}
                    </div>
                    <div>
                      Platform: {task.platform}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;
