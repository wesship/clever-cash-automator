
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { BarChart, PieChart, LineChart, TrendingUp, Users, DollarSign, Calendar, ExternalLink } from "lucide-react";
import Background3D from "@/components/ui/3d-background";

const Analytics = () => {
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month");
  const navigate = useNavigate();

  // Mock data
  const earningsData = {
    day: { amount: 4.25, change: "+12%" },
    week: { amount: 28.70, change: "+8%" },
    month: { amount: 116.05, change: "+22%" },
    year: { amount: 1245.80, change: "+45%" }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Analytics Dashboard</span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Total Earnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">${earningsData[period].amount}</p>
                    <p className="text-xs text-vibrant-green">{earningsData[period].change} from previous {period}</p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <DollarSign className="h-6 w-6 text-primary" />
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
                    <p className="text-2xl font-bold">8</p>
                    <p className="text-xs text-vibrant-green">+2 from previous {period}</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-blue/10 rounded-full flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-vibrant-blue" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Accounts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">5</p>
                    <p className="text-xs text-vibrant-yellow">±0 from previous {period}</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-yellow/10 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-vibrant-yellow" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Active Period</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-2xl font-bold">32 days</p>
                    <p className="text-xs text-vibrant-green">+5 days from previous period</p>
                  </div>
                  <div className="h-12 w-12 bg-vibrant-green/10 rounded-full flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-vibrant-green" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <Tabs defaultValue="earnings" className="space-y-4">
              <TabsList className="bg-card/50 backdrop-blur-sm">
                <TabsTrigger value="earnings" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  <LineChart className="h-4 w-4 mr-2" />
                  Earnings
                </TabsTrigger>
                <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  <BarChart className="h-4 w-4 mr-2" />
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="platforms" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  <PieChart className="h-4 w-4 mr-2" />
                  Platforms
                </TabsTrigger>
              </TabsList>

              <TabsContent value="earnings" className="space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Earnings Over Time</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => navigate('/analytics/earnings')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Detailed View
                    </Button>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      Earnings chart would go here with temporal data visualization
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Task Performance</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => navigate('/analytics/tasks')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Detailed View
                    </Button>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      Task performance chart would go here with completion rate data
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-4">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Earnings by Platform</CardTitle>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => navigate('/analytics/platforms')}
                    >
                      <ExternalLink className="h-4 w-4" />
                      Detailed View
                    </Button>
                  </CardHeader>
                  <CardContent className="h-80 flex items-center justify-center">
                    <p className="text-center text-muted-foreground">
                      Platform distribution chart would go here showing earnings by platform
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Top Performing Tasks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Swagbucks Ad Clicks", "Fiverr Order Management", "Affiliate Link Posting"].map((task, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded-md">
                      <div>
                        <p className="font-medium">{task}</p>
                        <p className="text-xs text-muted-foreground">
                          {["42/100 completions", "12/25 completions", "5/40 completions"][index]}
                        </p>
                      </div>
                      <p className="text-vibrant-green font-medium">
                        ${[12.50, 45.60, 32.20][index].toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Earnings Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">This Month</p>
                      <p className="text-vibrant-green font-medium">$145.80</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-vibrant-green" style={{ width: '75%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">75% of previous month</p>
                  </div>

                  <div className="p-4 bg-background/50 rounded-md">
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-medium">This Year</p>
                      <p className="text-vibrant-green font-medium">$1,450.00</p>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-vibrant-blue" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">Projected based on current growth rate</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Analytics;
