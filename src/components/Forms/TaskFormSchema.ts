
import { z } from "zod";
import { getPlatformAdapter } from "@/lib/platforms";
import { PlatformType } from "@/lib/types";
import { neobuxAdTypeEnum, NeobuxAdType } from "@/lib/platforms";

// Create a base schema for website params
const baseWebsiteParamsSchema = z.object({
  useSpecificBrowser: z.enum(["chrome", "firefox", "edge"]).optional(),
});

// Dynamically build the website params schema by merging all adapter schemas
const buildWebsiteParamsSchema = () => {
  // Start with the base schema
  let mergedSchema = baseWebsiteParamsSchema;
  
  // Add all platform-specific schemas
  Object.values(PlatformType).forEach(platform => {
    const adapter = getPlatformAdapter(platform);
    if (adapter) {
      // Safely merge the schemas using extend instead of merge
      // This ensures type compatibility
      const adapterSchema = adapter.getTaskSchema();
      if (adapterSchema && adapterSchema instanceof z.ZodObject) {
        // Create a new merged schema
        mergedSchema = mergedSchema.extend(adapterSchema.shape);
      }
    }
  });
  
  return mergedSchema;
};

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
  // Website-specific parameters using the dynamic schema
  websiteParams: buildWebsiteParamsSchema().optional(),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

// Collect default values from all adapters
const collectDefaultWebsiteParams = () => {
  const defaultParams: Record<string, any> = {};
  
  // Base browser preference
  defaultParams.useSpecificBrowser = "chrome";
  
  // Add all platform-specific default values
  Object.values(PlatformType).forEach(platform => {
    const adapter = getPlatformAdapter(platform);
    if (adapter) {
      Object.assign(defaultParams, adapter.getDefaultValues());
    }
  });
  
  return defaultParams;
};

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
  websiteParams: collectDefaultWebsiteParams()
};
