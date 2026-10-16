import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
  Send, 
  Copy, 
  Check, 
  Sparkles, 
  MessageSquare,
  ArrowUpRight,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';
import SectionAvatarBadge from './SectionAvatarBadge';

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
      const response = await fetch('https://formsubmit.co/ajax/varikuntagunasekhar@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _replyto: formData.email.trim(),
          _subject: formData.subject.trim() || `Portfolio Message from ${formData.name.trim()}`,
          message: formData.message.trim(),
          _captcha: 'false',
          _template: 'table',
        }),
      });

      const data = await response.json();

      if (data.success === 'true' || data.success === true || (data.message && data.message.includes('Activation'))) {
        setStatus('success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.message || 'Something went wrong. Please reach out directly to varikuntagunasekhar@gmail.com');
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage('Network error. Please reach out directly to varikuntagunasekhar@gmail.com');
    }
  };

  const socialLinks = [
    {
      name: 'GitHub',
      handle: 'gs6901259-create',
      href: personalInfo.socials.github,
      icon: GithubIcon,
      isExternal: true,
    },
    {
      name: 'LinkedIn',
      handle: 'varikunta-gunasekhar',
      href: personalInfo.socials.linkedin,
      icon: LinkedinIcon,
      isExternal: true,
    },
    {
      name: 'Instagram',
      handle: '@gunasekhar_online',
      href: personalInfo.socials.instagram,
      icon: InstagramIcon,
      isExternal: true,
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <SectionAvatarBadge section="contact" />

          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-pill text-xs font-mono font-medium uppercase tracking-wider text-ink-secondary mb-4 shadow-liquid-sm"
          >
            <span>Get In Touch</span>
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-ink-primary font-sans"
          >
            Have an idea? <span className="text-gradient-liquid">Let's build it.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-xl text-base sm:text-lg text-ink-secondary mt-4 leading-relaxed"
          >
            Whether you want to discuss a project, explore collaboration, or just say hello — my inbox is always open.
          </motion.p>
        </div>

        {/* Two-Column Grid: Direct Contact Info & Working Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          
          {/* Left Column: Direct Info & Social Channels */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            {/* Direct Email Card with One-Click Copy */}
            <div className="liquid-card rounded-3xl p-6 sm:p-8 shadow-liquid">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-liquid-blue mb-5">
                <Mail className="w-6 h-6 text-liquid-blue" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-wider text-liquid-blue font-semibold">
                Direct Email
              </span>

              <h3 className="text-xl font-bold text-ink-primary mt-1 mb-2">
                {personalInfo.email}
              </h3>

              <p className="text-xs text-ink-secondary leading-relaxed mb-6">
                Feel free to email me directly anytime. I monitor this inbox regularly and usually respond within 24 hours.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold btn-liquid-secondary"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-liquid-blue" />
                      <span>Copy Email Address</span>
                    </>
                  )}
                </button>

                <a
                  href={`mailto:${personalInfo.email}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold btn-liquid-primary"
                >
                  <span>Open Mail App</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="liquid-card rounded-3xl p-6 shadow-liquid">
              <span className="text-[11px] font-mono uppercase tracking-wider text-ink-secondary font-semibold block mb-4">
                Connect on Networks
              </span>

              <div className="space-y-2.5">
                {socialLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#F8FAFC] border border-black/[0.06] hover:border-sky-300 hover:bg-white transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-white border border-black/[0.08] flex items-center justify-center text-ink-primary group-hover:text-liquid-blue transition-colors shadow-sm">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-ink-primary">
                            {item.name}
                          </div>
                          <div className="text-[11px] font-mono text-ink-secondary">
                            {item.handle}
                          </div>
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-liquid-blue transition-colors" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Availability Note */}
            <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-50/80 border border-emerald-200/80 text-emerald-800 text-xs">
              <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Available for engineering internships, project collaborations, and full-stack software development.</span>
            </div>
          </motion.div>

          {/* Right Column: Interactive Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-7"
          >
            <div className="liquid-card rounded-3xl p-8 sm:p-10 shadow-liquid">
              <div className="flex items-center gap-2 text-xs font-mono font-semibold text-liquid-blue uppercase tracking-wider mb-2">
                <MessageSquare className="w-4 h-4 text-liquid-blue" />
                <span>Send a Direct Message</span>
              </div>

              <h3 className="text-2xl font-bold text-ink-primary mb-2">
                Let's start a conversation
              </h3>

              <p className="text-xs text-ink-secondary leading-relaxed mb-6">
                Fill in the details below. Messages deliver directly to my verified inbox at <span className="font-mono text-ink-primary font-medium">{personalInfo.email}</span>.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono font-medium text-ink-primary mb-1.5">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Morgan"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.12] text-ink-primary text-sm focus:border-liquid-blue focus:ring-2 focus:ring-liquid-blue/15 focus:outline-none transition-all shadow-sm placeholder:text-gray-400"
                    />
                  </div>

                  {/* Email Input */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono font-medium text-ink-primary mb-1.5">
                      Your Email <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. alex@example.com"
                      required
                      className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.12] text-ink-primary text-sm focus:border-liquid-blue focus:ring-2 focus:ring-liquid-blue/15 focus:outline-none transition-all shadow-sm placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Subject Input */}
                <div>
                  <label htmlFor="subject" className="block text-xs font-mono font-medium text-ink-primary mb-1.5">
                    Subject / Project Topic
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="e.g. Full-Stack Collaboration / Opportunity"
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.12] text-ink-primary text-sm focus:border-liquid-blue focus:ring-2 focus:ring-liquid-blue/15 focus:outline-none transition-all shadow-sm placeholder:text-gray-400"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="block text-xs font-mono font-medium text-ink-primary mb-1.5">
                    Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Write your message, project idea, or question here..."
                    required
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-black/[0.12] text-ink-primary text-sm focus:border-liquid-blue focus:ring-2 focus:ring-liquid-blue/15 focus:outline-none transition-all shadow-sm placeholder:text-gray-400 resize-none"
                  />
                </div>

                {/* Status Banners */}
                {status === 'success' && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2.5 animate-in fade-in">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <div>
                      <strong className="font-semibold">Message delivered successfully!</strong> Thank you for reaching out. I'll get back to you shortly.
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs animate-in fade-in">
                    <strong>Error:</strong> {errorMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full font-semibold text-sm tracking-wide btn-liquid-primary disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
