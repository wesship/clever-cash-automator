
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

const AccountsList = ({ accounts }: { accounts: AccountProps[] }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {accounts.map((account) => (
        <AccountCard key={account.id} account={account} />
      ))}
    </div>
  );
};

export default AccountsList;
