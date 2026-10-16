import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, GitPullRequest, Code2, Sparkles, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { achievementsData, personalInfo } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

const typeIcons = {
  Hackathon: Trophy,
  'Open Source': GitPullRequest,
  'Academic & Practical': Code2,
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionAvatarBadge section="achievements" />

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium uppercase tracking-wider text-ink-secondary mb-4 shadow-liquid-sm"
          >
            <span>Milestones & Contributions</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary font-sans"
          >
            Achievements & <span className="text-gradient-liquid">Milestones</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed"
          >
            Key moments, hackathons, and continuous technical explorations along my development path.
          </motion.p>
        </div>

        {/* Milestone Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {achievementsData.map((item, idx) => {
            const IconComponent = typeIcons[item.type] || Trophy;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="liquid-card liquid-card-hover rounded-3xl p-6 sm:p-7 flex flex-col justify-between group shadow-liquid"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-liquid-blue shadow-sm group-hover:scale-105 transition-transform">
                      <IconComponent className="w-5 h-5 text-liquid-blue" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono font-medium bg-[#F2F3F5] text-ink-secondary">
                      {item.year}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono uppercase tracking-wider text-liquid-blue font-semibold">
                    {item.badge}
                  </span>

                  <h3 className="text-lg font-bold text-ink-primary mt-1 mb-2">
                    {item.title}
                  </h3>

                  <div className="text-xs font-semibold text-ink-secondary mb-3">
                    {item.event}
                  </div>

                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-liquid-blue">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Verified Record
                  </span>
                  {item.type === 'Open Source' && (
                    <a
                      href={personalInfo.socials.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex items-center gap-0.5"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
