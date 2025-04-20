
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader } from "@/components/ui/Loader";
import { toast } from "sonner";

interface DepartmentAIHelperProps {
  onDescriptionGenerated: (description: string) => void;
}

const DepartmentAIHelper: React.FC<DepartmentAIHelperProps> = ({ onDescriptionGenerated }) => {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const generateDescription = async () => {
    if (!apiKey) {
      toast.error("Please enter your Perplexity API key");
      return;
    }

    if (!prompt) {
      toast.error("Please enter a prompt");
      return;
    }

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
              content: 'You are a helpful assistant that generates concise and professional department descriptions for businesses.'
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
        throw new Error('Failed to generate description');
      }

      const data = await response.json();
      const generatedDescription = data.choices[0].message.content;
      onDescriptionGenerated(generatedDescription);
      toast.success("Description generated successfully!");
    } catch (error) {
      console.error('Error:', error);
      toast.error("Failed to generate description. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card/50 backdrop-blur-sm">
      <h3 className="text-lg font-medium">AI Department Description Generator</h3>
      <div className="space-y-2">
        <Input
          type="password"
          placeholder="Enter your Perplexity API key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
        />
        <Input
          placeholder="Enter department details (e.g., 'Generate a description for the Marketing department')"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <Button 
          onClick={generateDescription} 
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <Loader className="mr-2" />
              Generating...
            </>
          ) : (
            'Generate Description'
          )}
        </Button>
      </div>
    </div>
  );
};

export default DepartmentAIHelper;
