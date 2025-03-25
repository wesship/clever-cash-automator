
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, Upload, UserCircle } from "lucide-react";
import { toast } from "sonner";

const AccountSettings = () => {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john.doe@example.com");
  const [avatarSrc, setAvatarSrc] = useState("");
  
  const handleSaveChanges = () => {
    // This would normally save to a backend
    toast.success("Account settings saved successfully");
  };

  const handleAvatarUpload = () => {
    // In a real app, this would open a file picker
    toast.info("Avatar upload will be available soon");
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your personal account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <Avatar className="h-20 w-20">
            <AvatarImage src={avatarSrc} />
            <AvatarFallback className="bg-primary/10 text-primary">
              <UserCircle className="h-10 w-10" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h3 className="font-medium">Profile Picture</h3>
            <Button variant="outline" size="sm" onClick={handleAvatarUpload}>
              <Upload className="h-4 w-4 mr-2" />
              Upload Photo
            </Button>
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input 
              id="fullName" 
              value={fullName} 
              onChange={(e) => setFullName(e.target.value)} 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <Label htmlFor="password">Change Password</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              id="currentPassword" 
              type="password" 
              placeholder="Current password" 
            />
            <Input 
              id="newPassword" 
              type="password" 
              placeholder="New password" 
            />
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="mt-2"
            onClick={() => toast.info("Password change functionality will be available soon")}
          >
            Change Password
          </Button>
        </div>
        
        <div className="pt-4 flex justify-end">
          <Button className="gap-2" onClick={handleSaveChanges}>
            <Save className="h-4 w-4" />
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountSettings;
