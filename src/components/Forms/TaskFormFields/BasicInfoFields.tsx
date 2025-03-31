
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskType, PlatformType } from "@/lib/types";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoFieldsProps {
  form: UseFormReturn<any>;
}

const BasicInfoFields: React.FC<BasicInfoFieldsProps> = ({ form }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter a descriptive name" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="type"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Task Type</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a task type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={TaskType.AD_CLICK}>Ad Click</SelectItem>
                <SelectItem value={TaskType.SURVEY}>Survey</SelectItem>
                <SelectItem value={TaskType.VIDEO_WATCH}>Video Watch</SelectItem>
                <SelectItem value={TaskType.CONTENT_CREATION}>Content Creation</SelectItem>
                <SelectItem value={TaskType.AFFILIATE}>Affiliate</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="platform"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Platform</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a platform" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <SelectItem value={PlatformType.SWAGBUCKS}>Swagbucks</SelectItem>
                <SelectItem value={PlatformType.AMAZON_MECHANICAL_TURK}>Amazon MTurk</SelectItem>
                <SelectItem value={PlatformType.UPWORK}>Upwork</SelectItem>
                <SelectItem value={PlatformType.FIVERR}>Fiverr</SelectItem>
                <SelectItem value={PlatformType.YOUTUBE}>YouTube</SelectItem>
                <SelectItem value={PlatformType.CUSTOM}>Custom</SelectItem>
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control}
        name="targetCompletions"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Target Completions</FormLabel>
            <FormControl>
              <Input type="number" min={1} {...field} />
            </FormControl>
            <FormDescription>
              Number of times to run this task
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoFields;
