import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Send, Terminal, Sparkles, Code, Cpu, Smartphone } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import InteractiveCharacter from './InteractiveCharacter';

export default function Hero() {
  const heroRef = useRef(null);
  const characterContainerRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ nx: 0, ny: 0 });

  // Normalized mouse coordinates: X in [-1, 1], Y in [-1, 1]
  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  // Physics spring for silky smooth, cinematic easing
  const springConfig = { damping: 26, stiffness: 85, mass: 1.0 };
  const smoothX = useSpring(rawMouseX, springConfig);
  const smoothY = useSpring(rawMouseY, springConfig);

  // Subtle Head Micro-Movement (Requirement 5: -1.5° to +1.5° Y, ±0.8° X, body/shoulders still)
  const headRotateY = useTransform(smoothX, [-1, 1], [-1.5, 1.5]);
  const headRotateX = useTransform(smoothY, [-1, 1], [0.8, -0.8]);
  const headShiftX = useTransform(smoothX, [-1, 1], [-1.0, 1.0]);
  const headShiftY = useTransform(smoothY, [-1, 1], [-0.5, 0.5]);

  // Background Parallax: Minimal 4px ambient movement
  const bgShiftX = useTransform(smoothX, [-1, 1], [-3, 3]);
  const bgShiftY = useTransform(smoothY, [-1, 1], [-3, 3]);

  // Foreground Badges Parallax: 10px float
  const foreShiftX = useTransform(smoothX, [-1, 1], [-10, 10]);
  const foreShiftY = useTransform(smoothY, [-1, 1], [-10, 10]);

  // Detect touch devices to disable mouse tracking on mobile
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
  }, []);

  // Global mousemove tracking with smooth hero entry/exit (Requirements 5, 7, 9)
  useEffect(() => {
    if (isTouchDevice) return;

    const handleWindowMouseMove = (e) => {
      const hero = heroRef.current;
      if (!hero || !characterContainerRef.current) return;

      const heroRect = hero.getBoundingClientRect();
      const isInsideHero = (
        e.clientY >= heroRect.top - 50 &&
        e.clientY <= heroRect.bottom + 50 &&
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right
      );

      setIsHovered(isInsideHero);

      if (!isInsideHero) {
        // Smoothly return head rotation to neutral (Requirement 9: 400-700ms)
        rawMouseX.set(0);
        rawMouseY.set(0);
        setMousePos({ nx: 0, ny: 0 });
        return;
      }

      const rect = characterContainerRef.current.getBoundingClientRect();
      const faceCenterX = rect.left + rect.width * 0.508;
      const faceCenterY = rect.top + rect.height * 0.340;

      const deltaX = e.clientX - faceCenterX;
      const deltaY = e.clientY - faceCenterY;

      const rangeX = Math.max(window.innerWidth * 0.45, 420);
      const rangeY = Math.max(window.innerHeight * 0.45, 320);

      const nx = Math.max(-1, Math.min(1, deltaX / rangeX));
      const ny = Math.max(-1, Math.min(1, deltaY / rangeY));

      rawMouseX.set(nx);
      rawMouseY.set(ny);
      setMousePos({ nx, ny });
    };

    const handleWindowMouseLeave = () => {
      setIsHovered(false);
      rawMouseX.set(0);
      rawMouseY.set(0);
      setMousePos({ nx: 0, ny: 0 });
    };

    window.addEventListener('mousemove', handleWindowMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleWindowMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      document.removeEventListener('mouseleave', handleWindowMouseLeave);
    };
  }, [isTouchDevice, rawMouseX, rawMouseY]);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 lg:pt-28 lg:pb-20 overflow-hidden"
    >
      {/* Background Layer: Deep nebulae with minimal parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        style={{
          x: isTouchDevice ? 0 : bgShiftX,
          y: isTouchDevice ? 0 : bgShiftY,
        }}
      >
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-cyan-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[650px] h-[650px] bg-blue-700/15 rounded-full blur-[170px]" />
        <div className="absolute inset-0 bg-cyber-grid opacity-35" />
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          
          {/* LEFT: Text Content with Floating & Scroll Animations */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-20">
            {/* Status chip with floating effect & frosted glass */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: [0, -5, 0] }}
              transition={{
                opacity: { duration: 0.6 },
                y: { duration: 4.5, repeat: Infinity, ease: 'easeInOut' }
              }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-wide mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Software Engineering Student & Developer</span>
            </motion.div>

            {/* Main Movie Poster Title with subtle floating breathing motion */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: [0, -6, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.1 },
                y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.2 }
              }}
              className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-4"
            >
              Hi, I'm <span className="text-gradient-electric drop-shadow-[0_0_35px_rgba(0,240,255,0.35)]">Guna</span>
            </motion.h1>

            {/* Subtitle with floating animation */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: [0, -4, 0] }}
              transition={{
                opacity: { duration: 0.8, delay: 0.2 },
                y: { duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }
              }}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-200 tracking-tight mb-6 flex flex-wrap items-center gap-2"
            >
              <span>Software Developer</span>
              <span className="text-cyan-400 font-mono">&</span>
              <span className="text-cyan-300">AI Builder</span>
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-base sm:text-lg text-slate-300 max-w-xl leading-relaxed mb-9"
            >
              {personalInfo.heroDescription}
            </motion.p>

            {/* Action Buttons with Glassy & Electric styling */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 sm:gap-5 w-full sm:w-auto mb-10"
            >
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="group relative flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_25px_rgba(0,240,255,0.4)] hover:shadow-[0_0_35px_rgba(0,240,255,0.6)] active:scale-95 transition-all duration-300"
              >
                <span>View My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-cyan-300 glass-pill hover:border-cyan-300 hover:shadow-[0_0_25px_rgba(0,240,255,0.35)] active:scale-95 transition-all duration-300"
              >
                <Send className="w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </button>
            </motion.div>

            {/* Quick stats & tech focus badges with Frosted Glass card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="glass-card p-4 rounded-2xl flex flex-wrap items-center gap-3 w-full max-w-xl border-white/10"
            >
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Focus:
              </span>
              <div className="flex flex-wrap gap-2">
                <span className="glass-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all">
                  <Code className="w-3 h-3 text-cyan-400" /> Web Development
                </span>
                <span className="glass-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all">
                  <Smartphone className="w-3 h-3 text-cyan-400" /> Mobile Apps
                </span>
                <span className="glass-pill inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all">
                  <Cpu className="w-3 h-3 text-cyan-400" /> AI Systems
                </span>
              </div>
            </motion.div>
          </div>

          {/* RIGHT: Live Transparent Uncropped Interactive Anime Character */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            
            {/* 3D Perspective Viewport: Expanded, Organic & Transparent */}
            <div 
              ref={characterContainerRef}
              className="relative w-full max-w-[560px] md:max-w-[620px] lg:max-w-[650px] xl:max-w-[700px] aspect-[800/738] flex items-center justify-center"
              style={{ perspective: 1200 }}
            >
              {/* Organic Cyan/Blue Atmospheric Glow behind character */}
              <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-tr from-cyan-500/20 via-blue-600/15 to-transparent blur-[90px] opacity-75" />
                <div className="absolute w-[60%] h-[60%] rounded-full bg-cyan-400/10 blur-[60px]" />
              </div>

              {/* Seamless Transparent Rig (No card box, no container borders!) */}
              <motion.div 
                className="relative w-full h-full flex items-center justify-center bg-transparent"
                style={{
                  transformStyle: 'preserve-3d',
                  rotateY: isTouchDevice ? 0 : headRotateY,
                  rotateX: isTouchDevice ? 0 : headRotateX,
                  x: isTouchDevice ? 0 : headShiftX,
                  y: isTouchDevice ? 0 : headShiftY,
                }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {/* Interactive Character Canvas Rig */}
                <InteractiveCharacter
                  isHovered={isHovered}
                  mousePos={mousePos}
                  isTouchDevice={isTouchDevice}
                />
              </motion.div>

              {/* Foreground Floating Badges with Frosted Glass Effect */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                  x: isTouchDevice ? 0 : foreShiftX,
                  y: isTouchDevice ? 0 : foreShiftY,
                }}
              >
                {/* Top-Right Badge */}
                <motion.div 
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 right-2 sm:right-6 px-3.5 py-1.5 rounded-xl glass-pill text-cyan-300 text-xs font-mono flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Builder</span>
                </motion.div>

                {/* Bottom-Left Badge */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-4 left-2 sm:left-6 px-3.5 py-1.5 rounded-xl glass-pill text-slate-200 text-xs font-mono flex items-center gap-1.5"
                >
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>Full-Stack Web & Mobile</span>
                </motion.div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
