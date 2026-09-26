import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare,
  ArrowUpRight
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '16131644-e6da-4c9e-8237-66e23571852e',
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: formData.subject.trim() || `Portfolio Message from ${formData.name.trim()}`,
          message: formData.message.trim(),
          from_name: 'Guna Portfolio Contact Form',
        }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please reach out directly via email.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection or email directly.');
    }
  };

  const socialLinks = [
    {
      name: 'Email',
      handle: personalInfo.email,
      href: personalInfo.socials.email,
      icon: Mail,
      isEmail: true,
      isExternal: false,
      description: 'Click to send email (or copy address)'
    },
    {
      name: 'GitHub',
      handle: '@gs6901259-create',
      href: personalInfo.socials.github,
      icon: GithubIcon,
      isEmail: false,
      isExternal: true,
      description: 'Click to explore repositories & code'
    },
    {
      name: 'LinkedIn',
      handle: 'varikunta-gunasekhar',
      href: personalInfo.socials.linkedin,
      icon: LinkedinIcon,
      isEmail: false,
      isExternal: true,
      description: 'Click to connect on professional network'
    },
    {
      name: 'Instagram',
      handle: '@gunasekhar_online',
      href: personalInfo.socials.instagram,
      icon: InstagramIcon,
      isEmail: false,
      isExternal: true,
      description: 'Click to visit Instagram profile'
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-600/10 rounded-full blur-[170px] pointer-events-none -z-10" />

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
            <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
            <span>Get in Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
          >
            Let's <span className="text-gradient-electric">Connect</span>
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
            Have a project in mind, internship opportunity, or just want to discuss web development and AI? Reach out anytime!
          </motion.p>
        </div>

        {/* Content Grid: Social Channels & Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Clickable Social Links Cards with Staggered Scroll Entrance */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-4"
          >
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              <span>Direct Channels</span>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Click any channel below to connect directly, or use the form to drop a message.
            </p>

            <div className="space-y-3">
              {socialLinks.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.isExternal ? "_blank" : undefined}
                    rel={item.isExternal ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    whileHover={{ y: -3, transition: { duration: 0.2 } }}
                    className="glass-card glass-card-hover rounded-2xl p-4 sm:p-5 flex items-center justify-between group border-cyan-500/15 hover:border-cyan-400/50 hover:shadow-[0_0_25px_rgba(0,240,255,0.22)] transition-all cursor-pointer block"
                    aria-label={`Open Guna's ${item.name}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700/80 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] flex items-center justify-center transition-all shrink-0">
                        <Icon className="w-5 h-5 text-cyan-400 group-hover:scale-110 transition-transform" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <h4 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                            {item.name}
                          </h4>
                          <span className="text-[10px] font-mono text-cyan-400 glass-pill border-cyan-500/30 px-2 py-0.5 rounded">
                            {item.handle}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {item.isEmail && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            handleCopyEmail();
                          }}
                          className="p-2.5 rounded-xl glass-pill text-slate-300 hover:text-white hover:border-cyan-400 transition-all flex items-center gap-1.5 text-xs font-mono"
                          title="Copy email to clipboard"
                          aria-label="Copy email address"
                        >
                          {copied ? (
                            <>
                              <Check className="w-4 h-4 text-emerald-400" />
                              <span className="text-emerald-400 hidden sm:inline">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-4 h-4 text-cyan-400" />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>
                      )}

                      <div className="p-2.5 rounded-xl glass-pill text-slate-300 group-hover:text-slate-950 group-hover:bg-cyan-400 group-hover:border-cyan-400 transition-all">
                        <ArrowUpRight className="w-4 h-4 text-cyan-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: Contact Form with Frosted Glass Styling */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 glass-card rounded-2xl p-6 sm:p-10 border-cyan-500/25 relative overflow-hidden"
          >
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Fill out the form below and I'll get back to you as soon as possible.
            </p>

            {status === 'success' ? (
              <div className="rounded-xl bg-cyan-950/40 border border-cyan-500/40 p-8 text-center space-y-4 animate-in fade-in">
                <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(0,240,255,0.4)]">
                  <Sparkles className="w-7 h-7 text-cyan-400" />
                </div>
                <h4 className="text-xl font-bold text-white">Message Sent Successfully!</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Thank you for reaching out, Guna will review your message shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs hover:bg-cyan-400 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {status === 'error' && (
                  <div className="p-3 rounded-lg bg-rose-950/50 border border-rose-500/40 text-rose-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Your Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Chen"
                      className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none backdrop-blur-md transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@example.com"
                      className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none backdrop-blur-md transition-all"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Opportunity"
                    className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none backdrop-blur-md transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Message <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, idea, or questions..."
                    className="w-full bg-slate-900/60 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 focus:shadow-[0_0_15px_rgba(0,240,255,0.2)] focus:outline-none backdrop-blur-md transition-all resize-y"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-sm tracking-wide text-slate-950 bg-gradient-to-r from-cyan-400 via-cyan-300 to-blue-400 hover:from-cyan-300 hover:to-blue-300 shadow-[0_0_20px_rgba(0,240,255,0.4)] hover:shadow-[0_0_30px_rgba(0,240,255,0.6)] active:scale-95 transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Sending Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}

          </motion.div>

        </div>

      </div>
    </section>
  );
}
