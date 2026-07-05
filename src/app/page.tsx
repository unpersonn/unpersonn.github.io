"use client";

import React from "react";
import BackgroundScene from "@/components/3d/BackgroundScene";
import Hero from "@/components/sections/Hero";
import MusicChapter from "@/components/sections/MusicChapter";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen selection:bg-[var(--accent-color)] selection:text-white">
      {/* 3D Background */}
      <BackgroundScene />

      {/* Story Content */}
      <div className="relative z-10 w-full flex flex-col">
        <Hero />
        
        {/* Decorative Divider */}
        <div className="w-full flex justify-center py-10 opacity-30">
          <div className="w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
        </div>

        <MusicChapter />
        
        {/* More chapters can be added here in the future */}
        <div className="w-full h-40"></div>
      </div>
    </main>
  );
}
