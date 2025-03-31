
import { z } from "zod";
import { TaskType, PlatformType } from "@/lib/types";

export const taskFormSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().optional(),
  type: z.nativeEnum(TaskType),
  platform: z.nativeEnum(PlatformType),
  targetCompletions: z.coerce.number().int().min(1, "Must be at least 1"),
  proxyRequired: z.boolean().default(false),
  captchaHandling: z.boolean().default(false),
  frequency: z.enum(["hourly", "daily", "weekly"]),
  maxRuns: z.coerce.number().int().min(1, "Must be at least 1"),
  timeOfDay: z.string().optional(),
  daysOfWeek: z.array(z.number()).optional(),
  websiteParams: z.record(z.string(), z.any()).optional(),
  taskTags: z.array(z.string()).default([]),
  dependencies: z.array(
    z.object({
      taskId: z.string(),
      condition: z.enum(["completed", "failed", "any"])
    })
  ).default([]),
  notifyOnCompletion: z.boolean().default(true),
  notifyOnFailure: z.boolean().default(true),
  priority: z.enum(["low", "normal", "high"]).default("normal"),
  templateId: z.string().optional(),
  retryStrategy: z.object({
    maxRetries: z.number().int().min(0),
    delayBetweenRetries: z.number().int().min(0)
  }).optional()
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

export const defaultTaskFormValues: TaskFormData = {
  name: "",
  description: "",
  type: TaskType.VIDEO_WATCH,
  platform: PlatformType.YOUTUBE,
  targetCompletions: 10,
  proxyRequired: false,
  captchaHandling: false,
  frequency: "daily",
  maxRuns: 5,
  taskTags: [],
  dependencies: [],
  notifyOnCompletion: true,
  notifyOnFailure: true,
  priority: "normal"
};
