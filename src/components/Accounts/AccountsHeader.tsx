
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const AccountsHeader = () => {
  return (
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
  );
};

export default AccountsHeader;
