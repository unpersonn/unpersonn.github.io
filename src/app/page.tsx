"use client";

import React from "react";
import BackgroundScene from "@/components/3d/BackgroundScene";
import Hero from "@/components/sections/Hero";
import AboutChapter from "@/components/sections/AboutChapter";
import MusicChapter from "@/components/sections/MusicChapter";
import GamesChapter from "@/components/sections/GamesChapter";
import ConnectChapter from "@/components/sections/ConnectChapter";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen selection:bg-[var(--accent-color)] selection:text-white">
      {/* 3D Background */}
      <BackgroundScene />

      {/* Story Content */}
      <div className="relative z-10 w-full flex flex-col">
        <Hero />
        
        {/* Decorative Divider */}
        <div className="w-full flex justify-center py-4 sm:py-10 opacity-30">
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <AboutChapter />
        
        <div className="w-full flex justify-center py-4 sm:py-10 opacity-30">
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <MusicChapter />
        
        <div className="w-full flex justify-center py-4 sm:py-10 opacity-30">
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <GamesChapter />

        <div className="w-full flex justify-center py-4 sm:py-10 opacity-30">
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <ConnectChapter />
      </div>
    </main>
  );
}
