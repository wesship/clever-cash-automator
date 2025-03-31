
import { useState, useEffect } from "react";
import { Statistics } from "@/lib/types";
import useLocalStorage from "@/hooks/use-local-storage";
import useTabNavigation from "@/hooks/use-tab-navigation";
import useTaskManager from "@/hooks/use-task-manager";
import { mockTasks, mockStatistics } from "@/services/mockDataService";

export const useDashboardData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics>(mockStatistics);
  const [recentVisits, setRecentVisits] = useLocalStorage<number>("recent-visits", 0);
  
  // Use our extracted hooks
  const { activeTab, setActiveTab, searchParams, setSearchParams } = useTabNavigation();
  const { tasks, setTasks, createTask } = useTaskManager([]);
  
  // Initialize data
  useEffect(() => {
    setRecentVisits(prev => prev + 1);
    
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTasks(mockTasks);
      setIsLoading(false);
    };
    
    loadData();
  }, [setRecentVisits, setTasks]);
  
  // Create a new task wrapper function
  const handleCreateTask = (data: any) => {
    const newTask = createTask(data);
    setActiveTab("tasks");
    return newTask;
  };

  return {
    activeTab,
    setActiveTab,
    tasks,
    statistics,
    isLoading,
    handleCreateTask,
    searchParams,
    setSearchParams
  };
};

export default useDashboardData;
