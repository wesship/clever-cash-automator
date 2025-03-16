
import React, { useState } from "react";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";
import { format } from "date-fns";
import { 
  Calendar as CalendarIcon, 
  FileDown, 
  Sliders, 
  BarChart3, 
  LineChart as LineChartIcon,
  PieChart as PieChartIcon,
  ArrowUpRight,
  Download,
  Share2
} from "lucide-react";
import Background3D from "@/components/ui/3d-background";
import Card3D from "@/components/ui/3d-card";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

// Mock data
const earningsData = [
  { date: "2023-06-01", amount: 12.5, tasks: 4 },
  { date: "2023-06-02", amount: 18.7, tasks: 6 },
  { date: "2023-06-03", amount: 15.2, tasks: 5 },
  { date: "2023-06-04", amount: 21.4, tasks: 7 },
  { date: "2023-06-05", amount: 19.8, tasks: 6 },
  { date: "2023-06-06", amount: 25.3, tasks: 8 },
  { date: "2023-06-07", amount: 22.1, tasks: 7 },
  { date: "2023-06-08", amount: 28.6, tasks: 9 },
  { date: "2023-06-09", amount: 26.9, tasks: 8 },
  { date: "2023-06-10", amount: 30.2, tasks: 10 },
  { date: "2023-06-11", amount: 27.5, tasks: 9 },
  { date: "2023-06-12", amount: 32.8, tasks: 10 },
  { date: "2023-06-13", amount: 29.4, tasks: 9 },
  { date: "2023-06-14", amount: 35.7, tasks: 11 },
];

const platformData = [
  { name: "Swagbucks", value: 35 },
  { name: "Amazon MTurk", value: 25 },
  { name: "YouTube", value: 15 },
  { name: "Upwork", value: 10 },
  { name: "Fiverr", value: 15 },
];

const taskTypeData = [
  { name: "Ad Click", value: 35 },
  { name: "Survey", value: 25 },
  { name: "Video Watch", value: 20 },
  { name: "Content", value: 10 },
  { name: "Affiliate", value: 10 },
];

const hourlyPerformance = [
  { hour: "00:00", tasks: 2, success: 2 },
  { hour: "01:00", tasks: 1, success: 1 },
  { hour: "02:00", tasks: 1, success: 1 },
  { hour: "03:00", tasks: 0, success: 0 },
  { hour: "04:00", tasks: 0, success: 0 },
  { hour: "05:00", tasks: 0, success: 0 },
  { hour: "06:00", tasks: 1, success: 1 },
  { hour: "07:00", tasks: 3, success: 2 },
  { hour: "08:00", tasks: 5, success: 4 },
  { hour: "09:00", tasks: 8, success: 7 },
  { hour: "10:00", tasks: 10, success: 8 },
  { hour: "11:00", tasks: 12, success: 10 },
  { hour: "12:00", tasks: 15, success: 12 },
  { hour: "13:00", tasks: 18, success: 15 },
  { hour: "14:00", tasks: 20, success: 17 },
  { hour: "15:00", tasks: 22, success: 18 },
  { hour: "16:00", tasks: 19, success: 16 },
  { hour: "17:00", tasks: 15, success: 13 },
  { hour: "18:00", tasks: 12, success: 10 },
  { hour: "19:00", tasks: 8, success: 7 },
  { hour: "20:00", tasks: 6, success: 5 },
  { hour: "21:00", tasks: 4, success: 3 },
  { hour: "22:00", tasks: 3, success: 3 },
  { hour: "23:00", tasks: 2, success: 2 },
];

const COLORS = [
  "#8B5CF6", // Vibrant purple
  "#D946EF", // Magenta pink
  "#0EA5E9", // Ocean blue
  "#10B981", // Vibrant green
  "#F97316", // Bright orange
  "#FBBF24", // Vibrant yellow
];

const Analytics = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<"day" | "week" | "month" | "year">("week");
  const [chartType, setChartType] = useState<"line" | "bar" | "area">("line");
  const [showRealTimeData, setShowRealTimeData] = useState(true);

  const handleExportData = (format: "csv" | "json" | "pdf") => {
    toast.success(`Data exported as ${format.toUpperCase()} successfully`);
  };

  const handleShareDashboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Dashboard URL copied to clipboard. Ready to share!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col space-y-2 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Analytics Dashboard</span>
            </h1>
            <p className="text-muted-foreground">
              Track your performance, earnings, and task success rates
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6 bg-card/50 p-4 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-[240px] justify-start text-left font-normal bg-background/50"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {format(date, "PPP")}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => date && setDate(date)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Select value={dateRange} onValueChange={(value) => setDateRange(value as any)}>
                <SelectTrigger className="w-[120px] bg-background/50">
                  <SelectValue placeholder="Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Day</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="year">Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2 md:ml-auto">
              <div className="flex items-center space-x-2">
                <Label htmlFor="realtime-data" className="text-sm">Real-time</Label>
                <Switch 
                  id="realtime-data"
                  checked={showRealTimeData}
                  onCheckedChange={setShowRealTimeData}
                />
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="icon" className="bg-background/50">
                    <FileDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-40">
                  <div className="flex flex-col space-y-1">
                    <Button 
                      variant="ghost" 
                      className="justify-start" 
                      onClick={() => handleExportData("csv")}
                    >
                      Export as CSV
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start" 
                      onClick={() => handleExportData("json")}
                    >
                      Export as JSON
                    </Button>
                    <Button 
                      variant="ghost" 
                      className="justify-start" 
                      onClick={() => handleExportData("pdf")}
                    >
                      Export as PDF
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>

              <Button 
                variant="outline" 
                size="icon" 
                onClick={handleShareDashboard}
                className="bg-background/50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card3D className="bg-card/50 backdrop-blur-sm" hoverEffects>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">$245.87</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-vibrant-green flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 12.5%
                    </span>
                    &nbsp;from last {dateRange}
                  </p>
                </CardContent>
              </Card3D>

              <Card3D className="bg-card/50 backdrop-blur-sm" hoverEffects>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">187</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-vibrant-green flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 8.3%
                    </span>
                    &nbsp;from last {dateRange}
                  </p>
                </CardContent>
              </Card3D>

              <Card3D className="bg-card/50 backdrop-blur-sm" hoverEffects>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">92.4%</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-vibrant-green flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 3.2%
                    </span>
                    &nbsp;from last {dateRange}
                  </p>
                </CardContent>
              </Card3D>

              <Card3D className="bg-card/50 backdrop-blur-sm" hoverEffects>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Active Platforms</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground flex items-center mt-1">
                    <span className="text-vibrant-green flex items-center">
                      <ArrowUpRight className="h-3 w-3 mr-1" /> 1
                    </span>
                    &nbsp;new platform this {dateRange}
                  </p>
                </CardContent>
              </Card3D>
            </div>

            <Tabs defaultValue="earnings">
              <TabsList className="mb-4 bg-card/50 backdrop-blur-sm">
                <TabsTrigger value="earnings" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  Earnings
                </TabsTrigger>
                <TabsTrigger value="tasks" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  Tasks
                </TabsTrigger>
                <TabsTrigger value="platforms" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  Platforms
                </TabsTrigger>
                <TabsTrigger value="timing" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                  Timing
                </TabsTrigger>
              </TabsList>

              <TabsContent value="earnings" className="space-y-6">
                <Card3D className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <div>
                      <CardTitle>Earnings Overview</CardTitle>
                      <CardDescription>Daily earnings for the selected period</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          "bg-background/50",
                          chartType === "line" && "border-primary text-primary"
                        )}
                        onClick={() => setChartType("line")}
                      >
                        <LineChartIcon className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          "bg-background/50",
                          chartType === "bar" && "border-primary text-primary"
                        )}
                        onClick={() => setChartType("bar")}
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className={cn(
                          "bg-background/50",
                          chartType === "area" && "border-primary text-primary"
                        )}
                        onClick={() => setChartType("area")}
                      >
                        <Sliders className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        {chartType === "line" ? (
                          <LineChart data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Line type="monotone" dataKey="amount" name="Earnings" stroke="#8B5CF6" strokeWidth={2} activeDot={{ r: 8 }} />
                            <Line type="monotone" dataKey="tasks" name="Tasks Completed" stroke="#0EA5E9" strokeWidth={2} />
                          </LineChart>
                        ) : chartType === "bar" ? (
                          <BarChart data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="amount" name="Earnings" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="tasks" name="Tasks Completed" fill="#0EA5E9" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        ) : (
                          <AreaChart data={earningsData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area type="monotone" dataKey="amount" name="Earnings" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="tasks" name="Tasks Completed" stroke="#0EA5E9" fill="#0EA5E9" fillOpacity={0.3} />
                          </AreaChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card3D>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card3D className="md:col-span-2 bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Earnings Projection</CardTitle>
                      <CardDescription>Estimated earnings for the next 30 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={earningsData.map((item, index) => ({
                            ...item,
                            projection: item.amount * 1.2 + (index * 0.5)
                          }))}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="date" tickFormatter={(value) => new Date(value).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Area type="monotone" dataKey="amount" name="Actual Earnings" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                            <Area type="monotone" dataKey="projection" name="Projected Earnings" stroke="#F97316" fill="#F97316" fillOpacity={0.3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>

                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Income Distribution</CardTitle>
                      <CardDescription>Earnings by platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={platformData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={false}
                            >
                              {platformData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>
                </div>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-6">
                <Card3D className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Task Completion Rate</CardTitle>
                    <CardDescription>Success rate by task type</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: "Ad Click", success: 92, failure: 8 },
                          { name: "Survey", success: 78, failure: 22 },
                          { name: "Video Watch", success: 95, failure: 5 },
                          { name: "Content Creation", success: 84, failure: 16 },
                          { name: "Affiliate", success: 88, failure: 12 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis tickFormatter={(value) => `${value}%`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="success" name="Success Rate" stackId="a" fill="#10B981" radius={[4, 4, 0, 0]} />
                          <Bar dataKey="failure" name="Failure Rate" stackId="a" fill="#F43F5E" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card3D>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Task Types</CardTitle>
                      <CardDescription>Distribution of tasks by type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={taskTypeData}
                              cx="50%"
                              cy="50%"
                              innerRadius={0}
                              outerRadius={80}
                              paddingAngle={0}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                              {taskTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>

                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Task Efficiency</CardTitle>
                      <CardDescription>Time spent vs earnings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: "Ad Click", timeMinutes: 120, earnings: 25 },
                            { name: "Survey", timeMinutes: 240, earnings: 38 },
                            { name: "Video Watch", timeMinutes: 180, earnings: 15 },
                            { name: "Content", timeMinutes: 360, earnings: 60 },
                            { name: "Affiliate", timeMinutes: 90, earnings: 42 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis yAxisId="left" tickFormatter={(value) => `$${value}`} />
                            <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `${value}m`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar yAxisId="left" dataKey="earnings" name="Earnings" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                            <Bar yAxisId="right" dataKey="timeMinutes" name="Time (minutes)" fill="#D946EF" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>
                </div>
              </TabsContent>

              <TabsContent value="platforms" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Platform Revenue</CardTitle>
                      <CardDescription>Earnings by platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { name: "Swagbucks", earnings: 68.25 },
                            { name: "Amazon MTurk", earnings: 45.50 },
                            { name: "YouTube", earnings: 32.75 },
                            { name: "Upwork", earnings: 54.65 },
                            { name: "Fiverr", earnings: 44.72 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis tickFormatter={(value) => `$${value}`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="earnings" name="Earnings" fill="#8B5CF6" radius={[4, 4, 0, 0]}>
                              {platformData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>

                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Platform Usage</CardTitle>
                      <CardDescription>Task distribution by platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[350px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={platformData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={90}
                              paddingAngle={5}
                              dataKey="value"
                              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              labelLine={true}
                            >
                              {platformData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip formatter={(value) => [`${value}%`, "Percentage"]} />
                            <Legend />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>
                </div>

                <Card3D className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Platform Efficiency</CardTitle>
                    <CardDescription>Success rate and earnings per hour by platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: "Swagbucks", successRate: 91, hourlyRate: 5.2 },
                          { name: "Amazon MTurk", successRate: 85, hourlyRate: 7.8 },
                          { name: "YouTube", successRate: 95, hourlyRate: 3.5 },
                          { name: "Upwork", successRate: 78, hourlyRate: 12.5 },
                          { name: "Fiverr", successRate: 82, hourlyRate: 10.8 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis yAxisId="left" tickFormatter={(value) => `${value}%`} />
                          <YAxis yAxisId="right" orientation="right" tickFormatter={(value) => `$${value}`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar yAxisId="left" dataKey="successRate" name="Success Rate" fill="#10B981" radius={[4, 4, 0, 0]} />
                          <Bar yAxisId="right" dataKey="hourlyRate" name="Hourly Rate" fill="#F97316" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card3D>
              </TabsContent>

              <TabsContent value="timing" className="space-y-6">
                <Card3D className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle>Hourly Performance</CardTitle>
                    <CardDescription>Task completion by hour of day</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={hourlyPerformance}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="hour" />
                          <YAxis tickFormatter={(value) => `${value}`} />
                          <Tooltip content={<CustomTooltip />} />
                          <Legend />
                          <Area type="monotone" dataKey="tasks" name="Tasks Attempted" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="success" name="Successful Tasks" stroke="#10B981" fill="#10B981" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card3D>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Weekly Performance</CardTitle>
                      <CardDescription>Task success by day of week</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={[
                            { day: "Monday", success: 85, failure: 15 },
                            { day: "Tuesday", success: 88, failure: 12 },
                            { day: "Wednesday", success: 92, failure: 8 },
                            { day: "Thursday", success: 90, failure: 10 },
                            { day: "Friday", success: 94, failure: 6 },
                            { day: "Saturday", success: 75, failure: 25 },
                            { day: "Sunday", success: 70, failure: 30 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="day" />
                            <YAxis tickFormatter={(value) => `${value}%`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="success" name="Success Rate" fill="#10B981" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>

                  <Card3D className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <CardTitle>Task Duration</CardTitle>
                      <CardDescription>Average time spent per task type</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart layout="vertical" data={[
                            { name: "Ad Click", minutes: 5 },
                            { name: "Survey", minutes: 12 },
                            { name: "Video Watch", minutes: 8 },
                            { name: "Content Creation", minutes: 25 },
                            { name: "Affiliate", minutes: 7 },
                          ]}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                            <XAxis type="number" tickFormatter={(value) => `${value}m`} />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="minutes" name="Minutes per Task" fill="#0EA5E9" radius={[0, 4, 4, 0]}>
                              {taskTypeData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card3D>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-background border border-border rounded-md shadow-lg p-3">
      {label && <p className="font-medium mb-1">{typeof label === 'string' && label.includes('-') ? new Date(label).toLocaleDateString() : label}</p>}
      <div className="space-y-1">
        {payload.map((item: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-muted-foreground">{item.name}:</span>
            <span className="text-sm font-medium">
              {item.name.toLowerCase().includes('earnings') || item.name.toLowerCase().includes('rate') && item.name.toLowerCase().includes('hourly') 
                ? `$${item.value}` 
                : item.name.toLowerCase().includes('rate') || item.name.toLowerCase().includes('success')
                ? `${item.value}%`
                : item.name.toLowerCase().includes('time') || item.name.toLowerCase().includes('minutes')
                ? `${item.value}m`
                : item.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;
