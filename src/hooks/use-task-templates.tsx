
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from '@/hooks/use-local-storage';
import { TaskType, PlatformType } from '@/lib/types';
import { toast } from 'sonner';

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

export const useTaskTemplates = () => {
  const [templates, setTemplates] = useLocalStorage<TaskTemplate[]>('task-templates', []);
  const [filteredTemplates, setFilteredTemplates] = useState<TaskTemplate[]>([]);
  const [filter, setFilter] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [tagFilter, setTagFilter] = useState<string>('');

  // Create a template
  const createTemplate = useCallback((template: TaskTemplate) => {
    setTemplates(prev => [
      {
        ...template,
        id: `template-${Date.now()}`,
        createdAt: new Date()
      },
      ...prev
    ]);
    toast.success(`Template "${template.name}" created successfully`);
    return template;
  }, [setTemplates]);

  // Update a template
  const updateTemplate = useCallback((template: TaskTemplate) => {
    setTemplates(prev => 
      prev.map(t => t.id === template.id ? template : t)
    );
    toast.success(`Template "${template.name}" updated successfully`);
    return template;
  }, [setTemplates]);

  // Delete a template
  const deleteTemplate = useCallback((templateId: string) => {
    setTemplates(prev => prev.filter(t => t.id !== templateId));
    toast.success("Template deleted successfully");
    return true;
  }, [setTemplates]);

  // Get a template by ID
  const getTemplateById = useCallback((templateId: string) => {
    return templates.find(t => t.id === templateId);
  }, [templates]);
  
  // Get popular tags across all templates
  const getPopularTags = useCallback(() => {
    const tagCounts: Record<string, number> = {};
    templates.forEach(template => {
      (template.tags || []).forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .map(([tag]) => tag);
  }, [templates]);

  // Apply filters
  useEffect(() => {
    let filtered = [...templates];
    
    if (filter) {
      const lowercaseFilter = filter.toLowerCase();
      filtered = filtered.filter(template => 
        template.name.toLowerCase().includes(lowercaseFilter) || 
        template.description.toLowerCase().includes(lowercaseFilter)
      );
    }
    
    if (platformFilter) {
      filtered = filtered.filter(template => template.platform === platformFilter);
    }
    
    if (typeFilter) {
      filtered = filtered.filter(template => template.type === typeFilter);
    }
    
    if (tagFilter) {
      filtered = filtered.filter(template => 
        (template.tags || []).some(tag => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    }
    
    setFilteredTemplates(filtered);
  }, [templates, filter, platformFilter, typeFilter, tagFilter]);

  return {
    templates: filteredTemplates,
    allTemplates: templates,
    filter,
    setFilter,
    platformFilter,
    setPlatformFilter,
    typeFilter,
    setTypeFilter,
    tagFilter,
    setTagFilter,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateById,
    getPopularTags
  };
};

export default useTaskTemplates;
