
import React, { useState, useEffect } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useTaskTemplates } from "@/hooks/use-task-templates";

interface TagsFieldProps {
  form: UseFormReturn<any>;
}

const TagsField: React.FC<TagsFieldProps> = ({ form }) => {
  const [tagInput, setTagInput] = useState("");
  const { getPopularTags } = useTaskTemplates();
  const popularTags = getPopularTags().slice(0, 5);
  
  const existingTags = form.watch("taskTags") || [];
  
  const addTag = (tag: string) => {
    const trimmedTag = tag.trim();
    if (!trimmedTag) return;
    
    // Don't add duplicates
    if (existingTags.includes(trimmedTag)) return;
    
    const updatedTags = [...existingTags, trimmedTag];
    form.setValue("taskTags", updatedTags, { shouldValidate: true });
    setTagInput("");
  };
  
  const removeTag = (tagToRemove: string) => {
    const updatedTags = existingTags.filter(tag => tag !== tagToRemove);
    form.setValue("taskTags", updatedTags, { shouldValidate: true });
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    }
  };
  
  const handleAddPopularTag = (tag: string) => {
    addTag(tag);
  };

  return (
    <FormField
      control={form.control}
      name="taskTags"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Tags</FormLabel>
          <div className="space-y-2">
            <div className="flex gap-2">
              <FormControl>
                <Input
                  placeholder="Add a tag (press Enter or comma)"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1"
                />
              </FormControl>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => addTag(tagInput)}
                disabled={!tagInput.trim()}
              >
                Add
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2 min-h-8">
              {existingTags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="gap-1 px-2 py-1">
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 focus:outline-none"
                  >
                    <X className="h-3 w-3" />
                    <span className="sr-only">Remove {tag}</span>
                  </button>
                </Badge>
              ))}
            </div>
            
            {popularTags.length > 0 && (
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-1">Popular tags:</p>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Badge 
                      key={index} 
                      variant="outline" 
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleAddPopularTag(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};

export default TagsField;
