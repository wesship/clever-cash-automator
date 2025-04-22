
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, TaskStatus } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DownloadIcon, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CompletionChart } from "./Performance/CompletionChart";
import { EarningsChart, ErrorsChart } from "./Performance/MetricsCharts";
import { ResourceUsageChart, ResponseTimeChart } from "./Performance/ResourceCharts";
import { generateMockPerformanceData } from "./Performance/utils";
import { TaskPerformanceMonitorProps } from "./Performance/types";

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
          
          <TabsContent value="progress" className="space-y-4">
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
            
            <CompletionChart data={performanceData} />
            
            <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Estimated completion:</span>
                <span className="text-sm font-medium">
                  {isTaskCompleted ? "Completed" : isTaskFailed ? "Failed" : 
                    task.config.schedule?.endDate ? 
                      new Date(task.config.schedule.endDate).toLocaleDateString() : 
                      "Not specified"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {isTaskRunning && onPause && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onPause}
                    className="flex items-center gap-1"
                  >
                    <PauseIcon className="h-4 w-4" />
                    Pause
                  </Button>
                )}
                {isTaskPaused && onResume && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onResume}
                    className="flex items-center gap-1"
                  >
                    <PlayIcon className="h-4 w-4" />
                    Resume
                  </Button>
                )}
                {isTaskFailed && onRetry && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={onRetry}
                    className="flex items-center gap-1"
                  >
                    <RotateCcwIcon className="h-4 w-4" />
                    Retry
                  </Button>
                )}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="metrics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Earnings</h4>
                <div className="bg-muted/40 rounded-md p-4">
                  <div className="text-2xl font-bold">${latestPerformance?.earnings.toFixed(2) || '0.00'}</div>
                  <div className="text-sm text-muted-foreground">Current earnings</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Error Rate</h4>
                <div className="bg-muted/40 rounded-md p-4">
                  <div className="text-2xl font-bold">{averageErrorRate.toFixed(2)}</div>
                  <div className="text-sm text-muted-foreground">Errors per execution</div>
                </div>
              </div>
            </div>
            
            <EarningsChart data={performanceData} />
            <ErrorsChart data={performanceData} />
          </TabsContent>
          
          <TabsContent value="resources" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium">CPU Usage</h4>
                <div className="bg-muted/40 rounded-md p-4">
                  <div className="text-2xl font-bold">{latestPerformance?.cpuUsage.toFixed(1)}%</div>
                  <div className="text-sm text-muted-foreground">Average CPU utilization</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Memory Usage</h4>
                <div className="bg-muted/40 rounded-md p-4">
                  <div className="text-2xl font-bold">{latestPerformance?.memoryUsage.toFixed(1)} MB</div>
                  <div className="text-sm text-muted-foreground">Average memory usage</div>
                </div>
              </div>
            </div>
            
            <ResourceUsageChart data={performanceData} />
            <ResponseTimeChart data={performanceData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaskPerformanceMonitor;
