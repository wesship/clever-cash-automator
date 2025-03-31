
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AccountFormProps {
  onSubmit: (account: any) => void;
  onCancel: () => void;
}

const AccountForm = ({ onSubmit, onCancel }: AccountFormProps) => {
  const [username, setUsername] = useState("");
  const [platform, setPlatform] = useState("");
  const [proxyEnabled, setProxyEnabled] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !platform) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const newAccount = {
      id: `acc-${Date.now()}`,
      username,
      platform,
      proxyEnabled,
      status: "active",
      lastUsed: new Date(),
      earnings: 0,
      taskCount: 0
    };
    
    onSubmit(newAccount);
    toast.success("Account created successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="platform">Platform</Label>
        <Select value={platform} onValueChange={setPlatform} required>
          <SelectTrigger id="platform">
            <SelectValue placeholder="Select platform" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="YouTube">YouTube</SelectItem>
            <SelectItem value="Fiverr">Fiverr</SelectItem>
            <SelectItem value="MTurk">MTurk</SelectItem>
            <SelectItem value="Swagbucks">Swagbucks</SelectItem>
            <SelectItem value="Upwork">Upwork</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="username">Username</Label>
        <Input 
          id="username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          placeholder="Enter username"
          required
        />
      </div>
      
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="proxyEnabled">Enable Proxy</Label>
          <p className="text-sm text-muted-foreground">
            Use a proxy with this account
          </p>
        </div>
        <Switch 
          id="proxyEnabled"
          checked={proxyEnabled}
          onCheckedChange={setProxyEnabled}
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default AccountForm;
