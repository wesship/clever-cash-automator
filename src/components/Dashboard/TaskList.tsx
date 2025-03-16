
import React, { useState } from "react";
import { Task, TaskStatus } from "@/lib/types";
import TaskCard from "./TaskCard";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  SortAsc, 
  SortDesc, 
  Filter 
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskListProps {
  tasks: Task[];
  onCreateTask?: () => void;
  className?: string;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCreateTask,
  className
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<keyof Task>("createdAt");

  const handleStartTask = (taskId: string) => {
    toast.success("Task started successfully");
    // In a real app, this would call an API to start the task
  };

  const handlePauseTask = (taskId: string) => {
    toast.success("Task paused successfully");
    // In a real app, this would call an API to pause the task
  };

  const handleDeleteTask = (taskId: string) => {
    toast.success("Task deleted successfully");
    // In a real app, this would call an API to delete the task
  };

  const handleEditTask = (taskId: string) => {
    // In a real app, this would navigate to edit task page or open a modal
    console.log("Edit task", taskId);
  };

  const filteredTasks = tasks
    .filter(task => 
      task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(task => 
      statusFilter === "all" ? true : task.status === statusFilter
    )
    .sort((a, b) => {
      if (sortBy === "createdAt") {
        return sortOrder === "asc" 
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      } else if (sortBy === "earnings") {
        return sortOrder === "asc" 
          ? a.earnings - b.earnings
          : b.earnings - a.earnings;
      }
      // Add more sorting options as needed
      return 0;
    });

  return (
    <div className={className}>
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Status</SelectLabel>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value={TaskStatus.PENDING}>Pending</SelectItem>
                <SelectItem value={TaskStatus.RUNNING}>Running</SelectItem>
                <SelectItem value={TaskStatus.COMPLETED}>Completed</SelectItem>
                <SelectItem value={TaskStatus.FAILED}>Failed</SelectItem>
                <SelectItem value={TaskStatus.PAUSED}>Paused</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <SortAsc className="h-4 w-4" />
                Sort
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortBy === "createdAt"}
                onCheckedChange={() => setSortBy("createdAt")}
              >
                Date Created
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "earnings"}
                onCheckedChange={() => setSortBy("earnings")}
              >
                Earnings
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortOrder === "asc"}
                onCheckedChange={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? (
                  <span className="flex items-center gap-2">
                    <SortAsc className="h-4 w-4" /> Ascending
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <SortDesc className="h-4 w-4" /> Descending
                  </span>
                )}
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Button onClick={onCreateTask} className="gap-2">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStart={handleStartTask}
              onPause={handlePauseTask}
              onDelete={handleDeleteTask}
              onEdit={handleEditTask}
              className="animate-fade-in"
            />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-20 text-center">
            <div className="text-muted-foreground mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No tasks found</h3>
              <p className="mt-1">Try adjusting your search or filter criteria</p>
            </div>
            <Button onClick={onCreateTask} variant="outline" className="mt-4">
              <Plus className="h-4 w-4 mr-2" />
              Create New Task
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
