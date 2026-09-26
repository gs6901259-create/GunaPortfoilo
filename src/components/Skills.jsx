import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileCode2, 
  Palette, 
  Braces, 
  Atom, 
  Terminal, 
  Smartphone, 
  Flame, 
  GitBranch, 
  Bot, 
  Layers, 
  Sparkles 
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { skillsData } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

// Map icon names to icon components
const iconComponents = {
  FileCode2: FileCode2,
  Palette: Palette,
  Braces: Braces,
  Atom: Atom,
  Terminal: Terminal,
  Smartphone: Smartphone,
  Flame: Flame,
  GitBranch: GitBranch,
  Github: GithubIcon,
  Bot: Bot,
};

const categories = ['All', 'Frontend', 'Backend & AI', 'Mobile', 'Tools'];

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredSkills = activeCategory === 'All' 
    ? skillsData 
    : skillsData.filter((skill) => skill.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <section id="skills" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Animation */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionAvatarBadge section="skills" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>Technical Capabilities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Skills & <span className="text-gradient-electric">Technologies</span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-16 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent mt-4 mb-4"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="max-w-2xl text-slate-300 text-base sm:text-lg"
          >
            Core technologies and tools I utilize across full-stack development, mobile applications, and AI experimentation.
          </motion.p>
        </div>

        {/* Category Filter Tabs with Frosted Glass styling */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-2.5 mb-12"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 font-semibold shadow-[0_0_20px_rgba(0,240,255,0.4)] scale-105'
                  : 'glass-pill text-slate-300 hover:border-cyan-400/50 hover:text-white hover:scale-102'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills Cards Grid with Staggered Scroll Entrance & Frosted Glass */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {filteredSkills.map((skill, idx) => {
            const Icon = iconComponents[skill.icon] || FileCode2;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (idx % 5) * 0.07 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="glass-card glass-card-hover rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden border-cyan-500/15"
              >
                {/* Subtle top accent gradient */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div>
                  {/* Card Header with Icon */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 group-hover:border-cyan-400 group-hover:shadow-[0_0_18px_rgba(0,240,255,0.35)] flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 text-cyan-400 transition-transform duration-300 group-hover:scale-110" />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-300/90 px-2.5 py-1 rounded-md glass-pill border-cyan-500/20">
                      {skill.category}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {skill.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                {/* Card Footer: Level Tag */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-cyan-400/90 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-cyan-400" />
                    {skill.proficiency}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
