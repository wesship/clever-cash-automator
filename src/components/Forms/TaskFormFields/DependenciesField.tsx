
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X, Link2Icon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { Task, TaskDependency } from "@/lib/types";

interface DependenciesFieldProps {
  form: UseFormReturn<any>;
  allTasks: Task[];
}

const DependenciesField: React.FC<DependenciesFieldProps> = ({ form, allTasks }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>("");
  const [selectedCondition, setSelectedCondition] = useState<"completed" | "failed" | "any">("completed");
  
  const existingDependencies = form.watch("dependencies") || [];
  
  // Filter out the current task and already added dependencies
  const availableTasks = allTasks.filter(task => 
    task.id !== form.watch("id") && 
    !existingDependencies.some((dep: TaskDependency) => dep.taskId === task.id)
  );
  
  const addDependency = () => {
    if (!selectedTaskId) return;
    
    const updatedDependencies = [
      ...existingDependencies,
      { taskId: selectedTaskId, condition: selectedCondition }
    ];
    
    form.setValue("dependencies", updatedDependencies, { shouldValidate: true });
    setSelectedTaskId("");
    setSelectedCondition("completed");
  };
  
  const removeDependency = (taskId: string) => {
    const updatedDependencies = existingDependencies.filter(
      (dep: TaskDependency) => dep.taskId !== taskId
    );
    form.setValue("dependencies", updatedDependencies, { shouldValidate: true });
  };
  
  const getTaskNameById = (id: string) => {
    const task = allTasks.find(t => t.id === id);
    return task ? task.name : id;
  };

  return (
    <FormField
      control={form.control}
      name="dependencies"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Dependencies</FormLabel>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <FormControl>
                <Select 
                  value={selectedTaskId} 
                  onValueChange={setSelectedTaskId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select task" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableTasks.length > 0 ? (
                      availableTasks.map(task => (
                        <SelectItem key={task.id} value={task.id}>
                          {task.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>No tasks available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </FormControl>
              
              <Select 
                value={selectedCondition} 
                onValueChange={(value: "completed" | "failed" | "any") => setSelectedCondition(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="completed">is completed</SelectItem>
                  <SelectItem value="failed">has failed</SelectItem>
                  <SelectItem value="any">any status</SelectItem>
                </SelectContent>
              </Select>
              
              <Button 
                type="button" 
                onClick={addDependency}
                disabled={!selectedTaskId}
                className="w-full"
              >
                Add Dependency
              </Button>
            </div>
            
            <div className="space-y-2">
              {existingDependencies.length === 0 ? (
                <p className="text-sm text-muted-foreground italic">No dependencies added</p>
              ) : (
                existingDependencies.map((dep: TaskDependency, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                    <div className="flex items-center gap-2">
                      <Link2Icon className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {getTaskNameById(dep.taskId)}
                      </span>
                      <Badge variant="outline">
                        {dep.condition === "completed" && "is completed"}
                        {dep.condition === "failed" && "has failed"}
                        {dep.condition === "any" && "any status"}
                      </Badge>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeDependency(dep.taskId)}
                    >
                      <X className="h-4 w-4" />
                      <span className="sr-only">Remove</span>
                    </Button>
                  </div>
                ))
              )}
            </div>
            
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default DependenciesField;
