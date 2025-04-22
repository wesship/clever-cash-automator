import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import Background3D from "@/components/ui/3d-background";
import { Building, Users, BriefcaseBusiness, LucideIcon, Search, ShoppingCart, Newspaper, BarChart4, Code, HelpCircle, ScreenShare, Phone, Mail, MapPin } from "lucide-react";
import { toast } from "sonner";
import DepartmentAIHelper from '@/components/Departments/AIHelper';

interface DepartmentInfo {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  team: Array<{
    name: string;
    role: string;
    image: string;
  }>;
  tasks: string[];
  color: string;
}

const departments: DepartmentInfo[] = [
  {
    id: "marketing",
    name: "Marketing",
    description: "Responsible for promoting our services and attracting new clients through various channels.",
    icon: Newspaper,
    color: "bg-indigo-500",
    team: [
      {
        name: "Sarah Johnson",
        role: "Marketing Director",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "David Chen",
        role: "Social Media Manager",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Priya Patel",
        role: "Content Creator",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      }
    ],
    tasks: [
      "Social media campaign management",
      "Content creation and distribution",
      "Email marketing automation",
      "SEO and SEM optimization"
    ]
  },
  {
    id: "sales",
    name: "Sales",
    description: "Drives revenue by converting leads into customers and maintaining client relationships.",
    icon: ShoppingCart,
    color: "bg-emerald-500",
    team: [
      {
        name: "Michael Rodriguez",
        role: "Sales Director",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Emma Wilson",
        role: "Account Executive",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "James Lee",
        role: "Sales Representative",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      }
    ],
    tasks: [
      "Lead qualification and nurturing",
      "Demo presentations and pitches",
      "Contract negotiations",
      "Customer relationship management"
    ]
  },
  {
    id: "analytics",
    name: "Analytics",
    description: "Analyzes data to provide insights and improve decision-making across the organization.",
    icon: BarChart4,
    color: "bg-amber-500",
    team: [
      {
        name: "Alex Thompson",
        role: "Head of Analytics",
        image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Natalie Kim",
        role: "Data Scientist",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Omar Hassan",
        role: "Business Intelligence Analyst",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      }
    ],
    tasks: [
      "Performance metrics tracking",
      "Data visualization and reporting",
      "User behavior analysis",
      "Market trend forecasting"
    ]
  },
  {
    id: "development",
    name: "Development",
    description: "Builds and maintains our software products and infrastructure.",
    icon: Code,
    color: "bg-blue-500",
    team: [
      {
        name: "Daniel Garcia",
        role: "CTO",
        image: "https://images.unsplash.com/photo-1565464027194-7957a2295fb7?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Sophie Wright",
        role: "Lead Developer",
        image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Raj Patel",
        role: "Full Stack Engineer",
        image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      }
    ],
    tasks: [
      "Product development",
      "Bug fixing and testing",
      "Feature implementation",
      "Code review and optimization"
    ]
  },
  {
    id: "support",
    name: "Support",
    description: "Provides technical assistance and resolves user issues.",
    icon: HelpCircle,
    color: "bg-rose-500",
    team: [
      {
        name: "Lisa Williams",
        role: "Support Manager",
        image: "https://images.unsplash.com/photo-1601412436009-d964bd02edbc?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "John Miller",
        role: "Technical Support Specialist",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      },
      {
        name: "Grace Taylor",
        role: "Customer Success Manager",
        image: "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?ixlib=rb-1.2.1&auto=format&fit=crop&w=256&q=80"
      }
    ],
    tasks: [
      "Ticket management and resolution",
      "User guidance and training",
      "Documentation creation",
      "Product feedback collection"
    ]
  }
];

const Departments = () => {
  const handleDescriptionGenerated = (description: string) => {
    toast.info("Generated description: " + description);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0 mb-8">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-gradient">Departments</span>
              </h1>
              <p className="text-muted-foreground mt-2">
                Explore our organizational structure and team members
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search departments..." 
                  className="pl-9 pr-4 py-2 w-full sm:w-[250px] rounded-md border border-input bg-background"
                />
              </div>
              <Button 
                onClick={() => toast.info("Department management will be available soon!")}
              >
                <Building className="mr-2 h-4 w-4" />
                Manage Departments
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {departments.map((dept) => (
              <Card key={dept.id} className="overflow-hidden hover:shadow-lg transition-shadow bg-card/50 backdrop-blur-sm border border-border/40">
                <div className={`h-2 w-full ${dept.color}`}></div>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${dept.color} bg-opacity-10`}>
                        <dept.icon className="h-5 w-5" />
                      </div>
                      <CardTitle>{dept.name}</CardTitle>
                    </div>
                    <Badge variant="outline">{dept.team.length} Members</Badge>
                  </div>
                  <CardDescription className="mt-2">{dept.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <h4 className="text-sm font-medium mb-2">Team Members</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dept.team.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-2 bg-background rounded-full pl-1 pr-3 py-1 border border-border/40">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-xs">{member.name}</span>
                      </div>
                    ))}
                  </div>
                  
                  <h4 className="text-sm font-medium mb-2">Key Tasks</h4>
                  <ul className="space-y-1">
                    {dept.tasks.map((task, idx) => (
                      <li key={idx} className="text-sm text-muted-foreground flex items-start">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mr-2 mt-1.5"></span>
                        {task}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="border-t pt-4 flex justify-end">
                  <Button variant="outline" size="sm" onClick={() => toast.info(`Viewing details for ${dept.name} department`)}>
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <Separator className="my-10" />
          
          <div className="mb-10">
            <h2 className="text-2xl font-bold tracking-tight mb-6">Organization Overview</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <Card className="col-span-1 lg:col-span-2 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Organizational Structure</CardTitle>
                  <CardDescription>
                    Our company is organized into cross-functional teams
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <img 
                      src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Organizational chart" 
                      className="w-full h-[300px] object-cover rounded-md"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4">
                      <Button variant="outline" onClick={() => toast.info("Organizational chart view will be available soon")}>
                        View Full Chart
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="col-span-1 lg:col-span-2 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Department Statistics</CardTitle>
                  <CardDescription>
                    Key metrics across departments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Total Departments</div>
                        <div className="text-2xl font-bold">{departments.length}</div>
                      </div>
                      <div className="bg-primary/10 rounded-lg p-4">
                        <div className="text-sm text-muted-foreground">Team Members</div>
                        <div className="text-2xl font-bold">
                          {departments.reduce((acc, dept) => acc + dept.team.length, 0)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-card rounded-lg p-4 border border-border/40">
                      <h4 className="text-sm font-medium mb-3">Department Distribution</h4>
                      <div className="flex h-4 rounded-full overflow-hidden">
                        {departments.map((dept, idx) => (
                          <div 
                            key={idx} 
                            className={`${dept.color} h-full`} 
                            style={{ width: `${100 / departments.length}%` }}
                            title={dept.name}
                          ></div>
                        ))}
                      </div>
                      <div className="flex justify-between mt-2">
                        <span className="text-xs text-muted-foreground">Development</span>
                        <span className="text-xs text-muted-foreground">Support</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Contact Departments</h2>
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
                <CardDescription>
                  Reach out to our departments directly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 border border-border/40 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Phone className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Phone</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">Main Office: +1 (555) 123-4567</p>
                    <p className="text-sm text-muted-foreground">Support: +1 (555) 987-6543</p>
                  </div>
                  
                  <div className="p-4 border border-border/40 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <Mail className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Email</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">General: info@autoearn.com</p>
                    <p className="text-sm text-muted-foreground">Support: support@autoearn.com</p>
                  </div>
                  
                  <div className="p-4 border border-border/40 rounded-lg">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-4 w-4 text-primary" />
                      <h4 className="font-medium">Address</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      123 Tech Plaza, Suite 400<br />
                      San Francisco, CA 94107
                    </p>
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

export default Departments;
