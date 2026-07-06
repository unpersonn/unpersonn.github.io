"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center pt-16 pb-8 sm:pt-20 sm:pb-10 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-4xl mx-auto flex flex-col items-center text-center z-10"
      >
        <div className="relative mb-4 sm:mb-6">
          <div className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-3 sm:border-4 border-[var(--accent-color)] shadow-[0_0_30px_var(--accent-glow)]">
            {/* Note: since avatar.png is in public/assets/images/, we reference it from root */}
            <img src="/assets/images/avatar.png" alt="Yash Patel (Unperson)" className="w-full h-full object-cover" />
          </div>
          <div className="absolute bottom-0 right-0 bg-green-500 text-black text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border-2 border-[var(--bg-color)] shadow-lg animate-pulse flex items-center gap-1">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-black rounded-full"></span> online
          </div>
        </div>

        <span className="text-[var(--accent-color)] font-display uppercase tracking-widest text-xs sm:text-sm font-bold mb-2 sm:mb-4 drop-shadow-[0_0_10px_var(--accent-glow)]">
          Welcome to my sanctuary
        </span>
        
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-display font-bold mb-2">
          Hey, I am <span className="bg-clip-text text-transparent bg-gradient-to-r from-[var(--highlight-color)] to-[var(--accent-color)]">Unperson</span>
        </h1>
        
        <p className="text-lg sm:text-xl md:text-2xl text-[var(--text-muted)] font-serif italic mb-6 sm:mb-8">
          (aka Yash Patel)
        </p>
        
        <p className="text-base sm:text-lg md:text-xl max-w-2xl text-gray-300 mb-8 sm:mb-16 leading-relaxed">
          Video Editor, Motion Designer & Visual Storyteller crafting cinematic, engaging & impactful media experiences.
        </p>
        
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center text-[var(--text-muted)] gap-1.5 opacity-60"
        >
          <span className="text-xs sm:text-sm uppercase tracking-widest">Scroll to explore</span>
          <ChevronDown size={20} className="sm:w-6 sm:h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
}
