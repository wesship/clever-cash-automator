
import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import Card3D, { CardContent3D, CardFooter3D, CardHeader3D } from "@/components/ui/3d-card";
import { cn } from "@/lib/utils";

export const TaskCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card3D className={cn("overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm", className)}>
      <CardHeader3D className="pb-2">
        <div className="flex items-start justify-between">
          <div className="space-y-2 w-full">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </CardHeader3D>
      <CardContent3D>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-16" />
              <Skeleton className="h-3 w-10" />
            </div>
            <Skeleton className="h-2 w-full" />
          </div>
        </div>
      </CardContent3D>
      <CardFooter3D className="flex justify-between pt-2">
        <div className="flex space-x-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
        </div>
        <Skeleton className="h-9 w-24 rounded-md" />
      </CardFooter3D>
    </Card3D>
  );
};

export const StatisticCardSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <Card3D className={cn("overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm", className)}>
      <CardContent3D className="p-6">
        <div className="space-y-3">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </CardContent3D>
    </Card3D>
  );
};

export const ChartSkeleton: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cn("rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm p-4", className)}>
      <div className="space-y-4">
        <Skeleton className="h-6 w-1/3" />
        <div className="h-64 w-full flex items-end space-x-2">
          {Array.from({ length: 12 }).map((_, i) => (
            <Skeleton 
              key={i} 
              className="h-full flex-1" 
              style={{ height: `${Math.random() * 70 + 30}%` }} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export const TableRowSkeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 py-3">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <Skeleton className="h-6 w-24" />
    </div>
  );
};
