
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

const KnowledgeBase = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter guides based on search term
  const filteredGuides = guides.filter(
    guide => guide.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             guide.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Knowledge Base</CardTitle>
          <CardDescription>
            Access documentation, guides and frequently asked questions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guides">
            <TabsList className="mb-4">
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="api">API Documentation</TabsTrigger>
            </TabsList>
            
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="text" 
                  placeholder="Search knowledge base..." 
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <TabsContent value="guides" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {filteredGuides.length > 0 ? filteredGuides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden h-full">
                    <div className="p-6 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{guide.title}</h3>
                        <Badge variant={guide.level === "Beginner" ? "default" : guide.level === "Intermediate" ? "secondary" : "outline"}>
                          {guide.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4 flex-grow">{guide.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground mt-auto">
                        <span>Last updated: {guide.updated}</span>
                        <span>{guide.timeToRead} min read</span>
                      </div>
                      <Button variant="ghost" size="sm" className="mt-2 w-full justify-between">
                        Read guide <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </Card>
                )) : (
                  <div className="col-span-2 flex items-center justify-center p-8 text-center">
                    <div>
                      <h3 className="font-medium mb-1">No guides found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              {faqCategories.filter(category => 
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                category.questions.some(q => 
                  q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ).map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.filter(faq => 
                        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
                      ).map((faq, index) => (
                        <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
              {faqCategories.filter(category => 
                category.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                category.questions.some(q => 
                  q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  q.answer.toLowerCase().includes(searchTerm.toLowerCase())
                )
              ).length === 0 && (
                <Card>
                  <CardContent className="flex items-center justify-center p-8 text-center">
                    <div>
                      <h3 className="font-medium mb-1">No FAQs found</h3>
                      <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">API Reference</CardTitle>
                  <CardDescription>
                    Detailed documentation for integrating with our API
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 p-4 bg-muted/30 rounded-md border border-border/40">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-sm font-medium mb-1">API Documentation v2.1</h3>
                        <p className="text-xs text-muted-foreground">Full technical specifications for MoneyHub API integration</p>
                      </div>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Download className="h-4 w-4" /> Download Docs
                      </Button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Endpoint</TableHead>
                          <TableHead>Method</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {apiEndpoints.filter(endpoint => 
                          endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
                        ).map((endpoint) => (
                          <TableRow key={endpoint.id} className="cursor-pointer hover:bg-muted/50">
                            <TableCell className="font-mono text-sm">{endpoint.path}</TableCell>
                            <TableCell>
                              <Badge 
                                variant={
                                  endpoint.method === "GET" ? "default" : 
                                  endpoint.method === "POST" ? "secondary" :
                                  endpoint.method === "PUT" ? "outline" : "destructive"
                                }
                              >
                                {endpoint.method}
                              </Badge>
                            </TableCell>
                            <TableCell>{endpoint.description}</TableCell>
                            <TableCell className="text-right">
                              <Badge 
                                variant={endpoint.status === "Stable" ? "default" : "secondary"}
                                className="ml-auto"
                              >
                                {endpoint.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                  
                  {apiEndpoints.filter(endpoint => 
                    endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    endpoint.description.toLowerCase().includes(searchTerm.toLowerCase())
                  ).length === 0 && (
                    <div className="flex items-center justify-center p-8 text-center">
                      <div>
                        <h3 className="font-medium mb-1">No API endpoints found</h3>
                        <p className="text-sm text-muted-foreground">Try adjusting your search terms</p>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between items-center border-t">
                  <div className="text-sm text-muted-foreground">
                    <span>Need more help with the API?</span>
                  </div>
                  <Button variant="outline" size="sm" className="gap-2">
                    <ExternalLink className="h-3 w-3" /> Visit Developer Portal
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

// Sample data for the knowledge base
const guides = [
  {
    id: 1,
    title: "Getting Started with MoneyHub",
    description: "Learn the basics of setting up your accounts and proxies for automated tasks.",
    level: "Beginner",
    updated: "June 15, 2023",
    timeToRead: 5,
    content: `
      # Getting Started with MoneyHub
      
      This guide will help you set up your accounts and proxies for automated tasks.
      
      ## 1. Account Creation
      To start using MoneyHub, you'll need to set up your financial accounts. Navigate to "Accounts" and click "Add New".
      
      ## 2. Proxy Setup
      For security and to avoid rate limits, set up proxies by going to the Network settings and adding proxy details.
      
      ## 3. First Automation
      Create your first automated task by selecting a template or starting from scratch.
    `
  },
  {
    id: 2,
    title: "Advanced Analytics",
    description: "Deep dive into interpreting and utilizing analytics data for better decision making.",
    level: "Intermediate",
    updated: "August 3, 2023",
    timeToRead: 10,
    content: `
      # Advanced Analytics in MoneyHub
      
      Learn how to make the most of the analytics features to optimize your financial automation.
      
      ## 1. Dashboard Overview
      The analytics dashboard provides real-time metrics on your account performance.
      
      ## 2. Custom Reports
      Create custom reports to track specific metrics relevant to your goals.
      
      ## 3. Data Export
      Export your data for further analysis in external tools.
    `
  },
  {
    id: 3,
    title: "Automation Strategies",
    description: "Learn effective strategies for automating financial tasks and maximizing returns.",
    level: "Advanced",
    updated: "September 12, 2023",
    timeToRead: 12,
    content: `
      # Automation Strategies
      
      Advanced techniques to maximize the efficiency of your automated financial tasks.
      
      ## 1. Task Chaining
      Link multiple tasks together to create complex automation workflows.
      
      ## 2. Conditional Logic
      Use if-then logic to make your automations adapt to different scenarios.
      
      ## 3. Scaling Strategies
      Learn how to safely scale your automation across multiple accounts and platforms.
    `
  },
  {
    id: 4,
    title: "Proxy Configuration",
    description: "Configure and optimize proxies for better performance and security.",
    level: "Intermediate",
    updated: "May 20, 2023",
    timeToRead: 8,
    content: `
      # Proxy Configuration Guide
      
      Learn how to set up and optimize your proxies for maximum security and performance.
      
      ## 1. Proxy Types
      Understand the different types of proxies and when to use each.
      
      ## 2. Rotation Strategies
      Set up proxy rotation to avoid detection and IP bans.
      
      ## 3. Troubleshooting
      Common proxy issues and how to resolve them.
    `
  }
];

const faqCategories = [
  {
    id: 1,
    name: "Account Management",
    questions: [
      {
        question: "How do I add a new account?",
        answer: "Navigate to the Accounts tab, click the 'Add New' button, and fill out the account details in the form that appears. You can add multiple accounts from different platforms to automate tasks across various services simultaneously."
      },
      {
        question: "Can I use multiple accounts simultaneously?",
        answer: "Yes, MoneyHub supports managing multiple accounts simultaneously across different platforms. This allows you to diversify your automation strategy and maximize earnings potential. Each account can be configured with its own proxy and task settings."
      },
      {
        question: "How do I connect my account to a proxy?",
        answer: "In the account details page, you'll find a 'Proxy' section where you can select from your available proxies. Click on the dropdown menu to see all available proxies, or add a new proxy directly from this interface for immediate connection."
      },
      {
        question: "What happens if my account gets locked?",
        answer: "If an account gets locked or flagged by the platform, MoneyHub will automatically pause all running tasks for that account and notify you. You can then take appropriate action such as verifying the account with the platform or switching to a different account."
      },
      {
        question: "Can I import accounts in bulk?",
        answer: "Yes, MoneyHub supports bulk import of accounts using CSV files. Navigate to the Accounts section, click the menu button, and select 'Import Accounts'. You can download a template file to ensure your CSV is formatted correctly."
      }
    ]
  },
  {
    id: 2,
    name: "Proxies & Security",
    questions: [
      {
        question: "Why should I use proxies?",
        answer: "Proxies help protect your identity, avoid IP bans, and distribute tasks across multiple connections for better efficiency and security. They're essential for running multiple accounts on the same platform without triggering anti-automation measures."
      },
      {
        question: "What proxy types are supported?",
        answer: "MoneyHub supports HTTP, HTTPS, SOCKS4, and SOCKS5 proxy types. Each type has different advantages depending on your needs. SOCKS proxies generally provide better performance for certain applications, while HTTP proxies may be more compatible with specific platforms."
      },
      {
        question: "Is my data encrypted?",
        answer: "Yes, all data is encrypted both at rest and in transit using industry-standard encryption protocols. We use AES-256 encryption for stored data and TLS 1.3 for all communications between your browser and our servers. Additionally, sensitive information like passwords and API keys are encrypted using asymmetric encryption."
      },
      {
        question: "How often should I rotate proxies?",
        answer: "The optimal proxy rotation frequency depends on the platforms you're using and the volume of tasks. As a general rule, high-volume tasks should rotate proxies more frequently. MoneyHub allows you to set automatic rotation schedules or manually rotate when needed."
      },
      {
        question: "Can I use residential proxies?",
        answer: "Yes, MoneyHub supports residential proxies which are often more effective for avoiding detection. You can input residential proxy details just like any other proxy type, or purchase proxies directly through our integrated marketplace partners."
      }
    ]
  },
  {
    id: 3,
    name: "Task Automation",
    questions: [
      {
        question: "How many tasks can I run simultaneously?",
        answer: "The number of simultaneous tasks depends on your subscription plan. Free accounts can run up to 3 concurrent tasks, while premium plans allow for 10, 25, or unlimited concurrent tasks depending on your tier."
      },
      {
        question: "Can I schedule tasks to run at specific times?",
        answer: "Yes, MoneyHub has a powerful scheduling system. You can set tasks to run at specific times, on certain days of the week, or at regular intervals. This helps distribute your automation activity to appear more natural and avoid detection."
      },
      {
        question: "What happens if a task fails?",
        answer: "When a task fails, MoneyHub logs the error details and can attempt automatic recovery based on your settings. You can configure retry attempts, notification preferences, and fallback options for each task or globally."
      }
    ]
  }
];

const apiEndpoints = [
  {
    id: 1,
    path: "/api/accounts",
    method: "GET",
    description: "Retrieve all accounts with pagination support",
    status: "Stable",
    docLink: "/docs/api/accounts/get-all"
  },
  {
    id: 2,
    path: "/api/accounts/{id}",
    method: "GET",
    description: "Get single account details with full transaction history",
    status: "Stable",
    docLink: "/docs/api/accounts/get-one"
  },
  {
    id: 3,
    path: "/api/proxies",
    method: "GET",
    description: "Retrieve all proxies with filtering options",
    status: "Stable",
    docLink: "/docs/api/proxies/get-all"
  },
  {
    id: 4,
    path: "/api/tasks/start",
    method: "POST",
    description: "Start a new task with specified configuration",
    status: "Beta",
    docLink: "/docs/api/tasks/start"
  },
  {
    id: 5,
    path: "/api/analytics/summary",
    method: "GET",
    description: "Get analytics summary with customizable date range",
    status: "Stable",
    docLink: "/docs/api/analytics/summary"
  },
  {
    id: 6,
    path: "/api/accounts",
    method: "POST",
    description: "Create a new account with validation",
    status: "Stable",
    docLink: "/docs/api/accounts/create"
  },
  {
    id: 7,
    path: "/api/accounts/{id}",
    method: "PUT",
    description: "Update an existing account details",
    status: "Stable",
    docLink: "/docs/api/accounts/update"
  },
  {
    id: 8,
    path: "/api/accounts/{id}",
    method: "DELETE",
    description: "Delete an account and associated tasks",
    status: "Stable",
    docLink: "/docs/api/accounts/delete"
  },
  {
    id: 9,
    path: "/api/webhooks",
    method: "POST",
    description: "Register a new webhook for event notifications",
    status: "Beta",
    docLink: "/docs/api/webhooks/create"
  },
  {
    id: 10,
    path: "/api/tasks/batch",
    method: "POST",
    description: "Create multiple tasks in a single request",
    status: "Beta",
    docLink: "/docs/api/tasks/batch"
  }
];

export default KnowledgeBase;
