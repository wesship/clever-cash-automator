
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface AccountsHeaderProps {
  onAddNew: () => void;
}

const AccountsHeader = ({ onAddNew }: AccountsHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0 mb-8">
      <h1 className="text-3xl font-bold tracking-tight">
        <span className="text-gradient">Accounts & Proxies</span>
      </h1>
      
      <div className="flex items-center space-x-2">
        <Button className="gap-1" onClick={onAddNew}>
          <PlusCircle className="h-4 w-4" />
          Add New
        </Button>
      </div>
    </div>
  );
};

export default AccountsHeader;
