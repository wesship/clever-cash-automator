
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { X, Info, HelpCircle, ArrowRight, CheckCircle } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

// First-time user welcome guide
export const WelcomeGuide: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    return localStorage.getItem("welcomeGuideDismissed") === "true";
  });

  useEffect(() => {
    // Show welcome guide only for first time users
    if (!dismissed) {
      const timer = setTimeout(() => setOpen(true), 1000);
      return () => clearTimeout(timer);
    }
  }, [dismissed]);

  const steps = [
    {
      title: "Welcome to AutoEarn!",
      description: "This platform helps you automate tasks to earn money online. Let's get you started with a quick tour.",
      image: "https://via.placeholder.com/400x200?text=Welcome"
    },
    {
      title: "Creating Your First Task",
      description: "Click on 'Create Task' to set up your first automation. Choose the platform, task type, and configure your settings.",
      image: "https://via.placeholder.com/400x200?text=Create+Task"
    },
    {
      title: "Monitor Your Progress",
      description: "Track your earnings and task progress in the dashboard. View detailed analytics to optimize your strategy.",
      image: "https://via.placeholder.com/400x200?text=Monitor+Progress"
    },
    {
      title: "You're All Set!",
      description: "Start creating tasks and watch your earnings grow. If you need help, check the tips section or contact support.",
      image: "https://via.placeholder.com/400x200?text=All+Set"
    }
  ];

  const handleDismiss = () => {
    setOpen(false);
    setDismissed(true);
    localStorage.setItem("welcomeGuideDismissed", "true");
  };

  const currentStep = steps[step];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md glass-card border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gradient">{currentStep.title}</DialogTitle>
          <DialogDescription>
            {currentStep.description}
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <img 
            src={currentStep.image} 
            alt={currentStep.title} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <DialogFooter className="flex justify-between items-center">
          <div className="flex space-x-1">
            {steps.map((_, index) => (
              <div 
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full",
                  index === step 
                    ? "bg-primary" 
                    : "bg-muted-foreground/30"
                )}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            {step > 0 && (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                Previous
              </Button>
            )}
            
            {step < steps.length - 1 ? (
              <Button onClick={() => setStep(step + 1)}>
                Next <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            ) : (
              <Button onClick={handleDismiss} className="gap-2 bg-gradient-purple-pink">
                <CheckCircle className="h-4 w-4" /> Get Started
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Helper tooltip component
export const FeatureTooltip: React.FC<{
  children: React.ReactNode;
  content: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}> = ({ children, content, side = "top", className }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <span className={className}>{children}</span>
        </TooltipTrigger>
        <TooltipContent side={side} className="bg-card/90 backdrop-blur-sm border-primary/20 text-sm">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

// Feature spotlight component
export const FeatureSpotlight: React.FC<{
  children: React.ReactNode;
  title: string;
  description: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
}> = ({ children, title, description, side = "right", className }) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={cn("relative group", className)}>
          {children}
          <div className="absolute -top-1 -right-1 bg-primary rounded-full p-0.5 text-primary-foreground opacity-70 group-hover:opacity-100 transition-opacity">
            <Info className="h-3 w-3" />
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent side={side} className="w-80 glass-card border-primary/20">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-gradient">{title}</h4>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

// FAQ component
export const FAQ: React.FC<{ className?: string }> = ({ className }) => {
  const faqs = [
    {
      question: "How do I create my first automated task?",
      answer: "Click on the 'Create Task' button, select the platform and task type, then configure the settings according to your preferences."
    },
    {
      question: "Is using AutoEarn against platform Terms of Service?",
      answer: "It depends on the platform. We recommend reviewing each platform's ToS before automating tasks. Some platforms explicitly prohibit automation tools."
    },
    {
      question: "How do I withdraw my earnings?",
      answer: "Navigate to the Wallet section in your account settings. Connect your preferred payment method (PayPal, bank account, crypto wallet) and request a withdrawal."
    },
    {
      question: "Do I need to use proxies?",
      answer: "For high-volume tasks or those that might trigger anti-automation measures, we highly recommend using proxies to prevent account bans."
    },
    {
      question: "What if a task fails?",
      answer: "Failed tasks will be marked in red. You can view error details, make necessary adjustments, and restart the task."
    }
  ];

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold text-gradient">Frequently Asked Questions</h3>
      <div className="space-y-2">
        {faqs.map((faq, index) => (
          <Collapsible key={index} className="border border-border/40 rounded-lg overflow-hidden">
            <CollapsibleTrigger className="flex justify-between items-center w-full p-3 text-left hover:bg-primary/5">
              <span className="font-medium">{faq.question}</span>
              <HelpCircle className="h-4 w-4 text-muted-foreground shrink-0" />
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pt-0 text-sm text-muted-foreground bg-background/50">
              {faq.answer}
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  );
};
