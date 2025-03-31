
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BasicInfoFields, DescriptionField, SchedulingFields, AdvancedOptions } from "./TaskFormFields";
import WebsiteSpecificParams from "./TaskFormFields/WebsiteSpecificParams";
import { taskFormSchema, TaskFormData, defaultTaskFormValues } from "./TaskFormSchema";

interface TaskFormProps {
  onSubmit: (data: TaskFormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<TaskFormData>;
  className?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
  className
}) => {
  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      ...defaultTaskFormValues,
      ...defaultValues,
    },
  });

  const [selectedPlatform, setSelectedPlatform] = useState<string>(defaultValues?.platform || "");

  // Watch for platform changes
  React.useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === 'platform') {
        setSelectedPlatform(value.platform || "");
      }
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const handleSubmit = (data: TaskFormData) => {
    onSubmit(data);
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
            <BasicInfoFields form={form} />
            <DescriptionField form={form} />
            
            {selectedPlatform && (
              <WebsiteSpecificParams form={form} platform={selectedPlatform} />
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <SchedulingFields form={form} />
              <AdvancedOptions form={form} />
            </div>
            
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
