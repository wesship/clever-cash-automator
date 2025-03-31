
// Fix for the ZodObject typing issue
// This is likely just a partial snippet of the file, but we're focusing on fixing the type error

import { z } from "zod";
import { TaskType, PlatformType } from "@/lib/types";
import { PlatformRegistry } from "@/lib/platforms/types";

export const taskFormSchema = z.object({
  name: z.string().min(3, {
    message: "Task name must be at least 3 characters.",
  }),
  type: z.nativeEnum(TaskType),
  platform: z.nativeEnum(PlatformType),
  targetCompletions: z.number().min(1, {
    message: "Target completions must be at least 1.",
  }).default(1),
  description: z.string().optional(),
  proxyRequired: z.boolean().default(false),
  captchaHandling: z.boolean().default(false),
  frequency: z.enum(['hourly', 'daily', 'weekly']).default('daily'),
  maxRuns: z.number().min(1).default(5),
  websiteParams: z.record(z.any()).optional()
});

export function getWebsiteParamsSchema(platform: PlatformType | string): z.ZodObject<any> {
  if (!platform) {
    return z.object({ useSpecificBrowser: z.enum(["chrome", "firefox", "edge"]).optional() });
  }

  const platformType = platform as PlatformType;
  const adapter = PlatformRegistry.getAdapter(platformType);
  
  if (adapter) {
    // Use the adapter's schema directly without extending it
    return adapter.getTaskSchema();
  }
  
  // Default schema if no adapter is found
  return z.object({ useSpecificBrowser: z.enum(["chrome", "firefox", "edge"]).optional() });
}

export type TaskFormValues = z.infer<typeof taskFormSchema>;

// Export these explicitly for TaskForm.tsx
export type TaskFormData = TaskFormValues;
export const defaultTaskFormValues: TaskFormValues = {
  name: "",
  type: TaskType.AD_CLICK,
  platform: PlatformType.NEOBUX,
  targetCompletions: 1,
  description: "",
  proxyRequired: false,
  captchaHandling: false,
  frequency: 'daily',
  maxRuns: 5,
  websiteParams: {}
};
