
import React from "react";
import { Statistics, Task, TaskStatus } from "@/lib/types";
import StatisticsPanel from "@/components/Dashboard/StatisticsPanel";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PanelRight, History, Calendar } from "lucide-react";
import Card3D from "@/components/ui/3d-card";
import { Separator } from "@/components/ui/separator";
import { FAQ } from "@/components/ui/onboarding";
import { TaskCardSkeleton } from "@/components/ui/skeleton-loader";
import TaskHistoryPanel from "./TaskHistoryPanel";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskTemplates, TaskTemplate } from "@/hooks/use-task-templates";
import TaskTemplatesPanel from "./TaskTemplatesPanel";

interface DashboardOverviewProps {
  statistics: Statistics;
  tasks: Task[];
  isLoading: boolean;
  onViewAllTasks: () => void;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  statistics,
  tasks,
  isLoading,
  onViewAllTasks
}) => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = React.useState<string>("recent");
  const { templates, createTemplate, updateTemplate, deleteTemplate } = useTaskTemplates();
  
  // Filter tasks based on status for history panel
  const completedOrFailedTasks = tasks.filter(
    task => task.status === TaskStatus.COMPLETED || task.status === TaskStatus.FAILED
  );
  
  // Handlers for templates
  const handleUseTemplate = (template: TaskTemplate) => {
    // Navigate to create task tab with template data
    navigate("/?tab=create&templateId=" + template.id);
  };
  
  const handleViewTask = (taskId: string) => {
    navigate(`/task/${taskId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <StatisticsPanel statistics={statistics} />
      
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-4">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="recent" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Recent Tasks
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Task History
            </TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewAllTasks}
            className="gap-1 bg-background/50 backdrop-blur-sm hover:bg-primary/20"
          >
            <PanelRight className="h-4 w-4" />
            View All
          </Button>
        </div>
        
        <TabsContent value="recent" className="mt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array.from({ length: 3 }).map((_, index) => (
                <TaskCardSkeleton key={index} className="w-full h-full" />
              ))
            ) : (
              tasks.slice(0, 3).map((task) => (
                <Card3D key={task.id} className="border border-border/40 bg-card/50 backdrop-blur-sm" hoverEffects glareEffect>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{task.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          task.status === TaskStatus.RUNNING ? 'bg-vibrant-green/10 text-vibrant-green' : 
                          task.status === TaskStatus.COMPLETED ? 'bg-vibrant-blue/10 text-vibrant-blue' :
                          task.status === TaskStatus.FAILED ? 'bg-destructive/10 text-destructive' :
                          task.status === TaskStatus.PAUSED ? 'bg-muted text-muted-foreground' :
                          'bg-vibrant-yellow/10 text-vibrant-yellow'
                        }`}>{task.status}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Earnings</span>
                        <span className="text-sm font-medium text-vibrant-green">${task.earnings.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Completions</span>
                        <span className="text-sm font-medium">{task.completionCount}/{task.targetCompletions}</span>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full mt-2"
                        onClick={() => handleViewTask(task.id)}
                      >
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card3D>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="history" className="mt-0">
          <TaskHistoryPanel 
            tasks={completedOrFailedTasks}
            onViewTask={handleViewTask}
          />
        </TabsContent>
        
        <TabsContent value="templates" className="mt-0">
          <TaskTemplatesPanel
            templates={templates}
            onUseTemplate={handleUseTemplate}
            onCreateTemplate={createTemplate}
            onEditTemplate={updateTemplate}
            onDeleteTemplate={deleteTemplate}
          />
        </TabsContent>
      </Tabs>
      
      <Card3D className="bg-gradient-to-br from-primary/5 to-vibrant-blue/5 border-primary/20 backdrop-blur-sm" glareEffect>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg text-gradient">Quick Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Stay Safe</h3>
              <p className="text-sm text-muted-foreground">
                Always use proxies for high-volume tasks, and respect platform terms of service.
              </p>
            </div>
            <Separator className="bg-border/50" />
            <div className="space-y-2">
              <h3 className="font-medium">Optimize for Success</h3>
              <p className="text-sm text-muted-foreground">
                Distribute tasks across multiple accounts and time periods to maximize earnings.
              </p>
            </div>
            <Separator className="bg-border/50" />
            <div className="space-y-2">
              <h3 className="font-medium">Monitor Performance</h3>
              <p className="text-sm text-muted-foreground">
                Check the Analytics section to identify your most profitable tasks.
              </p>
            </div>
          </div>
        </CardContent>
      </Card3D>
      
      <FAQ className="mt-8" />
    </div>
  );
};

export default DashboardOverview;
