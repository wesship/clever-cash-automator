
import { Task } from "@/lib/types";

export interface TaskPerformanceData {
  timestamp: string;
  completion: number;
  earnings: number;
  errors: number;
  retries: number;
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
}

export interface TaskPerformanceMonitorProps {
  task: Task;
  onRetry?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  className?: string;
}
