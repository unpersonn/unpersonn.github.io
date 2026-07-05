"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle } from "lucide-react";
import { useAudio, PLAYLIST } from "@/context/AudioContext";
import clsx from "clsx";

export default function AudioPlayerWidget() {
  const { currentTrackIdx, isPlaying, togglePlay, nextTrack, prevTrack, shuffleTrack } = useAudio();
  const track = PLAYLIST[currentTrackIdx];

  return (
    <div className="fixed bottom-6 right-6 flex items-center bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-[var(--card-blur)] rounded-2xl p-3 shadow-[var(--card-shadow)] z-50 transition-all duration-300 w-80">
      <div className="relative w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
        <img
          src={track.cover}
          alt={track.title}
          className={clsx("w-full h-full object-cover transition-transform duration-300", isPlaying ? "scale-110" : "scale-100")}
        />
        {isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-2 gap-[2px]">
            <span className="w-1 h-3 bg-white animate-[bounce_1s_infinite_0.1s] rounded-full"></span>
            <span className="w-1 h-4 bg-white animate-[bounce_1s_infinite_0.3s] rounded-full"></span>
            <span className="w-1 h-2 bg-white animate-[bounce_1s_infinite_0.2s] rounded-full"></span>
          </div>
        )}
      </div>

      <div className="ml-3 flex-grow min-w-0">
        <p className="text-white font-bold text-sm truncate">{track.title}</p>
        <p className="text-[var(--text-muted)] text-xs truncate">{track.artist}</p>
      </div>

      <div className="flex items-center gap-1 ml-2">
        <button onClick={prevTrack} className="p-1.5 text-gray-400 hover:text-white transition-colors">
          <SkipBack size={18} fill="currentColor" />
        </button>
        <button onClick={togglePlay} className="p-2 bg-[var(--accent-color)] text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_var(--accent-glow)]">
          {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-0.5" />}
        </button>
        <button onClick={nextTrack} className="p-1.5 text-gray-400 hover:text-white transition-colors">
          <SkipForward size={18} fill="currentColor" />
        </button>
        <button onClick={shuffleTrack} className="p-1.5 text-gray-400 hover:text-[var(--highlight-color)] transition-colors">
          <Shuffle size={16} />
        </button>
      </div>
    </div>
  );
}
