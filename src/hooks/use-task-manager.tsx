
import { useState } from "react";
import { Task, TaskStatus, TaskType, PlatformType, TaskPriority } from "@/lib/types";
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
      priority: data.priority || TaskPriority.MEDIUM,
      progress: 0, // Add the required progress field
      config: {
        proxyRequired: data.proxyRequired,
        captchaHandling: data.captchaHandling,
        schedule: data.scheduleConfig || {
          frequency: data.frequency as "hourly" | "daily" | "weekly" | "monthly" | "custom",
          timeOfDay: data.timeOfDay,
          daysOfWeek: data.daysOfWeek,
          daysOfMonth: data.daysOfMonth,
          startDate: data.startDate,
          endDate: data.endDate,
          maxRuns: data.maxRuns,
          recurrencePattern: data.recurrencePattern,
          repeatEvery: data.repeatEvery,
          recurrenceEndAfter: data.recurrenceEndAfter,
          customCron: data.customCron,
        },
        // Add website-specific parameters to the task config
        taskSpecific: data.websiteParams || {},
        taskTags: data.taskTags || [],
        dependencies: data.dependencies || [],
        notifyOnCompletion: data.notifyOnCompletion !== undefined ? data.notifyOnCompletion : true,
        notifyOnFailure: data.notifyOnFailure !== undefined ? data.notifyOnFailure : true,
        retryStrategy: data.retryStrategy || {
          maxRetries: 3,
          delayBetweenRetries: 5000,
        },
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
