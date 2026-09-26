import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-slate-800/80 bg-[#020612] pt-12 pb-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800/60">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center font-mono font-bold text-cyan-400">
                G
              </div>
              <span className="font-mono font-bold tracking-wider text-xl text-white">
                GUNA<span className="text-cyan-400">.</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm">
              Software engineering student and developer focused on web development, mobile applications, and AI.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
              aria-label="Instagram profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-cyan-300 hover:border-cyan-500/50 hover:shadow-[0_0_12px_rgba(0,240,255,0.25)] transition-all"
              aria-label="Send email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to Top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-mono hover:text-cyan-300 hover:border-cyan-500/40 transition-all"
            aria-label="Back to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <p>© {new Date().getFullYear()} Guna. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Designed & Engineered with <span className="text-cyan-400 font-sans">⚡</span> Electric Blue Precision
          </p>
        </div>
      </div>
    </footer>
  );
}
