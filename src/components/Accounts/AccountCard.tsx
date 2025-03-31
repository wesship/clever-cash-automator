
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, CheckCircle, Trash2 } from "lucide-react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";

interface AccountProps {
  id: string;
  platform: string;
  username: string;
  status: string;
  lastUsed: Date;
  proxyEnabled: boolean;
  earnings: number;
  taskCount: number;
}

interface AccountCardProps {
  account: AccountProps;
  onDelete: (id: string) => void;
}

const AccountCard = ({ account, onDelete }: AccountCardProps) => {
  const navigate = useNavigate();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  
  return (
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
          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="destructive" size="sm" className="gap-1">
                <Trash2 className="h-3 w-3" />
                Delete
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Delete Account</DialogTitle>
                <DialogDescription>
                  Are you sure you want to delete this account? This action cannot be undone.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
                <Button 
                  variant="destructive" 
                  onClick={() => {
                    onDelete(account.id);
                    setIsDeleteDialogOpen(false);
                  }}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
};

export default AccountCard;
