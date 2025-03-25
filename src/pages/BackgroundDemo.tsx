
import React from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function BackgroundDemo() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundPaths title="DEVONN.AI Moneyhub" />
      
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-full max-w-xl px-4"
      >
        <img 
          src="/lovable-uploads/0ef337f5-e8d0-4747-ab97-e3d6e0e3ea12.png" 
          alt="DEVONN.AI Logo" 
          className="w-full h-auto object-contain shadow-xl rounded-lg"
        />
        
        <div className="mt-8 text-center">
          <Button 
            size="lg"
            variant="outline" 
            onClick={() => navigate('/')}
            className="group rounded-xl px-8 py-6 text-lg font-semibold transition-all duration-300 border-[#00ff00] text-[#00ff00] hover:bg-[#00ff00]/10 hover:shadow-[0_0_15px_rgba(0,255,0,0.3)] hover:-translate-y-0.5"
          >
            <span className="opacity-90 group-hover:opacity-100 transition-opacity">
              Enter Moneyhub
            </span>
            <span className="ml-3 opacity-70 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all duration-300">
              →
            </span>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
