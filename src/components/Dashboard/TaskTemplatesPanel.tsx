
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import TaskTemplateCard, { TaskTemplate } from "./TaskTemplate";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TaskType, PlatformType } from "@/lib/types";
import { toast } from "sonner";

interface TaskTemplatesPanelProps {
  templates: TaskTemplate[];
  onUseTemplate: (template: TaskTemplate) => void;
  onCreateTemplate?: (template: TaskTemplate) => void;
  onEditTemplate?: (template: TaskTemplate) => void;
  onDeleteTemplate?: (templateId: string) => void;
  className?: string;
}

const TaskTemplatesPanel: React.FC<TaskTemplatesPanelProps> = ({
  templates,
  onUseTemplate,
  onCreateTemplate,
  onEditTemplate,
  onDeleteTemplate,
  className
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<TaskTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    type: TaskType.VIDEO_WATCH,
    platform: PlatformType.YOUTUBE,
    tags: ""
  });
  
  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      type: TaskType.VIDEO_WATCH,
      platform: PlatformType.YOUTUBE,
      tags: ""
    });
    setEditingTemplate(null);
  };
  
  const openEditDialog = (template: TaskTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      description: template.description || "",
      type: template.type,
      platform: template.platform,
      tags: template.tags?.join(", ") || ""
    });
    setDialogOpen(true);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const tagsList = formData.tags
      ? formData.tags.split(",").map(tag => tag.trim()).filter(Boolean)
      : [];
      
    if (editingTemplate) {
      // Edit existing template
      if (onEditTemplate) {
        onEditTemplate({
          ...editingTemplate,
          name: formData.name,
          description: formData.description,
          type: formData.type,
          platform: formData.platform,
          tags: tagsList
        });
      }
      toast.success("Template updated successfully");
    } else {
      // Create new template
      if (onCreateTemplate) {
        onCreateTemplate({
          id: `template-${Date.now()}`,
          name: formData.name,
          description: formData.description,
          type: formData.type,
          platform: formData.platform,
          tags: tagsList,
          createdAt: new Date(),
          config: {}
        });
      }
      toast.success("Template created successfully");
    }
    
    resetForm();
    setDialogOpen(false);
  };

  return (
    <Card className={`bg-card/50 backdrop-blur-sm border border-border/50 ${className}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Task Templates</CardTitle>
          {onCreateTemplate && (
            <Dialog open={dialogOpen} onOpenChange={(open) => {
              setDialogOpen(open);
              if (!open) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1">
                  <PlusCircle className="h-4 w-4" />
                  Create Template
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingTemplate ? "Edit Template" : "Create New Template"}
                  </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4 py-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Template Name</Label>
                    <Input 
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea 
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type">Task Type</Label>
                      <Select 
                        value={formData.type}
                        onValueChange={(value) => setFormData({...formData, type: value as TaskType})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={TaskType.AD_CLICK}>Ad Click</SelectItem>
                          <SelectItem value={TaskType.SURVEY}>Survey</SelectItem>
                          <SelectItem value={TaskType.VIDEO_WATCH}>Video Watch</SelectItem>
                          <SelectItem value={TaskType.CONTENT_CREATION}>Content Creation</SelectItem>
                          <SelectItem value={TaskType.AFFILIATE}>Affiliate</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="platform">Platform</Label>
                      <Select 
                        value={formData.platform}
                        onValueChange={(value) => setFormData({...formData, platform: value as PlatformType})}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select Platform" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={PlatformType.SWAGBUCKS}>Swagbucks</SelectItem>
                          <SelectItem value={PlatformType.YOUTUBE}>YouTube</SelectItem>
                          <SelectItem value={PlatformType.AMAZON_MECHANICAL_TURK}>MTurk</SelectItem>
                          <SelectItem value={PlatformType.CLICKWORKER}>Clickworker</SelectItem>
                          <SelectItem value={PlatformType.FIVERR}>Fiverr</SelectItem>
                          <SelectItem value={PlatformType.UPWORK}>Upwork</SelectItem>
                          <SelectItem value={PlatformType.NEOBUX}>NeoBux</SelectItem>
                          <SelectItem value={PlatformType.CUSTOM}>Custom</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags (comma separated)</Label>
                    <Input 
                      id="tags"
                      value={formData.tags}
                      onChange={(e) => setFormData({...formData, tags: e.target.value})}
                      placeholder="e.g. quick, high-paying, reliable"
                    />
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-2">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => {
                        resetForm();
                        setDialogOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">
                      {editingTemplate ? "Update Template" : "Create Template"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[200px] text-center">
            <p className="text-muted-foreground">No templates found</p>
            <p className="text-sm text-muted-foreground mb-4">
              Save task configurations as templates to reuse them later
            </p>
            {onCreateTemplate && (
              <Button
                variant="outline"
                size="sm"
                className="gap-1"
                onClick={() => setDialogOpen(true)}
              >
                <PlusCircle className="h-4 w-4" />
                Create First Template
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {templates.map((template) => (
                <TaskTemplateCard
                  key={template.id}
                  template={template}
                  onUseTemplate={onUseTemplate}
                  onEditTemplate={onEditTemplate ? openEditDialog : undefined}
                  onDeleteTemplate={onDeleteTemplate}
                />
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskTemplatesPanel;
