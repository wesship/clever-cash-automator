
import React from "react";
import { z } from "zod";
import { PlatformAdapter } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/lib/types";

export class ClickworkerAdapter implements PlatformAdapter {
  getTaskSchema() {
    return z.object({
      clickworkerQualificationLevel: z.enum(["beginner", "intermediate", "expert"]).optional(),
      taskMinimumPayment: z.coerce.number().min(0).optional(),
      taskMaxDuration: z.coerce.number().min(1).optional(),
    });
  }

  getDefaultValues() {
    return {
      clickworkerQualificationLevel: "intermediate" as const,
      taskMinimumPayment: 0.5,
      taskMaxDuration: 15,
    };
  }

  async executeTask(task: Task): Promise<void> {
    console.log("Executing Clickworker task with ID:", task.id);
    
    const browserType = task.config.taskSpecific?.useSpecificBrowser || "chrome";
    console.log(`Using browser: ${browserType}`);

    // Log qualification level if it's set
    const qualificationLevel = task.config.taskSpecific?.clickworkerQualificationLevel;
    if (qualificationLevel) {
      console.log(`Filtering for ${qualificationLevel} level tasks`);
    }
    
    // Log minimum payment if it's set
    const minPayment = task.config.taskSpecific?.taskMinimumPayment;
    if (minPayment !== undefined && minPayment > 0) {
      console.log(`Looking for tasks paying at least $${minPayment}`);
    }
    
    // In a real implementation, this would use automation tools to:
    // 1. Open the browser with the specified user agent
    // 2. Navigate to Clickworker website
    // 3. Log in with account credentials
    // 4. Filter and complete tasks based on qualifications and payment
    
    // Simulate the task execution process
    console.log("Simulating Clickworker task execution");
    console.log("Logging in to Clickworker account");
    console.log("Filtering tasks by qualification level");
    console.log("Sorting tasks by payment");
    console.log("Starting highest paying eligible task");
    
    // Simulate earning from completed tasks
    const tasksCompleted = Math.floor(Math.random() * 5) + 1;
    const totalEarnings = (Math.random() * 15).toFixed(2);
    console.log(`Completed ${tasksCompleted} tasks for a total of $${totalEarnings}`);
  }

  getFormFields(form: any) {
    return (
      <>
        <FormField
          control={form.control}
          name="websiteParams.clickworkerQualificationLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qualification Level</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select qualification level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="beginner">Beginner</SelectItem>
                  <SelectItem value="intermediate">Intermediate</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Required qualification level for tasks
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.taskMinimumPayment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Payment ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" {...field} />
              </FormControl>
              <FormDescription>
                Only select tasks with at least this payment
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.taskMaxDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Duration (minutes)</FormLabel>
              <FormControl>
                <Input type="number" min="1" {...field} />
              </FormControl>
              <FormDescription>
                Maximum time to spend on each task
              </FormDescription>
            </FormItem>
          )}
        />
      </>
    );
  }
}
