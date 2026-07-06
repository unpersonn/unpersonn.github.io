"use client";

import React from "react";
import { Play, Pause } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { motion } from "framer-motion";
import clsx from "clsx";

interface SongCardProps {
  index: number;
  id: string;
  title: string;
  artist: string;
  cover: string;
}

export default function SongCard({ index, title, artist, cover }: SongCardProps) {
  const { currentTrackIdx, isPlaying, playTrack, togglePlay } = useAudio();
  const isThisPlaying = currentTrackIdx === index && isPlaying;
  const isThisSelected = currentTrackIdx === index;

  const handleClick = () => {
    if (isThisSelected) {
      togglePlay();
    } else {
      playTrack(index);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      className={clsx(
        "relative flex flex-row sm:flex-col items-center sm:items-stretch p-2.5 sm:p-4 rounded-xl sm:rounded-[var(--card-radius)] backdrop-blur-none sm:backdrop-blur-[var(--card-blur)] border transition-all duration-300 cursor-pointer overflow-hidden group",
        isThisSelected
          ? "bg-[#0e1424] sm:bg-[var(--card-bg)] border-[var(--accent-color)] shadow-[0_10px_30px_var(--accent-glow)]"
          : "bg-[#0e1424] sm:bg-[var(--card-bg)] border-[var(--card-border)] shadow-[var(--card-shadow)] hover:border-white/30"
      )}
      onClick={handleClick}
    >
      <div className="relative w-12 h-12 sm:w-full sm:h-auto sm:aspect-square rounded-lg sm:rounded-xl overflow-hidden mb-0 sm:mb-4 mr-3 sm:mr-0 flex-shrink-0 border border-white/10">
        <img src={cover} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        <div className={clsx(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
          isThisPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white shadow-[0_0_20px_var(--accent-glow)] transform transition-transform group-hover:scale-110">
            {isThisPlaying ? <Pause size={16} fill="currentColor" className="sm:w-6 sm:h-6" /> : <Play size={16} fill="currentColor" className="ml-0.5 sm:w-6 sm:h-6 sm:ml-1" />}
          </div>
        </div>
      </div>

      <div className="flex flex-col z-10 flex-grow min-w-0">
        <span className={clsx("font-display font-bold text-sm sm:text-lg truncate transition-colors", isThisSelected ? "text-[var(--accent-color)]" : "text-white")}>
          {title}
        </span>
        <span className="text-[var(--text-muted)] text-xs sm:text-sm truncate">
          {artist}
        </span>
      </div>
      
      {isThisPlaying && (
        <div className="absolute top-3.5 right-3.5 sm:top-6 sm:right-6 flex items-end gap-0.5 sm:gap-1 h-3 sm:h-4">
          <span className="w-0.5 sm:w-1 h-2 sm:h-3 bg-[var(--accent-color)] animate-[bounce_1s_infinite_0.1s] rounded-full"></span>
          <span className="w-0.5 sm:w-1 h-3 sm:h-4 bg-[var(--accent-color)] animate-[bounce_1s_infinite_0.3s] rounded-full"></span>
          <span className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-[var(--accent-color)] animate-[bounce_1s_infinite_0.2s] rounded-full"></span>
        </div>
      )}
    </motion.div>
  );
}
