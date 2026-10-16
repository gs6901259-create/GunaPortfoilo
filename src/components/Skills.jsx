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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <SectionAvatarBadge section="skills" />

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium uppercase tracking-wider text-ink-secondary mb-4 shadow-liquid-sm"
          >
            <span>Technical Capabilities</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary font-sans"
          >
            Skills & <span className="text-gradient-liquid">Technologies</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed"
          >
            A curated stack of modern programming languages, libraries, and frameworks I use to build scalable products.
          </motion.p>

          {/* Category Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-2 mt-8 p-1.5 rounded-full liquid-pill shadow-liquid-sm"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-ink-primary text-white shadow-sm'
                      : 'text-ink-secondary hover:text-ink-primary hover:bg-black/[0.04]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Skills Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredSkills.map((skill, idx) => {
            const IconComponent = iconComponents[skill.icon] || Layers;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="liquid-card liquid-card-hover rounded-2xl p-5 flex flex-col justify-between group shadow-liquid-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                      <IconComponent
                        className="w-5 h-5"
                        style={{ color: skill.color || '#0284c7' }}
                      />
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium bg-[#F2F3F5] text-ink-secondary">
                      {skill.category}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-ink-primary mb-1">
                    {skill.name}
                  </h3>

                  <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                    {skill.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-black/[0.06] flex items-center justify-between text-[11px] font-mono">
                  <span className="text-ink-secondary">Proficiency</span>
                  <span className="font-semibold text-liquid-blue">
                    {skill.proficiency}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
