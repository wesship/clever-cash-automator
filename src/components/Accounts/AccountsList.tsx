
import React from "react";
import AccountCard from "./AccountCard";

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

interface AccountsListProps {
  accounts: AccountProps[];
  onDelete: (id: string) => void;
}

const AccountsList = ({ accounts, onDelete }: AccountsListProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.length > 0 ? (
        accounts.map((account) => (
          <AccountCard 
            key={account.id} 
            account={account} 
            onDelete={onDelete}
          />
        ))
      ) : (
        <div className="col-span-3 p-8 text-center">
          <p className="text-muted-foreground">No accounts found. Add your first account to get started.</p>
        </div>
      )}
    </div>
  );
};

export default AccountsList;
