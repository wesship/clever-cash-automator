
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { PlusCircle, Edit2, Trash2, User, ShieldCheck, AlertTriangle, CheckCircle, ExternalLink } from "lucide-react";
import Background3D from "@/components/ui/3d-background";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Mock data for accounts
const mockAccounts = [
  {
    id: "1",
    platform: "Swagbucks",
    username: "user1234",
    status: "active",
    lastUsed: new Date(Date.now() - 3600000 * 2),
    proxyEnabled: true,
    earnings: 45.20,
    taskCount: 2
  },
  {
    id: "2",
    platform: "MTurk",
    username: "worker5678",
    status: "inactive",
    lastUsed: new Date(Date.now() - 86400000 * 2),
    proxyEnabled: false,
    earnings: 28.75,
    taskCount: 1
  },
  {
    id: "3",
    platform: "Fiverr",
    username: "creativepro",
    status: "active",
    lastUsed: new Date(Date.now() - 3600000 * 5),
    proxyEnabled: false,
    earnings: 78.50,
    taskCount: 1
  },
  {
    id: "4",
    platform: "YouTube",
    username: "viewchannel",
    status: "active",
    lastUsed: new Date(Date.now() - 86400000),
    proxyEnabled: true,
    earnings: 12.60,
    taskCount: 1
  },
  {
    id: "5",
    platform: "Upwork",
    username: "freelancer99",
    status: "suspended",
    lastUsed: new Date(Date.now() - 86400000 * 5),
    proxyEnabled: true,
    earnings: 0,
    taskCount: 1
  }
];

// Mock data for proxies
const mockProxies = [
  {
    id: "1",
    name: "US Residential",
    location: "United States",
    status: "active",
    type: "Residential",
    ipCount: 25,
    usedBy: 2
  },
  {
    id: "2",
    name: "EU Server",
    location: "Germany",
    status: "active",
    type: "Datacenter",
    ipCount: 10,
    usedBy: 1
  },
  {
    id: "3",
    name: "Asia Pacific",
    location: "Singapore",
    status: "inactive",
    type: "Residential",
    ipCount: 15,
    usedBy: 0
  }
];

const Accounts = () => {
  const [activeTab, setActiveTab] = useState("accounts");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Accounts & Proxies</span>
            </h1>
            
            <div className="flex items-center space-x-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="gap-1">
                    <PlusCircle className="h-4 w-4" />
                    Add New
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Account or Proxy</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <p className="text-center text-muted-foreground">Account and proxy creation form would go here</p>
                    <div className="flex justify-center">
                      <Button className="w-full max-w-xs">Create</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Tabs defaultValue="accounts" value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="accounts" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                Accounts
              </TabsTrigger>
              <TabsTrigger value="proxies" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <ShieldCheck className="h-4 w-4 mr-2" />
                Proxies
              </TabsTrigger>
            </TabsList>

            <TabsContent value="accounts" className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockAccounts.map((account) => (
                  <Card key={account.id} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{account.platform}</CardTitle>
                        <Badge variant={
                          account.status === "active" ? "default" :
                          account.status === "inactive" ? "secondary" :
                          "destructive"
                        }>
                          {account.status}
                        </Badge>
                      </div>
                      <CardDescription>{account.username}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Last Used</span>
                          <span className="text-sm">{account.lastUsed.toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Proxy</span>
                          <span className="text-sm">{account.proxyEnabled ? "Enabled" : "Disabled"}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Earnings</span>
                          <span className="text-sm text-vibrant-green">${account.earnings.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Tasks</span>
                          <span className="text-sm">{account.taskCount}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => navigate(`/accounts/${account.id}`)}
                      >
                        <ExternalLink className="h-3 w-3" />
                        Details
                      </Button>
                      {account.status === "active" ? (
                        <Button variant="outline" size="sm" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          Connect
                        </Button>
                      ) : (
                        <Button variant="destructive" size="sm" className="gap-1">
                          <Trash2 className="h-3 w-3" />
                          Delete
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="proxies" className="space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {mockProxies.map((proxy) => (
                  <Card key={proxy.id} className="bg-card/50 backdrop-blur-sm">
                    <CardHeader className="pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{proxy.name}</CardTitle>
                        <Badge variant={proxy.status === "active" ? "default" : "secondary"}>
                          {proxy.status}
                        </Badge>
                      </div>
                      <CardDescription>{proxy.type} - {proxy.location}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">IP Count</span>
                          <span className="text-sm">{proxy.ipCount}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Used By</span>
                          <span className="text-sm">{proxy.usedBy} accounts</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="outline" size="sm" className="gap-1">
                        <Edit2 className="h-3 w-3" />
                        Edit
                      </Button>
                      <Button variant="destructive" size="sm" className="gap-1">
                        <Trash2 className="h-3 w-3" />
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Accounts;
