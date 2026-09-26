import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Lock, 
  Mic, 
  Eye,
  Clock,
  Sparkles
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Custom UI preview illustrations rendered for each project
  const renderProjectVisual = (projectId) => {
    switch (projectId) {
      case 'sharepinz':
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-xl bg-gradient-to-br from-slate-950 via-[#071329] to-[#030914] border border-cyan-500/25 p-5 flex flex-col justify-between overflow-hidden group-hover:border-cyan-400 transition-colors">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] font-mono text-cyan-400/80">vault://sharepinz.transfer</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono glass-pill text-cyan-300 flex items-center gap-1">
                <Lock className="w-2.5 h-2.5" /> End-to-End Encrypted
              </span>
            </div>

            {/* Central Vault Graphic with floating digits */}
            <div className="flex flex-col items-center justify-center my-auto py-2">
              <div className="flex items-center gap-2 mb-3">
                {['8', '4', '9', '2', '0', '1'].map((digit, i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }}
                    className="w-8 h-10 rounded-lg bg-slate-900/90 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-mono font-bold text-base shadow-[0_0_12px_rgba(0,240,255,0.25)]"
                  >
                    {digit}
                  </motion.div>
                ))}
              </div>
              <div className="text-[11px] font-mono text-slate-300 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>6-Digit Access PIN Active • Expires in 24h</span>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
              <span>Direct P2P Relay</span>
              <span className="text-cyan-400 font-semibold">Zero-Knowledge Storage</span>
            </div>
          </div>
        );

      case 'jama-ai':
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-xl bg-gradient-to-br from-slate-950 via-[#0a122e] to-[#030612] border border-blue-500/25 p-5 flex flex-col justify-between overflow-hidden group-hover:border-cyan-400 transition-colors">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-[10px] font-mono text-blue-400/80">ai://jama.assistant</span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                <Clock className="w-2.5 h-2.5 text-amber-400" /> Upcoming Project
              </span>
            </div>

            {/* Central Calculation & Waveform Graphic with floating pulse */}
            <div className="flex flex-col items-center justify-center my-auto py-2 w-full">
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full max-w-[280px] p-2.5 rounded-lg bg-slate-900/90 border border-blue-500/30 mb-2 shadow-[0_0_15px_rgba(59,130,246,0.2)]"
              >
                <div className="text-[10px] font-mono text-cyan-400 mb-0.5">Voice Query:</div>
                <div className="text-xs font-mono text-white truncate">"Calculate roots for 2x² + 6x - 8 = 0"</div>
              </motion.div>

              {/* Waveform visual */}
              <div className="flex items-center gap-1 h-6">
                {[12, 22, 16, 28, 14, 24, 18, 26, 12, 20, 15].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 1.4, 0.8, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                    className="w-1 bg-gradient-to-t from-blue-500 to-cyan-400 rounded-full"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-400">
              <span className="text-amber-300 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                In Active Development
              </span>
              <span className="text-cyan-400 font-semibold">Coming Soon</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Scroll-driven animation */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-pill text-cyan-300 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <FolderGit2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Featured Portfolio Works</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Featured <span className="text-gradient-electric">Projects</span>
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
            Production-quality web, mobile, and AI solutions engineered with focus on security, user experience, and real utility.
          </motion.p>
        </div>

        {/* Project Cards Grid with Scroll Reveal & Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8 items-stretch">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7 flex flex-col justify-between group border-cyan-500/20 relative"
            >
              <div>
                {/* Visual UI Preview */}
                <div className="mb-6 relative">
                  {renderProjectVisual(project.id)}
                </div>

                {/* Project Title & Tagline with Floating Hover */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {project.title}
                      </h3>
                      {project.isUpcoming && (
                        <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-amber-950/70 border border-amber-500/40 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.25)]">
                          Upcoming
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="p-1.5 rounded-lg glass-pill text-slate-400 hover:text-cyan-300 hover:border-cyan-400 transition-all"
                      title="Inspect interactive preview"
                      aria-label={`View ${project.title} interactive preview`}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs font-mono text-cyan-400 mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Technology Badges with Frosted Glass */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md text-[11px] font-mono glass-pill border-cyan-500/20 text-cyan-300/90"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons: Open Website (for live) / Upcoming Project (for Jama AI) + GitHub */}
              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-3">
                {project.isUpcoming ? (
                  <div 
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide text-amber-300 bg-amber-950/40 border border-amber-500/40 shadow-[0_0_15px_rgba(245,158,11,0.15)] select-none"
                  >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-400"></span>
                    </span>
                    <span>Upcoming Project</span>
                  </div>
                ) : (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_15px_rgba(0,240,255,0.3)] active:scale-95 transition-all"
                    aria-label={`Open ${project.title} website`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Website</span>
                  </a>
                )}

                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl text-xs font-medium text-slate-200 glass-pill hover:border-cyan-400/50 hover:text-white transition-all"
                  aria-label={`GitHub source code for ${project.title}`}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Modal when Live Demo / Eye is clicked */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
