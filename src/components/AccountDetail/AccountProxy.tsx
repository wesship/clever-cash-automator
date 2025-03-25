
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, Settings, ShieldCheck, AlertTriangle } from "lucide-react";

interface AccountProxyProps {
  account: any;
}

const AccountProxy = ({ account }: AccountProxyProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Proxy Configuration</CardTitle>
          <Badge className={account.proxyEnabled ? "bg-vibrant-green" : "bg-secondary"}>
            {account.proxyEnabled ? "Enabled" : "Disabled"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        {account.proxyEnabled ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Proxy Name</p>
                <p className="font-medium">{account.proxy.name}</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Location</p>
                <p className="font-medium">{account.proxy.location}</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">IP Address</p>
                <p className="font-medium">{account.proxy.ip}</p>
              </div>
              <div className="p-4 bg-background/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Last Rotated</p>
                <p className="font-medium">{account.proxy.lastRotated.toLocaleString()}</p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button className="flex-1 gap-1">
                <CheckCircle className="h-4 w-4" />
                Rotate IP
              </Button>
              <Button variant="outline" className="flex-1 gap-1">
                <Settings className="h-4 w-4" />
                Change Proxy
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-4">
            <AlertTriangle className="h-12 w-12 text-vibrant-yellow" />
            <h3 className="text-lg font-medium">No Proxy Configured</h3>
            <p className="text-center text-muted-foreground max-w-md">
              This account is operating without proxy protection, which may increase detection risk. 
              We recommend setting up a proxy for enhanced security.
            </p>
            <Button className="gap-1">
              <ShieldCheck className="h-4 w-4" />
              Setup Proxy
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AccountProxy;
