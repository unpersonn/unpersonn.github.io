"use client";

import React from "react";
import { motion } from "framer-motion";
import SongCard from "@/components/ui/SongCard";
import { PLAYLIST } from "@/context/AudioContext";

export default function MusicChapter() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-6 md:px-10 z-10">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-[var(--accent-color)] font-display font-bold tracking-widest text-xs sm:text-sm uppercase mb-1 sm:mb-2 block">
            Chapter 02
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-2 sm:mb-4">
            Soundtrack of My Life
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-lg max-w-2xl">
            The songs that accompany my midnight code sessions & creative flow. Click any track to set the mood.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {PLAYLIST.map((track, index) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <SongCard index={index} {...track} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
