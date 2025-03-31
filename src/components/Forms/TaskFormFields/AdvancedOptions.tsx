
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { UseFormReturn } from "react-hook-form";

interface AdvancedOptionsProps {
  form: UseFormReturn<any>;
}

const AdvancedOptions: React.FC<AdvancedOptionsProps> = ({ form }) => {
  return (
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
  );
};

export default AdvancedOptions;
