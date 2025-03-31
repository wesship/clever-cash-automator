
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Calendar, Tag as TagIcon, Copy, Trash2, Pencil } from "lucide-react";
import { Task, TaskType, PlatformType, TaskStatus } from "@/lib/types";

export interface TaskTemplate {
  id: string;
  name: string;
  description: string;
  type: TaskType;
  platform: PlatformType;
  tags: string[];
  createdAt: Date;
  config: any;
}

interface TaskTemplateCardProps {
  template: TaskTemplate;
  onUseTemplate: (template: TaskTemplate) => void;
  onEditTemplate?: (template: TaskTemplate) => void;
  onDeleteTemplate?: (templateId: string) => void;
  className?: string;
}

const TaskTemplateCard: React.FC<TaskTemplateCardProps> = ({
  template,
  onUseTemplate,
  onEditTemplate,
  onDeleteTemplate,
  className
}) => {
  const handleCopy = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(JSON.stringify(template, null, 2));
    toast.success("Template configuration copied to clipboard");
  };
  
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDeleteTemplate) {
      onDeleteTemplate(template.id);
    }
  };
  
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEditTemplate) {
      onEditTemplate(template);
    }
  };

  return (
    <Card 
      className={`bg-card/50 backdrop-blur-sm border border-border/50 hover:border-border transition-all cursor-pointer ${className}`}
      onClick={() => onUseTemplate(template)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{template.name}</CardTitle>
          <div className="flex gap-1">
            {onEditTemplate && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0"
                onClick={handleEdit}
              >
                <Pencil className="h-3.5 w-3.5" />
                <span className="sr-only">Edit</span>
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 w-7 p-0"
              onClick={handleCopy}
            >
              <Copy className="h-3.5 w-3.5" />
              <span className="sr-only">Copy</span>
            </Button>
            {onDeleteTemplate && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0 text-destructive hover:text-destructive/80"
                onClick={handleDelete}
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span className="sr-only">Delete</span>
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="capitalize">
              {template.type.replace(/_/g, ' ')}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {template.platform.replace(/_/g, ' ')}
            </Badge>
          </div>
          
          <p className="text-xs text-muted-foreground line-clamp-2">
            {template.description || "No description provided"}
          </p>
          
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>{template.createdAt.toLocaleDateString()}</span>
            </div>
          </div>
          
          {template.tags && template.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-2">
              {template.tags.slice(0, 3).map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs py-0 px-2">
                  <TagIcon className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {template.tags.length > 3 && (
                <Badge variant="secondary" className="text-xs py-0 px-2">
                  +{template.tags.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TaskTemplateCard;
