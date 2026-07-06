"use client";

import React from "react";
import { Play, Pause, SkipBack, SkipForward, Shuffle } from "lucide-react";
import { useAudio, PLAYLIST } from "@/context/AudioContext";
import clsx from "clsx";

export default function AudioPlayerWidget() {
  const { currentTrackIdx, isPlaying, togglePlay, nextTrack, prevTrack, shuffleTrack } = useAudio();
  const track = PLAYLIST[currentTrackIdx];

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:bottom-6 sm:right-6 flex items-center bg-[var(--card-bg)] border border-[var(--card-border)] backdrop-blur-[var(--card-blur)] rounded-xl sm:rounded-2xl p-2 sm:p-3 shadow-[var(--card-shadow)] z-50 transition-all duration-300 sm:w-80">
      <div className="relative w-10 h-10 sm:w-14 sm:h-14 rounded-lg overflow-hidden flex-shrink-0 border border-white/10">
        <img
          src={track.cover}
          alt={track.title}
          className={clsx("w-full h-full object-cover transition-transform duration-300", isPlaying ? "scale-110" : "scale-100")}
        />
        {isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-end justify-center pb-1 sm:pb-2 gap-[2px]">
            <span className="w-0.5 sm:w-1 h-2 sm:h-3 bg-white animate-[bounce_1s_infinite_0.1s] rounded-full"></span>
            <span className="w-0.5 sm:w-1 h-3 sm:h-4 bg-white animate-[bounce_1s_infinite_0.3s] rounded-full"></span>
            <span className="w-0.5 sm:w-1 h-1.5 sm:h-2 bg-white animate-[bounce_1s_infinite_0.2s] rounded-full"></span>
          </div>
        )}
      </div>

      <div className="ml-2.5 sm:ml-3 flex-grow min-w-0">
        <p className="text-white font-bold text-xs sm:text-sm truncate">{track.title}</p>
        <p className="text-[var(--text-muted)] text-[10px] sm:text-xs truncate">{track.artist}</p>
      </div>

      <div className="flex items-center gap-0.5 sm:gap-1 ml-1 sm:ml-2">
        <button onClick={prevTrack} className="p-1 sm:p-1.5 text-gray-400 hover:text-white transition-colors" title="Previous Track">
          <SkipBack size={15} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button onClick={togglePlay} className="p-1.5 sm:p-2 bg-[var(--accent-color)] text-white rounded-full hover:scale-110 transition-transform shadow-[0_0_15px_var(--accent-glow)]" title="Play/Pause">
          {isPlaying ? <Pause size={16} fill="currentColor" className="sm:w-5 sm:h-5" /> : <Play size={16} fill="currentColor" className="ml-0.5 sm:w-5 sm:h-5" />}
        </button>
        <button onClick={nextTrack} className="p-1 sm:p-1.5 text-gray-400 hover:text-white transition-colors" title="Next Track">
          <SkipForward size={15} fill="currentColor" className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button onClick={shuffleTrack} className="p-1 sm:p-1.5 text-gray-400 hover:text-[var(--highlight-color)] transition-colors" title="Shuffle">
          <Shuffle size={14} className="sm:w-4 sm:h-4" />
        </button>
      </div>
    </div>
  );
}
