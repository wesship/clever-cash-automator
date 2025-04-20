
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
import TaskList from "./TaskList";

interface TaskDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedDate?: Date;
  tasks: Task[];
  onViewTask: (taskId: string) => void;
}

const TaskDetailsDialog: React.FC<TaskDetailsDialogProps> = ({
  open,
  onOpenChange,
  selectedDate,
  tasks,
  onViewTask,
}) => {
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
          <TaskList tasks={tasks} onViewTask={onViewTask} />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TaskDetailsDialog;
