
import React from "react";
import { Search, SortAsc, SortDesc, LayoutGrid, List, Keyboard, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus, TaskPriority } from "@/lib/types";
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
import AdvancedTaskFilters, { TaskFilterOptions } from "./AdvancedTaskFilters";

interface EnhancedTaskSearchFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusFilterChange: (value: string) => void;
  sortBy: keyof Task;
  onSortByChange: (value: keyof Task) => void;
  sortOrder: "asc" | "desc";
  onSortOrderChange: (value: "asc" | "desc") => void;
  viewMode: "grid" | "list";
  onViewModeChange: () => void;
  onKeyboardShortcutsOpen: () => void;
  onCreateTask?: () => void;
  
  // Advanced filtering props
  advancedFilters: TaskFilterOptions;
  onAdvancedFiltersChange: (filters: TaskFilterOptions) => void;
  availableTags: string[];
  availableCategories: string[];
  availableLabels: string[];
}

export const EnhancedTaskSearchFilters: React.FC<EnhancedTaskSearchFiltersProps> = ({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortBy,
  onSortByChange,
  sortOrder,
  onSortOrderChange,
  viewMode,
  onViewModeChange,
  onKeyboardShortcutsOpen,
  onCreateTask,
  advancedFilters,
  onAdvancedFiltersChange,
  availableTags,
  availableCategories,
  availableLabels
}) => {
  // Sync the simple search with advanced filters
  const handleSearchChange = (value: string) => {
    onSearchChange(value);
    onAdvancedFiltersChange({
      ...advancedFilters,
      search: value
    });
  };

  // Sync the status filter with advanced filters
  const handleStatusFilterChange = (value: string) => {
    onStatusFilterChange(value);
    if (value === "all") {
      onAdvancedFiltersChange({
        ...advancedFilters,
        status: []
      });
    } else {
      onAdvancedFiltersChange({
        ...advancedFilters,
        status: [value]
      });
    }
  };

  return (
    <div className="mb-6 flex flex-col space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Select
            value={statusFilter}
            onValueChange={handleStatusFilterChange}
          >
            <SelectTrigger className="w-[160px]">
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
                onCheckedChange={() => onSortByChange("createdAt")}
              >
                Date Created
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "earnings"}
                onCheckedChange={() => onSortByChange("earnings")}
              >
                Earnings
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "priority"}
                onCheckedChange={() => onSortByChange("priority")}
              >
                Priority
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "completionCount"}
                onCheckedChange={() => onSortByChange("completionCount")}
              >
                Completion Rate
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem
                checked={sortBy === "name"}
                onCheckedChange={() => onSortByChange("name")}
              >
                Name
              </DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Sort Order</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem
                checked={sortOrder === "asc"}
                onCheckedChange={() => onSortOrderChange(sortOrder === "asc" ? "desc" : "asc")}
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
          
          <Button 
            variant="outline" 
            size="icon" 
            onClick={onViewModeChange}
            title={`Switch to ${viewMode === 'grid' ? 'list' : 'grid'} view`}
          >
            {viewMode === 'grid' ? (
              <List className="h-4 w-4" />
            ) : (
              <LayoutGrid className="h-4 w-4" />
            )}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={onKeyboardShortcutsOpen}
            title="Keyboard shortcuts"
          >
            <Keyboard className="h-4 w-4" />
          </Button>

          <Button onClick={onCreateTask} className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
            <Plus className="h-4 w-4" />
            New Task
          </Button>
        </div>
      </div>
      
      {/* Advanced Filters */}
      <AdvancedTaskFilters
        filters={advancedFilters}
        onFiltersChange={onAdvancedFiltersChange}
        availableTags={availableTags}
        availableCategories={availableCategories}
        availableLabels={availableLabels}
      />
    </div>
  );
};

export default EnhancedTaskSearchFilters;
