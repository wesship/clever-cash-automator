
import React, { useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPlatformAdapter, initializePlatformAdapters } from "@/lib/platforms";

// Initialize the adapters when the module loads
initializePlatformAdapters();

interface WebsiteSpecificParamsProps {
  form: UseFormReturn<any>;
  platform: string;
}

const WebsiteSpecificParams: React.FC<WebsiteSpecificParamsProps> = ({ form, platform }) => {
  // Get the adapter for the current platform
  const adapter = getPlatformAdapter(platform);
  
  // Set default values when platform changes
  useEffect(() => {
    if (!platform) return;
    
    // Get the default values for this platform
    const defaultValues = adapter.getDefaultValues();
    
    // Set default values for the platform if not already set
    Object.entries(defaultValues).forEach(([key, value]) => {
      if (form.getValues(`websiteParams.${key}`) === undefined) {
        form.setValue(`websiteParams.${key}`, value);
      }
    });
  }, [platform, form]);

  // If no platform selected, don't render anything
  if (!platform) {
    return null;
  }

  // Get the platform-specific form fields
  const platformFields = adapter.getFormFields(form);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Platform-Specific Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {platformFields ? (
          platformFields
        ) : (
          <p className="text-sm text-muted-foreground">
            No specific parameters available for this platform yet
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default WebsiteSpecificParams;
