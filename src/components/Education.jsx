import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { educationTimeline } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[150px] pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll Reveal */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionAvatarBadge section="education" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Academic Pathway</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Education <span className="text-gradient-electric">Timeline</span>
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
            Academic foundations in software engineering, computational thinking, and software design principles.
          </motion.p>
        </div>

        {/* Vertical Timeline with Scroll Entrance */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-8 space-y-12">
          {educationTimeline.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: index * 0.15 }}
              className="relative pl-6 sm:pl-10 group"
            >
              {/* Timeline Node Indicator */}
              <div className="absolute -left-[9px] top-6 w-4 h-4 rounded-full bg-[#030712] border-2 border-cyan-400 group-hover:scale-125 group-hover:shadow-[0_0_15px_#00f0ff] transition-all duration-300">
                <span className="absolute inset-1 rounded-full bg-cyan-400" />
              </div>

              {/* Glass Card content */}
              <div className="glass-card glass-card-hover rounded-2xl p-6 sm:p-8 border-cyan-500/20 relative overflow-hidden">
                
                {/* Header with Badges & Timeline Period */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-mono glass-pill text-cyan-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                      {item.status}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {item.institution}
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg glass-pill text-xs font-mono text-cyan-400">
                    <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                    <span>{item.period}</span>
                  </div>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors mb-3">
                  {item.degree}
                </h3>

                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Coursework & Competencies */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5" />
                    Relevant Coursework & Competencies
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {item.courses.map((course, cIdx) => (
                      <div 
                        key={cIdx} 
                        className="flex items-center gap-2 text-xs text-slate-300 glass-pill px-3 py-2 rounded-xl hover:border-cyan-400/50 hover:text-white transition-all"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
