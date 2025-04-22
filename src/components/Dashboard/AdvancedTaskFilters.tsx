
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calendar,
  Filter,
  SlidersHorizontal,
  Tags,
  Trash2, 
  CheckSquare,
  Clock,
  DollarSign
} from "lucide-react";
import { TaskPriority, TaskType, PlatformType } from "@/lib/types";
import { cn } from "@/lib/utils";

export interface TaskFilterOptions {
  search: string;
  status: string[];
  priority: TaskPriority[];
  platforms: PlatformType[];
  taskTypes: TaskType[];
  tags: string[];
  dateRange: {
    start?: Date;
    end?: Date;
  };
  earnings: {
    min: number;
    max: number;
  };
  customFilters: {
    hasProxy: boolean | null;
    hasCaptcha: boolean | null;
    completed: number | null; // percentage
    minDuration?: number;
    maxDuration?: number;
    categories: string[];
    labels: string[];
  };
}

interface AdvancedTaskFiltersProps {
  filters: TaskFilterOptions;
  onFiltersChange: (filters: TaskFilterOptions) => void;
  availableTags: string[];
  availableCategories: string[];
  availableLabels: string[];
  className?: string;
}

const AdvancedTaskFilters: React.FC<AdvancedTaskFiltersProps> = ({
  filters,
  onFiltersChange,
  availableTags,
  availableCategories,
  availableLabels,
  className
}) => {
  const [localFilters, setLocalFilters] = useState<TaskFilterOptions>(filters);
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const handleFilterChange = (partialFilters: Partial<TaskFilterOptions>) => {
    const updatedFilters = { ...localFilters, ...partialFilters };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleToggleFilter = (
    category: keyof TaskFilterOptions, 
    value: any
  ) => {
    const current = localFilters[category] as any[];
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    
    handleFilterChange({ [category]: updated } as Partial<TaskFilterOptions>);
  };

  const handleResetFilters = () => {
    const defaultFilters: TaskFilterOptions = {
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
    };
    setLocalFilters(defaultFilters);
    onFiltersChange(defaultFilters);
  };

  const activeFilterCount = (
    (localFilters.status.length > 0 ? 1 : 0) +
    (localFilters.priority.length > 0 ? 1 : 0) +
    (localFilters.platforms.length > 0 ? 1 : 0) +
    (localFilters.taskTypes.length > 0 ? 1 : 0) +
    (localFilters.tags.length > 0 ? 1 : 0) +
    (localFilters.dateRange.start || localFilters.dateRange.end ? 1 : 0) +
    (localFilters.earnings.min > 0 || localFilters.earnings.max < 100 ? 1 : 0) +
    (localFilters.customFilters.hasProxy !== null ? 1 : 0) +
    (localFilters.customFilters.hasCaptcha !== null ? 1 : 0) +
    (localFilters.customFilters.completed !== null ? 1 : 0) +
    (localFilters.customFilters.categories.length > 0 ? 1 : 0) +
    (localFilters.customFilters.labels.length > 0 ? 1 : 0)
  );

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <Popover open={isAdvancedOpen} onOpenChange={setIsAdvancedOpen}>
          <PopoverTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              Advanced Filters
              {activeFilterCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFilterCount}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[350px] p-4" align="start">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Advanced Filters</h4>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleResetFilters}
                  className="h-8 px-2 text-xs"
                >
                  Reset All
                </Button>
              </div>

              <Separator />
              
              {/* Priority Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Priority</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(TaskPriority).map(priority => (
                    <Badge
                      key={priority}
                      variant={localFilters.priority.includes(priority) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleToggleFilter('priority', priority)}
                    >
                      {priority}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Platform Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Platform</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(PlatformType).slice(0, 5).map(platform => (
                    <Badge
                      key={platform}
                      variant={localFilters.platforms.includes(platform) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleToggleFilter('platforms', platform)}
                    >
                      {platform}
                    </Badge>
                  ))}
                  <Popover>
                    <PopoverTrigger asChild>
                      <Badge variant="outline" className="cursor-pointer">
                        More...
                      </Badge>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px]">
                      <div className="flex flex-wrap gap-2">
                        {Object.values(PlatformType).slice(5).map(platform => (
                          <Badge
                            key={platform}
                            variant={localFilters.platforms.includes(platform) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => handleToggleFilter('platforms', platform)}
                          >
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              {/* Task Type Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Task Type</Label>
                <div className="flex flex-wrap gap-2">
                  {Object.values(TaskType).map(type => (
                    <Badge
                      key={type}
                      variant={localFilters.taskTypes.includes(type) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleToggleFilter('taskTypes', type)}
                    >
                      {type.replace('_', ' ')}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Tags Section */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Tags className="h-4 w-4" />
                  <Label className="text-sm font-medium">Tags</Label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map(tag => (
                    <Badge
                      key={tag}
                      variant={localFilters.tags.includes(tag) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => handleToggleFilter('tags', tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Categories Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Categories</Label>
                <div className="flex flex-wrap gap-2">
                  {availableCategories.map(category => (
                    <Badge
                      key={category}
                      variant={localFilters.customFilters.categories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const updated = localFilters.customFilters.categories.includes(category)
                          ? localFilters.customFilters.categories.filter(c => c !== category)
                          : [...localFilters.customFilters.categories, category];
                        handleFilterChange({ 
                          customFilters: {
                            ...localFilters.customFilters,
                            categories: updated
                          }
                        });
                      }}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Labels Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Labels</Label>
                <div className="flex flex-wrap gap-2">
                  {availableLabels.map(label => (
                    <Badge
                      key={label}
                      variant={localFilters.customFilters.labels.includes(label) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => {
                        const updated = localFilters.customFilters.labels.includes(label)
                          ? localFilters.customFilters.labels.filter(l => l !== label)
                          : [...localFilters.customFilters.labels, label];
                        handleFilterChange({ 
                          customFilters: {
                            ...localFilters.customFilters,
                            labels: updated
                          }
                        });
                      }}
                    >
                      {label}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Special Requirements Section */}
              <div className="space-y-2">
                <Label className="text-sm font-medium">Special Requirements</Label>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="proxy-filter" className="text-xs">Proxy Required</Label>
                    <Select
                      value={localFilters.customFilters.hasProxy === null 
                        ? "any" 
                        : localFilters.customFilters.hasProxy ? "yes" : "no"
                      }
                      onValueChange={(val) => {
                        const value = val === "any" ? null : val === "yes";
                        handleFilterChange({ 
                          customFilters: {
                            ...localFilters.customFilters,
                            hasProxy: value
                          }
                        });
                      }}
                    >
                      <SelectTrigger id="proxy-filter" className="h-8 w-[100px]">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <Label htmlFor="captcha-filter" className="text-xs">Captcha Handling</Label>
                    <Select
                      value={localFilters.customFilters.hasCaptcha === null 
                        ? "any" 
                        : localFilters.customFilters.hasCaptcha ? "yes" : "no"
                      }
                      onValueChange={(val) => {
                        const value = val === "any" ? null : val === "yes";
                        handleFilterChange({ 
                          customFilters: {
                            ...localFilters.customFilters,
                            hasCaptcha: value
                          }
                        });
                      }}
                    >
                      <SelectTrigger id="captcha-filter" className="h-8 w-[100px]">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="yes">Yes</SelectItem>
                        <SelectItem value="no">No</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              
              {/* Time & Earnings */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <Label className="text-sm font-medium">Estimated Duration (min)</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      className="h-8 w-20"
                      placeholder="Min"
                      value={localFilters.customFilters.minDuration || ""}
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value) : undefined;
                        handleFilterChange({ 
                          customFilters: {
                            ...localFilters.customFilters,
                            minDuration: value
                          }
                        });
                      }}
                    />
                    <span>to</span>
                    <Input 
                      type="number" 
                      className="h-8 w-20"
                      placeholder="Max"
                      value={localFilters.customFilters.maxDuration || ""}
                      onChange={(e) => {
                        const value = e.target.value ? parseInt(e.target.value) : undefined;
                        handleFilterChange({ 
                          customFilters: {
                            ...localFilters.customFilters,
                            maxDuration: value
                          }
                        });
                      }}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    <Label className="text-sm font-medium">Earnings Range ($)</Label>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-xs">${localFilters.earnings.min.toFixed(2)}</span>
                      <span className="text-xs">${localFilters.earnings.max.toFixed(2)}</span>
                    </div>
                    <Slider
                      value={[localFilters.earnings.min, localFilters.earnings.max]}
                      min={0}
                      max={100}
                      step={1}
                      onValueChange={(value) => {
                        handleFilterChange({
                          earnings: {
                            min: value[0],
                            max: value[1]
                          }
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleResetFilters}
                >
                  Reset
                </Button>
                <Button 
                  size="sm"
                  onClick={() => setIsAdvancedOpen(false)}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
        
        {activeFilterCount > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={handleResetFilters}
            className="flex items-center gap-1"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Filters
          </Button>
        )}
      </div>
      
      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 py-2">
          {localFilters.priority.map(priority => (
            <Badge key={`priority-${priority}`} variant="secondary" className="flex items-center gap-1">
              Priority: {priority}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleToggleFilter('priority', priority)}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {localFilters.platforms.map(platform => (
            <Badge key={`platform-${platform}`} variant="secondary" className="flex items-center gap-1">
              Platform: {platform}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleToggleFilter('platforms', platform)}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {localFilters.taskTypes.map(type => (
            <Badge key={`type-${type}`} variant="secondary" className="flex items-center gap-1">
              Type: {type.replace('_', ' ')}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleToggleFilter('taskTypes', type)}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {localFilters.tags.map(tag => (
            <Badge key={`tag-${tag}`} variant="secondary" className="flex items-center gap-1">
              Tag: {tag}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleToggleFilter('tags', tag)}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          ))}
          
          {(localFilters.earnings.min > 0 || localFilters.earnings.max < 100) && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Earnings: ${localFilters.earnings.min.toFixed(2)} - ${localFilters.earnings.max.toFixed(2)}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleFilterChange({
                  earnings: { min: 0, max: 100 }
                })}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {localFilters.customFilters.hasProxy !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Proxy: {localFilters.customFilters.hasProxy ? "Required" : "Not Required"}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleFilterChange({
                  customFilters: {
                    ...localFilters.customFilters,
                    hasProxy: null
                  }
                })}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          )}
          
          {localFilters.customFilters.hasCaptcha !== null && (
            <Badge variant="secondary" className="flex items-center gap-1">
              Captcha: {localFilters.customFilters.hasCaptcha ? "Required" : "Not Required"}
              <button 
                className="ml-1 rounded-full hover:bg-muted p-1"
                onClick={() => handleFilterChange({
                  customFilters: {
                    ...localFilters.customFilters,
                    hasCaptcha: null
                  }
                })}
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default AdvancedTaskFilters;
