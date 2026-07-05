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
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      className={clsx(
        "relative flex flex-col p-4 rounded-[var(--card-radius)] backdrop-blur-[var(--card-blur)] border transition-all duration-300 cursor-pointer overflow-hidden group",
        isThisSelected
          ? "bg-[var(--card-bg)] border-[var(--accent-color)] shadow-[0_10px_30px_var(--accent-glow)]"
          : "bg-[var(--card-bg)] border-[var(--card-border)] shadow-[var(--card-shadow)] hover:border-white/30"
      )}
      onClick={handleClick}
    >
      <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 border border-white/10">
        <img src={cover} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
        
        <div className={clsx(
          "absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300",
          isThisPlaying ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}>
          <div className="w-12 h-12 rounded-full bg-[var(--accent-color)] flex items-center justify-center text-white shadow-[0_0_20px_var(--accent-glow)] transform transition-transform group-hover:scale-110">
            {isThisPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" className="ml-1" />}
          </div>
        </div>
      </div>

      <div className="flex flex-col z-10">
        <span className={clsx("font-display font-bold text-lg truncate transition-colors", isThisSelected ? "text-[var(--accent-color)]" : "text-white")}>
          {title}
        </span>
        <span className="text-[var(--text-muted)] text-sm truncate">
          {artist}
        </span>
      </div>
      
      {isThisPlaying && (
        <div className="absolute top-6 right-6 flex items-end gap-1 h-4">
          <span className="w-1 h-3 bg-[var(--accent-color)] animate-[bounce_1s_infinite_0.1s] rounded-full"></span>
          <span className="w-1 h-4 bg-[var(--accent-color)] animate-[bounce_1s_infinite_0.3s] rounded-full"></span>
          <span className="w-1 h-2 bg-[var(--accent-color)] animate-[bounce_1s_infinite_0.2s] rounded-full"></span>
        </div>
      )}
    </motion.div>
  );
}
