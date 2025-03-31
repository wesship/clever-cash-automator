
import React from "react";
import { z } from "zod";
import { PlatformAdapter } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task } from "@/lib/types";

export class BaseAdapter implements PlatformAdapter {
  getTaskSchema() {
    return z.object({
      useSpecificBrowser: z.enum(["chrome", "firefox", "edge"]).optional(),
    });
  }

  getDefaultValues() {
    return {
      useSpecificBrowser: "chrome" as const,
    };
  }

  async executeTask(task: Task): Promise<void> {
    console.log("Executing basic task with ID:", task.id);
    // Default execution logic would be moved here from TaskExecutionService
  }

  getFormFields(form: any) {
    return (
      <FormField
        control={form.control}
        name="websiteParams.useSpecificBrowser"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Preferred Browser</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select browser" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value="chrome">Chrome</SelectItem>
                <SelectItem value="firefox">Firefox</SelectItem>
                <SelectItem value="edge">Edge</SelectItem>
              </SelectContent>
            </Select>
            <FormDescription>
              Browser to use for this task
            </FormDescription>
          </FormItem>
        )}
      />
    );
  }
}
