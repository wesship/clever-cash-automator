
import { useState, useMemo } from 'react';
import { Task } from '@/lib/types';

export const useTaskData = (tasks: Task[]) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<keyof Task>("createdAt");

  const filteredTasks = useMemo(() => {
    return tasks
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
        return 0;
      });
  }, [tasks, searchTerm, statusFilter, sortBy, sortOrder]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    sortBy,
    setSortBy,
    filteredTasks
  };
};

export default useTaskData;
