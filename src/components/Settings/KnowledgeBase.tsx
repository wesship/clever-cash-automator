
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const KnowledgeBase = () => {
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
            
            <TabsContent value="guides" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                {guides.map((guide) => (
                  <Card key={guide.id} className="overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium">{guide.title}</h3>
                        <Badge variant={guide.level === "Beginner" ? "default" : guide.level === "Intermediate" ? "secondary" : "outline"}>
                          {guide.level}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">{guide.description}</p>
                      <div className="flex justify-between items-center text-xs text-muted-foreground">
                        <span>Last updated: {guide.updated}</span>
                        <span>{guide.timeToRead} min read</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="faq" className="space-y-4">
              {faqCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <div key={index} className="pb-4 border-b last:border-0 last:pb-0">
                          <h4 className="font-medium mb-2">{faq.question}</h4>
                          <p className="text-sm text-muted-foreground">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
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
                      {apiEndpoints.map((endpoint) => (
                        <TableRow key={endpoint.id}>
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
                </CardContent>
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
    timeToRead: 5
  },
  {
    id: 2,
    title: "Advanced Analytics",
    description: "Deep dive into interpreting and utilizing analytics data for better decision making.",
    level: "Intermediate",
    updated: "August 3, 2023",
    timeToRead: 10
  },
  {
    id: 3,
    title: "Automation Strategies",
    description: "Learn effective strategies for automating financial tasks and maximizing returns.",
    level: "Advanced",
    updated: "September 12, 2023",
    timeToRead: 12
  },
  {
    id: 4,
    title: "Proxy Configuration",
    description: "Configure and optimize proxies for better performance and security.",
    level: "Intermediate",
    updated: "May 20, 2023",
    timeToRead: 8
  }
];

const faqCategories = [
  {
    id: 1,
    name: "Account Management",
    questions: [
      {
        question: "How do I add a new account?",
        answer: "Navigate to the Accounts tab, click the 'Add New' button, and fill out the account details in the form that appears."
      },
      {
        question: "Can I use multiple accounts simultaneously?",
        answer: "Yes, MoneyHub supports managing multiple accounts simultaneously across different platforms."
      },
      {
        question: "How do I connect my account to a proxy?",
        answer: "In the account details page, you'll find a 'Proxy' section where you can select from your available proxies."
      }
    ]
  },
  {
    id: 2,
    name: "Proxies & Security",
    questions: [
      {
        question: "Why should I use proxies?",
        answer: "Proxies help protect your identity, avoid IP bans, and distribute tasks across multiple connections for better efficiency and security."
      },
      {
        question: "What proxy types are supported?",
        answer: "MoneyHub supports HTTP, HTTPS, SOCKS4, and SOCKS5 proxy types."
      },
      {
        question: "Is my data encrypted?",
        answer: "Yes, all data is encrypted both at rest and in transit using industry-standard encryption protocols."
      }
    ]
  }
];

const apiEndpoints = [
  {
    id: 1,
    path: "/api/accounts",
    method: "GET",
    description: "Retrieve all accounts",
    status: "Stable"
  },
  {
    id: 2,
    path: "/api/accounts/{id}",
    method: "GET",
    description: "Get single account details",
    status: "Stable"
  },
  {
    id: 3,
    path: "/api/proxies",
    method: "GET",
    description: "Retrieve all proxies",
    status: "Stable"
  },
  {
    id: 4,
    path: "/api/tasks/start",
    method: "POST",
    description: "Start a new task",
    status: "Beta"
  },
  {
    id: 5,
    path: "/api/analytics/summary",
    method: "GET",
    description: "Get analytics summary",
    status: "Stable"
  },
  {
    id: 6,
    path: "/api/accounts",
    method: "POST",
    description: "Create a new account",
    status: "Stable"
  },
  {
    id: 7,
    path: "/api/accounts/{id}",
    method: "PUT",
    description: "Update an account",
    status: "Stable"
  },
  {
    id: 8,
    path: "/api/accounts/{id}",
    method: "DELETE",
    description: "Delete an account",
    status: "Stable"
  }
];

export default KnowledgeBase;
