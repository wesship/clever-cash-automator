
import React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import StepListItem from "./StepListItem";

interface StepStatus {
  name: string;
  status: "pending" | "in-progress" | "completed" | "error";
  duration?: number;
  message?: string;
  startTime?: Date;
}

interface StepListProps {
  steps: StepStatus[];
  currentStepIndex: number;
  compact?: boolean;
}

const StepList: React.FC<StepListProps> = ({ steps, currentStepIndex, compact = false }) => {
  const [showAllSteps, setShowAllSteps] = React.useState(!compact);
  
  // Get visible steps based on compact mode
  const visibleSteps = showAllSteps 
    ? steps 
    : compact
      ? steps.filter((_, index) => 
          index === currentStepIndex || 
          index === currentStepIndex - 1 || 
          index === currentStepIndex + 1 ||
          index === 0 || 
          index === steps.length - 1
        )
      : steps;

  return (
    <Collapsible 
      open={showAllSteps} 
      onOpenChange={setShowAllSteps}
      className="space-y-3 mt-4"
    >
      {visibleSteps.map((step, index) => {
        const isActive = steps.indexOf(step) === currentStepIndex;
        const isPast = steps.indexOf(step) < currentStepIndex;
        
        return (
          <StepListItem 
            key={index}
            step={step}
            isActive={isActive}
            isPast={isPast}
          />
        );
      })}
      
      {compact && steps.length > 5 && (
        <CollapsibleTrigger asChild>
          <button 
            className="w-full flex items-center justify-center py-1 text-xs text-muted-foreground hover:text-foreground"
          >
            {showAllSteps ? (
              <div className="flex items-center gap-1">
                <ChevronUp className="h-3 w-3" />
                <span>Show less</span>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <ChevronDown className="h-3 w-3" />
                <span>Show all {steps.length} steps</span>
              </div>
            )}
          </button>
        </CollapsibleTrigger>
      )}
      
      <CollapsibleContent className="space-y-3">
        {compact && !showAllSteps ? null : steps.slice(visibleSteps.length).map((step, index) => {
          const isActive = steps.indexOf(step) === currentStepIndex;
          const isPast = steps.indexOf(step) < currentStepIndex;
          
          return (
            <StepListItem
              key={`hidden-${index}`}
              step={step}
              isActive={isActive}
              isPast={isPast}
            />
          );
        })}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default StepList;
