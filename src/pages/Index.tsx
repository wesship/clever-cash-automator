import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
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
import { PlusCircle, PanelRight, ChevronLeft, ChevronRight, Sparkles, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Card3D from "@/components/ui/3d-card";
import Background3D from "@/components/ui/3d-background";
import { Separator } from "@/components/ui/separator";
import { WelcomeGuide, FAQ } from "@/components/ui/onboarding";
import { useTheme } from "@/hooks/use-theme";
import useLocalStorage from "@/hooks/use-local-storage";
import { useIsMobile } from "@/hooks/use-mobile";
import { TaskCardSkeleton } from "@/components/ui/skeleton-loader";
import ErrorBoundary from "@/components/ui/error-boundary";
import { useUserPreferences } from "@/hooks/use-user-preferences";
import { toast } from "sonner";

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
  const { theme, setTheme, isDarkMode } = useTheme();
  const isMobile = useIsMobile();
  const { preferences, updatePreference } = useUserPreferences();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statistics, setStatistics] = useState<Statistics>(mockStatistics);
  const [activeTab, setActiveTab] = useState("overview");
  const [isLoading, setIsLoading] = useState(true);
  const [recentVisits, setRecentVisits] = useLocalStorage<number>("recent-visits", 0);

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam === 'create') {
      setActiveTab('create');
    }
  }, [searchParams]);

  useEffect(() => {
    setRecentVisits(prev => prev + 1);
    
    const loadData = async () => {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setTasks(mockTasks);
      setIsLoading(false);
    };
    
    loadData();
  }, [setRecentVisits]);

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
    setActiveTab("tasks");
    toast.success(`Task "${data.name}" created successfully!`);
    
    searchParams.delete('tab');
    setSearchParams(searchParams);
  };

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      {preferences.showWelcomeGuide && <WelcomeGuide />}
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
            <h1 className="text-3xl font-bold tracking-tight inline-flex items-center">
              <span className="text-gradient">AutoEarn Dashboard</span>
              <Sparkles className="ml-2 h-5 w-5 text-vibrant-yellow animate-pulse-slow" />
            </h1>
            
            <div className="flex items-center space-x-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleTheme} 
                className="bg-background/50 backdrop-blur-sm hover:bg-primary/10"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          <ErrorBoundary>
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <div className="flex items-center justify-between bg-card/50 backdrop-blur-sm p-1 rounded-lg shadow-soft">
                <TabsList className="bg-background/50">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                    Tasks
                  </TabsTrigger>
                  <TabsTrigger value="create" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                    Create Task
                  </TabsTrigger>
                </TabsList>
                
                <div className="hidden sm:flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="gap-1 backdrop-blur-sm bg-background/50">
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="gap-1 backdrop-blur-sm bg-background/50">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <TabsContent value="overview" className="space-y-6 animate-fade-in">
                <StatisticsPanel statistics={statistics} />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold tracking-tight text-gradient">Recent Tasks</h2>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("tasks")}
                      className="gap-1 bg-background/50 backdrop-blur-sm hover:bg-primary/20"
                    >
                      <PanelRight className="h-4 w-4" />
                      View All
                    </Button>
                  </div>
                  
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
                            </div>
                          </CardContent>
                        </Card3D>
                      ))
                    )}
                  </div>
                </div>
                
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
          </ErrorBoundary>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
