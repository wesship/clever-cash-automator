
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ArrowLeft, Building, Users, BarChart, DollarSign, PlusCircle, Settings, User, CheckCircle } from "lucide-react";
import Background3D from "@/components/ui/3d-background";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

const DepartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the department
  const departmentData = {
    id: id,
    name: "Marketing",
    description: "Responsible for social media and ad campaigns",
    status: "active",
    createdAt: new Date(Date.now() - 86400000 * 60),
    memberCount: 5,
    taskCount: 12,
    budget: 2500,
    spent: 1850,
    remainingBudget: 650,
    members: [
      { id: "1", name: "John Smith", role: "Department Lead", taskCount: 4, earnings: 650.50 },
      { id: "2", name: "Sara Johnson", role: "Social Media Manager", taskCount: 3, earnings: 425.25 },
      { id: "3", name: "Mike Davis", role: "Content Creator", taskCount: 2, earnings: 380.00 },
      { id: "4", name: "Lisa Wong", role: "Ad Campaign Specialist", taskCount: 2, earnings: 295.75 },
      { id: "5", name: "Alex Turner", role: "Analytics Manager", taskCount: 1, earnings: 98.50 }
    ],
    tasks: [
      { id: "1", name: "Facebook Ad Campaign", status: "active", progress: 65, budget: 450, spent: 290, assignees: 2 },
      { id: "2", name: "YouTube Content Creation", status: "active", progress: 40, budget: 350, spent: 140, assignees: 1 },
      { id: "3", name: "Twitter Engagement", status: "paused", progress: 80, budget: 200, spent: 160, assignees: 1 },
      { id: "4", name: "Instagram Growth", status: "active", progress: 35, budget: 300, spent: 105, assignees: 2 }
    ],
    performance: {
      monthly: [35000, 42000, 38000, 52000, 48000, 62000],
      months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
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
                onClick={() => navigate('/departments')}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Departments
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="space-y-1 flex items-center gap-3">
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">
                      <span className="text-gradient">{departmentData.name}</span>
                    </h1>
                    <Badge className={getStatusColor(departmentData.status)}>{departmentData.status}</Badge>
                  </div>
                  <p className="text-muted-foreground">{departmentData.description}</p>
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
                      <DialogTitle>Department Configuration</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <p className="text-center text-muted-foreground">Department configuration options would go here</p>
                    </div>
                    <DialogFooter>
                      <Button>Save Changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                
                <Button className="gap-1">
                  <CheckCircle className="h-4 w-4" />
                  {departmentData.status === "active" ? "Pause Department" : "Activate Department"}
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Budget Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">${departmentData.remainingBudget}</p>
                    <p className="text-xs text-muted-foreground">
                      ${departmentData.spent} spent of ${departmentData.budget} total
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-green/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-vibrant-green" />
                  </div>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-4">
                  <div 
                    className="h-full bg-vibrant-green" 
                    style={{ width: `${(departmentData.spent / departmentData.budget) * 100}%` }}
                  ></div>
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
                    <p className="text-2xl font-bold">{departmentData.tasks.filter(t => t.status === "active").length}</p>
                    <p className="text-xs text-muted-foreground">Out of {departmentData.tasks.length} total</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-blue/10 rounded-full flex items-center justify-center">
                    <BarChart className="h-6 w-6 text-vibrant-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Team Members</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">{departmentData.memberCount}</p>
                    <p className="text-xs text-muted-foreground">Active contributors</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-yellow/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-vibrant-yellow" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Building className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="members" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Users className="h-4 w-4 mr-2" />
                Team Members
              </TabsTrigger>
              <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <BarChart className="h-4 w-4 mr-2" />
                Tasks
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Department Performance</CardTitle>
                  <CardDescription>Monthly target achievement over time</CardDescription>
                </CardHeader>
                <CardContent className="h-72 flex items-center justify-center">
                  <p className="text-center text-muted-foreground">
                    Department performance chart would be displayed here showing monthly progression
                    and target achievement rates.
                  </p>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Budget Allocation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departmentData.tasks.map((task) => (
                        <div key={task.id} className="p-3 bg-background/50 rounded-md">
                          <div className="flex justify-between items-center mb-1">
                            <p className="font-medium">{task.name}</p>
                            <p className="text-vibrant-green font-medium">${task.spent}/${task.budget}</p>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                            <div 
                              className="h-full bg-vibrant-blue" 
                              style={{ width: `${(task.spent / task.budget) * 100}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <p className="text-xs text-muted-foreground">{task.assignees} assignees</p>
                            <p className="text-xs text-muted-foreground">{Math.round((task.spent / task.budget) * 100)}% used</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle>Department Stats</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Created On</p>
                        <p className="font-medium">{departmentData.createdAt.toLocaleDateString()}</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Total Tasks</p>
                        <p className="font-medium">{departmentData.taskCount}</p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Avg. Budget per Task</p>
                        <p className="font-medium">
                          ${Math.round(departmentData.budget / departmentData.tasks.length)}
                        </p>
                      </div>
                      <div className="p-4 bg-background/50 rounded-lg">
                        <p className="text-sm text-muted-foreground">Avg. Tasks per Member</p>
                        <p className="font-medium">
                          {(departmentData.taskCount / departmentData.memberCount).toFixed(1)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members" className="animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Team Members</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Add Member
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Team Member</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <p className="text-center text-muted-foreground">Member addition form would go here</p>
                      </div>
                      <DialogFooter>
                        <Button>Add Member</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.members.map((member) => (
                      <div key={member.id} className="flex justify-between items-center p-4 bg-background/50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium">{member.name}</h3>
                            <p className="text-sm text-muted-foreground">{member.role}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Tasks:</span>
                            <span className="font-medium">{member.taskCount}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">Earnings:</span>
                            <span className="font-medium text-vibrant-green">${member.earnings.toFixed(2)}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">View Profile</Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Department Tasks</CardTitle>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="gap-1">
                        <PlusCircle className="h-4 w-4" />
                        Create Task
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Create New Task</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <p className="text-center text-muted-foreground">Task creation form would go here</p>
                      </div>
                      <DialogFooter>
                        <Button>Create Task</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {departmentData.tasks.map((task) => (
                      <div key={task.id} className="p-4 bg-background/50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{task.name}</h3>
                              <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {task.assignees} team members assigned • Budget: ${task.budget}
                            </p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              {task.status === "active" ? "Pause" : "Resume"}
                            </Button>
                            <Button variant="outline" size="sm">Edit</Button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress: {task.progress}%</span>
                            <span>Budget used: ${task.spent} / ${task.budget}</span>
                          </div>
                          <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-vibrant-green" 
                              style={{ width: `${task.progress}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">View All Tasks</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DepartmentDetail;
