"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Cpu, Layout, Gamepad2 } from "lucide-react";

export default function AboutChapter() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-10 z-10" id="chapter-about">
      <div className="max-w-4xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-[var(--accent-color)] font-display font-bold tracking-widest text-sm uppercase mb-2 block">
            Chapter 01
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
            The Craft & Mindset
          </h2>
          
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-[var(--card-blur)] rounded-3xl p-8 md:p-10 shadow-[var(--card-shadow)]">
            <p className="text-lg md:text-xl text-[var(--text-color)] mb-6 leading-relaxed">
              I believe web design should feel like entering a cozy room on a rainy night—warm, expressive, and full of wonder.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-color)] mb-10 leading-relaxed">
              I spend my time experimenting with interactive canvas animations, building web tools, solving complex bugs, and crafting digital spaces that inspire.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                <Code2 size={16} className="text-[var(--highlight-color)]" /> JS & Web Alchemist
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                <Cpu size={16} className="text-[var(--highlight-color)]" /> Interactive Canvas
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                <Layout size={16} className="text-[var(--highlight-color)]" /> UI/UX Designer
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium">
                <Gamepad2 size={16} className="text-[var(--highlight-color)]" /> Retro Gaming Fanatic
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
