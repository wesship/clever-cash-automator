
import React from "react";
import { Search, SortAsc, SortDesc, LayoutGrid, List, Keyboard, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus } from "@/lib/types";
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

interface TaskSearchFiltersProps {
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
}

export const TaskSearchFilters: React.FC<TaskSearchFiltersProps> = ({
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
}) => {
  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={statusFilter}
          onValueChange={onStatusFilterChange}
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
  );
};

export default TaskSearchFilters;
