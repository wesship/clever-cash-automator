
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Task } from "@/lib/types";
import { TooltipProvider } from "@/components/ui/tooltip";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import TaskCalendarDay from "./Calendar/TaskCalendarDay";
import TaskDetailsDialog from "./Calendar/TaskDetailsDialog";
import { useScheduling } from "./Calendar/useScheduling";

interface ScheduleCalendarViewProps {
  tasks: Task[];
  onViewTaskDetails: (taskId: string) => void;
}

const ScheduleCalendarView: React.FC<ScheduleCalendarViewProps> = ({
  tasks,
  onViewTaskDetails
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [taskDialogOpen, setTaskDialogOpen] = useState(false);
  
  const { getTaskCountForDate, getDayTasks } = useScheduling(tasks);
  
  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    setSelectedDate(date);
    const tasksForDay = getDayTasks(date);
    setSelectedTasks(tasksForDay);
    
    if (tasksForDay.length > 0) {
      setTaskDialogOpen(true);
    }
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
                Day: ({ date, ...props }) => (
                  <TaskCalendarDay
                    date={date}
                    taskCount={getTaskCountForDate(date)}
                    props={props}
                  />
                ),
              }}
            />
          </TooltipProvider>
        </CardContent>
      </Card>
      
      <TaskDetailsDialog
        open={taskDialogOpen}
        onOpenChange={setTaskDialogOpen}
        selectedDate={selectedDate}
        tasks={selectedTasks}
        onViewTask={onViewTaskDetails}
      />
    </div>
  );
};

export default ScheduleCalendarView;
