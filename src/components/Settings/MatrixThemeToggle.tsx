
import React from "react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useMatrixTheme } from "@/hooks/use-matrix-theme";
import { Code } from "lucide-react";

const MatrixThemeToggle = () => {
  const { matrixEnabled, toggleMatrix } = useMatrixTheme();

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label className="text-base">Matrix Theme</Label>
        <p className="text-sm text-muted-foreground">
          Enable digital rain effect
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Switch 
          id="matrix-theme"
          checked={matrixEnabled}
          onCheckedChange={toggleMatrix}
        />
        <Code className="h-4 w-4 text-green-500" />
      </div>
    </div>
  );
};

export default MatrixThemeToggle;
