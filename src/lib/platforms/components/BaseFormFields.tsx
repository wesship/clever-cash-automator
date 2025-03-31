
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormDescription } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const BaseFormFields = (form: any) => {
  return (
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
  );
};
