import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Smartphone, Cpu, Code2, GraduationCap, CheckCircle2, UserCheck, Sparkles } from 'lucide-react';
import { personalInfo, aboutHighlights } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

const iconMap = {
  Globe: Globe,
  Smartphone: Smartphone,
  Cpu: Cpu,
  Code2: Code2,
};

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll-driven animations */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionAvatarBadge section="about" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
            <span>Profile & Background</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            About <span className="text-gradient-electric">Me</span>
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
            Engineering student with a mission to design scalable architectures, intuitive interfaces, and AI-enhanced applications.
          </motion.p>
        </div>

        {/* Two Column Layout: Story & Focus with Scroll Entrance */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-16">
          
          {/* Left Column: Narrative Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-card rounded-2xl p-8 sm:p-10 flex flex-col justify-between border-cyan-500/25 relative overflow-hidden group"
          >
            {/* Subtle floating specular glow in corner */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-cyan-500/20 transition-all duration-700" />

            <div>
              <div className="flex items-center gap-3 text-cyan-400 font-mono text-sm mb-3">
                <GraduationCap className="w-5 h-5 text-cyan-400" />
                <span className="font-semibold uppercase tracking-wider">Software Engineering Student</span>
              </div>

              {/* Floating Headline */}
              <motion.h3
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="text-3xl sm:text-4xl font-extrabold text-white mb-2 leading-snug"
              >
                Varikunta Gunasekhar
              </motion.h3>

              <p className="text-sm font-mono text-cyan-300/90 mb-6 flex items-center gap-2">
                <span>Known as <strong className="text-white font-semibold">Guna</strong></span>
                <span className="text-slate-500">•</span>
                <span>Software Developer & AI Builder</span>
              </p>
              
              <div className="space-y-4 text-slate-300 text-base leading-relaxed">
                <p>
                  I'm <span className="text-white font-semibold text-cyan-300">Varikunta Gunasekhar</span> (Guna), a software engineering student driven by curiosity for modern software systems. My journey is centered around three core pillars: building responsive <span className="text-cyan-300 font-medium">web applications</span>, fluid <span className="text-cyan-300 font-medium">cross-platform mobile apps</span>, and exploring intelligent <span className="text-cyan-300 font-medium">AI integrations</span>.
                </p>
                <p>
                  As an aspiring engineer, I believe that high-quality software requires both technical rigor and thoughtful human-centric design. Whether I am architecting secure data sharing in <span className="text-white font-medium">SharePinz</span> or developing smart mathematical tools in <span className="text-white font-medium">Jama AI</span>, I prioritize clean code, performance, and seamless user experiences.
                </p>
                <p>
                  I am actively expanding my skillset, experimenting with modern toolchains, and looking forward to collaborating on impactful engineering initiatives, real-world products, and internships.
                </p>
              </div>
            </div>

            {/* Quick Principles List with Glassy Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-8 mt-8 border-t border-slate-800/80">
              {[
                "Modern Clean Code Standards",
                "Responsive & Accessible UI/UX",
                "Rapid Prototyping & MVP Builds",
                "Deep Curiosity for AI Workflows"
              ].map((principle, pIdx) => (
                <div
                  key={pIdx}
                  className="glass-pill px-3.5 py-2 rounded-xl flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 hover:border-cyan-400 hover:shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-all"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{principle}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Visual Skill Pillars with Staggered Scroll Entrance */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {aboutHighlights.map((item, idx) => {
              const IconComponent = iconMap[item.icon] || Code2;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="glass-card glass-card-hover rounded-2xl p-6 flex items-start gap-4 border-cyan-500/20 group relative overflow-hidden"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-center justify-center shrink-0 group-hover:border-cyan-400 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all">
                    <IconComponent className="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs font-mono text-cyan-400/90 mb-1">
                      {item.subtitle}
                    </p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
