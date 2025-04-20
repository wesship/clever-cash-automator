
import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

interface DepartmentAIHelperErrorProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const DepartmentAIHelperError: React.FC<DepartmentAIHelperErrorProps> = ({
  error,
  resetErrorBoundary
}) => {
  return (
    <Alert variant="destructive">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Something went wrong</AlertTitle>
      <AlertDescription className="mt-2">
        <p className="mb-2">{error.message}</p>
        <Button 
          variant="outline" 
          size="sm"
          onClick={resetErrorBoundary}
          className="mt-2"
        >
          Try again
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default DepartmentAIHelperError;
