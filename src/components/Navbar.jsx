import React, { useState, useEffect } from 'react';
import { Menu, X, Send } from 'lucide-react';

const navItems = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Education', href: '#education' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-xl shadow-black/50'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with Frosted Glass & Pulse */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 rounded-lg p-1"
            aria-label="Guna - Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl overflow-hidden bg-[#040d1e] border-2 border-cyan-500/50 group-hover:border-cyan-300 group-hover:shadow-[0_0_22px_rgba(0,240,255,0.7)] group-hover:scale-105 transition-all duration-300">
              <img
                src="/guna-avatar.png"
                alt="Guna Character Avatar"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#030712] animate-pulse" title="Available to connect" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-lg text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1 font-mono">
                GUNA<span className="text-cyan-400">.</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400 -mt-1">
                Portfolio
              </span>
            </div>
          </a>

          {/* Desktop Navigation with Frosted Glass Pill */}
          <nav className="hidden md:flex items-center gap-1 glass-pill px-4 py-1.5 rounded-full border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-cyan-300 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.05]'
                  }`}
                >
                  {isActive && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 to-blue-500/25 border border-cyan-400/50 -z-10 shadow-[0_0_15px_rgba(0,240,255,0.25)]" />
                  )}
                  {item.name}
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA Button */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider text-cyan-300 glass-pill border-cyan-500/40 hover:border-cyan-300 hover:shadow-[0_0_20px_rgba(0,240,255,0.35)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            >
              <Send className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform" />
              <span>Contact</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden relative flex items-center justify-center p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white hover:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-cyan-400" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Overlay with Deep Glassmorphism */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#040b19]/95 backdrop-blur-2xl border-b border-cyan-500/25 shadow-2xl px-6 py-6 transition-all duration-300 animate-in slide-in-from-top-4">
          <div className="flex flex-col space-y-3">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/50 border border-cyan-500/40 text-cyan-300 shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                      : 'text-slate-300 hover:bg-slate-800/60 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00f0ff]" />
                  )}
                </a>
              );
            })}

            <div className="pt-4 border-t border-slate-800">
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:brightness-110 active:scale-95 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Contact Me</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
