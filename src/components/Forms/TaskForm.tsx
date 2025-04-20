
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicInfoFields, DescriptionField, SchedulingFields, AdvancedOptions, TagsField, DependenciesField } from "./TaskFormFields";
import WebsiteSpecificParams from "./TaskFormFields/WebsiteSpecificParams";
import { taskFormSchema, TaskFormData, defaultTaskFormValues } from "./TaskFormSchema";
import { useTaskTemplates } from "@/hooks/use-task-templates";
import { Task, TaskStatus, TaskSchedule } from "@/lib/types";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<TaskFormData>;
  className?: string;
  existingTasks?: Task[];
  customTaskTypes?: string[];
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
  className,
  existingTasks = [],
  customTaskTypes = []
}) => {
  const [searchParams] = useSearchParams();
  const { getTemplateById } = useTaskTemplates();
  const templateId = searchParams.get('templateId');
  
  // Initialize form with default values and schema validation
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      ...defaultTaskFormValues,
      ...(defaultValues || {}),
    },
  });

  const [selectedPlatform, setSelectedPlatform] = useState<string>(defaultValues?.platform || "");

  // Watch for platform changes
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'platform') {
        setSelectedPlatform(value.platform || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);
  
  // Load template data if templateId is provided
  useEffect(() => {
    if (templateId) {
      const template = getTemplateById(templateId);
      if (template) {
        // Reset form with template values
        form.reset({
          ...defaultTaskFormValues,
          name: template.name,
          description: template.description,
          type: template.type,
          platform: template.platform,
          taskTags: template.tags,
          ...(template.config || {}),
          templateId // Store the template ID
        });
        
        setSelectedPlatform(template.platform);
        toast.info(`Loaded template: ${template.name}`);
      }
    }
  }, [templateId, getTemplateById, form]);

  const handleSubmit = (data: TaskFormData) => {
    // Convert form data to task schedule format
    const schedule: TaskSchedule = {
      frequency: data.frequency,
      timeOfDay: data.timeOfDay,
      maxRuns: data.maxRuns,
    };
    
    if (data.startDate) {
      schedule.startDate = data.startDate;
    }
    
    if (data.endDate) {
      schedule.endDate = data.endDate;
    }
    
    if (data.daysOfWeek) {
      schedule.daysOfWeek = data.daysOfWeek;
    }
    
    if (data.daysOfMonth) {
      schedule.daysOfMonth = data.daysOfMonth;
    }
    
    if (data.recurrencePattern) {
      schedule.recurrencePattern = data.recurrencePattern;
    }
    
    if (data.repeatEvery) {
      schedule.repeatEvery = data.repeatEvery;
    }
    
    if (data.recurrenceEndType === "after" && data.recurrenceEndAfter) {
      schedule.recurrenceEndAfter = data.recurrenceEndAfter;
    }
    
    if (data.customCron) {
      schedule.customCron = data.customCron;
    }
    
    // Submit both the original form data and the processed schedule
    const enhancedData = {
      ...data,
      scheduleConfig: schedule
    };
    
    onSubmit(enhancedData);
    toast.success("Task created successfully");
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Create Task</CardTitle>
        <CardDescription>Configure a new automated task</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <BasicInfoFields form={form} customTaskTypes={customTaskTypes} />
            <DescriptionField form={form} />
            
            <TagsField form={form} />
            
            {selectedPlatform && (
              <WebsiteSpecificParams form={form} platform={selectedPlatform} />
            )}
            
            <div className="border border-border/50 rounded-lg p-4">
              <SchedulingFields form={form} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              <AdvancedOptions form={form} />
            </div>
            
            {existingTasks.length > 0 && (
              <div className="border border-border/50 rounded-lg p-4">
                <h3 className="text-sm font-medium mb-3">Task Dependencies</h3>
                <DependenciesField form={form} allTasks={existingTasks} />
              </div>
            )}
            
            <CardFooter className="flex justify-between px-0 pb-0">
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit">Create Task</Button>
            </CardFooter>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default TaskForm;
