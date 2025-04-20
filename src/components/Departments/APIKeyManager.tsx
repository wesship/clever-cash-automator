
import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { usePerplexityApi } from '@/hooks/use-perplexity-api';

const APIKeyManager = () => {
  const { apiKey, setApiKey, removeApiKey } = usePerplexityApi();

  const handleApiKeyChange = (value: string) => {
    try {
      setApiKey(value);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="space-y-2">
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
