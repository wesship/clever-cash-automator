
import React, { useState } from "react";
import { Task } from "@/lib/types";
import ScheduleCalendarView from "./ScheduleCalendarView";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UpcomingTasksList from "./UpcomingTasksList";

interface CalendarTabProps {
  tasks: Task[];
  onViewTaskDetails: (taskId: string) => void;
}

type ViewMode = "calendar" | "list";

const CalendarTab: React.FC<CalendarTabProps> = ({ tasks, onViewTaskDetails }) => {
  const [viewMode, setViewMode] = useState<ViewMode>("calendar");
  
  return (
    <div className="space-y-4 animate-fade-in">
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex justify-center mb-4">
            <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
              <TabsList>
                <TabsTrigger value="calendar">Calendar View</TabsTrigger>
                <TabsTrigger value="list">List View</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          {viewMode === "calendar" ? (
            <ScheduleCalendarView tasks={tasks} onViewTaskDetails={onViewTaskDetails} />
          ) : (
            <UpcomingTasksList tasks={tasks} onViewTaskDetails={onViewTaskDetails} />
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarTab;
