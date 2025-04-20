
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { usePerplexityApi } from '@/hooks/use-perplexity-api';
import { GENERATION_OPTIONS, GenerationType } from '@/types/ai-types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface DepartmentAIHelperProps {
  onDescriptionGenerated: (description: string) => void;
}

const DepartmentAIHelper: React.FC<DepartmentAIHelperProps> = ({ onDescriptionGenerated }) => {
  const { apiKey, setApiKey, removeApiKey, isValidKey } = usePerplexityApi();
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<GenerationType>('description');

  const handleApiKeyChange = (value: string) => {
    try {
      setApiKey(value);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  const getCurrentOption = () => {
    return GENERATION_OPTIONS.find(option => option.type === selectedType)!;
  };

  const generateContent = async () => {
    if (!apiKey) {
      toast.error("Please enter your Perplexity API key");
      return;
    }

    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

    const option = getCurrentOption();
    setIsLoading(true);

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
        throw new Error('Failed to generate content');
      }

      const data = await response.json();
      const generatedContent = data.choices[0].message.content;
      onDescriptionGenerated(generatedContent);
      toast.success(`${option.label} generated successfully!`);
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate content. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle>AI Department Assistant</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
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

        <Select
          value={selectedType}
          onValueChange={(value: GenerationType) => setSelectedType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select generation type" />
          </SelectTrigger>
          <SelectContent>
            {GENERATION_OPTIONS.map((option) => (
              <SelectItem key={option.type} value={option.type}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          placeholder={getCurrentOption().placeholder}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <Button 
          onClick={generateContent} 
          disabled={isLoading}
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
      </CardContent>
    </Card>
  );
};

export default DepartmentAIHelper;
