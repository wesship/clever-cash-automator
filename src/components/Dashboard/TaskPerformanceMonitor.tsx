
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Task, TaskStatus } from "@/lib/types";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Button } from "@/components/ui/button";
import { DownloadIcon, PauseIcon, PlayIcon, RotateCcwIcon } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface TaskPerformanceData {
  timestamp: string;
  completion: number;
  earnings: number;
  errors: number;
  retries: number;
  cpuUsage: number;
  memoryUsage: number;
  responseTime: number;
}

interface TaskPerformanceMonitorProps {
  task: Task;
  onRetry?: () => void;
  onPause?: () => void;
  onResume?: () => void;
  className?: string;
}

const generateMockPerformanceData = (task: Task, duration: number = 7): TaskPerformanceData[] => {
  const data: TaskPerformanceData[] = [];
  const now = new Date();
  
  for (let i = duration; i >= 0; i--) {
    const date = new Date();
    date.setDate(now.getDate() - i);
    
    // Generate a somewhat realistic curve
    const progress = Math.min(100, Math.max(0, (duration - i) / duration * 100));
    const isComplete = task.status === TaskStatus.COMPLETED;
    const progressFactor = isComplete ? 100 : progress;
    
    const completionRate = task.completionCount / task.targetCompletions;
    const adjustedCompletion = i === 0 
      ? completionRate * 100 
      : (Math.min(progressFactor, 98) / 100) * completionRate * 100;
    
    data.push({
      timestamp: date.toISOString().split('T')[0],
      completion: Math.round(adjustedCompletion * 10) / 10,
      earnings: Math.round((task.earnings * (adjustedCompletion / 100)) * 100) / 100,
      errors: Math.floor(Math.random() * 3),
      retries: Math.floor(Math.random() * 2),
      cpuUsage: 10 + Math.random() * 20,
      memoryUsage: 50 + Math.random() * 30,
      responseTime: 200 + Math.random() * 300
    });
  }
  
  return data;
};

const TaskPerformanceMonitor: React.FC<TaskPerformanceMonitorProps> = ({
  task,
  onRetry,
  onPause,
  onResume,
  className
}) => {
  const [activeTab, setActiveTab] = useState("progress");
  const [performanceData, setPerformanceData] = useState<TaskPerformanceData[]>([]);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("7d");
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
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
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Completion Progress Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="completion" 
                    name="Completion %" 
                    stroke="#0ea5e9" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
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
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Earnings Trend</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`$${value}`, 'Earnings']} />
                  <Line 
                    type="monotone" 
                    dataKey="earnings" 
                    name="Earnings" 
                    stroke="#10b981" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Errors & Retries</h4>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="errors" name="Errors" fill="#ef4444" />
                  <Bar dataKey="retries" name="Retries" fill="#f59e0b" />
                </BarChart>
              </ResponsiveContainer>
            </div>
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
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Resource Usage Over Time</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis yAxisId="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Legend />
                  <Line 
                    yAxisId="left"
                    type="monotone" 
                    dataKey="cpuUsage" 
                    name="CPU %" 
                    stroke="#8b5cf6" 
                    activeDot={{ r: 8 }} 
                  />
                  <Line 
                    yAxisId="right"
                    type="monotone" 
                    dataKey="memoryUsage" 
                    name="Memory (MB)" 
                    stroke="#ec4899" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3">Response Time (ms)</h4>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart
                  data={performanceData}
                  margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="timestamp" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="responseTime" 
                    name="Response Time (ms)" 
                    stroke="#f97316" 
                    activeDot={{ r: 8 }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default TaskPerformanceMonitor;
