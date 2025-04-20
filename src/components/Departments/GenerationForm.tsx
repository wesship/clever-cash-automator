
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';
import { toast } from "sonner";
import { GENERATION_OPTIONS, GenerationType } from '@/types/ai-types';

interface GenerationFormProps {
  apiKey: string;
  selectedType: GenerationType;
  onGenerate: (content: string) => void;
}

const GenerationForm: React.FC<GenerationFormProps> = ({
  apiKey,
  selectedType,
  onGenerate
}) => {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getCurrentOption = () => {
    return GENERATION_OPTIONS.find(option => option.type === selectedType)!;
  };

  const handleGenerate = async () => {
    if (!apiKey) {
      toast.error("Please enter your Perplexity API key");
      return;
    }

    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    setIsLoading(true);
    setError(null);
    const option = getCurrentOption();

    try {
      const response = await fetch('https://api.perplexity.ai/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'llama-3.1-sonar-small-128k-online',
          messages: [
            {
              role: 'system',
              content: option.systemPrompt
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(response.statusText || 'Failed to generate content');
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      onGenerate(generatedContent);
      toast.success(`${option.label} generated successfully!`);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate content');
      toast.error("Failed to generate content. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      <Input
        placeholder={getCurrentOption().placeholder}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={isLoading}
      />

      <Button 
        onClick={handleGenerate} 
        disabled={isLoading || !prompt}
        className="w-full"
      >
        {isLoading ? (
          <>
            <Loader className="mr-2" />
            Generating {getCurrentOption().label.toLowerCase()}...
          </>
        ) : (
          `Generate ${getCurrentOption().label}`
        )}
      </Button>
    </div>
  );
};

export default GenerationForm;
