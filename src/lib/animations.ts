
import { MotionProps } from "framer-motion";

export const fadeIn = (delay: number = 0): MotionProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { 
    duration: 0.5, 
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const slideUp = (delay: number = 0): MotionProps => ({
  initial: { y: 20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { 
    duration: 0.5, 
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const slideInLeft = (delay: number = 0): MotionProps => ({
  initial: { x: -20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    duration: 0.5, 
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const slideInRight = (delay: number = 0): MotionProps => ({
  initial: { x: 20, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: { 
    duration: 0.5, 
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const scaleUp = (delay: number = 0): MotionProps => ({
  initial: { scale: 0.95, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { 
    duration: 0.5, 
    delay,
    ease: [0.22, 1, 0.36, 1]
  }
});

export const staggerChildren = (staggerTime: number = 0.1): MotionProps => ({
  variants: {
    show: {
      transition: {
        staggerChildren: staggerTime
      }
    }
  },
  initial: "hidden",
  animate: "show"
});

export const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
};
