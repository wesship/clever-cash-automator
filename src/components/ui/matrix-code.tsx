
"use client";

import React, { useEffect, useRef } from "react";

interface RainTextProps {
  fontSize?: number;
  color?: string;
  characters?: string;
  fadeOpacity?: number;
  speed?: number;
  className?: string;
}

const RainText: React.FC<RainTextProps> = ({
  fontSize = 20,
  color = "#00ff00",
  characters = "01",
  fadeOpacity = 0.1,
  speed = 1.0,
  className,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    // Set canvas to fill the entire viewport
    canvas.width = width;
    canvas.height = height;

    const resizeCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resizeCanvas);

    // Create an array of all possible characters
    const chars = characters.split("");

    // Create falling characters
    const columns = Math.floor(width / fontSize);
    const drops: number[] = [];

    // Initialize drops array
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -height);
    }

    const draw = () => {
      // Create a fading effect
      ctx.fillStyle = `rgba(0, 0, 0, ${fadeOpacity})`;
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        // Select a random character from the chars array
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Draw the character
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Move the drop down
        drops[i]++;

        // Reset drop position when it reaches the bottom
        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -10);
        }
      }
    };

    // Animation loop
    let animationId: number;
    const animate = () => {
      draw();
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [fontSize, color, characters, fadeOpacity, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-10 ${className}`}
    />
  );
};

export default RainText;
