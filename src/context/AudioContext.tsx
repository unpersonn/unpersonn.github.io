"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from "react";

export interface Track {
  id: string;
  title: string;
  artist: string;
  cover: string;
  audioSrc: string;
}

export const PLAYLIST: Track[] = [
  {
    id: "k",
    title: "K.",
    artist: "Cigarettes After Sex",
    cover: "/assets/images/k.jpeg",
    audioSrc: "/assets/audio/k.mp3",
  },
  {
    id: "her",
    title: "her",
    artist: "JVKE",
    cover: "/assets/images/her.jpeg",
    audioSrc: "/assets/audio/her.mp3",
  },
  {
    id: "sayoko",
    title: "Sayoko",
    artist: "ryoko",
    cover: "/assets/images/sayoko.jpeg",
    audioSrc: "/assets/audio/sayoko.mp3",
  },
  {
    id: "3d",
    title: "3D (feat. Jack Harlow)",
    artist: "Jung Kook",
    cover: "/assets/images/3d.jpeg",
    audioSrc: "/assets/audio/3d.mp3",
  },
];

interface AudioContextType {
  currentTrackIdx: number;
  isPlaying: boolean;
  playTrack: (index: number) => void;
  togglePlay: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  shuffleTrack: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrackIdx, setCurrentTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(PLAYLIST[currentTrackIdx].audioSrc);
    audioRef.current.addEventListener("ended", nextTrack);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", nextTrack);
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIdx]);

  const playTrack = (index: number) => {
    if (currentTrackIdx === index) {
      togglePlay();
      return;
    }
    setCurrentTrackIdx(index);
    if (audioRef.current) {
      audioRef.current.src = PLAYLIST[index].audioSrc;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const nextTrack = () => {
    playTrack((currentTrackIdx + 1) % PLAYLIST.length);
  };

  const prevTrack = () => {
    playTrack((currentTrackIdx - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const shuffleTrack = () => {
    let randIdx;
    do {
      randIdx = Math.floor(Math.random() * PLAYLIST.length);
    } while (PLAYLIST.length > 1 && randIdx === currentTrackIdx);
    playTrack(randIdx);
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrackIdx,
        isPlaying,
        playTrack,
        togglePlay,
        nextTrack,
        prevTrack,
        shuffleTrack,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
