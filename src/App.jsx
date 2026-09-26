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
import ParticleBackground from './components/ParticleBackground';
import CursorGlow from './components/CursorGlow';
import AvatarCompanion from './components/AvatarCompanion';

export default function App() {
  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive subtle stardust particle background */}
      <ParticleBackground />

      {/* Ambient cursor glow spotlight for desktop */}
      <CursorGlow />

      {/* Sticky glassmorphic navbar */}
      <Navbar />

      {/* Main content sections */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Achievements />
        <Contact />
      </main>

      {/* Interactive Cartoon Mascot Avatar Companion */}
      <AvatarCompanion />

      {/* Footer */}
      <Footer />
    </div>
  );
}
