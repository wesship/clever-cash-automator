
import React from "react";
import { z } from "zod";
import { PlatformAdapter } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Task } from "@/lib/types";
import { Slider } from "@/components/ui/slider";

export class MTurkAdapter implements PlatformAdapter {
  getTaskSchema() {
    return z.object({
      mturkMinReward: z.coerce.number().min(0).optional(),
      mturkMinRequesterRating: z.coerce.number().min(1).max(5).optional(),
      mturkQualificationRequired: z.boolean().default(false).optional(),
      mturkTaskType: z.enum(["survey", "transcription", "categorization", "data_collection"]).optional(),
      mturkMaxTaskDuration: z.coerce.number().min(1).optional(),
    });
  }

  getDefaultValues() {
    return {
      mturkMinReward: 0.25,
      mturkMinRequesterRating: 3.5,
      mturkQualificationRequired: false,
      mturkTaskType: "survey" as const,
      mturkMaxTaskDuration: 20,
    };
  }

  async executeTask(task: Task): Promise<void> {
    console.log("Executing Amazon Mechanical Turk task with ID:", task.id);
    
    // Get task-specific parameters
    const browserType = task.config.taskSpecific?.useSpecificBrowser || "chrome";
    const minReward = task.config.taskSpecific?.mturkMinReward || 0.25;
    const minRating = task.config.taskSpecific?.mturkMinRequesterRating || 3.5;
    const taskType = task.config.taskSpecific?.mturkTaskType || "survey";
    const maxDuration = task.config.taskSpecific?.mturkMaxTaskDuration || 20;
    
    // Log execution details
    console.log(`Using browser: ${browserType}`);
    console.log(`Filtering for tasks with minimum reward: $${minReward}`);
    console.log(`Minimum requester rating: ${minRating}`);
    console.log(`Task type: ${taskType}`);
    console.log(`Maximum task duration: ${maxDuration} minutes`);

    // Simulate the task execution process
    console.log("Simulating MTurk task execution");
    console.log("Logging in to MTurk account");
    console.log(`Filtering HITs by task type: ${taskType}`);
    console.log(`Filtering HITs by minimum reward: $${minReward}`);
    console.log(`Filtering HITs by requester rating: ${minRating}+`);
    
    // Simulate searching for tasks
    await this.delay(2000);
    console.log("Searching for available HITs...");
    
    // Simulate finding tasks
    const tasksFound = Math.floor(Math.random() * 5) + 1;
    console.log(`Found ${tasksFound} eligible HITs`);
    
    // Simulate completing tasks
    const tasksCompleted = Math.floor(Math.random() * tasksFound) + 1;
    const totalEarnings = (tasksCompleted * (minReward + Math.random())).toFixed(2);
    
    await this.delay(3000);
    console.log(`Completed ${tasksCompleted} HITs for a total of $${totalEarnings}`);
    
    // Final logging
    console.log("MTurk session complete");
  }

  // Helper method for creating delays
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getFormFields(form: any) {
    return (
      <>
        <FormField
          control={form.control}
          name="websiteParams.mturkMinReward"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Reward ($)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  step="0.01" 
                  min="0" 
                  {...field} 
                  onChange={e => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Only accept HITs with at least this reward
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.mturkTaskType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select task type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="survey">Surveys</SelectItem>
                  <SelectItem value="transcription">Transcription</SelectItem>
                  <SelectItem value="categorization">Categorization</SelectItem>
                  <SelectItem value="data_collection">Data Collection</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Type of HITs to look for
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.mturkMinRequesterRating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Minimum Requester Rating: {field.value}</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={5}
                  step={0.1}
                  defaultValue={[field.value]}
                  onValueChange={(values) => field.onChange(values[0])}
                />
              </FormControl>
              <FormDescription>
                Only accept HITs from requesters with this rating or higher
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.mturkMaxTaskDuration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Maximum Task Duration (minutes)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="1" 
                  {...field} 
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Maximum time to spend on each HIT
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.mturkQualificationRequired"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Require Qualifications</FormLabel>
                <FormDescription>
                  Only show HITs that require qualifications
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </>
    );
  }
}
