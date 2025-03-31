
import { useState } from "react";
import { Task, TaskStatus, TaskType, PlatformType } from "@/lib/types";
import { toast } from "sonner";

export const useTaskManager = (initialTasks: Task[] = []) => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  
  const createTask = (data: any) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      name: data.name,
      type: data.type as TaskType,
      platform: data.platform as PlatformType,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: data.targetCompletions,
      earnings: 0,
      description: data.description || "",
      config: {
        proxyRequired: data.proxyRequired,
        captchaHandling: data.captchaHandling,
        schedule: {
          frequency: data.frequency as "hourly" | "daily" | "weekly",
          maxRuns: data.maxRuns,
        },
        // Add website-specific parameters to the task config
        taskSpecific: {
          // For Clickworker
          clickworkerQualificationLevel: data.websiteParams?.clickworkerQualificationLevel,
          taskMinimumPayment: data.websiteParams?.taskMinimumPayment,
          taskMaxDuration: data.websiteParams?.taskMaxDuration,
          
          // For Neobux
          neobuxMembershipType: data.websiteParams?.neobuxMembershipType,
          neobuxAdTypes: data.websiteParams?.neobuxAdTypes,
          neobuxClickDelay: data.websiteParams?.neobuxClickDelay,
          neobuxAutoRecycle: data.websiteParams?.neobuxAutoRecycle,
          
          // Browser preference for any platform
          useSpecificBrowser: data.websiteParams?.useSpecificBrowser,
        }
      },
    };

    setTasks([newTask, ...tasks]);
    toast.success(`Task "${data.name}" created successfully!`);
    
    return newTask;
  };

  return {
    tasks,
    setTasks,
    createTask
  };
};

export default useTaskManager;
