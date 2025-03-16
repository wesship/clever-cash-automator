
import React from "react";

interface TaskMetadataProps {
  platform: string;
  earnings: number;
  lastRun?: Date;
  className?: string;
}

export const TaskMetadata: React.FC<TaskMetadataProps> = ({
  platform,
  earnings,
  lastRun,
  className
}) => {
  return (
    <div className={`grid grid-cols-3 gap-2 text-sm ${className}`}>
      <div>
        <p className="text-muted-foreground">Platform</p>
        <p className="font-medium">{platform}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Earnings</p>
        <p className="font-medium text-vibrant-green">${earnings.toFixed(2)}</p>
      </div>
      <div>
        <p className="text-muted-foreground">Last Run</p>
        <p className="font-medium">
          {lastRun 
            ? new Date(lastRun).toLocaleDateString() 
            : "Never"}
        </p>
      </div>
    </div>
  );
};

export default TaskMetadata;
