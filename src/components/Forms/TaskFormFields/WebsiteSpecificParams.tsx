import React, { useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { PlatformType } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";

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
    } else if (platform === PlatformType.NEOBUX) {
      // Set default values for Neobux if not already set
      if (!form.getValues('websiteParams.neobuxMembershipType')) {
        form.setValue('websiteParams.neobuxMembershipType', 'standard');
      }
      if (!form.getValues('websiteParams.neobuxAdTypes')) {
        form.setValue('websiteParams.neobuxAdTypes', ['standard', 'micro']);
      }
      if (!form.getValues('websiteParams.neobuxClickDelay')) {
        form.setValue('websiteParams.neobuxClickDelay', 7);
      }
      if (form.getValues('websiteParams.neobuxAutoRecycle') === undefined) {
        form.setValue('websiteParams.neobuxAutoRecycle', true);
      }
    }
  }, [platform, form]);

  // If no platform selected or if it's not a platform with specific params
  if (!platform || platform === PlatformType.CUSTOM) {
    return null;
  }

  const adTypeOptions = [
    { id: "standard", label: "Standard Ads" },
    { id: "micro", label: "Micro Ads" },
    { id: "fixed", label: "Fixed Ads" },
    { id: "adprize", label: "AdPrize" },
  ];

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

        {platform === PlatformType.NEOBUX && (
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
        )}

        {platform === PlatformType.AMAZON_MECHANICAL_TURK && (
          <p className="text-sm text-muted-foreground">
            Amazon MTurk specific parameters will be shown here
          </p>
        )}

        {/* Add more platform-specific fields as needed */}
        
        {!([PlatformType.CLICKWORKER, PlatformType.AMAZON_MECHANICAL_TURK, PlatformType.NEOBUX].includes(platform as PlatformType)) && (
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
