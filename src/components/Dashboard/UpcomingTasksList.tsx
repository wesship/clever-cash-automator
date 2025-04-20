
import React, { useState } from "react";
import { Task, TaskStatus } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { format, addDays, startOfToday, isSameDay, isAfter } from "date-fns";
import { Clock, CalendarCheck, Play, Pause } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTaskExecution } from "@/hooks/use-task-execution";

interface UpcomingTasksListProps {
  tasks: Task[];
  onViewTaskDetails: (taskId: string) => void;
}

type TimeRange = "today" | "tomorrow" | "week" | "all";

const UpcomingTasksList: React.FC<UpcomingTasksListProps> = ({ tasks, onViewTaskDetails }) => {
  const [timeRange, setTimeRange] = useState<TimeRange>("today");
  
  // This would normally use actual scheduled data
  // For demo purposes, we'll generate fictional upcoming tasks
  const getUpcomingTasks = () => {
    const today = startOfToday();
    const tomorrow = addDays(today, 1);
    const nextWeek = addDays(today, 7);
    
    // Filter tasks based on the selected time range
    return tasks.filter(task => {
      // Simulate scheduled dates based on frequency
      if (!task.config.schedule) return false;
      
      // For demo purposes, assign dates based on frequency
      let scheduledDate: Date | undefined;
      
      if (task.config.schedule.frequency === 'daily') {
        scheduledDate = today;
      } else if (task.config.schedule.frequency === 'weekly') {
        const dayOfWeek = task.id.charCodeAt(0) % 7; // Use task ID to determine day of week
        let scheduleDate = new Date(today);
        while (scheduleDate.getDay() !== dayOfWeek) {
          scheduleDate.setDate(scheduleDate.getDate() + 1);
        }
        scheduledDate = scheduleDate;
      } else if (task.config.schedule.frequency === 'monthly') {
        const dayOfMonth = task.id.charCodeAt(0) % 28 + 1; // Use task ID to determine day of month
        scheduledDate = new Date(today.getFullYear(), today.getMonth(), dayOfMonth);
        if (isAfter(today, scheduledDate)) {
          scheduledDate = new Date(today.getFullYear(), today.getMonth() + 1, dayOfMonth);
        }
      }
      
      if (!scheduledDate) return false;
      
      // Apply time range filter
      if (timeRange === "today") {
        return isSameDay(scheduledDate, today);
      } else if (timeRange === "tomorrow") {
        return isSameDay(scheduledDate, tomorrow);
      } else if (timeRange === "week") {
        return isAfter(scheduledDate, today) && !isAfter(scheduledDate, nextWeek);
      }
      
      // "all" time range shows everything
      return true;
    });
  };
  
  const upcomingTasks = getUpcomingTasks();

  const getTimeForTask = (task: Task) => {
    // In a real implementation, this would come from the task schedule
    return task.config.schedule?.timeOfDay || "12:00";
  };
  
  const { startTask, stopTask } = useTaskExecution();
  
  const handleRunTask = (task: Task, e: React.MouseEvent) => {
    e.stopPropagation();
    startTask(task);
  };
  
  const handlePauseTask = (taskId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    stopTask(taskId);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Upcoming Tasks</h2>
        <Tabs value={timeRange} onValueChange={(value) => setTimeRange(value as TimeRange)}>
          <TabsList>
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="tomorrow">Tomorrow</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <ScrollArea className="h-[calc(100vh-300px)] pr-4">
        {upcomingTasks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CalendarCheck className="h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No upcoming tasks</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {timeRange === "today" ? "You don't have any tasks scheduled for today" : 
               timeRange === "tomorrow" ? "You don't have any tasks scheduled for tomorrow" :
               timeRange === "week" ? "You don't have any tasks scheduled for this week" :
               "You don't have any scheduled tasks"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {upcomingTasks.map(task => (
              <div 
                key={task.id}
                className="border border-border/50 rounded-lg p-4 hover:bg-background/50 cursor-pointer transition-colors"
                onClick={() => onViewTaskDetails(task.id)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{task.name}</h3>
                  <Badge variant={task.status === TaskStatus.RUNNING ? "default" : "outline"}>
                    {task.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-1">{task.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{getTimeForTask(task)}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{task.config.schedule?.frequency}</span>
                  </div>
                  
                  {task.status === TaskStatus.RUNNING ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8"
                      onClick={(e) => handlePauseTask(task.id, e)}
                    >
                      <Pause className="h-4 w-4 mr-1" /> Pause
                    </Button>
                  ) : task.status !== TaskStatus.COMPLETED ? (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="h-8"
                      onClick={(e) => handleRunTask(task, e)}
                    >
                      <Play className="h-4 w-4 mr-1" /> Run
                    </Button>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default UpcomingTasksList;
