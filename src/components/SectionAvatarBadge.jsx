import React from 'react';
import { motion } from 'framer-motion';

const SECTION_PROPS = {
  about: {
    emoji: '🔍',
    actionText: 'Explorer Guna',
    tooltip: 'Investigating my roots & background',
    image: '/guna-fullbody-about.png',
    badgeColor: 'from-sky-500/20 to-indigo-500/20 text-sky-300 border-sky-400/40',
    propAnimation: {
      rotate: [-10, 15, -10],
      scale: [1, 1.2, 1],
    },
  },
  skills: {
    emoji: '💻',
    actionText: 'Tech Wizard Guna',
    tooltip: 'Coding on live tablet / laptop',
    image: '/guna-fullbody-skills.png',
    badgeColor: 'from-amber-500/20 to-orange-500/20 text-amber-300 border-amber-400/40',
    propAnimation: {
      scale: [1, 1.3, 1],
      filter: ['drop-shadow(0 0 2px #fbbf24)', 'drop-shadow(0 0 8px #fbbf24)', 'drop-shadow(0 0 2px #fbbf24)'],
    },
  },
  projects: {
    emoji: '🚀',
    actionText: 'Builder Guna',
    tooltip: 'Holding spacecraft rocket model',
    image: '/guna-fullbody-projects.png',
    badgeColor: 'from-rose-500/20 to-purple-500/20 text-rose-300 border-rose-400/40',
    propAnimation: {
      y: [0, -4, 0],
      rotate: [-8, 8, -8],
    },
  },
  education: {
    emoji: '🎓',
    actionText: 'Scholar Guna',
    tooltip: 'Wearing graduation cap with degree scroll',
    image: '/guna-fullbody-education.png',
    badgeColor: 'from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-400/40',
    propAnimation: {
      rotate: [-10, 10, -10],
    },
  },
  achievements: {
    emoji: '🏆',
    actionText: 'Champion Guna',
    tooltip: 'Holding hackathon winner trophy high',
    image: '/guna-fullbody-achievements.png',
    badgeColor: 'from-yellow-500/20 to-amber-500/20 text-yellow-300 border-yellow-400/40',
    propAnimation: {
      scale: [1, 1.2, 1],
      rotate: [0, -12, 12, 0],
    },
  },
  contact: {
    emoji: '✈️',
    actionText: 'Messenger Guna',
    tooltip: 'Launching origami paper airplane',
    image: '/guna-fullbody-contact.png',
    badgeColor: 'from-cyan-500/20 to-blue-500/20 text-cyan-300 border-cyan-400/40',
    propAnimation: {
      x: [0, 3, 0],
      y: [0, -3, 0],
      rotate: [0, 15, 0],
    },
  },
};

export default function SectionAvatarBadge({ section }) {
  const config = SECTION_PROPS[section] || SECTION_PROPS.about;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0, y: 15, rotate: -10 }}
      whileInView={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ type: 'spring', stiffness: 320, damping: 20 }}
      className="relative inline-flex items-center gap-2.5 pl-2 pr-4 py-1.5 mb-4 rounded-full bg-[#040d1f]/95 border border-cyan-500/40 backdrop-blur-md shadow-lg shadow-cyan-950/50 group hover:border-cyan-400 transition-colors"
      title={config.tooltip}
    >
      {/* Full-Body Standing Avatar Figure with Dedicated Action Pose */}
      <div className="relative h-12 w-6 flex items-end justify-center -my-2.5">
        <img
          src={config.image}
          alt={config.actionText}
          className="h-full w-auto object-contain group-hover:scale-120 transition-transform duration-300 drop-shadow-[0_3px_10px_rgba(0,240,255,0.6)]"
        />
        {/* Active pip */}
        <span className="absolute top-1 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-[#030712] animate-pulse" />
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
      <span className="font-mono text-xs font-semibold tracking-wide text-cyan-200">
        {config.actionText}
      </span>
    </motion.div>
  );
}
