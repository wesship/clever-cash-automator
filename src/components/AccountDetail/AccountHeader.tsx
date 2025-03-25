
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, User, Settings, CheckCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Account } from "@/types/account.types";

interface AccountHeaderProps {
  account: Account;
  getStatusColor: (status: string) => string;
}

const AccountHeader = ({ account, getStatusColor }: AccountHeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col space-y-2 md:space-y-0 mb-8">
      <div className="flex items-center mb-4">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate('/accounts')}
          className="gap-1"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Accounts
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="space-y-1 flex items-center gap-3">
          <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
            <User className="h-6 w-6 text-primary" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight">
                <span className="text-gradient">{account.username}</span>
              </h1>
              <Badge className={getStatusColor(account.status)}>{account.status}</Badge>
            </div>
            <p className="text-muted-foreground">{account.platform} account</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-1">
                <Settings className="h-4 w-4" />
                Configure
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Account Configuration</DialogTitle>
                <DialogDescription>
                  Adjust settings for the {account.username} account
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <p className="text-center text-muted-foreground">Account configuration options would go here</p>
              </div>
              <DialogFooter>
                <Button>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          
          <Button className="gap-1">
            <CheckCircle className="h-4 w-4" />
            {account.status === "active" ? "Pause Account" : "Activate Account"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountHeader;
