
import React from "react";
import { CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/lib/types";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface TaskDetailCardProps {
  task: Task;
  handleCopyToClipboard: () => void;
}

const TaskDetailCard = ({ task, handleCopyToClipboard }: TaskDetailCardProps) => {
  return (
    <CardHeader className="pb-2">
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-xl flex items-center gap-2">
            {task.name}
            <Badge 
              className={cn(
                task.status === TaskStatus.RUNNING && "bg-blue-500/10 text-blue-500",
                task.status === TaskStatus.COMPLETED && "bg-green-500/10 text-green-500",
                task.status === TaskStatus.FAILED && "bg-destructive/10 text-destructive",
                task.status === TaskStatus.PAUSED && "bg-amber-500/10 text-amber-500",
                task.status === TaskStatus.PENDING && "bg-muted text-muted-foreground"
              )}
            >
              {task.status}
            </Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-8 p-0"
          onClick={handleCopyToClipboard}
        >
          <Copy className="h-4 w-4" />
          <span className="sr-only">Copy Configuration</span>
        </Button>
      </div>
    </CardHeader>
  );
};

export default TaskDetailCard;
