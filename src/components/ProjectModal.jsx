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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-black/[0.08] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.06] bg-[#FAFAF8]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-liquid-blue animate-pulse" />
            <h3 className="text-xl font-bold text-ink-primary flex items-center gap-2">
              {project.title}
              <span className="text-xs font-mono font-normal text-liquid-blue px-2.5 py-0.5 rounded-full bg-sky-50 border border-sky-200">
                Live Simulation
              </span>
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-black/[0.04] text-ink-secondary hover:text-ink-primary hover:bg-black/[0.08] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* Project Overview */}
          <div>
            <p className="text-ink-secondary leading-relaxed text-sm sm:text-base">
              {project.description}
            </p>
          </div>

          {/* Interactive Simulation Sandbox */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-black/[0.08] p-5 font-mono text-sm shadow-sm">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-black/[0.06] text-xs text-ink-secondary">
              <span className="flex items-center gap-1.5 text-liquid-blue font-semibold">
                <Terminal className="w-3.5 h-3.5" /> Interactive Sandbox Demo
              </span>
              <span>Status: Active</span>
            </div>

            {/* Simulation 1: SharePinz */}
            {project.id === 'sharepinz' && (
              <div className="space-y-4">
                <div className="text-xs text-ink-secondary font-sans leading-relaxed">
                  Test the secure PIN retrieval workflow. Enter any 6-digit PIN code (e.g. <span className="font-mono font-bold text-liquid-blue">849201</span>) to simulate client-side decryption and download.
                </div>
                <form onSubmit={handleVerifyPin} className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    placeholder="Enter 6-digit PIN"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                    className="bg-white border border-black/[0.12] rounded-xl px-4 py-2 text-ink-primary font-mono tracking-widest text-center text-base focus:border-liquid-blue focus:outline-none w-48 shadow-sm"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-semibold btn-liquid-primary flex items-center gap-1.5"
                  >
                    <Lock className="w-3.5 h-3.5" /> Decrypt & Fetch
                  </button>
                </form>

                {pinStatus === 'success' && (
                  <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center justify-between animate-in fade-in">
                    <div className="flex items-center gap-2">
                      <FileCheck className="w-4 h-4 text-emerald-600" />
                      <span>Encrypted payload verified: <strong>project_archive_v2.zip</strong> (14.2 MB)</span>
                    </div>
                    <span className="text-emerald-700 font-bold">Ready</span>
                  </div>
                )}
                {pinStatus === 'error' && (
                  <div className="text-rose-600 text-xs">
                    Please enter a valid 6-digit numeric PIN code to simulate retrieval.
                  </div>
                )}
              </div>
            )}

            {/* Simulation 2: Jama AI */}
            {project.id === 'jama-ai' && (
              <div className="space-y-4">
                <div className="text-xs text-ink-secondary font-sans leading-relaxed">
                  Test the AI mathematical reasoning engine. Enter a problem or click Solve to inspect step-by-step reasoning.
                </div>
                <form onSubmit={handleCalculateMath} className="flex flex-wrap items-center gap-2">
                  <div className="relative flex-1 min-w-[200px]">
                    <input
                      type="text"
                      value={mathPrompt}
                      onChange={(e) => setMathPrompt(e.target.value)}
                      className="w-full bg-white border border-black/[0.12] rounded-xl pl-3 pr-9 py-2 text-ink-primary text-xs font-mono focus:border-liquid-blue focus:outline-none shadow-sm"
                    />
                    <Mic className="absolute right-2.5 top-2.5 w-4 h-4 text-liquid-blue animate-pulse" />
                  </div>
                  <button
                    type="submit"
                    disabled={isThinking}
                    className="px-4 py-2 rounded-xl text-xs font-semibold btn-liquid-primary flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isThinking ? 'Calculating...' : 'Solve with AI'}
                  </button>
                </form>

                {mathOutput && (
                  <div className="space-y-2 p-3.5 rounded-xl bg-white border border-black/[0.08] text-xs animate-in fade-in shadow-sm">
                    <div className="text-liquid-blue font-semibold mb-1">Step-by-Step Reasoning:</div>
                    {mathOutput.steps.map((step, idx) => (
                      <div key={idx} className="text-ink-secondary flex items-center gap-2">
                        <span className="text-liquid-blue font-bold">{idx + 1}.</span> {step}
                      </div>
                    ))}
                    <div className="pt-2 text-ink-primary text-[11px] border-t border-black/[0.06] flex items-center gap-1.5">
                      <Mic className="w-3.5 h-3.5 text-liquid-blue" />
                      <span>Synthesized Audio Response: "{mathOutput.voiceText}"</span>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Key Architectural Highlights */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-primary font-semibold mb-3">
              Key Technical Features
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.highlights.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-ink-secondary">
                  <CheckCircle2 className="w-4 h-4 text-liquid-blue shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Badges */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-wider text-ink-primary font-semibold mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-full text-xs font-mono bg-[#F2F3F5] text-ink-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer with Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 border-t border-black/[0.06] bg-[#FAFAF8]">
          <span className="text-xs text-ink-secondary">
            Engineered by Varikunta Gunasekhar
          </span>
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium btn-liquid-secondary"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub Repo</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold btn-liquid-primary"
            >
              <span>Close Sandbox</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
