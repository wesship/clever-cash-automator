
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AIHelperCardProps {
  children: React.ReactNode;
}

const AIHelperCard: React.FC<AIHelperCardProps> = ({ children }) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>AI Department Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};

export default AIHelperCard;
