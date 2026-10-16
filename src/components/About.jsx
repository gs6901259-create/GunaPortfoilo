import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Cpu, 
  Rocket, 
  Lightbulb, 
  GraduationCap, 
  FileText, 
  ArrowUpRight,
  Send,
  CheckCircle2 
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

const pillars = [
  {
    icon: Code2,
    title: 'Software Engineering',
    tagline: 'Modern & Performant',
    description: 'Crafting responsive, accessible, and fluid digital interfaces using React, modern JavaScript, Tailwind CSS, and clean architectural patterns.',
  },
  {
    icon: Cpu,
    title: 'AI Experimentation',
    tagline: 'Intelligent Workflows',
    description: 'Exploring LLM APIs, voice assistants, and smart computational agents that transform complex tasks into frictionless human experiences.',
  },
  {
    icon: Rocket,
    title: 'Product Execution',
    tagline: 'Zero-to-One Delivery',
    description: 'Building end-to-end production-grade applications like SharePinz with client-side encryption, temporary storage models, and delightful UX.',
  },
  {
    icon: Lightbulb,
    title: 'Problem-Solving Mindset',
    tagline: 'First-Principles Thinking',
    description: 'Grounded in fundamental data structures, algorithms, modular system design, and relentless curiosity for emerging technologies.',
  },
];

export default function About() {
  const handleResumeClick = () => {
    // Open email draft with prefilled subject or view resume
    window.location.href = `mailto:${personalInfo.email}?subject=Resume%20Request%20-%20Varikunta%20Gunasekhar`;
  };

  return (
    <section id="about" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <SectionAvatarBadge section="about" />

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium uppercase tracking-wider text-ink-secondary mb-4 shadow-liquid-sm"
          >
            <span>Background & Philosophy</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary font-sans"
          >
            A little <span className="text-gradient-liquid">about me.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed"
          >
            Engineering student with a passion for designing scalable systems, fluid interfaces, and AI-driven digital experiences.
          </motion.p>
        </div>

        {/* Editorial Layout: Narrative Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          
          {/* Main Story Narrative Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 liquid-card rounded-3xl p-8 sm:p-10 flex flex-col justify-between shadow-liquid"
          >
            <div>
              <div className="flex items-center gap-2.5 text-xs font-mono font-semibold text-liquid-blue uppercase tracking-wider mb-4">
                <GraduationCap className="w-4 h-4 text-liquid-blue" />
                <span>B.Tech Student & Developer</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-ink-primary mb-4 leading-tight">
                Engineering software with curiosity, precision, and purpose.
              </h3>

              <div className="space-y-4 text-base text-ink-secondary leading-relaxed mb-6">
                <p>
                  I'm <strong className="text-ink-primary font-semibold">Varikunta Gunasekhar</strong> (widely known as <strong className="text-ink-primary font-semibold">Guna</strong>). My journey into technology started with an obsession to understand how great digital products are crafted from pure lines of code.
                </p>
                <p>
                  Currently pursuing my <strong className="text-ink-primary font-medium">B.Tech in Computer Science & Engineering</strong> at <strong className="text-ink-primary font-medium">NBKRIST (N.B.K.R. Institute of Science & Technology)</strong>, I spend my days building web applications, tinkering with mobile frameworks like Flutter, and integrating modern AI capabilities into real-world solutions.
                </p>
                <p>
                  I believe software should not only execute accurately under the hood, but also feel fluid, organic, and delightful in the hands of everyday users.
                </p>
              </div>
            </div>

            {/* Quick Actions inside Card */}
            <div className="pt-6 border-t border-black/[0.06] flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleResumeClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold btn-liquid-primary"
              >
                <FileText className="w-4 h-4" />
                <span>Request Resume / CV</span>
              </button>

              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold btn-liquid-secondary"
              >
                <Send className="w-3.5 h-3.5 text-liquid-blue" />
                <span>Get in Touch</span>
              </a>
            </div>
          </motion.div>

          {/* Education & Academic Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Institution Card */}
            <div className="liquid-card rounded-3xl p-6 sm:p-7 flex-1 flex flex-col justify-between shadow-liquid">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-liquid-blue font-semibold">
                  Undergraduate Education
                </span>
                <h4 className="text-xl font-bold text-ink-primary mt-1 mb-2">
                  NBKR Institute of Science & Technology
                </h4>
                <p className="text-xs font-mono text-ink-secondary mb-4">
                  B.Tech in Computer Science & Engineering (In Progress)
                </p>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Focusing on core algorithms, object-oriented systems, database architectures, and applied artificial intelligence.
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {['Data Structures', 'Web Tech', 'Mobile Apps', 'AI & ML'].map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-full bg-[#F2F3F5] text-ink-primary text-[11px] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-black/[0.06] flex items-center justify-between text-xs font-mono text-ink-secondary">
                <span>Location: Vidyanagar, AP</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Active Student
                </span>
              </div>
            </div>

            {/* Schooling Foundation Card */}
            <div className="liquid-card rounded-3xl p-6 sm:p-7 shadow-liquid">
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500 font-semibold">
                Foundational Education
              </span>
              <h4 className="text-lg font-bold text-ink-primary mt-1 mb-1">
                Kendriya Vidyalaya
              </h4>
              <p className="text-xs text-ink-secondary leading-relaxed">
                Secondary & higher secondary schooling with strong analytical foundations in mathematics, physical sciences, and introductory computing.
              </p>
            </div>
          </motion.div>

        </div>

        {/* 4 Pillars of Excellence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="liquid-card liquid-card-hover rounded-2xl p-6 flex flex-col justify-between group shadow-liquid-sm"
              >
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-liquid-blue mb-4 group-hover:scale-105 transition-transform">
                    <IconComponent className="w-5 h-5 text-liquid-blue" />
                  </div>
                  <h4 className="text-lg font-bold text-ink-primary mb-1">
                    {pillar.title}
                  </h4>
                  <div className="text-xs font-mono text-liquid-blue font-medium mb-3">
                    {pillar.tagline}
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
