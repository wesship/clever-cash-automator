
import React from "react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { motion } from "framer-motion";

export default function BackgroundDemo() {
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
      </motion.div>
    </div>
  );
}
