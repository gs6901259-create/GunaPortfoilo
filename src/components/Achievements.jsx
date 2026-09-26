import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, GitPullRequest, Sparkles, Edit3 } from 'lucide-react';
import { achievementsData } from '../data/portfolioData';

const typeIcons = {
  Hackathon: Trophy,
  'Open Source': GitPullRequest,
  'Academic & Practical': Code2,
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Trophy className="w-3.5 h-3.5 text-cyan-400" />
            <span>Milestones & Contributions</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Achievements & <span className="text-gradient-electric">Hackathons</span>
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
            Engineering sprints, hackathon prototypes, and community contributions. Custom placeholders ready to update with your latest milestones.
          </motion.p>
        </div>

        {/* Milestone Cards Grid with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {achievementsData.map((item, idx) => {
            const Icon = typeIcons[item.type] || Trophy;
            const isPlaceholder = item.event.includes('[');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.12 }}
                className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border-cyan-500/20 relative"
              >
                <div>
                  {/* Top Bar with Icon & Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-slate-700/80 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center transition-all duration-300">
                      <Icon className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="px-3 py-1 rounded-full text-xs font-mono glass-pill text-cyan-300">
                      {item.badge}
                    </span>
                  </div>

                  {/* Title & Event */}
                  <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-2">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400/90 mb-4">
                    <span>{item.event}</span>
                    <span>•</span>
                    <span className="text-slate-400">{item.year}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Footer Tag */}
                <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                    {isPlaceholder ? (
                      <>
                        <Edit3 className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="text-cyan-400/80">Editable slot</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Verified Project</span>
                      </>
                    )}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400 group-hover:animate-ping" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Tip Banner for easy customization with Frosted Glass */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto rounded-xl glass-card p-4 text-center text-xs font-mono text-slate-400 flex items-center justify-center gap-2 border-white/10"
        >
          <Edit3 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            You can customize or add your specific hackathon names, awards, and dates anytime in <strong className="text-cyan-300">src/data/portfolioData.js</strong>.
          </span>
        </motion.div>

      </div>
    </section>
  );
}
