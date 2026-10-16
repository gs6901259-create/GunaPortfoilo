import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, Send, Terminal, Code, Cpu, Smartphone, MapPin, Sparkles } from 'lucide-react';
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

  // Foreground Badges Parallax: Subtle 8px float
  const foreShiftX = useTransform(smoothX, [-1, 1], [-8, 8]);
  const foreShiftY = useTransform(smoothY, [-1, 1], [-8, 8]);

  // Detect touch devices to disable mouse tracking on mobile
  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    setIsTouchDevice(isTouch);
  }, []);

  // Global mousemove tracking with smooth hero entry/exit
  useEffect(() => {
    if (isTouchDevice) return;

    const handleWindowMouseMove = (e) => {
      const hero = heroRef.current;
      if (!hero || !characterContainerRef.current) return;

      const heroRect = hero.getBoundingClientRect();
      const isInsideHero = (
        e.clientY >= heroRect.top - 60 &&
        e.clientY <= heroRect.bottom + 60 &&
        e.clientX >= heroRect.left &&
        e.clientX <= heroRect.right
      );

      setIsHovered(isInsideHero);

      if (!isInsideHero) {
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
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 lg:pt-32 lg:pb-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* LEFT: Hero Editorial Content */}
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-start z-20">
            
            {/* Small Eyebrow & Status */}
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full liquid-pill text-xs font-mono font-medium tracking-wide text-ink-secondary mb-6 shadow-liquid-sm"
            >
              <span className="w-2 h-2 rounded-full bg-liquid-blue animate-pulse" />
              <span className="font-semibold text-ink-primary">SOFTWARE DEVELOPER · AI BUILDER</span>
            </motion.div>

            {/* Main Heading: "Building digital experiences that feel different." */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold tracking-tight text-ink-primary leading-[1.08] mb-6 font-sans"
            >
              Building digital <br />
              experiences that <br />
              <span className="text-gradient-liquid">feel different.</span>
            </motion.h1>

            {/* Supporting Copy */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-base sm:text-lg text-ink-secondary max-w-xl leading-relaxed mb-8"
            >
              I'm Guna, a software engineering student passionate about building useful software, exploring AI, and turning ambitious ideas into real-world digital experiences.
            </motion.p>

            {/* Action Buttons: "Explore My Work" & "Let's Connect" */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 sm:gap-4 w-full sm:w-auto mb-8"
            >
              <button
                type="button"
                onClick={() => scrollTo('projects')}
                className="group inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide btn-liquid-primary"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('contact')}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide btn-liquid-secondary"
              >
                <Send className="w-4 h-4 text-liquid-blue group-hover:scale-110 transition-transform" />
                <span>Let's Connect</span>
              </button>
            </motion.div>

            {/* Location & Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 text-xs font-mono text-ink-secondary"
            >
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-liquid-blue" />
                <span>Based in India · Open to opportunities</span>
              </div>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-500" />
                <span>Web · Mobile · AI</span>
              </div>
            </motion.div>

          </div>

          {/* RIGHT: Restrained Anime Character Presentation on Frosted Liquid Glass Stage */}
          <div className="lg:col-span-6 xl:col-span-6 relative flex items-center justify-center">
            
            {/* 3D Perspective Viewport */}
            <div 
              ref={characterContainerRef}
              className="relative w-full max-w-[500px] md:max-w-[540px] lg:max-w-[580px] aspect-[800/738] flex items-center justify-center"
              style={{ perspective: 1200 }}
            >
              {/* Soft Pearl-Silver Ambient Lighting behind character */}
              <div className="absolute inset-0 pointer-events-none -z-10 flex items-center justify-center">
                <div className="w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-slate-200/30 via-white/70 to-slate-100/40 blur-[90px]" />
              </div>

              {/* Minimal Liquid Glass Pedestal behind/below character */}
              <div className="absolute bottom-2 inset-x-8 h-28 rounded-3xl bg-white/40 border border-black/[0.05] shadow-liquid -z-10 backdrop-blur-xl" />

              {/* Character Presentation - Body stays fixed while only eyes move */}
              <div 
                className="relative w-full h-full flex items-center justify-center bg-transparent"
              >
                {/* Interactive Character Canvas Rig */}
                <InteractiveCharacter
                  isHovered={isHovered}
                  mousePos={mousePos}
                  isTouchDevice={isTouchDevice}
                />
              </div>

              {/* Subtle Foreground Badges */}
              <motion.div
                className="absolute inset-0 pointer-events-none z-30"
                style={{
                  x: isTouchDevice ? 0 : foreShiftX,
                  y: isTouchDevice ? 0 : foreShiftY,
                }}
              >
                {/* Top-Right Badge: Eye Tracking Active */}
                <motion.div 
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-4 right-2 sm:right-6 px-3 py-1.5 rounded-full liquid-pill text-ink-primary text-xs font-mono flex items-center gap-1.5 shadow-liquid-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-liquid-blue" />
                  <span>Eyes follow cursor</span>
                </motion.div>

                {/* Bottom-Left Badge: Engineering Focus */}
                <motion.div 
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-6 left-2 sm:left-6 px-3 py-1.5 rounded-full liquid-pill text-ink-primary text-xs font-mono flex items-center gap-1.5 shadow-liquid-sm"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Full-Stack & AI Builder</span>
                </motion.div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
