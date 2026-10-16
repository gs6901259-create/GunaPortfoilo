import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Education from './components/Education';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import LiquidBackground from './components/LiquidBackground';
import LiquidCursor from './components/LiquidCursor';
import AvatarCompanion from './components/AvatarCompanion';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#FAFAF8] text-ink-primary overflow-x-hidden selection:bg-sky-500/20 selection:text-sky-900">
      {/* Calm organic liquid ambient background */}
      <LiquidBackground />

      {/* Signature fluid membrane cursor follower (desktop mouse only) */}
      <LiquidCursor />

      {/* Translucent liquid glass navbar */}
      <Navbar />

      {/* Main portfolio content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>

      {/* Interactive Mascot Companion: Draggable with section-specific fullbody poses */}
      <AvatarCompanion />

      {/* Liquid white footer */}
      <Footer />
    </div>
  );
}
