
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import { usePerplexityApi } from '@/hooks/use-perplexity-api';

const APIKeyManager = () => {
  const { apiKey, setApiKey, removeApiKey } = usePerplexityApi();
  const [error, setError] = React.useState<string | null>(null);

  const handleApiKeyChange = (value: string) => {
    setError(null);
    try {
      setApiKey(value);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="space-y-2">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Input
        type="password"
        placeholder="Enter your Perplexity API key (starts with 'pplx-')"
        value={apiKey}
        onChange={(e) => handleApiKeyChange(e.target.value)}
      />
      
      {apiKey && (
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            removeApiKey();
            setError(null);
            toast.success("API key removed");
          }}
          className="w-full"
        >
          Remove API Key
        </Button>
      )}
    </div>
  );
};

export default APIKeyManager;
