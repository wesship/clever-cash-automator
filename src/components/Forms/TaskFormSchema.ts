
import { z } from "zod";

// Define the specific neobuxAdTypes as a constant to be reused
const neobuxAdTypeEnum = z.enum(["standard", "micro", "fixed", "adprize"]);
export type NeobuxAdType = z.infer<typeof neobuxAdTypeEnum>;

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
  // Website-specific parameters
  websiteParams: z.object({
    clickworkerQualificationLevel: z.enum(["beginner", "intermediate", "expert"]).optional(),
    taskMinimumPayment: z.coerce.number().min(0).optional(),
    taskMaxDuration: z.coerce.number().min(1).optional(),
    useSpecificBrowser: z.enum(["chrome", "firefox", "edge"]).optional(),
    // Neobux specific parameters
    neobuxMembershipType: z.enum(["standard", "golden", "ultimate", "pioneer"]).optional(),
    neobuxAdTypes: z.array(neobuxAdTypeEnum).optional(),
    neobuxClickDelay: z.coerce.number().min(3).max(30).optional(),
    neobuxAutoRecycle: z.boolean().default(false).optional(),
  }).optional(),
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
  websiteParams: {
    clickworkerQualificationLevel: "intermediate" as const,
    taskMinimumPayment: 0.5,
    taskMaxDuration: 15,
    useSpecificBrowser: "chrome" as const,
    // Default Neobux parameters - ensure these match the enum type
    neobuxMembershipType: "standard" as const,
    neobuxAdTypes: ["standard", "micro"] as NeobuxAdType[],
    neobuxClickDelay: 7,
    neobuxAutoRecycle: true
  }
};
