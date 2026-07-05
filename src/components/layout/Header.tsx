"use client";

import React, { useState } from "react";
import { Music, Sparkles, Terminal, Palette } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import clsx from "clsx";

export default function Header() {
  const { isPlaying, togglePlay } = useAudio();
  const [theme, setTheme] = useState("glass");

  const changeTheme = (newTheme: string) => {
    setTheme(newTheme);
    document.body.className = `theme-${newTheme} antialiased font-body transition-colors duration-500 overflow-x-hidden`;
  };

  return (
    <header className="fixed top-0 left-0 w-full px-4 md:px-10 py-4 flex justify-between items-center z-50 backdrop-blur-md bg-black/30 border-b border-white/10">
      <div className="flex items-center gap-2 font-display text-xl font-bold">
        <span className="animate-pulse">✨</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
          Unperson
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={togglePlay}
          className={clsx(
            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300",
            isPlaying
              ? "bg-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.3)]"
              : "bg-white/5 text-gray-300 hover:bg-white/10"
          )}
        >
          <Music size={16} className={isPlaying ? "animate-spin-slow" : ""} />
          <span className="hidden sm:inline">
            {isPlaying ? "Vibing..." : "Click for cozy music"}
          </span>
        </button>

        <div className="flex bg-black/40 rounded-full p-1 backdrop-blur-lg border border-white/10">
          <button
            onClick={() => changeTheme("glass")}
            className={clsx(
              "p-2 rounded-full transition-all duration-300",
              theme === "glass" ? "bg-white/20 text-white" : "text-gray-400 hover:text-white"
            )}
            title="Cozy Glow"
          >
            <Sparkles size={16} />
          </button>
          <button
            onClick={() => changeTheme("brutalist")}
            className={clsx(
              "p-2 rounded-full transition-all duration-300",
              theme === "brutalist" ? "bg-white/20 text-[#ff007f]" : "text-gray-400 hover:text-white"
            )}
            title="Cyberpunk"
          >
            <Terminal size={16} />
          </button>
          <button
            onClick={() => changeTheme("pastel")}
            className={clsx(
              "p-2 rounded-full transition-all duration-300",
              theme === "pastel" ? "bg-white/20 text-[#f472b6]" : "text-gray-400 hover:text-white"
            )}
            title="Dreamy Pastel"
          >
            <Palette size={16} />
          </button>
        </div>
      </div>
    </header>
  );
}
