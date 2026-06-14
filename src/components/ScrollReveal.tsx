import React from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
  amount?: number | "some" | "all";
  key?: string | number;
}

export default function ScrollReveal({ 
  children, 
  direction = "up", 
  delay = 0, 
  duration = 0.6,
  className = "",
  amount = 0.15
}: ScrollRevealProps) {
  
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 40 };
      case "down":
        return { opacity: 0, y: -40 };
      case "left":
        return { opacity: 0, x: 45 };
      case "right":
        return { opacity: 0, x: -45 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ 
        duration, 
        delay, 
        ease: [0.16, 1, 0.3, 1] // Custom snappy spring ease
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
