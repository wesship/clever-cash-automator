
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/lib/types";

interface TaskConfigurationTabProps {
  task: Task;
}

const TaskConfigurationTab = ({ task }: TaskConfigurationTabProps) => {
  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-6 pr-4">
        <div>
          <h3 className="text-sm font-medium mb-2">Basic Configuration</h3>
          <div className="bg-background/50 p-4 rounded-md">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify({
                id: task.id,
                name: task.name,
                type: task.type,
                platform: task.platform,
                description: task.description
              }, null, 2)}
            </pre>
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Advanced Configuration</h3>
          <div className="bg-background/50 p-4 rounded-md">
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(task.config, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TaskConfigurationTab;
