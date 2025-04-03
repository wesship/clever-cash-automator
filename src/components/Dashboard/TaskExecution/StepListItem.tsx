
import React from "react";
import { Clock, Loader2, Check, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface StepStatus {
  name: string;
  status: "pending" | "in-progress" | "completed" | "error";
  duration?: number;
  message?: string;
  startTime?: Date;
}

interface StepListItemProps {
  step: StepStatus;
  isActive: boolean;
  isPast: boolean;
}

const StepListItem: React.FC<StepListItemProps> = ({ step, isActive, isPast }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={cn(
              "flex items-center py-1.5 px-2 rounded-md transition-colors",
              isActive && "bg-primary/10 border border-primary/20",
              isPast && "opacity-70",
              step.status === "error" && "bg-destructive/10 border-destructive/20",
              "hover:bg-accent/50 cursor-default"
            )}
          >
            {step.status === "pending" && <Clock className="h-4 w-4 text-muted-foreground mr-2" />}
            {step.status === "in-progress" && <Loader2 className="h-4 w-4 text-primary mr-2 animate-spin" />}
            {step.status === "completed" && <Check className="h-4 w-4 text-green-500 mr-2" />}
            {step.status === "error" && <AlertTriangle className="h-4 w-4 text-destructive mr-2" />}
            
            <div className="flex justify-between w-full">
              <span className={cn(
                "text-sm",
                isActive && "font-medium"
              )}>
                {step.name}
              </span>
              
              <div className="flex items-center gap-2">
                {step.duration && (
                  <span className="text-xs text-muted-foreground">
                    {step.duration}s
                  </span>
                )}
                {step.message && (
                  <Info className="h-3 w-3 text-muted-foreground" />
                )}
              </div>
            </div>
          </div>
        </TooltipTrigger>
        {step.message && (
          <TooltipContent side="right">
            <p className="max-w-xs">{step.message}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

export default StepListItem;
