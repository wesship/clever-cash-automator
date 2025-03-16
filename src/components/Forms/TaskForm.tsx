
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { TaskType, PlatformType } from "@/lib/types";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Task name must be at least 3 characters.",
  }),
  type: z.string({
    required_error: "Please select a task type.",
  }),
  platform: z.string({
    required_error: "Please select a platform.",
  }),
  description: z.string().optional(),
  targetCompletions: z.coerce.number().min(1, {
    message: "Target must be at least 1.",
  }),
  proxyRequired: z.boolean().default(false),
  captchaHandling: z.boolean().default(false),
  maxRuns: z.coerce.number().min(1, {
    message: "Max runs must be at least 1.",
  }),
  frequency: z.enum(["hourly", "daily", "weekly"], {
    required_error: "Please select a frequency.",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface TaskFormProps {
  onSubmit: (data: FormData) => void;
  onCancel: () => void;
  defaultValues?: Partial<FormData>;
  className?: string;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onCancel,
  defaultValues,
  className
}) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      platform: "",
      description: "",
      targetCompletions: 10,
      proxyRequired: false,
      captchaHandling: false,
      maxRuns: 5,
      frequency: "daily",
      ...defaultValues,
    },
  });

  const handleSubmit = (data: FormData) => {
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
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe the purpose and details of this task"
                      className="min-h-24 resize-none" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="frequency"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Frequency</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select frequency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="maxRuns"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Max Runs Per Day</FormLabel>
                    <FormControl>
                      <Input type="number" min={1} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="proxyRequired"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Proxy Required</FormLabel>
                        <FormDescription className="text-xs">
                          Use proxy servers for this task
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="captchaHandling"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between space-y-0 rounded-md border p-3">
                      <div className="space-y-0.5">
                        <FormLabel>Captcha Handling</FormLabel>
                        <FormDescription className="text-xs">
                          Enable automatic captcha solving
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
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
