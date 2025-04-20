
import React from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { RecurrencePattern } from "@/lib/types";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface RecurrenceOptionsProps {
  form: UseFormReturn<any>;
  frequency: string;
}

const RecurrenceOptions: React.FC<RecurrenceOptionsProps> = ({ form, frequency }) => {
  const recurrencePattern = form.watch("recurrencePattern");
  const endTypeValue = form.watch("recurrenceEndType") || "never";
  
  const handleEndTypeChange = (value: string) => {
    form.setValue("recurrenceEndType", value);
    if (value === "never") {
      form.setValue("recurrenceEndAfter", undefined);
      form.setValue("recurrenceEndDate", undefined);
    }
  };

  if (frequency === "hourly") {
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="repeatEvery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat every</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input type="number" min={1} {...field} className="w-20" />
                </FormControl>
                <span>hour(s)</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  if (frequency === "daily") {
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="repeatEvery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat every</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input type="number" min={1} {...field} className="w-20" />
                </FormControl>
                <span>day(s)</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  if (frequency === "weekly") {
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="repeatEvery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat every</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input type="number" min={1} {...field} className="w-20" />
                </FormControl>
                <span>week(s)</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="daysOfWeek"
          render={() => (
            <FormItem>
              <FormLabel>On these days</FormLabel>
              <div className="grid grid-cols-7 gap-2 mt-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                  <FormField
                    key={day}
                    control={form.control}
                    name="daysOfWeek"
                    render={({ field }) => {
                      const isSelected = field.value?.includes(index);
                      return (
                        <FormItem className="flex flex-col items-center space-y-1">
                          <FormControl>
                            <Checkbox
                              checked={isSelected}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  const newValue = [...(field.value || []), index];
                                  field.onChange(newValue);
                                } else {
                                  const newValue = field.value?.filter((day: number) => day !== index);
                                  field.onChange(newValue);
                                }
                              }}
                            />
                          </FormControl>
                          <span className="text-xs">{day}</span>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  }

  if (frequency === "monthly") {
    return (
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="repeatEvery"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repeat every</FormLabel>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input type="number" min={1} {...field} className="w-20" />
                </FormControl>
                <span>month(s)</span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="recurrencePattern"
          render={({ field }) => (
            <FormItem>
              <FormLabel>On</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pattern" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={RecurrencePattern.DAILY}>Day of month</SelectItem>
                  <SelectItem value={RecurrencePattern.WEEKLY}>Day of week</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {recurrencePattern === RecurrencePattern.DAILY && (
          <FormField
            control={form.control}
            name="daysOfMonth"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Day of month</FormLabel>
                <Select onValueChange={(value) => field.onChange([parseInt(value)])}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        
        {recurrencePattern === RecurrencePattern.WEEKLY && (
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="weekOfMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Week of month</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select week" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="1">First</SelectItem>
                      <SelectItem value="2">Second</SelectItem>
                      <SelectItem value="3">Third</SelectItem>
                      <SelectItem value="4">Fourth</SelectItem>
                      <SelectItem value="last">Last</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="dayOfWeek"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Day of week</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select day" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Sunday</SelectItem>
                      <SelectItem value="1">Monday</SelectItem>
                      <SelectItem value="2">Tuesday</SelectItem>
                      <SelectItem value="3">Wednesday</SelectItem>
                      <SelectItem value="4">Thursday</SelectItem>
                      <SelectItem value="5">Friday</SelectItem>
                      <SelectItem value="6">Saturday</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
      </div>
    );
  }

  if (frequency === "custom") {
    return (
      <FormField
        control={form.control}
        name="customCron"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Custom schedule (cron expression)</FormLabel>
            <FormControl>
              <Input placeholder="* * * * *" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-muted-foreground">Select a frequency to see recurrence options.</div>
      
      <div className="mt-4">
        <FormLabel>End</FormLabel>
        <RadioGroup value={endTypeValue} onValueChange={handleEndTypeChange} className="mt-2">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="never" id="never" />
            <Label htmlFor="never">Never</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="after" id="after" />
            <Label htmlFor="after">After</Label>
            {endTypeValue === "after" && (
              <FormField
                control={form.control}
                name="recurrenceEndAfter"
                render={({ field }) => (
                  <FormItem className="ml-2">
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        {...field}
                        className="w-16 h-8"
                        placeholder="10"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            <span className="text-sm">occurrences</span>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
};

export default RecurrenceOptions;
