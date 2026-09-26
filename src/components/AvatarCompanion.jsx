import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Move, RotateCcw, Volume2 } from 'lucide-react';

// Section Action Configurations with Dedicated Full-Body Poses
const SECTION_ACTIONS = {
  home: {
    key: 'home',
    title: 'Welcome!',
    badge: 'GREETING 👋',
    tagline: "Hi, I'm Guna! Welcome to my portfolio!",
    detail: 'Scroll down to explore my projects, skills, education, and background.',
    emoji: '👋',
    image: '/guna-fullbody-home.png',
    actionDesc: 'Waving cheerful welcome',
    borderColor: 'border-cyan-400',
    glowColor: 'rgba(0, 240, 255, 0.55)',
  },
  about: {
    key: 'about',
    title: 'About Me',
    badge: 'EXPLORER 🔍',
    tagline: 'Inspecting my journey & passion!',
    detail: 'B.Tech CSE student passionate about full-stack engineering & intelligent systems.',
    emoji: '🔍',
    image: '/guna-fullbody-about.png',
    actionDesc: 'Inspecting with magnifying glass',
    borderColor: 'border-sky-400',
    glowColor: 'rgba(56, 189, 248, 0.55)',
  },
  skills: {
    key: 'skills',
    title: 'Tech Stack',
    badge: 'CODE WIZARD 💻',
    tagline: 'Coding up full-stack solutions!',
    detail: 'Specializing in React, Tailwind, Node.js, Python, and modern UI engineering.',
    emoji: '💻',
    image: '/guna-fullbody-skills.png',
    actionDesc: 'Coding on live tablet / laptop',
    borderColor: 'border-amber-400',
    glowColor: 'rgba(251, 191, 36, 0.55)',
  },
  projects: {
    key: 'projects',
    title: 'Creations',
    badge: 'BUILDER LAUNCH 🚀',
    tagline: '3... 2... 1... Liftoff! Check out my builds!',
    detail: 'Explore SharePinz, Jama AI, and other real-world full-stack web applications.',
    emoji: '🚀',
    image: '/guna-fullbody-projects.png',
    actionDesc: 'Ready to launch space rocket',
    borderColor: 'border-rose-400',
    glowColor: 'rgba(244, 63, 94, 0.55)',
  },
  education: {
    key: 'education',
    title: 'Academia',
    badge: 'SCHOLAR 🎓',
    tagline: 'Engineering graduate in training!',
    detail: 'Pursuing B.Tech in Computer Science at NBKRIST with top academic focus.',
    emoji: '🎓',
    image: '/guna-fullbody-education.png',
    actionDesc: 'Wearing mortarboard & degree scroll',
    borderColor: 'border-emerald-400',
    glowColor: 'rgba(52, 211, 153, 0.55)',
  },
  achievements: {
    key: 'achievements',
    title: 'Milestones',
    badge: 'CHAMPION 🏆',
    tagline: 'Victory unlocked! Winner trophy in hand!',
    detail: 'Celebrating hackathon wins, open-source milestones, and coding achievements.',
    emoji: '🏆',
    image: '/guna-fullbody-achievements.png',
    actionDesc: 'Holding golden hackathon trophy',
    borderColor: 'border-yellow-400',
    glowColor: 'rgba(250, 204, 21, 0.55)',
  },
  contact: {
    key: 'contact',
    title: 'Say Hello',
    badge: 'MESSENGER ✈️',
    tagline: "Let's connect! Sending paper airplane!",
    detail: 'Drop me a message right here — it delivers directly to my email inbox!',
    emoji: '✈️',
    image: '/guna-fullbody-contact.png',
    actionDesc: 'Launching origami paper airplane',
    borderColor: 'border-cyan-400',
    glowColor: 'rgba(0, 240, 255, 0.65)',
  },
};

const FUN_QUOTES = [
  "👀 Notice my eyes in the hero character above? They follow your cursor smoothly!",
  "🖐️ You can drag me anywhere around your screen! Try picking me up!",
  "🧲 Notice how I lean towards your cursor? I'm magnetically attracted to you!",
  "🚀 Looking for an eager, high-energy software engineer? I'm ready to build!",
  "📬 Drop me a message through the contact form — I check my inbox daily!",
];

export default function AvatarCompanion({ activeSectionProp }) {
  const [activeSection, setActiveSection] = useState('home');
  const [speechVisible, setSpeechVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragKey, setDragKey] = useState(0); // to reset position if needed
  const [jumpCount, setJumpCount] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(null);
  const [showBurst, setShowBurst] = useState(false);

  // Magnetic Attraction towards mouse
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0, rotate: 0, isNear: false });
  const containerRef = useRef(null);
  const autoHideTimerRef = useRef(null);

  // Synchronize active section with scroll
  useEffect(() => {
    if (activeSectionProp && SECTION_ACTIONS[activeSectionProp]) {
      setActiveSection(activeSectionProp);
      return;
    }

    const sections = ['home', 'about', 'skills', 'projects', 'education', 'achievements', 'contact'];
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 280;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection((prev) => {
            if (prev !== sections[i]) {
              return sections[i];
            }
            return prev;
          });
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSectionProp]);

  // When activeSection changes, pop the speech bubble open with soundless cartoon delight
  useEffect(() => {
    setSpeechVisible(true);
    setQuoteIndex(null);

    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    autoHideTimerRef.current = setTimeout(() => {
      setSpeechVisible(false);
    }, 6000);

    return () => {
      if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    };
  }, [activeSection]);

  // Magnetic Cursor Attraction:
  // When cursor is within 340px, the character physically attracts and leans towards the cursor!
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) return;
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const avatarCenterX = rect.left + rect.width / 2;
      const avatarCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - avatarCenterX;
      const deltaY = e.clientY - avatarCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      const MAX_MAGNETIC_RADIUS = 340;

      if (distance < MAX_MAGNETIC_RADIUS && distance > 10) {
        // Elastic pull proportional to proximity
        const strength = Math.pow(1 - distance / MAX_MAGNETIC_RADIUS, 1.4);
        const maxPull = 28; // Max 28px physical displacement towards cursor
        const pullX = (deltaX / distance) * (maxPull * strength);
        const pullY = (deltaY / distance) * (maxPull * strength);
        const tiltAngle = (deltaX / MAX_MAGNETIC_RADIUS) * 10; // Tilt head/body towards cursor

        setMagneticOffset({
          x: pullX,
          y: pullY,
          rotate: tiltAngle,
          isNear: true,
        });
      } else {
        if (magneticOffset.isNear) {
          setMagneticOffset({ x: 0, y: 0, rotate: 0, isNear: false });
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isDragging, magneticOffset.isNear]);

  const currentAction = SECTION_ACTIONS[activeSection] || SECTION_ACTIONS.home;

  // Handle interactive avatar tap
  const handleAvatarClick = () => {
    setJumpCount((prev) => prev + 1);
    setShowBurst(true);
    setTimeout(() => setShowBurst(false), 900);

    const nextIdx = jumpCount % FUN_QUOTES.length;
    setQuoteIndex(nextIdx);
    setSpeechVisible(true);

    if (autoHideTimerRef.current) clearTimeout(autoHideTimerRef.current);
    autoHideTimerRef.current = setTimeout(() => {
      setSpeechVisible(false);
    }, 7000);
  };

  // Reset dragged position back to bottom corner
  const handleResetPosition = (e) => {
    e.stopPropagation();
    setDragKey((k) => k + 1);
    setSpeechVisible(true);
    setQuoteIndex(1); // "You can drag me anywhere around your screen!"
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 select-none pointer-events-none">
      {/* Draggable Framer Motion Mascot Wrapper */}
      <motion.div
        key={dragKey}
        ref={containerRef}
        drag
        dragElastic={0.12}
        dragMomentum={true}
        onDragStart={() => {
          setIsDragging(true);
          setSpeechVisible(true);
        }}
        onDragEnd={() => {
          setIsDragging(false);
        }}
        className="relative flex flex-col items-end pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        {/* Cartoon Speech Bubble */}
        <AnimatePresence>
          {speechVisible && (
            <motion.div
              key={activeSection + (quoteIndex !== null ? '-q' + quoteIndex : '') + (isDragging ? '-drag' : '')}
              initial={{ opacity: 0, y: 15, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: 'spring', stiffness: 380, damping: 24 }}
              className="relative mb-2 max-w-[270px] sm:max-w-[310px] rounded-2xl p-3.5 sm:p-4 bg-[#051124]/95 backdrop-blur-xl border border-cyan-500/40 shadow-2xl shadow-cyan-950/70 text-slate-100"
            >
              {/* Close bubble button */}
              <button
                type="button"
                onClick={() => setSpeechVisible(false)}
                className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Close speech bubble"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Action tag pill */}
              <div className="flex items-center gap-2 mb-1.5">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/40">
                  <span className="text-xs">{currentAction.emoji}</span>
                  <span>{isDragging ? 'FLYING MASCOT 🎈' : currentAction.badge}</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">Guna</span>
              </div>

              {/* Speech bubble dialogue */}
              <p className="text-xs sm:text-[13px] font-medium leading-snug text-slate-100 mb-1">
                {isDragging 
                  ? 'Wheee! Taking me for a fly across the screen! 🚀' 
                  : (quoteIndex !== null ? FUN_QUOTES[quoteIndex] : currentAction.tagline)}
              </p>
              
              {!isDragging && quoteIndex === null && (
                <p className="text-[11px] text-slate-400 leading-tight">
                  {currentAction.detail}
                </p>
              )}

              {/* Action hint pill */}
              {!isDragging && (
                <div className="mt-2 pt-2 border-t border-cyan-500/20 flex items-center justify-between text-[10px] text-cyan-400 font-mono">
                  <span className="flex items-center gap-1 text-slate-400">
                    <Move className="w-3 h-3 text-cyan-400" /> Drag me anywhere!
                  </span>
                  {dragKey > 0 && (
                    <button
                      type="button"
                      onClick={handleResetPosition}
                      className="hover:text-cyan-200 underline flex items-center gap-0.5"
                    >
                      <RotateCcw className="w-2.5 h-2.5" /> Reset dock
                    </button>
                  )}
                </div>
              )}

              {/* Triangle pointer to avatar */}
              <div 
                className="absolute -bottom-2 right-12 w-4 h-4 bg-[#051124] border-r border-b border-cyan-500/40 transform rotate-45"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Full-Body Avatar Mascot Container with Magnetic Attraction & Spring Drag */}
        <div className="relative flex flex-col items-center">
          
          {/* Sparkle burst on tap */}
          <AnimatePresence>
            {showBurst && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.6 }}
                exit={{ opacity: 0, scale: 2.0 }}
                transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none flex items-center justify-center z-40"
              >
                <span className="text-2xl">✨</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Full-Body Standing Character: Reacts Magnetically to Cursor + Draggable */}
          <motion.div
            onClick={handleAvatarClick}
            whileHover={{ scale: 1.05 }}
            whileDrag={{ scale: 1.12, rotate: [-4, 4, -4] }}
            animate={{
              x: magneticOffset.x,
              y: magneticOffset.y + (isDragging ? 0 : [0, -5, 0]),
              rotate: magneticOffset.rotate,
            }}
            transition={{
              x: { type: 'spring', stiffness: 220, damping: 18 },
              y: isDragging ? { duration: 0.1 } : { duration: 3.2, repeat: Infinity, ease: 'easeInOut' },
              rotate: { type: 'spring', stiffness: 200, damping: 16 },
            }}
            className="group relative flex flex-col items-center"
            title="Draggable & magnetically attracted to your cursor! Click to interact."
          >
            {/* Magnetic Aura / Cyan Glow Ring that intensifies near cursor */}
            <div
              className={`absolute inset-0 rounded-full blur-xl transition-all duration-300 pointer-events-none ${
                magneticOffset.isNear ? 'opacity-95 scale-110' : 'opacity-50'
              }`}
              style={{
                background: `radial-gradient(ellipse at center, ${currentAction.glowColor} 0%, transparent 70%)`,
              }}
            />

            {/* High-Resolution Full-Body Character Image with Dedicated Section Action Pose */}
            <div className="relative z-20">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentAction.image}
                  src={currentAction.image}
                  alt={`Guna Full Body Avatar - ${currentAction.actionDesc}`}
                  initial={{ opacity: 0.6, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.6, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="h-36 sm:h-44 md:h-48 w-auto object-contain drop-shadow-[0_10px_22px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[0_14px_28px_rgba(0,240,255,0.5)] transition-all duration-300"
                />
              </AnimatePresence>

              {/* Status active pip */}
              <span 
                className="absolute top-8 right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-[#040b19] shadow-sm animate-pulse" 
                title="Active & Ready" 
              />
            </div>

            {/* Glowing Holographic Cyber-Pedestal under shoes */}
            <div className="relative -mt-1.5 z-10 flex flex-col items-center pointer-events-none">
              <div 
                className={`w-16 sm:w-20 h-3 rounded-[100%] bg-gradient-to-r from-cyan-500/20 via-blue-500/40 to-cyan-500/20 border transition-all duration-300 ${
                  magneticOffset.isNear ? 'border-cyan-300 shadow-[0_0_20px_#00f0ff]' : 'border-cyan-400/60 shadow-[0_0_12px_rgba(0,240,255,0.6)]'
                }`} 
              />
              <div className="w-8 sm:w-10 h-1.5 -mt-2 rounded-[100%] bg-cyan-300/80 blur-[2px] shadow-[0_0_8px_#00f0ff]" />
            </div>

            {/* Magnetic Attraction Particle indicator when mouse is near */}
            {magneticOffset.isNear && !isDragging && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                className="absolute -top-3 -right-2 px-1.5 py-0.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-mono font-bold text-[8px] shadow-md border border-cyan-200"
              >
                🧲 Attracted!
              </motion.span>
            )}

            {/* "Drag Me" handle badge when idle */}
            {!magneticOffset.isNear && !speechVisible && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute -bottom-5 px-2 py-0.5 rounded-full bg-[#051124]/90 border border-cyan-500/40 text-cyan-300 font-mono text-[9px] flex items-center gap-1 shadow-md"
              >
                <Move className="w-2.5 h-2.5 text-cyan-400" /> Drag Me
              </motion.span>
            )}
          </motion.div>
        </div>

        {/* Companion Control Dock Toggle Button */}
        <div className="mt-6 flex items-center justify-center w-full gap-2">
          <button
            type="button"
            onClick={() => {
              if (speechVisible) {
                setSpeechVisible(false);
              } else {
                setSpeechVisible(true);
                setQuoteIndex(null);
              }
            }}
            className="text-[10px] font-mono text-cyan-400/90 hover:text-cyan-300 bg-[#051124]/90 px-3 py-1 rounded-full border border-cyan-500/30 hover:border-cyan-400/60 shadow-md transition-all pointer-events-auto flex items-center gap-1"
            title="Toggle companion dialogue"
          >
            <span>{speechVisible ? 'Hide message' : 'Guna Mascot ✨'}</span>
          </button>

          {dragKey > 0 && (
            <button
              type="button"
              onClick={handleResetPosition}
              className="text-[10px] font-mono text-slate-400 hover:text-cyan-300 bg-[#051124]/90 px-2 py-1 rounded-full border border-slate-700 hover:border-cyan-500/40 shadow-md transition-all pointer-events-auto"
              title="Reset position to corner"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
          )}
        </div>

      </motion.div>
    </div>
  );
}
