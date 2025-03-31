
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
    // The actual execution logic would be moved here from TaskExecutionService
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
