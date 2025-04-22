import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, TaskStatus } from "@/lib/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompletionChart } from "./Performance/CompletionChart";
import { EarningsChart, ErrorsChart } from "./Performance/MetricsCharts";
import { ResourceUsageChart, ResponseTimeChart } from "./Performance/ResourceCharts";
import { generateMockPerformanceData } from "./Performance/utils";
import { TaskPerformanceMonitorProps } from "./Performance/types";
import { MetricsCards } from "./Performance/MetricsCards";
import { ResourceCards } from "./Performance/ResourceCards";
import { TaskControls } from "./Performance/TaskControls";
import { DownloadIcon } from "lucide-react";
import ErrorBoundary from "@/components/ui/error-boundary";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

const TaskPerformanceMonitor: React.FC<TaskPerformanceMonitorProps> = ({
  task,
  onRetry,
  onPause,
  onResume,
  className
}) => {
  const [activeTab, setActiveTab] = useState("progress");
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("7d");
  const [performanceData, setPerformanceData] = useState([]);
  
  useEffect(() => {
    const duration = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
    setPerformanceData(generateMockPerformanceData(task, duration));
  }, [task, timeRange]);
  
  const isTaskRunning = task.status === TaskStatus.RUNNING;
  const isTaskPaused = task.status === TaskStatus.PAUSED;
  const isTaskCompleted = task.status === TaskStatus.COMPLETED;
  const isTaskFailed = task.status === TaskStatus.FAILED;
  
  const completionPercentage = (task.completionCount / task.targetCompletions) * 100;
  
  const averageErrorRate = performanceData.length > 0 
    ? performanceData.reduce((sum, item) => sum + item.errors, 0) / performanceData.length
    : 0;
  
  const latestPerformance = performanceData.length > 0 
    ? performanceData[performanceData.length - 1]
    : null;

  const handleExportData = () => {
    const formattedData = performanceData.map(item => ({
      ...item,
      taskId: task.id,
      taskName: task.name
    }));
    
    const dataStr = JSON.stringify(formattedData, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportLink = document.createElement('a');
    exportLink.setAttribute('href', dataUri);
    exportLink.setAttribute('download', `task-${task.id}-performance.json`);
    document.body.appendChild(exportLink);
    exportLink.click();
    document.body.removeChild(exportLink);
  };

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
          <CardTitle className="text-xl">Performance Monitor</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-sm text-muted-foreground">Time Range:</span>
              <Select
                value={timeRange}
                onValueChange={(value) => setTimeRange(value as "7d" | "30d" | "all")}
              >
                <SelectTrigger className="w-[80px] h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">7 Days</SelectItem>
                  <SelectItem value="30d">30 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleExportData}
              className="flex items-center gap-1"
            >
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>
          
          <TabsContent value="progress" className="mt-0 space-y-4">
            <div className="flex flex-col space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Completion Status</span>
                <span className="text-sm font-medium">{completionPercentage.toFixed(1)}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-muted-foreground">
                  {task.completionCount} of {task.targetCompletions} completions
                </span>
                <Badge variant={
                  isTaskRunning ? "default" : 
                  isTaskPaused ? "outline" : 
                  isTaskCompleted ? "secondary" : 
                  "destructive"
                }>
                  {task.status}
                </Badge>
              </div>
            </div>
            
            <ErrorBoundary>
              <CompletionChart data={performanceData} />
            </ErrorBoundary>

            <TaskControls 
              status={task.status}
              onPause={onPause}
              onResume={onResume}
              onRetry={onRetry}
              config={task.config}
            />
          </TabsContent>
          
          <TabsContent value="metrics" className="mt-0 space-y-4">
            <MetricsCards 
              latestPerformance={latestPerformance}
              averageErrorRate={averageErrorRate}
            />
            <ErrorBoundary>
              <EarningsChart data={performanceData} />
            </ErrorBoundary>
            <ErrorBoundary>
              <ErrorsChart data={performanceData} />
            </ErrorBoundary>
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <ResourceCards latestPerformance={latestPerformance} />
            
            <ErrorBoundary>
              <ResourceUsageChart data={performanceData} />
            </ErrorBoundary>
            <ErrorBoundary>
              <ResponseTimeChart data={performanceData} />
            </ErrorBoundary>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaskPerformanceMonitor;
