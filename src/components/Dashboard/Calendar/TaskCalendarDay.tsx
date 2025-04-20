
import React from "react";
import CalendarCell from "./CalendarCell";

interface TaskCalendarDayProps {
  date: Date;
  taskCount: number;
  props: any;
}

const TaskCalendarDay = ({ date, taskCount, props }: TaskCalendarDayProps) => {
  return (
    <CalendarCell
      date={date}
      taskCount={taskCount}
      selected={props["aria-selected"]}
      onSelect={() => props.onClick?.()}
    />
  );
};

export default TaskCalendarDay;

