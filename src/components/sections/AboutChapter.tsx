"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Film, 
  Scissors, 
  Wand2, 
  Palette, 
  Volume2, 
  Layers, 
  Sparkles, 
  Clapperboard,
  Play,
  Sliders
} from "lucide-react";

export default function AboutChapter() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-20 px-4 md:px-10 z-10" id="chapter-about">
      <div className="max-w-5xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          {/* Chapter Badge & Title */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div>
              <span className="text-[var(--accent-color)] font-display font-bold tracking-widest text-sm uppercase mb-1 block flex items-center gap-2">
                <Film size={16} className="animate-spin-slow text-[var(--highlight-color)]" />
                Chapter 01 • The Edit Suite
              </span>
              <h2 className="text-4xl md:text-5xl font-display font-bold">
                Visual Storytelling & Edit Craft
              </h2>
            </div>
            
            {/* Editor HUD indicator */}
            <div className="flex items-center gap-3 bg-black/40 border border-white/10 px-4 py-2 rounded-xl backdrop-blur-md text-xs font-mono text-gray-400">
              <span className="flex items-center gap-1 text-red-500 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                REC
              </span>
              <span className="text-white font-bold">00:01:24:12</span>
              <span className="text-white/40">|</span>
              <span className="text-[var(--highlight-color)]">24 FPS</span>
              <span className="text-white/40">|</span>
              <span className="text-purple-400">4K DCI</span>
            </div>
          </div>
          
          {/* Main Content Card */}
          <div className="bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-[var(--card-blur)] rounded-3xl p-8 md:p-10 shadow-[var(--card-shadow)] relative overflow-hidden">
            {/* Decorative Editor Playhead background line */}
            <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-[var(--accent-color)] via-transparent to-transparent opacity-20 pointer-events-none"></div>

            <p className="text-lg md:text-xl text-[var(--text-color)] mb-4 leading-relaxed font-medium">
              I shape raw footage into compelling stories. To me, editing is the art of manipulating time, space, and emotion—crafting seamless cuts that pull viewers into every frame.
            </p>
            <p className="text-lg md:text-xl text-[var(--text-color)] mb-10 leading-relaxed text-[var(--text-muted)]">
              Whether it's rhythmic montage, cinematic color grading, or immersive sound design, I build narrative flows that resonate long after the final cut.
            </p>
            
            {/* Timeline UI Accent graphic */}
            <div className="mb-10 bg-black/50 border border-white/10 rounded-2xl p-4 overflow-hidden relative">
              <div className="flex items-center justify-between text-xs text-gray-400 mb-3 font-mono">
                <span className="flex items-center gap-1.5 text-white">
                  <Play size={12} className="fill-white text-white" /> TIMELINE SEQUENCER
                </span>
                <span>00:00 — 02:30</span>
              </div>
              {/* Tracks */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-purple-400 w-6">V2</span>
                  <div className="flex-1 h-5 bg-purple-950/60 border border-purple-500/30 rounded flex items-center px-2 text-[11px] text-purple-200">
                    <Wand2 size={10} className="mr-1.5 text-purple-300" /> VFX & Motion Graphic Overlays
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-sky-400 w-6">V1</span>
                  <div className="flex-1 h-5 bg-sky-950/60 border border-sky-500/30 rounded flex items-center px-2 text-[11px] text-sky-200">
                    <Film size={10} className="mr-1.5 text-sky-300" /> A-Roll Narrative & Cinematic B-Roll
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-amber-400 w-6">A1</span>
                  <div className="flex-1 h-5 bg-amber-950/60 border border-amber-500/30 rounded flex items-center px-2 text-[11px] text-amber-200">
                    <Volume2 size={10} className="mr-1.5 text-amber-300" /> Layered Sound Design & Spatial Audio
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Creative Editing Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--accent-color)]/50 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-[var(--accent-color)]">
                    <Scissors size={20} />
                  </div>
                  <h3 className="font-bold text-white">Narrative & Pacing</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Rhythmic cuts, match cuts, and structural pacing that hold tension and propel the storyline.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-[var(--highlight-color)]/50 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-sky-500/10 rounded-lg text-[var(--highlight-color)]">
                    <Wand2 size={20} />
                  </div>
                  <h3 className="font-bold text-white">Motion Design & VFX</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Dynamic kinetic typography, custom lower-thirds, green-screen compositing, and visual effects.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-amber-500/50 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-amber-500/10 rounded-lg text-amber-400">
                    <Palette size={20} />
                  </div>
                  <h3 className="font-bold text-white">Color Grading & Mood</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  DaVinci Resolve color correction, film emulation, custom LUT development, and shot matching.
                </p>
              </div>

              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Volume2 size={20} />
                  </div>
                  <h3 className="font-bold text-white">Sound Design & Mix</h3>
                </div>
                <p className="text-sm text-[var(--text-muted)]">
                  Detailed Foley work, sound effect layering, beat matching, and audio noise restoration.
                </p>
              </div>
            </div>

            {/* Software Toolkit */}
            <div>
              <span className="text-xs uppercase tracking-widest text-[var(--text-muted)] font-bold block mb-3">
                Editing Suite Toolkit
              </span>
              <div className="flex flex-wrap gap-3">
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                  <Clapperboard size={16} className="text-purple-400" /> Premiere Pro
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                  <Layers size={16} className="text-blue-400" /> After Effects
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                  <Sliders size={16} className="text-pink-400" /> DaVinci Resolve
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                  <Volume2 size={16} className="text-emerald-400" /> Adobe Audition
                </span>
                <span className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium hover:bg-white/10 transition-colors">
                  <Sparkles size={16} className="text-amber-400" /> Photoshop / Illustrator
                </span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}

