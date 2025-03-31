
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

interface ProxyFormProps {
  onSubmit: (proxy: any) => void;
  onCancel: () => void;
}

const ProxyForm = ({ onSubmit, onCancel }: ProxyFormProps) => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [ipCount, setIpCount] = useState<number>(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !location || !type) {
      toast.error("Please fill out all required fields");
      return;
    }
    
    const newProxy = {
      id: `proxy-${Date.now()}`,
      name,
      location,
      type,
      status: "active",
      ipCount: Number(ipCount),
      usedBy: 0
    };
    
    onSubmit(newProxy);
    toast.success("Proxy created successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Enter proxy name"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Proxy Type</Label>
        <Select value={type} onValueChange={setType} required>
          <SelectTrigger id="type">
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Residential">Residential</SelectItem>
            <SelectItem value="Datacenter">Datacenter</SelectItem>
            <SelectItem value="Mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Select value={location} onValueChange={setLocation} required>
          <SelectTrigger id="location">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Germany">Germany</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Japan">Japan</SelectItem>
            <SelectItem value="Singapore">Singapore</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="ipCount">Number of IPs</Label>
        <Input 
          id="ipCount" 
          type="number" 
          min={1}
          value={ipCount} 
          onChange={(e) => setIpCount(parseInt(e.target.value) || 1)} 
          required
        />
      </div>
      
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Create Proxy
        </Button>
      </div>
    </form>
  );
};

export default ProxyForm;
