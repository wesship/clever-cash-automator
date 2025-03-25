
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { ArrowLeft, LineChart, BarChart, Calendar, DollarSign, Download, Share2 } from "lucide-react";
import Background3D from "@/components/ui/3d-background";

const AnalyticsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [period, setPeriod] = useState<"day" | "week" | "month" | "year">("month");

  // Mock data based on the ID
  const analyticsMockData = {
    earnings: {
      name: "Earnings Report",
      description: "Detailed breakdown of income sources and trends",
      type: "earnings",
      icon: <DollarSign className="h-6 w-6 text-vibrant-green" />,
      data: {
        day: [12, 19, 3, 5, 2, 3, 8, 10, 15, 12, 8, 9],
        week: [35, 42, 49, 38, 60, 55, 48],
        month: [120, 150, 180, 165, 190, 210, 205, 220, 240, 230, 245, 260],
        year: [1200, 1350, 1500, 1750, 1900, 2100, 2300, 2500, 2700, 2900, 3100, 3300]
      },
      categories: {
        day: ["12AM", "2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
        week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    tasks: {
      name: "Task Performance",
      description: "Completion rates and efficiency metrics",
      type: "tasks",
      icon: <BarChart className="h-6 w-6 text-vibrant-blue" />,
      data: {
        day: [8, 5, 12, 15, 9, 11, 7, 14, 10, 8, 13, 9],
        week: [25, 38, 42, 35, 40, 30, 45],
        month: [80, 95, 110, 105, 120, 115, 130, 125, 140, 135, 150, 145],
        year: [900, 950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450]
      },
      categories: {
        day: ["12AM", "2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
        week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    },
    platforms: {
      name: "Platform Distribution",
      description: "Revenue breakdown by platform source",
      type: "platforms",
      icon: <LineChart className="h-6 w-6 text-vibrant-yellow" />,
      data: {
        day: [5, 8, 10, 7, 12, 9, 11, 6, 14, 10, 8, 13],
        week: [30, 35, 45, 40, 50, 45, 55],
        month: [90, 100, 110, 105, 115, 110, 120, 115, 125, 120, 130, 125],
        year: [950, 1000, 1050, 1100, 1150, 1200, 1250, 1300, 1350, 1400, 1450, 1500]
      },
      categories: {
        day: ["12AM", "2AM", "4AM", "6AM", "8AM", "10AM", "12PM", "2PM", "4PM", "6PM", "8PM", "10PM"],
        week: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        year: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      }
    }
  };

  // Get the correct data based on ID (use first type as default)
  const reportType = id as keyof typeof analyticsMockData || "earnings";
  const report = analyticsMockData[reportType] || analyticsMockData.earnings;

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
                onClick={() => navigate('/analytics')}
                className="gap-1"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Analytics
              </Button>
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-center">
              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                  <span className="text-gradient">{report.name}</span>
                  {report.icon}
                </h1>
                <p className="text-muted-foreground">{report.description}</p>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 md:mt-0">
                <Button variant="outline" size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button className="gap-1">
                  <Calendar className="h-4 w-4" />
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </Button>
              </div>
            </div>
          </div>

          <Card className="bg-card/50 backdrop-blur-sm mb-8">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>
                Summary metrics for the selected time period
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Total Value</div>
                  <div className="text-2xl font-bold">
                    {report.type === "earnings" ? "$" : ""}
                    {report.data[period].reduce((a, b) => a + b, 0)}
                    {report.type === "tasks" ? " tasks" : ""}
                  </div>
                  <div className="text-xs text-vibrant-green mt-1">+12% from previous {period}</div>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Average</div>
                  <div className="text-2xl font-bold">
                    {report.type === "earnings" ? "$" : ""}
                    {Math.round(report.data[period].reduce((a, b) => a + b, 0) / report.data[period].length)}
                    {report.type === "tasks" ? " tasks" : ""}
                  </div>
                  <div className="text-xs text-vibrant-green mt-1">+8% from previous {period}</div>
                </div>
                <div className="bg-background/50 p-4 rounded-lg">
                  <div className="text-sm text-muted-foreground mb-1">Peak</div>
                  <div className="text-2xl font-bold">
                    {report.type === "earnings" ? "$" : ""}
                    {Math.max(...report.data[period])}
                    {report.type === "tasks" ? " tasks" : ""}
                  </div>
                  <div className="text-xs text-vibrant-yellow mt-1">On {report.categories[period][report.data[period].indexOf(Math.max(...report.data[period]))]}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="chart" className="space-y-4">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="chart" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <LineChart className="h-4 w-4 mr-2" />
                Chart
              </TabsTrigger>
              <TabsTrigger value="breakdown" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <BarChart className="h-4 w-4 mr-2" />
                Breakdown
              </TabsTrigger>
            </TabsList>

            <TabsContent value="chart" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Detailed Chart</CardTitle>
                  <div className="flex gap-2">
                    <Badge 
                      className={period === "day" ? "bg-primary" : "bg-secondary hover:bg-primary/80 cursor-pointer"} 
                      onClick={() => setPeriod("day")}
                    >
                      Day
                    </Badge>
                    <Badge 
                      className={period === "week" ? "bg-primary" : "bg-secondary hover:bg-primary/80 cursor-pointer"} 
                      onClick={() => setPeriod("week")}
                    >
                      Week
                    </Badge>
                    <Badge 
                      className={period === "month" ? "bg-primary" : "bg-secondary hover:bg-primary/80 cursor-pointer"} 
                      onClick={() => setPeriod("month")}
                    >
                      Month
                    </Badge>
                    <Badge 
                      className={period === "year" ? "bg-primary" : "bg-secondary hover:bg-primary/80 cursor-pointer"} 
                      onClick={() => setPeriod("year")}
                    >
                      Year
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="h-80 flex items-center justify-center">
                  <p className="text-center text-muted-foreground">
                    Detailed chart visualization would be displayed here showing {report.data[period].length} data points
                    for the selected time period ({period}).
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="breakdown" className="space-y-4">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Detailed Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {report.data[period].map((value, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-background/50 rounded-md">
                        <div>
                          <p className="font-medium">{report.categories[period][index]}</p>
                          <p className="text-xs text-muted-foreground">
                            {index > 0 
                              ? value > report.data[period][index-1] 
                                ? `+${Math.round((value - report.data[period][index-1]) / report.data[period][index-1] * 100)}% increase` 
                                : `${Math.round((report.data[period][index-1] - value) / report.data[period][index-1] * 100)}% decrease`
                              : 'Base period'
                            }
                          </p>
                        </div>
                        <p className={`font-medium ${index > 0 && value > report.data[period][index-1] ? 'text-vibrant-green' : index > 0 ? 'text-destructive' : ''}`}>
                          {report.type === "earnings" ? "$" : ""}
                          {value}
                          {report.type === "tasks" ? " tasks" : ""}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full gap-1">
                    <Download className="h-4 w-4" />
                    Download Full Report
                  </Button>
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

export default AnalyticsDetail;
