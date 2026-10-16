import React from 'react';
import { ArrowUp, Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-black/[0.08] bg-[#F2F3F5] pt-12 pb-8 overflow-hidden text-ink-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-black/[0.06]">
          
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-extrabold tracking-tight text-xl text-ink-primary font-sans">
                GUNA<span className="text-liquid-blue">.</span>
              </span>
            </div>
            <p className="text-xs text-ink-secondary max-w-sm">
              Software engineering student and developer focused on web development, mobile applications, and artificial intelligence.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-ink-secondary hover:text-liquid-blue hover:shadow-sm transition-all"
              aria-label="GitHub profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-ink-secondary hover:text-liquid-blue hover:shadow-sm transition-all"
              aria-label="LinkedIn profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-ink-secondary hover:text-liquid-blue hover:shadow-sm transition-all"
              aria-label="Instagram profile"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={personalInfo.socials.email}
              className="p-2.5 rounded-xl bg-white border border-black/[0.08] text-ink-secondary hover:text-liquid-blue hover:shadow-sm transition-all"
              aria-label="Send Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold btn-liquid-secondary"
            aria-label="Back to top"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>

        </div>

        {/* Bottom Credits & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 text-xs text-ink-secondary">
          <p>© {new Date().getFullYear()} Varikunta Gunasekhar (Guna). All rights reserved.</p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>Built with React & Tailwind</span>
            <span>•</span>
            <span className="text-liquid-blue font-semibold">Liquid White Edition</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
