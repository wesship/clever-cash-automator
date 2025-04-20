
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Task, TaskStatus } from "@/lib/types";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { format, isToday, isSameDay } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

interface ScheduleCalendarViewProps {
  tasks: Task[];
  onViewTaskDetails: (taskId: string) => void;
}

interface TaskScheduleDay {
  date: Date;
  tasks: Task[];
}

const ScheduleCalendarView: React.FC<ScheduleCalendarViewProps> = ({ tasks, onViewTaskDetails }) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  
  // Get all scheduled tasks for the calendar
  const getScheduledTasks = () => {
    // In a real implementation, this would use the actual task schedule data
    // For demo purposes, we'll generate some fake scheduled dates
    const scheduledDays: TaskScheduleDay[] = [];
    
    // For each task, create scheduled days based on its frequency
    tasks.forEach(task => {
      if (!task.config.schedule) return;
      
      const today = new Date();
      const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
      
      // Simulate scheduled days based on frequency
      if (task.config.schedule.frequency === 'daily') {
        for (let i = 0; i < daysInMonth; i++) {
          const date = new Date(today.getFullYear(), today.getMonth(), i + 1);
          scheduledDays.push({
            date,
            tasks: [task]
          });
        }
      } else if (task.config.schedule.frequency === 'weekly') {
        // If task has daysOfWeek specified
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
          // Default to once a week
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
  
  const scheduledDays = getScheduledTasks();
  
  const getDayTasks = (day: Date) => {
    if (!day) return [];
    
    return scheduledDays
      .filter(scheduledDay => isSameDay(scheduledDay.date, day))
      .flatMap(scheduledDay => scheduledDay.tasks);
  };
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    const tasksForDay = getDayTasks(date);
    setSelectedTasks(tasksForDay);
    
    if (tasksForDay.length > 0) {
      setTaskDialogOpen(true);
    }
  };
  
  const getTaskCountForDate = (date: Date) => {
    return getDayTasks(date).length;
  };
  
  const handleViewTask = (taskId: string) => {
    setTaskDialogOpen(false);
    onViewTaskDetails(taskId);
  };
  
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Task Calendar</h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentDate(new Date())}
            title="Today"
          >
            <CalendarIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const prevMonth = new Date(currentDate);
              prevMonth.setMonth(prevMonth.getMonth() - 1);
              setCurrentDate(prevMonth);
            }}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="font-medium">
            {format(currentDate, "MMMM yyyy")}
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => {
              const nextMonth = new Date(currentDate);
              nextMonth.setMonth(nextMonth.getMonth() + 1);
              setCurrentDate(nextMonth);
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <TooltipProvider>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              month={currentDate}
              onMonthChange={setCurrentDate}
              className="rounded-md border"
              components={{
                Day: ({ date, ...props }) => {
                  // Fixed: Changed 'day' to 'date' to match the DayPicker component props
                  const taskCount = getTaskCountForDate(date);
                  const isCurrentDay = isToday(date);
                  return (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          className={cn(
                            "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
                            isCurrentDay && "bg-primary/20",
                            taskCount > 0 && "bg-blue-500/10 hover:bg-blue-500/20",
                            // Fixed: Removed 'selected' property reference and used aria-selected attribute checking
                            props["aria-selected"] && "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground"
                          )}
                          {...props}
                        >
                          <time dateTime={format(date, "yyyy-MM-dd")}>
                            {format(date, "d")}
                          </time>
                          {taskCount > 0 && (
                            <div className="absolute -bottom-0.5 inset-x-0 flex justify-center">
                              <Badge variant="outline" className="h-1.5 w-1.5 rounded-full p-0 bg-blue-500" />
                            </div>
                          )}
                        </Button>
                      </TooltipTrigger>
                      {taskCount > 0 && (
                        <TooltipContent>
                          <div className="text-xs">
                            <p>{format(date, "EEEE, MMMM d, yyyy")}</p>
                            <p>{taskCount} task(s) scheduled</p>
                          </div>
                        </TooltipContent>
                      )}
                    </Tooltip>
                  );
                },
              }}
            />
          </TooltipProvider>
        </CardContent>
      </Card>
      
      <Dialog open={taskDialogOpen} onOpenChange={setTaskDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              Tasks for {selectedDate ? format(selectedDate, "EEEE, MMMM d, yyyy") : ""}
            </DialogTitle>
          </DialogHeader>
          <Separator />
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {selectedTasks.length === 0 ? (
                <p className="text-center text-muted-foreground py-4">No tasks scheduled for this day</p>
              ) : (
                selectedTasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="p-3 border border-border/50 rounded-lg hover:bg-background/50 cursor-pointer"
                    onClick={() => handleViewTask(task.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{task.name}</h4>
                      <Badge variant={task.status === TaskStatus.RUNNING ? "default" : "outline"}>
                        {task.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{task.description}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
                      <div>
                        Time: {task.config.schedule?.timeOfDay || "N/A"}
                      </div>
                      <div>
                        Platform: {task.platform}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleCalendarView;
