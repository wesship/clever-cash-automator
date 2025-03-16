
import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export const Loader: React.FC<LoaderProps> = ({ 
  size = "md", 
  className,
  label
}) => {
  const sizeClasses = {
    sm: "w-4 h-4 border-2",
    md: "w-6 h-6 border-2",
    lg: "w-8 h-8 border-3"
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div
        role="status"
        aria-label={label || "Loading"}
        className={cn(
          "rounded-full border-t-transparent animate-spin",
          sizeClasses[size],
          "border-primary",
          className
        )}
      />
      {label && (
        <span className="sr-only">{label}</span>
      )}
    </div>
  );
};

export const CardSkeleton: React.FC<{ className?: string; height?: string }> = ({ 
  className,
  height = "h-32"
}) => (
  <div 
    role="status"
    aria-label="Loading content"
    className={cn(
      "rounded-xl bg-secondary/60 overflow-hidden animate-pulse", 
      height,
      className
    )}
  >
    <span className="sr-only">Loading...</span>
    <div className="h-full w-full" />
  </div>
);

export const TextSkeleton: React.FC<{ width?: string, className?: string }> = ({ 
  width = "w-full", 
  className 
}) => (
  <div 
    role="status"
    aria-label="Loading text"
    className={cn(
      "h-4 bg-secondary/60 rounded animate-pulse", 
      width, 
      className
    )} 
  >
    <span className="sr-only">Loading...</span>
  </div>
);

export const ImageSkeleton: React.FC<{ className?: string; aspectRatio?: string }> = ({ 
  className,
  aspectRatio = "aspect-video"
}) => (
  <div 
    role="status"
    aria-label="Loading image"
    className={cn(
      "rounded-lg bg-secondary/60 animate-pulse",
      aspectRatio,
      className
    )}
  >
    <span className="sr-only">Loading image...</span>
  </div>
);

// Progressive loading grid
export const SkeletonGrid: React.FC<{
  count: number;
  columns?: number;
  gap?: string;
  className?: string;
  children: (index: number) => React.ReactNode;
}> = ({ count, columns = 3, gap = "gap-4", className, children }) => {
  return (
    <div 
      className={cn(
        `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`,
        gap,
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <div key={index}>
          {children(index)}
        </div>
      ))}
    </div>
  );
};

export { Skeleton };
