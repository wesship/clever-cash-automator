
import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Task } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface TaskConfigurationTabProps {
  task: Task;
}

const TaskConfigurationTab = ({ task }: TaskConfigurationTabProps) => {
  const [activeTab, setActiveTab] = useState<string>("formatted");
  const [copied, setCopied] = useState(false);
  
  const basicConfig = {
    id: task.id,
    name: task.name,
    type: task.type,
    platform: task.platform,
    description: task.description
  };
  
  const handleCopyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(task.config, null, 2));
    setCopied(true);
    toast.success("Configuration copied to clipboard");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  return (
    <ScrollArea className="h-[500px]">
      <div className="space-y-6 pr-4">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium">Basic Configuration</h3>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-8 w-8 p-0" 
              onClick={handleCopyConfig}
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              <span className="sr-only">Copy Configuration</span>
            </Button>
          </div>
          
          <div className="bg-background/50 p-4 rounded-md border border-border/50">
            {Object.entries(basicConfig).map(([key, value]) => (
              <div key={key} className="flex py-1 border-b border-border/20 last:border-0">
                <span className="w-1/3 text-xs font-medium">{key}:</span>
                <span className="w-2/3 text-xs">{String(value)}</span>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-2">Advanced Configuration</h3>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-2">
              <TabsTrigger value="formatted">Formatted</TabsTrigger>
              <TabsTrigger value="raw">Raw JSON</TabsTrigger>
            </TabsList>
            
            <div className="bg-background/50 p-4 rounded-md border border-border/50">
              <TabsContent value="formatted" className="mt-0">
                {Object.entries(task.config).map(([key, value]) => (
                  <div key={key} className="mb-3">
                    <div className="text-xs font-medium mb-1">{key}:</div>
                    <div className="bg-background/80 p-2 rounded-sm text-xs">
                      {typeof value === 'object' 
                        ? JSON.stringify(value, null, 2) 
                        : String(value)
                      }
                    </div>
                  </div>
                ))}
              </TabsContent>
              
              <TabsContent value="raw" className="mt-0">
                <pre className="text-xs whitespace-pre-wrap">
                  {JSON.stringify(task.config, null, 2)}
                </pre>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
    </ScrollArea>
  );
};

export default TaskConfigurationTab;
