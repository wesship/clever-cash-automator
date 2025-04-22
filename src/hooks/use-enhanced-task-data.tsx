import { useState, useMemo, useCallback } from 'react';
import { Task, TaskPriority, TaskStatus, TaskType, PlatformType } from '@/lib/types';
import { TaskFilterOptions } from '@/components/Dashboard/AdvancedTaskFilters';

export const useEnhancedTaskData = (tasks: Task[]) => {
  // Basic filtering and sorting state
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [sortBy, setSortBy] = useState<keyof Task>("createdAt");
  
  // Advanced filtering state
  const [advancedFilters, setAdvancedFilters] = useState<TaskFilterOptions>({
    search: "",
    status: [],
    priority: [],
    platforms: [],
    taskTypes: [],
    tags: [],
    dateRange: {},
    earnings: { min: 0, max: 100 },
    customFilters: {
      hasProxy: null,
      hasCaptcha: null,
      completed: null,
      categories: [],
      labels: []
    }
  });

  // Track available metadata for filter options
  const availableMetadata = useMemo(() => {
    const tags = new Set<string>();
    const categories = new Set<string>();
    const labels = new Set<string>();
    
    tasks.forEach(task => {
      // Collect tags
      task.config.taskTags?.forEach(tag => tags.add(tag));
      
      // Collect categories if available
      if (task.config.taskSpecific?.category) {
        categories.add(task.config.taskSpecific.category);
      }
      
      // Collect labels if available
      if (task.config.taskSpecific?.labels) {
        task.config.taskSpecific.labels.forEach((label: string) => labels.add(label));
      }
    });
    
    return {
      tags: Array.from(tags),
      categories: Array.from(categories),
      labels: Array.from(labels)
    };
  }, [tasks]);

  const handleAdvancedFiltersChange = useCallback((filters: TaskFilterOptions) => {
    setAdvancedFilters(filters);
    
    // Keep the simple search filter in sync with advanced filters
    if (filters.search !== searchTerm) {
      setSearchTerm(filters.search);
    }
    
    // If a specific status is selected in advanced filters, update the simple status filter
    if (filters.status.length === 1) {
      setStatusFilter(filters.status[0]);
    } else if (filters.status.length === 0) {
      setStatusFilter("all");
    }
  }, [searchTerm]);

  // Filtered tasks with all filter criteria
  const filteredTasks = useMemo(() => {
    return tasks
      .filter(task => {
        // Basic text search
        const matchesSearch = 
          searchTerm === "" || 
          task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description.toLowerCase().includes(searchTerm.toLowerCase());
        
        if (!matchesSearch) return false;
        
        // Status filter (simple version)
        const matchesStatus = 
          statusFilter === "all" || task.status === statusFilter;
        
        if (!matchesStatus) return false;
        
        // Advanced filters
        
        // Status (advanced version)
        if (advancedFilters.status.length > 0 && 
            !advancedFilters.status.includes(task.status)) {
          return false;
        }
        
        // Priority
        if (advancedFilters.priority.length > 0 && 
            !advancedFilters.priority.includes(task.priority)) {
          return false;
        }
        
        // Platform
        if (advancedFilters.platforms.length > 0 && 
            !advancedFilters.platforms.includes(task.platform)) {
          return false;
        }
        
        // Task Type
        if (advancedFilters.taskTypes.length > 0 && 
            !advancedFilters.taskTypes.includes(task.type)) {
          return false;
        }
        
        // Tags
        if (advancedFilters.tags.length > 0) {
          const taskTags = task.config.taskTags || [];
          if (!advancedFilters.tags.some(tag => taskTags.includes(tag))) {
            return false;
          }
        }
        
        // Date Range
        if (advancedFilters.dateRange.start && 
            new Date(task.createdAt) < advancedFilters.dateRange.start) {
          return false;
        }
        
        if (advancedFilters.dateRange.end && 
            new Date(task.createdAt) > advancedFilters.dateRange.end) {
          return false;
        }
        
        // Earnings
        const taskEarnings = task.earnings || 0;
        if (taskEarnings < advancedFilters.earnings.min || 
            taskEarnings > advancedFilters.earnings.max) {
          return false;
        }
        
        // Custom Filters
        const customFilters = advancedFilters.customFilters;
        
        // Proxy requirement
        if (customFilters.hasProxy !== null && 
            task.config.proxyRequired !== customFilters.hasProxy) {
          return false;
        }
        
        // Captcha handling
        if (customFilters.hasCaptcha !== null && 
            task.config.captchaHandling !== customFilters.hasCaptcha) {
          return false;
        }
        
        // Completion percentage
        if (customFilters.completed !== null) {
          const completionPercentage = 
            (task.completionCount / task.targetCompletions) * 100;
          if (completionPercentage < customFilters.completed) {
            return false;
          }
        }
        
        // Categories
        if (customFilters.categories.length > 0) {
          const taskCategory = task.config.taskSpecific?.category || "";
          if (!customFilters.categories.includes(taskCategory)) {
            return false;
          }
        }
        
        // Labels
        if (customFilters.labels.length > 0) {
          const taskLabels = task.config.taskSpecific?.labels || [];
          if (!customFilters.labels.some(label => taskLabels.includes(label))) {
            return false;
          }
        }
        
        // Duration filter
        if (customFilters.minDuration !== undefined) {
          const taskDuration = task.config.taskSpecific?.estimatedDuration || 0;
          if (taskDuration < customFilters.minDuration) {
            return false;
          }
        }
        
        if (customFilters.maxDuration !== undefined) {
          const taskDuration = task.config.taskSpecific?.estimatedDuration || 0;
          if (taskDuration > customFilters.maxDuration) {
            return false;
          }
        }
        
        return true;
      })
      .sort((a, b) => {
        // Handle different sort fields
        if (sortBy === "createdAt") {
          return sortOrder === "asc" 
            ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === "earnings") {
          return sortOrder === "asc" 
            ? a.earnings - b.earnings
            : b.earnings - a.earnings;
        } else if (sortBy === "priority") {
          const priorityOrder = {
            [TaskPriority.HIGH]: 3,
            [TaskPriority.MEDIUM]: 2,
            [TaskPriority.LOW]: 1
          };
          return sortOrder === "asc"
            ? priorityOrder[a.priority] - priorityOrder[b.priority]
            : priorityOrder[b.priority] - priorityOrder[a.priority];
        } else if (sortBy === "completionCount") {
          const aCompletionRate = a.completionCount / a.targetCompletions;
          const bCompletionRate = b.completionCount / b.targetCompletions;
          return sortOrder === "asc" 
            ? aCompletionRate - bCompletionRate
            : bCompletionRate - aCompletionRate;
        } else if (sortBy === "name") {
          return sortOrder === "asc"
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        }
        return 0;
      });
  }, [
    tasks, 
    searchTerm, 
    statusFilter, 
    sortBy, 
    sortOrder, 
    advancedFilters
  ]);

  return {
    // Simple filters
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    sortOrder,
    setSortOrder,
    sortBy,
    setSortBy,
    
    // Advanced filters
    advancedFilters,
    setAdvancedFilters: handleAdvancedFiltersChange,
    
    // Metadata for filter options
    availableTags: availableMetadata.tags,
    availableCategories: availableMetadata.categories,
    availableLabels: availableMetadata.labels,
    
    // Results
    filteredTasks
  };
};

export default useEnhancedTaskData;
