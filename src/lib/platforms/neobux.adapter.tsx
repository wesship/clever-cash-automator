
import React from "react";
import { z } from "zod";
import { PlatformAdapter } from "./types";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Task } from "@/lib/types";

// Define the specific neobuxAdTypes as a constant to be reused
export const neobuxAdTypeEnum = z.enum(["standard", "micro", "fixed", "adprize"]);
export type NeobuxAdType = z.infer<typeof neobuxAdTypeEnum>;

export class NeobuxAdapter implements PlatformAdapter {
  getTaskSchema() {
    return z.object({
      neobuxMembershipType: z.enum(["standard", "golden", "ultimate", "pioneer"]).optional(),
      neobuxAdTypes: z.array(neobuxAdTypeEnum).optional(),
      neobuxClickDelay: z.coerce.number().min(3).max(30).optional(),
      neobuxAutoRecycle: z.boolean().default(false).optional(),
    });
  }

  getDefaultValues() {
    return {
      neobuxMembershipType: "standard" as const,
      neobuxAdTypes: ["standard", "micro"] as NeobuxAdType[],
      neobuxClickDelay: 7,
      neobuxAutoRecycle: true
    };
  }

  async executeTask(task: Task): Promise<void> {
    console.log("Executing Neobux task with ID:", task.id);
    // The actual execution logic would be moved here from TaskExecutionService
  }

  getFormFields(form: any) {
    const adTypeOptions = [
      { id: "standard", label: "Standard Ads" },
      { id: "micro", label: "Micro Ads" },
      { id: "fixed", label: "Fixed Ads" },
      { id: "adprize", label: "AdPrize" },
    ];

    return (
      <>
        <FormField
          control={form.control}
          name="websiteParams.neobuxMembershipType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || "standard"}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select membership type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="golden">Golden</SelectItem>
                  <SelectItem value="ultimate">Ultimate</SelectItem>
                  <SelectItem value="pioneer">Pioneer</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Your Neobux membership level
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.neobuxClickDelay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Click Delay (seconds)</FormLabel>
              <FormControl>
                <Input 
                  type="number" 
                  min="3" 
                  max="30" 
                  {...field} 
                  onChange={e => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                Time to wait between clicks (3-30 seconds)
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="websiteParams.neobuxAutoRecycle"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Auto-recycle ads</FormLabel>
                <FormDescription>
                  Automatically recycle ads when available
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <div className="space-y-3">
          <FormLabel>Ad Types to Click</FormLabel>
          <FormDescription>
            Select which ad types to include
          </FormDescription>
          <div className="grid grid-cols-2 gap-2">
            {adTypeOptions.map((option) => (
              <FormField
                key={option.id}
                control={form.control}
                name="websiteParams.neobuxAdTypes"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={option.id}
                      className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-3"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(option.id)}
                          onCheckedChange={(checked) => {
                            const currentValue = field.value || [];
                            return checked
                              ? field.onChange([...currentValue, option.id])
                              : field.onChange(
                                  currentValue.filter(
                                    (value) => value !== option.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}
