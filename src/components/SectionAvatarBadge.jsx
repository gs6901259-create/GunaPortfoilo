import React from 'react';
import { motion } from 'framer-motion';

const SECTION_PROPS = {
  about: {
    emoji: '🔍',
    actionText: 'Explorer Guna',
    tooltip: 'Inspecting my journey & passion',
    image: '/guna-fullbody-about.png',
    propAnimation: {
      rotate: [-8, 12, -8],
      scale: [1, 1.15, 1],
    },
  },
  skills: {
    emoji: '💻',
    actionText: 'Tech Wizard Guna',
    tooltip: 'Coding on live tablet / laptop',
    image: '/guna-fullbody-skills.png',
    propAnimation: {
      scale: [1, 1.2, 1],
    },
  },
  projects: {
    emoji: '🚀',
    actionText: 'Builder Guna',
    tooltip: 'Holding spacecraft rocket model',
    image: '/guna-fullbody-projects.png',
    propAnimation: {
      y: [0, -3, 0],
      rotate: [-6, 6, -6],
    },
  },
  education: {
    emoji: '🎓',
    actionText: 'Scholar Guna',
    tooltip: 'Wearing graduation cap with degree scroll',
    image: '/guna-fullbody-education.png',
    propAnimation: {
      rotate: [-8, 8, -8],
    },
  },
  achievements: {
    emoji: '🏆',
    actionText: 'Champion Guna',
    tooltip: 'Holding hackathon winner trophy high',
    image: '/guna-fullbody-achievements.png',
    propAnimation: {
      scale: [1, 1.15, 1],
      rotate: [0, -10, 10, 0],
    },
  },
  contact: {
    emoji: '✈️',
    actionText: 'Messenger Guna',
    tooltip: 'Launching origami paper airplane',
    image: '/guna-fullbody-contact.png',
    propAnimation: {
      x: [0, 3, 0],
      y: [0, -3, 0],
      rotate: [0, 12, 0],
    },
  },
};

export default function SectionAvatarBadge({ section }) {
  const config = SECTION_PROPS[section] || SECTION_PROPS.about;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 15, rotate: -6 }}
      whileInView={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      className="relative inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 mb-4 rounded-full bg-white/90 border border-black/[0.08] backdrop-blur-md shadow-liquid-sm hover:border-liquid-blue/40 transition-all duration-300 group"
      title={config.tooltip}
    >
      {/* Full-Body Standing Avatar Figure */}
      <div className="relative h-12 w-6 flex items-end justify-center -my-2.5">
        <img
          src={config.image}
          alt={config.actionText}
          className="h-full w-auto object-contain group-hover:scale-115 transition-transform duration-300 drop-shadow-[0_2px_8px_rgba(20,24,35,0.18)]"
        />
        {/* Active pip */}
        <span className="absolute top-1 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border border-white animate-pulse" />
      </div>

      {/* Action prop with bounce animation */}
      <motion.span
        animate={config.propAnimation}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="text-base select-none"
      >
        {config.emoji}
      </motion.span>

      {/* Action title */}
      <span className="font-mono text-xs font-semibold tracking-wide text-ink-primary">
        {config.actionText}
      </span>
    </motion.div>
  );
}
