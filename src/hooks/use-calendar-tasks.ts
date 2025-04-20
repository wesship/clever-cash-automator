
import { Task } from "@/lib/types";
import { useMemo } from "react";
import { isSameDay } from "date-fns";

export const useCalendarTasks = (tasks: Task[]) => {
  const getTasksByDate = (date: Date) => {
    if (!date) return [];
    
    return tasks.filter(task => {
      if (!task.config.schedule) return false;
      
      const taskDate = new Date(task.config.schedule.timeOfDay || "");
      return isSameDay(taskDate, date);
    });
  };
  
  const getTaskCountForDate = (date: Date) => {
    return getTasksByDate(date).length;
  };
  
  const scheduledDates = useMemo(() => {
    const dates = new Set<string>();
    tasks.forEach(task => {
      if (task.config.schedule?.timeOfDay) {
        dates.add(new Date(task.config.schedule.timeOfDay).toISOString());
      }
    });
    return Array.from(dates);
  }, [tasks]);
  
  return {
    getTasksByDate,
    getTaskCountForDate,
    scheduledDates,
  };
};

