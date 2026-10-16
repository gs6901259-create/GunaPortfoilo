import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar, BookOpen, CheckCircle2 } from 'lucide-react';
import { educationTimeline } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

export default function Education() {
  return (
    <section id="education" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionAvatarBadge section="education" />

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium uppercase tracking-wider text-ink-secondary mb-4 shadow-liquid-sm"
          >
            <span>Academic Pathway</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary font-sans"
          >
            Education <span className="text-gradient-liquid">Timeline</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed"
          >
            Academic foundations in software engineering, computational thinking, and software design principles.
          </motion.p>
        </div>

        {/* Vertical Timeline */}
        <div className="relative border-l-2 border-black/[0.08] ml-4 sm:ml-8 space-y-12">
          {educationTimeline.map((item, idx) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline Node Point */}
              <div className="absolute -left-[17px] top-1 w-8 h-8 rounded-full bg-white border-2 border-sky-400 flex items-center justify-center text-liquid-blue shadow-sm group-hover:scale-110 transition-transform">
                <GraduationCap className="w-4 h-4 text-liquid-blue" />
              </div>

              {/* Education Card */}
              <div className="liquid-card liquid-card-hover rounded-3xl p-6 sm:p-8 shadow-liquid">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium bg-sky-50 text-liquid-blue border border-sky-100">
                    <Calendar className="w-3.5 h-3.5 text-liquid-blue" />
                    {item.period}
                  </span>
                  <span className="text-xs font-mono text-emerald-700 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {item.status}
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-ink-primary mb-1">
                  {item.degree}
                </h3>
                
                <h4 className="text-sm font-semibold text-liquid-blue mb-4">
                  {item.institution}
                </h4>

                <p className="text-sm text-ink-secondary leading-relaxed mb-5">
                  {item.description}
                </p>

                {/* Coursework / Focus Modules */}
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-ink-primary font-semibold mb-2.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-liquid-blue" />
                    <span>Relevant Coursework & Studies</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.courses.map((course) => (
                      <span
                        key={course}
                        className="px-3 py-1 rounded-full bg-[#F2F3F5] text-ink-primary text-xs font-medium"
                      >
                        {course}
                      </span>
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
