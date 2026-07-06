"use client";

import React from "react";
import { motion } from "framer-motion";

const GAMES = [
  { id: 1, name: "Elden Ring", genre: "Action RPG • FromSoftware", color: "#ff416c" },
  { id: 2, name: "The Last of Us", genre: "Action-Adventure • Naughty Dog", color: "#10b981" },
  { id: 3, name: "Resident Evil", genre: "Survival Horror • Capcom", color: "#ef4444" },
  { id: 4, name: "Minecraft", genre: "Sandbox • Mojang Studios", color: "#22c55e" }
];

export default function GamesChapter() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center py-12 sm:py-20 px-3 sm:px-6 md:px-10 z-10" id="chapter-games">
      <div className="max-w-6xl w-full mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-8 sm:mb-12"
        >
          <span className="text-[var(--accent-color)] font-display font-bold tracking-widest text-xs sm:text-sm uppercase mb-1 sm:mb-2 block">
            Chapter 03
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-bold mb-2 sm:mb-4">
            Worlds I Get Lost In
          </h2>
          <p className="text-[var(--text-muted)] text-sm sm:text-lg max-w-2xl">
            Favorite video games that inspire my imagination and storytelling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
          {GAMES.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden bg-[#0e1424] sm:bg-[var(--card-bg)] border border-white/5 backdrop-blur-none sm:backdrop-blur-[var(--card-blur)] rounded-xl sm:rounded-2xl p-5 sm:p-8 hover:-translate-y-1.5 transition-transform duration-300 group"
              style={{ borderLeft: `4px solid ${game.color}` }}
            >
              <div className="absolute top-0 right-0 p-4 sm:p-8 opacity-10 font-display font-bold text-5xl sm:text-8xl transition-transform duration-500 group-hover:scale-110 group-hover:opacity-20 pointer-events-none select-none" style={{ color: game.color }}>
                0{game.id}
              </div>
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2 text-white">{game.name}</h3>
                <span className="text-[var(--text-muted)] text-xs sm:text-sm tracking-wider uppercase font-medium">{game.genre}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
