
import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PlatformType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface WebsiteSpecificParamsProps {
  form: UseFormReturn<any>;
  platform: string;
}

const WebsiteSpecificParams: React.FC<WebsiteSpecificParamsProps> = ({ form, platform }) => {
  // If platform changes, we update the relevant website params
  useEffect(() => {
    if (platform === PlatformType.CLICKWORKER) {
      // Set default values for Clickworker if not already set
      if (!form.getValues('websiteParams.clickworkerQualificationLevel')) {
        form.setValue('websiteParams.clickworkerQualificationLevel', 'intermediate');
      }
    }
  }, [platform, form]);

  // If no platform selected or if it's not a platform with specific params
  if (!platform || platform === PlatformType.CUSTOM) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Platform-Specific Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platform === PlatformType.CLICKWORKER && (
          <>
            <FormField
              control={form.control}
              name="websiteParams.clickworkerQualificationLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Qualification Level</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select qualification level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner</SelectItem>
                      <SelectItem value="intermediate">Intermediate</SelectItem>
                      <SelectItem value="expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Required qualification level for tasks
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="websiteParams.taskMinimumPayment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Minimum Payment ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" min="0" {...field} />
                  </FormControl>
                  <FormDescription>
                    Only select tasks with at least this payment
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="websiteParams.taskMaxDuration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Maximum Duration (minutes)</FormLabel>
                  <FormControl>
                    <Input type="number" min="1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Maximum time to spend on each task
                  </FormDescription>
                </FormItem>
              )}
            />
          </>
        )}

        {platform === PlatformType.AMAZON_MECHANICAL_TURK && (
          <p className="text-sm text-muted-foreground">
            Amazon MTurk specific parameters will be shown here
          </p>
        )}

        {/* Add more platform-specific fields as needed */}
        
        {!([PlatformType.CLICKWORKER, PlatformType.AMAZON_MECHANICAL_TURK].includes(platform as PlatformType)) && (
          <p className="text-sm text-muted-foreground">
            No specific parameters available for this platform yet
          </p>
        )}

        <FormField
          control={form.control}
          name="websiteParams.useSpecificBrowser"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Browser</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select browser" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="chrome">Chrome</SelectItem>
                  <SelectItem value="firefox">Firefox</SelectItem>
                  <SelectItem value="edge">Edge</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Browser to use for this task
              </FormDescription>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
};

export default WebsiteSpecificParams;
