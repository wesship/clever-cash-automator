
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import TaskList from "@/components/Dashboard/TaskList";
import StatisticsPanel from "@/components/Dashboard/StatisticsPanel";
import TaskForm from "@/components/Forms/TaskForm";
import { Button } from "@/components/ui/button";
import { Task, TaskStatus, TaskType, PlatformType, Statistics } from "@/lib/types";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, PanelRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: "1",
    name: "Swagbucks Ad Clicks",
    type: TaskType.AD_CLICK,
    platform: PlatformType.SWAGBUCKS,
    status: TaskStatus.RUNNING,
    createdAt: new Date(Date.now() - 86400000 * 2),
    lastRun: new Date(Date.now() - 3600000),
    completionCount: 42,
    targetCompletions: 100,
    earnings: 12.50,
    description: "Automatically click on Swagbucks ads to earn SB points.",
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 10,
      },
    },
  },
  {
    id: "2",
    name: "MTurk Survey Completion",
    type: TaskType.SURVEY,
    platform: PlatformType.AMAZON_MECHANICAL_TURK,
    status: TaskStatus.PENDING,
    createdAt: new Date(Date.now() - 86400000),
    completionCount: 0,
    targetCompletions: 20,
    earnings: 0,
    description: "Automatically complete simple surveys on Amazon Mechanical Turk.",
    config: {
      proxyRequired: false,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 5,
      },
    },
  },
  {
    id: "3",
    name: "YouTube Video Views",
    type: TaskType.VIDEO_WATCH,
    platform: PlatformType.YOUTUBE,
    status: TaskStatus.COMPLETED,
    createdAt: new Date(Date.now() - 86400000 * 5),
    lastRun: new Date(Date.now() - 86400000),
    completionCount: 50,
    targetCompletions: 50,
    earnings: 25.75,
    description: "Watch YouTube videos to increase view count and engagement metrics.",
    config: {
      proxyRequired: true,
      captchaHandling: false,
      schedule: {
        frequency: "hourly",
        maxRuns: 24,
      },
    },
  },
  {
    id: "4",
    name: "Upwork Proposal Automation",
    type: TaskType.CONTENT_CREATION,
    platform: PlatformType.UPWORK,
    status: TaskStatus.PAUSED,
    createdAt: new Date(Date.now() - 86400000 * 10),
    lastRun: new Date(Date.now() - 86400000 * 2),
    completionCount: 15,
    targetCompletions: 30,
    earnings: 0,
    description: "Automatically generate and submit proposals for relevant Upwork jobs.",
    config: {
      proxyRequired: false,
      captchaHandling: true,
      schedule: {
        frequency: "daily",
        maxRuns: 10,
      },
    },
  },
  {
    id: "5",
    name: "Affiliate Link Posting",
    type: TaskType.AFFILIATE,
    platform: PlatformType.CUSTOM,
    status: TaskStatus.FAILED,
    createdAt: new Date(Date.now() - 86400000 * 3),
    lastRun: new Date(Date.now() - 43200000),
    completionCount: 5,
    targetCompletions: 40,
    earnings: 32.20,
    description: "Post affiliate links on relevant forums and social media groups.",
    config: {
      proxyRequired: true,
      captchaHandling: true,
      schedule: {
        frequency: "weekly",
        maxRuns: 3,
      },
    },
  },
  {
    id: "6",
    name: "Fiverr Order Management",
    type: TaskType.CONTENT_CREATION,
    platform: PlatformType.FIVERR,
    status: TaskStatus.RUNNING,
    createdAt: new Date(Date.now() - 86400000 * 7),
    lastRun: new Date(Date.now() - 21600000),
    completionCount: 12,
    targetCompletions: 25,
    earnings: 45.60,
    description: "Automatically manage and respond to Fiverr orders and messages.",
    config: {
      proxyRequired: false,
      captchaHandling: false,
      schedule: {
        frequency: "hourly",
        maxRuns: 12,
      },
    },
  },
];

// Mock statistics data
const mockStatistics: Statistics = {
  totalEarnings: 116.05,
  tasksCompleted: 124,
  activeAccounts: 8,
  earningsToday: 12.35,
  earningsThisWeek: 58.45,
  earningsThisMonth: 116.05,
  taskSuccessRate: 87,
};

const Index = () => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [statistics, setStatistics] = useState<Statistics>(mockStatistics);
  const [activeTab, setActiveTab] = useState("overview");

  const handleCreateTask = (data: any) => {
    const newTask: Task = {
      id: (tasks.length + 1).toString(),
      name: data.name,
      type: data.type as TaskType,
      platform: data.platform as PlatformType,
      status: TaskStatus.PENDING,
      createdAt: new Date(),
      completionCount: 0,
      targetCompletions: data.targetCompletions,
      earnings: 0,
      description: data.description || "",
      config: {
        proxyRequired: data.proxyRequired,
        captchaHandling: data.captchaHandling,
        schedule: {
          frequency: data.frequency as "hourly" | "daily" | "weekly",
          maxRuns: data.maxRuns,
        },
      },
    };

    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              AutoEarn Dashboard
            </h1>
            <p className="text-muted-foreground">
              Manage your automated tasks and track earnings
            </p>
          </div>

          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <div className="flex items-center justify-between">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="create">Create Task</TabsTrigger>
              </TabsList>
              
              <div className="hidden sm:flex items-center space-x-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <TabsContent value="overview" className="space-y-6 animate-fade-in">
              <StatisticsPanel statistics={statistics} />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold tracking-tight">Recent Tasks</h2>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setActiveTab("tasks")}
                    className="gap-1"
                  >
                    <PanelRight className="h-4 w-4" />
                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tasks.slice(0, 3).map((task) => (
                    <Card key={task.id} className="shadow-soft">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{task.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Status</span>
                            <span className="text-sm font-medium">{task.status}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Earnings</span>
                            <span className="text-sm font-medium">${task.earnings.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Completions</span>
                            <span className="text-sm font-medium">{task.completionCount}/{task.targetCompletions}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
              
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <h3 className="font-medium">Stay Safe</h3>
                      <p className="text-sm text-muted-foreground">
                        Always use proxies for high-volume tasks, and respect platform terms of service.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Optimize for Success</h3>
                      <p className="text-sm text-muted-foreground">
                        Distribute tasks across multiple accounts and time periods to maximize earnings.
                      </p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <h3 className="font-medium">Monitor Performance</h3>
                      <p className="text-sm text-muted-foreground">
                        Check the Analytics section to identify your most profitable tasks.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="animate-fade-in">
              <TaskList 
                tasks={tasks} 
                onCreateTask={() => setActiveTab("create")} 
              />
            </TabsContent>
            
            <TabsContent value="create" className="animate-fade-in">
              <div className="max-w-3xl mx-auto">
                <TaskForm 
                  onSubmit={handleCreateTask}
                  onCancel={() => setActiveTab("tasks")}
                />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
