
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ArrowLeft, User, ShieldCheck, Calendar, DollarSign, BarChart, Settings, CheckCircle, PlusCircle, AlertTriangle } from "lucide-react";
import Background3D from "@/components/ui/3d-background";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const AccountDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the selected account
  const accountData = {
    id: id,
    platform: "Swagbucks",
    username: "user1234",
    status: "active",
    lastUsed: new Date(Date.now() - 3600000 * 2),
    proxyEnabled: true,
    earnings: 45.20,
    taskCount: 4,
    createdAt: new Date(Date.now() - 86400000 * 30),
    email: "user1234@example.com",
    proxy: {
      name: "US Residential",
      location: "United States",
      ip: "192.168.1.1",
      lastRotated: new Date(Date.now() - 86400000)
    },
    tasks: [
      { id: "1", name: "Ad Clicks", status: "active", earnings: 15.20, completions: 42, total: 100 },
      { id: "2", name: "Surveys", status: "active", earnings: 8.50, completions: 3, total: 10 },
      { id: "3", name: "Video Watching", status: "paused", earnings: 12.30, completions: 18, total: 50 },
      { id: "4", name: "Referrals", status: "active", earnings: 9.20, completions: 2, total: 20 }
    ],
    // Fixed: renamed the duplicate 'earnings' property to 'earningsData'
    earningsData: {
      daily: [2.30, 3.50, 1.20, 4.80, 3.90, 5.10, 3.20],
      days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    performanceMetrics: {
      successRate: 92,
      averageTaskTime: "3m 42s",
      dailyActiveTime: "2h 15m",
      captchaSuccessRate: 88
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-vibrant-green text-white";
      case "paused": return "bg-vibrant-yellow text-white";
      case "inactive": return "bg-secondary text-secondary-foreground";
      default: return "bg-destructive text-destructive-foreground";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-2 md:space-y-0 mb-8">
            <div className="flex items-center mb-4">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate('/accounts')}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Accounts
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="space-y-1 flex items-center gap-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                      <span className="text-gradient">{accountData.username}</span>
                    </h1>
                    <Badge className={getStatusColor(accountData.status)}>{accountData.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{accountData.platform} account</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="gap-1">
                      <Settings className="h-4 w-4" />
                      Configure
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Account Configuration</DialogTitle>
                      <DialogDescription>
                        Adjust settings for the {accountData.username} account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p className="text-center text-muted-foreground">Account configuration options would go here</p>
                    </div>
                    <DialogFooter>
                      <Button>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button className="gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {accountData.status === "active" ? "Pause Account" : "Activate Account"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">${accountData.earnings.toFixed(2)}</p>
                    <p className="text-xs text-vibrant-green">+8% this week</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-green/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-vibrant-green" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{accountData.tasks.filter(t => t.status === "active").length}</p>
                    <p className="text-xs text-vibrant-green">Out of {accountData.tasks.length} total</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-blue/10 rounded-full flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-vibrant-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Account Age</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">
                      {Math.floor((Date.now() - accountData.createdAt.getTime()) / (1000 * 60 * 60 * 24))} days
                    </p>
                    <p className="text-xs text-muted-foreground">Created on {accountData.createdAt.toLocaleDateString()}</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-yellow/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-vibrant-yellow" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <BarChart className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
              <TabsTrigger value="proxy" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Proxy Settings
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Account Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">Username</p>
                          <p className="font-medium">{accountData.username}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Platform</p>
                          <p className="font-medium">{accountData.platform}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">{accountData.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Status</p>
                          <Badge className={getStatusColor(accountData.status)}>{accountData.status}</Badge>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Last Used</p>
                          <p className="font-medium">{accountData.lastUsed.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Proxy</p>
                          <p className="font-medium">{accountData.proxyEnabled ? "Enabled" : "Disabled"}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full gap-1">
                      <Settings className="h-4 w-4" />
                      Edit Account Details
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-background/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <p className="font-medium">Success Rate</p>
                          <p className="text-vibrant-green font-medium">{accountData.performanceMetrics.successRate}%</p>
                        </div>
                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full bg-vibrant-green" style={{ width: `${accountData.performanceMetrics.successRate}%` }}></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Average Task Time</p>
                          <p className="font-medium">{accountData.performanceMetrics.averageTaskTime}</p>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Daily Active Time</p>
                          <p className="font-medium">{accountData.performanceMetrics.dailyActiveTime}</p>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">CAPTCHA Success</p>
                          <p className="font-medium">{accountData.performanceMetrics.captchaSuccessRate}%</p>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Tasks Completed</p>
                          <p className="font-medium">
                            {accountData.tasks.reduce((sum, task) => sum + task.completions, 0)} / 
                            {accountData.tasks.reduce((sum, task) => sum + task.total, 0)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tasks" className="animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Assigned Tasks</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Add Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Assign New Task</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <p className="text-center text-muted-foreground">Task assignment form would go here</p>
                      </div>
                      <DialogFooter>
                        <Button>Assign Task</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {accountData.tasks.map((task) => (
                      <div key={task.id} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{task.name}</h3>
                            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                          </div>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <span>Progress: {task.completions}/{task.total}</span>
                            <span className="text-vibrant-green">(${task.earnings.toFixed(2)})</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                            <div 
                              className="h-full bg-vibrant-blue" 
                              style={{ width: `${(task.completions / task.total) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            {task.status === "active" ? "Pause" : "Resume"}
                          </Button>
                          <Button variant="outline" size="sm">Details</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="proxy" className="animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle>Proxy Configuration</CardTitle>
                    <Badge className={accountData.proxyEnabled ? "bg-vibrant-green" : "bg-secondary"}>
                      {accountData.proxyEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {accountData.proxyEnabled ? (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Proxy Name</p>
                          <p className="font-medium">{accountData.proxy.name}</p>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Location</p>
                          <p className="font-medium">{accountData.proxy.location}</p>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">IP Address</p>
                          <p className="font-medium">{accountData.proxy.ip}</p>
                        </div>
                        <div className="p-4 bg-background/50 rounded-lg">
                          <p className="text-sm text-muted-foreground">Last Rotated</p>
                          <p className="font-medium">{accountData.proxy.lastRotated.toLocaleString()}</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4">
                        <Button className="flex-1 gap-1">
                          <CheckCircle className="h-4 w-4" />
                          Rotate IP
                        </Button>
                        <Button variant="outline" className="flex-1 gap-1">
                          <Settings className="h-4 w-4" />
                          Change Proxy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 space-y-4">
                      <AlertTriangle className="h-12 w-12 text-vibrant-yellow" />
                      <h3 className="text-lg font-medium">No Proxy Configured</h3>
                      <p className="text-center text-muted-foreground max-w-md">
                        This account is operating without proxy protection, which may increase detection risk. 
                        We recommend setting up a proxy for enhanced security.
                      </p>
                      <Button className="gap-1">
                        <ShieldCheck className="h-4 w-4" />
                        Setup Proxy
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountDetail;
