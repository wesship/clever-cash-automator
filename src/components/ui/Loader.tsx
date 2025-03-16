
import React from "react";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  className 
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={cn(
          "rounded-full border-t-transparent animate-spin",
          sizeClasses[size],
          "border-primary",
          className
        )}
      />
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div 
    className={cn(
      "rounded-xl bg-secondary/60 overflow-hidden animate-pulse", 
      className
    )}
  >
    <div className="h-full w-full" />
  </div>
);

export const TextSkeleton: React.FC<{ width?: string, className?: string }> = ({ 
  width = "w-full", 
  className 
}) => (
  <div 
    className={cn(
      "h-4 bg-secondary/60 rounded animate-pulse", 
      width, 
      className
    )} 
  />
);

export const ImageSkeleton: React.FC<{ className?: string }> = ({ className }) => (
  <div 
    className={cn(
      "rounded-lg bg-secondary/60 animate-pulse",
      className
    )}
  />
);
