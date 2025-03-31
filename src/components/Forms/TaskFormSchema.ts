
import { z } from "zod";

export const taskFormSchema = z.object({
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

export type TaskFormData = z.infer<typeof taskFormSchema>;

export const defaultTaskFormValues = {
  name: "",
  type: "",
  platform: "",
  description: "",
  targetCompletions: 10,
  proxyRequired: false,
  captchaHandling: false,
  maxRuns: 5,
  frequency: "daily" as const,
};
