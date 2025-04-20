
import { useState } from "react";
import { Task } from "@/lib/types";
import { isSameDay } from "date-fns";

interface TaskScheduleDay {
  date: Date;
  tasks: Task[];
}

export const useScheduling = (tasks: Task[]) => {
  const getScheduledTasks = () => {
    const scheduledDays: TaskScheduleDay[] = [];
    
    tasks.forEach(task => {
      if (!task.config.schedule) return;
      
      const today = new Date();
      const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      
      if (task.config.schedule.frequency === 'daily') {
        for (let i = 0; i < daysInMonth; i++) {
          const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
          scheduledDays.push({
            date,
            tasks: [task]
          });
        }
      } else if (task.config.schedule.frequency === 'weekly') {
        if (task.config.schedule.daysOfWeek && task.config.schedule.daysOfWeek.length > 0) {
          for (let i = 0; i < daysInMonth; i++) {
            const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
            if (task.config.schedule.daysOfWeek.includes(date.getDay())) {
              scheduledDays.push({
                date,
                tasks: [task]
              });
            }
          }
        } else {
          for (let i = 0; i < daysInMonth; i += 7) {
            const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
            scheduledDays.push({
              date,
              tasks: [task]
            });
          }
        }
      }
    });
    
    return scheduledDays;
  };
  
  const getDayTasks = (day: Date) => {
    if (!day) return [];
    
    return getScheduledTasks()
      .filter(scheduledDay => isSameDay(scheduledDay.date, day))
      .flatMap(scheduledDay => scheduledDay.tasks);
  };
  
  const getTaskCountForDate = (date: Date) => {
    return getDayTasks(date).length;
  };
  
  return {
    getDayTasks,
    getTaskCountForDate,
  };
};
