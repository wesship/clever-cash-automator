
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface Card3DProps extends React.ComponentProps<typeof Card> {
  intensity?: number;
  children: React.ReactNode;
  hoverEffects?: boolean;
  glareEffect?: boolean;
}

export const Card3D: React.FC<Card3DProps> = ({
  intensity = 10,
  children,
  className,
  hoverEffects = true,
  glareEffect = false,
  ...props
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hoverEffects) return;
    
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    // Calculate rotation based on mouse position
    const rotateY = ((mouseX / rect.width) - 0.5) * intensity;
    const rotateX = -((mouseY / rect.height) - 0.5) * intensity;
    
    // Update rotation state
    setRotateX(rotateX);
    setRotateY(rotateY);
    
    // Update glare position
    if (glareEffect) {
      const glareX = (mouseX / rect.width) * 100;
      const glareY = (mouseY / rect.height) * 100;
      setGlarePosition({ x: glareX, y: glareY });
    }
  };
  
  const handleMouseLeave = () => {
    if (!hoverEffects) return;
    
    // Reset rotation on mouse leave
    setRotateX(0);
    setRotateY(0);
    
    // Reset glare position
    if (glareEffect) {
      setGlarePosition({ x: 50, y: 50 });
    }
  };

  return (
    <Card
      className={cn(
        'transition-transform duration-200 ease-out relative overflow-hidden',
        hoverEffects && 'shadow-3d hover:shadow-3d-intense',
        className
      )}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {glareEffect && (
        <div
          className="absolute inset-0 opacity-20 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.8), transparent 70%)`,
          }}
        />
      )}
      {children}
    </Card>
  );
};

export const CardHeader3D = CardHeader;
export const CardContent3D = CardContent;
export const CardFooter3D = CardFooter;
export const CardTitle3D = CardTitle;
export const CardDescription3D = CardDescription;

export default Card3D;
