import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Lock, Mic, Play, Sparkles, Terminal, FileCheck } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // Interactive state for simulated project demos
  const [pinInput, setPinInput] = useState('');
  const [pinStatus, setPinStatus] = useState(null);

  const [mathPrompt, setMathPrompt] = useState('2x^2 + 6x - 8 = 0');
  const [mathOutput, setMathOutput] = useState(null);
  const [isThinking, setIsThinking] = useState(false);


  // Demo actions
  const handleVerifyPin = (e) => {
    e.preventDefault();
    if (pinInput.length === 6) {
      setPinStatus('success');
    } else {
      setPinStatus('error');
    }
  };

  const handleCalculateMath = (e) => {
    e.preventDefault();
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setMathOutput({
        steps: [
          'Factoring: 2(x^2 + 3x - 4) = 0',
          'Quadratic factors: 2(x + 4)(x - 1) = 0',
          'Roots: x = -4, x = 1',
          'Verification: 2(1)^2 + 6(1) - 8 = 0 ✓'
        ],
        voiceText: 'The roots of the equation are negative 4 and positive 1.'
      });
    }, 600);
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl glass-card rounded-2xl border border-cyan-500/30 overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900/60">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              {project.title}
              <span className="text-xs font-mono font-normal text-cyan-400 px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30">
                Interactive Preview
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Project Overview */}
          <div>
            <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Interactive Simulation Container */}
          <div className="rounded-xl bg-slate-950/80 border border-cyan-500/20 p-5 font-mono text-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <Terminal className="w-3.5 h-3.5" /> Live Sandbox Simulation
              </span>
              <span>Status: Ready</span>
            </div>

            {/* Simulation 1: SharePinz */}
            {project.id === 'sharepinz' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 font-sans">
                  Test the PIN retrieval mechanism below. Enter any 6-digit PIN (e.g. <span className="font-mono text-cyan-300">849201</span>) to simulate encrypted file payload download.
                </div>
                <form onSubmit={handleVerifyPin} className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white font-mono tracking-widest text-center text-base focus:border-cyan-400 focus:outline-none w-48"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-sans font-semibold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.3)]"
                  >
                    <Lock className="w-3.5 h-3.5" /> Decrypt & Fetch
                  </button>
                </form>

                {pinStatus === 'success' && (
                  <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs flex items-center justify-between animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-cyan-400" />
                      <span>Payload verified: <strong>project_archive_v2.zip</strong> (14.2 MB)</span>
                    </div>
                    <span className="text-emerald-400 font-bold">Ready</span>
                  </div>
                )}
                {pinStatus === 'error' && (
                  <div className="text-rose-400 text-xs">
                    Please enter a valid 6-digit PIN code to simulate retrieval.
                  </div>
                )}
              </div>
            )}

            {/* Simulation 2: Jama AI */}
            {project.id === 'jama-ai' && (
              <div className="space-y-4">
                <div className="text-xs text-slate-300 font-sans">
                  Test the AI voice & calculation engine. Enter a math question or click Solve to see step-by-step reasoning.
                </div>
                <form onSubmit={handleCalculateMath} className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <input
                      type="text"
                      value={mathPrompt}
                      onChange={(e) => setMathPrompt(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-3 pr-9 py-2 text-white text-xs font-mono focus:border-cyan-400 focus:outline-none"
                    />
                    <Mic className="absolute right-2.5 top-2.5 w-4 h-4 text-cyan-400 animate-pulse" />
                  </div>
                  <button
                    type="submit"
                    disabled={isThinking}
                    className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-sans font-semibold text-xs hover:bg-cyan-400 transition-all flex items-center gap-1.5 shadow-[0_0_12px_rgba(0,240,255,0.3)] disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isThinking ? 'Calculating...' : 'Solve with AI'}
                  </button>
                </form>

                {mathOutput && (
                  <div className="space-y-2 p-3 rounded-lg bg-slate-900/90 border border-slate-800 text-xs animate-in fade-in">
                    <div className="text-cyan-400 font-semibold mb-1">Step-by-Step Breakdown:</div>
                    {mathOutput.steps.map((step, idx) => (
                      <div key={idx} className="text-slate-300 flex items-center gap-2">
                        <span className="text-cyan-500 font-bold">{idx + 1}.</span> {step}
                      </div>
                    ))}
                    <div className="pt-2 text-cyan-300 text-[11px] border-t border-slate-800 flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Synthesized Audio Response: "{mathOutput.voiceText}"</span>
                    </div>
                  </div>
                )}
              </div>
            )}


          </div>

          {/* Key Architectural Highlights */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-3">
              Key Technical Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-cyan-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-md text-xs font-mono bg-cyan-950/40 border border-cyan-500/30 text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-slate-800 bg-slate-900/80">
          <span className="text-xs text-slate-400">
            Project designed & built by Guna
          </span>
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 transition-colors"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>GitHub Repo</span>
            </a>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 transition-colors shadow-[0_0_12px_rgba(0,240,255,0.3)]"
            >
              <span>Close Sandbox</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
