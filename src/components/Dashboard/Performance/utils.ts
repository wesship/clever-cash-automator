
import { Task, TaskStatus } from "@/lib/types";
import { TaskPerformanceData } from "./types";

export const generateMockPerformanceData = (task: Task, duration: number = 7): TaskPerformanceData[] => {
  const data: TaskPerformanceData[] = [];
  const now = new Date();
  
  for (let i = duration; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Generate a somewhat realistic curve
    const progress = Math.min(100, Math.max(0, (duration - i) / duration * 100));
    const isComplete = task.status === TaskStatus.COMPLETED;
    const progressFactor = isComplete ? 100 : progress;
    
    const completionRate = task.completionCount / task.targetCompletions;
    const adjustedCompletion = i === 0 
      ? completionRate * 100 
      : (Math.min(progressFactor, 98) / 100) * completionRate * 100;
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      completion: Math.round(adjustedCompletion * 10) / 10,
      earnings: Math.round((task.earnings * (adjustedCompletion / 100)) * 100) / 100,
      errors: Math.floor(Math.random() * 3),
      retries: Math.floor(Math.random() * 2),
      cpuUsage: 10 + Math.random() * 20,
      memoryUsage: 50 + Math.random() * 30,
      responseTime: 200 + Math.random() * 300
    });
  }
  
  return data;
};
