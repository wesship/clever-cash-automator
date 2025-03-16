
import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Save, Wifi, Bell, Shield, User, Moon, Sun, Clock } from "lucide-react";
import Background3D from "@/components/ui/3d-background";
import { useTheme } from "@/hooks/use-theme";
import { useUserPreferences } from "@/hooks/use-user-preferences";

const Settings = () => {
  const { theme, setTheme } = useTheme();
  const { preferences, updatePreference } = useUserPreferences();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Background3D />
      <Header />
      
      <main className="flex-1 pt-24 pb-16 px-4 md:px-8 relative">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
            <h1 className="text-3xl font-bold tracking-tight">
              <span className="text-gradient">Settings</span>
            </h1>
          </div>

          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="bg-card/50 backdrop-blur-sm">
              <TabsTrigger value="general" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <User className="h-4 w-4 mr-2" />
                General
              </TabsTrigger>
              <TabsTrigger value="notifications" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Shield className="h-4 w-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="network" className="data-[state=active]:bg-gradient-purple-pink data-[state=active]:text-white">
                <Wifi className="h-4 w-4 mr-2" />
                Network
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6 animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Appearance</CardTitle>
                  <CardDescription>Customize how the application looks and feels</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                        <span className="font-medium">Theme</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Choose between light and dark theme
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">Light</span>
                      <Switch 
                        checked={theme === "dark"}
                        onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
                      />
                      <span className="text-sm">Dark</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Welcome Guide</span>
                      <p className="text-sm text-muted-foreground">
                        Show welcome guide for new users
                      </p>
                    </div>
                    <Switch 
                      checked={preferences.showWelcomeGuide}
                      onCheckedChange={(checked) => updatePreference('showWelcomeGuide', checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Task View</span>
                      <p className="text-sm text-muted-foreground">
                        Default task view style
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant={preferences.defaultTaskView === "grid" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updatePreference('defaultTaskView', 'grid')}
                      >
                        Grid
                      </Button>
                      <Button 
                        variant={preferences.defaultTaskView === "list" ? "default" : "outline"}
                        size="sm"
                        onClick={() => updatePreference('defaultTaskView', 'list')}
                      >
                        List
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>User Interface</CardTitle>
                  <CardDescription>Customize the behavior of the application</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Animations</span>
                      <p className="text-sm text-muted-foreground">
                        Enable UI animations
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Autostart Tasks</span>
                      <p className="text-sm text-muted-foreground">
                        Automatically start scheduled tasks on login
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Confirm Actions</span>
                      <p className="text-sm text-muted-foreground">
                        Show confirmation dialogs for important actions
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6 animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Control when and how you get notified</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Task Completion</span>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tasks are completed
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Task Failures</span>
                      <p className="text-sm text-muted-foreground">
                        Get notified when tasks fail
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Earnings Reports</span>
                      <p className="text-sm text-muted-foreground">
                        Get weekly earnings reports
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Email Notifications</span>
                      <p className="text-sm text-muted-foreground">
                        Send important notifications to email
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6 animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Account Security</CardTitle>
                  <CardDescription>Manage your account security settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Two-Factor Authentication</span>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                    <Button variant="outline">Enable</Button>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Session Timeout</span>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out after inactivity
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">30 minutes</span>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">API Access</span>
                      <p className="text-sm text-muted-foreground">
                        Allow external applications to access your data
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="network" className="space-y-6 animate-fade-in">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Network Settings</CardTitle>
                  <CardDescription>Configure how the application connects to the internet</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Offline Mode</span>
                      <p className="text-sm text-muted-foreground">
                        Continue working when internet connection is lost
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Auto-Reconnect</span>
                      <p className="text-sm text-muted-foreground">
                        Automatically reconnect when connection is restored
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <span className="font-medium">Data Saving Mode</span>
                      <p className="text-sm text-muted-foreground">
                        Reduce data usage when on mobile networks
                      </p>
                    </div>
                    <Switch />
                  </div>
                  
                  <div className="pt-4 flex justify-end">
                    <Button className="gap-2">
                      <Save className="h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
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

export default Settings;
