import type { Metadata } from "next";
import { Outfit, Space_Grotesk, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/context/AudioContext";
import Header from "@/components/layout/Header";
import AudioPlayerWidget from "@/components/layout/AudioPlayerWidget";
import AnimeCompanion from "@/components/ui/AnimeCompanion";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-body" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const playfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", style: ['normal', 'italic'] });

export const metadata: Metadata = {
  title: "Unperson (aka Yash Patel) — Cozy Journey",
  description: "Hey, I am Unperson (aka Yash Patel). An interactive cozy storytelling personal website.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${spaceGrotesk.variable} ${playfairDisplay.variable} antialiased theme-glass`}>
        <AudioProvider>
          <AnimeCompanion />
          <Header />
          {children}
          <AudioPlayerWidget />
        </AudioProvider>
      </body>
    </html>
  );
}
