import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FolderGit2, 
  ExternalLink, 
  Lock, 
  Mic, 
  Eye,
  Clock,
  Sparkles,
  ArrowUpRight,
  CheckCircle2
} from 'lucide-react';
import { GithubIcon } from './Icons';
import { projectsData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import SectionAvatarBadge from './SectionAvatarBadge';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Custom UI preview illustrations rendered for each project
  const renderProjectVisual = (projectId) => {
    switch (projectId) {
      case 'sharepinz':
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#F1F5F9] to-[#E2E8F0] border border-black/[0.08] p-5 flex flex-col justify-between overflow-hidden shadow-sm group-hover:border-sky-300 transition-colors">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-mono text-ink-secondary">vault://sharepinz.site</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono liquid-pill text-liquid-blue flex items-center gap-1 shadow-sm font-semibold">
                <Lock className="w-2.5 h-2.5 text-liquid-blue" /> AES-256 Encrypted
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
                    className="w-8 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center text-liquid-blue font-mono font-bold text-base shadow-sm"
                  >
                    {digit}
                  </motion.div>
                ))}
              </div>
              <div className="text-[11px] font-mono text-ink-secondary flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>6-Digit Access PIN Active • Expires in 24h</span>
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.06] text-[10px] font-mono text-ink-secondary">
              <span>Direct P2P Relay</span>
              <span className="text-liquid-blue font-semibold">Zero-Knowledge Storage</span>
            </div>
          </div>
        );

      case 'jama-ai':
        return (
          <div className="relative w-full h-56 sm:h-64 rounded-2xl bg-gradient-to-br from-[#F8FAFC] via-[#EFF6FF] to-[#DBEAFE] border border-black/[0.08] p-5 flex flex-col justify-between overflow-hidden shadow-sm group-hover:border-sky-300 transition-colors">
            {/* Top Bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[11px] font-mono text-ink-secondary">ai://jama.assistant</span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-amber-50 border border-amber-200 text-amber-700 flex items-center gap-1 font-semibold shadow-sm">
                <Clock className="w-2.5 h-2.5 text-amber-600" /> Upcoming Project
              </span>
            </div>

            {/* Central Calculation & Waveform Graphic */}
            <div className="flex flex-col items-center justify-center my-auto py-2 w-full">
              <motion.div 
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-full max-w-[280px] p-3 rounded-xl bg-white border border-sky-100 mb-2 shadow-sm"
              >
                <div className="text-[10px] font-mono text-liquid-blue font-semibold mb-0.5">Voice Query:</div>
                <div className="text-xs font-mono text-ink-primary truncate font-medium">"Calculate roots for 2x² + 6x - 8 = 0"</div>
              </motion.div>

              {/* Waveform visual */}
              <div className="flex items-center gap-1 h-6">
                {[12, 22, 16, 28, 14, 24, 18, 26, 12, 20, 15].map((height, i) => (
                  <motion.div
                    key={i}
                    animate={{ scaleY: [1, 1.4, 0.8, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                    className="w-1 bg-gradient-to-t from-blue-600 to-cyan-500 rounded-full"
                    style={{ height: `${height}px` }}
                  />
                ))}
              </div>
            </div>

            {/* Bottom Status bar */}
            <div className="flex items-center justify-between pt-2.5 border-t border-black/[0.06] text-[10px] font-mono text-ink-secondary">
              <span className="text-amber-700 font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                In Active Development
              </span>
              <span className="text-liquid-blue font-semibold">Coming Soon</span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section id="projects" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionAvatarBadge section="projects" />

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium uppercase tracking-wider text-ink-secondary mb-4 shadow-liquid-sm"
          >
            <span>Featured Portfolio Works</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary font-sans"
          >
            Featured <span className="text-gradient-liquid">Projects</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed"
          >
            Production-quality web, mobile, and AI solutions engineered with focus on security, user experience, and real utility.
          </motion.p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-5xl mx-auto gap-8 items-stretch">
          {projectsData.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: idx * 0.15 }}
              className="liquid-card liquid-card-hover rounded-3xl p-6 sm:p-8 flex flex-col justify-between group shadow-liquid"
            >
              <div>
                {/* Visual UI Preview */}
                <div className="mb-6">
                  {renderProjectVisual(project.id)}
                </div>

                {/* Title & Status */}
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-2xl font-bold text-ink-primary group-hover:text-liquid-blue transition-colors">
                        {project.title}
                      </h3>
                      {project.isUpcoming && (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-amber-50 border border-amber-200 text-amber-700">
                          Upcoming
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-xs font-mono text-liquid-blue font-medium mt-1">
                    {project.tagline}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-ink-secondary leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Key Highlights */}
                <div className="mb-6 space-y-1.5">
                  {project.highlights.map((highlight, hIdx) => (
                    <div key={hIdx} className="flex items-center gap-2 text-xs text-ink-secondary">
                      <CheckCircle2 className="w-3.5 h-3.5 text-liquid-blue shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-full bg-[#F2F3F5] text-ink-primary text-xs font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-5 border-t border-black/[0.06] flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold btn-liquid-primary"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono text-ink-muted bg-black/[0.04]">
                      <Clock className="w-3 h-3" /> Coming Soon
                    </span>
                  )}

                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-medium btn-liquid-secondary"
                      aria-label={`${project.title} GitHub repository`}
                    >
                      <GithubIcon className="w-3.5 h-3.5" />
                      <span>Code</span>
                    </a>
                  )}
                </div>

                {/* Interactive Modal Preview Button */}
                <button
                  type="button"
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-liquid-blue hover:underline"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Interactive Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
