"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import clsx from "clsx";

export default function AnimeCompanion() {
  const [face, setFace] = useState("(◕‿◕✿)");
  const [isMobile, setIsMobile] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if it's a touch device, hide companion if so
    if (window.matchMedia("(pointer: coarse)").matches) {
      setIsMobile(true);
      return;
    }

    let blinkInterval: NodeJS.Timeout;
    let blinkTimeout: NodeJS.Timeout;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setFace("(≧◡≦)");
    };
    
    const handleMouseUp = () => {
      setIsClicking(false);
      setFace("(◕‿◕✿)");
    };

    const scheduleBlink = () => {
      const nextBlink = Math.random() * 4000 + 2000; // 2-6 seconds
      blinkInterval = setTimeout(() => {
        setFace((prev) => (prev === "(≧◡≦)" ? prev : "(-‿-✿)")); // Don't interrupt click smile
        blinkTimeout = setTimeout(() => {
          setFace((prev) => (prev === "(≧◡≦)" ? prev : "(◕‿◕✿)"));
          scheduleBlink();
        }, 150); // Blink duration
      }, nextBlink);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    scheduleBlink();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      clearTimeout(blinkInterval);
      clearTimeout(blinkTimeout);
    };
  }, [cursorX, cursorY]);

  if (isMobile) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "15px", // Offset from actual cursor
        translateY: "15px",
      }}
      className={clsx(
        "fixed top-0 left-0 pointer-events-none z-[9999] px-3 py-1.5 rounded-full font-display text-sm font-bold shadow-lg backdrop-blur-md transition-colors duration-300",
        isClicking 
          ? "bg-[var(--accent-color)] text-white border border-[var(--highlight-color)] shadow-[0_0_20px_var(--accent-glow)] scale-110" 
          : "bg-white/10 text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
      )}
    >
      {face}
    </motion.div>
  );
}
