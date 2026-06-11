import React from "react";
import { ArrowRight, ShieldCheck, Cpu, Flame, Smile } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onViewDemo: () => void;
}

export default function LandingPage({ onGetStarted, onViewDemo }: LandingPageProps) {
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800 selection:bg-rose-100 selection:text-rose-900 flex flex-col font-sans transition-colors duration-200">
      
      {/* Top Header Navigation */}
      <header className="max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 relative">
            <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
              <path
                d="M10,25 C12,18 16,14 22,12 C28,10 32,15 30,22 C28,29 24,33 18,34 C12,35 8,32 10,25 Z"
                fill="#C084FC"
                opacity="0.9"
              />
              <path
                d="M12,28 C14,21 19,16 25,18 C31,20 33,25 30,31 C27,37 21,38 15,36 C10,34 10,31 12,28 Z"
                fill="#F43F5E"
                opacity="0.65"
                style={{ mixBlendMode: "multiply" }}
              />
            </svg>
          </div>
          <span className="text-2xl font-serif font-semibold tracking-tight text-slate-900">CHRONIS</span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={onViewDemo}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
          >
            Demo Sandbox
          </button>
          <button
            onClick={onGetStarted}
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4.5 py-2.5 rounded-full shadow-xs transition-transform transform active:scale-97 cursor-pointer"
          >
            Join Chronis
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="flex-1 max-w-4xl mx-auto px-6 py-16 md:py-24 text-center flex flex-col justify-center items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-50 text-rose-600 rounded-full border border-rose-100/50 mb-7 animate-fade-in">
          <span className="text-[10px] font-bold uppercase tracking-wider">A New Approach to Self-Discovery</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-serif text-slate-900 tracking-tight font-normal leading-tight md:leading-[1.15] max-w-3xl">
          Understand your behavior.
        </h1>
        <p className="mt-6 text-base md:text-lg text-slate-500 max-w-2xl font-light leading-relaxed">
          Chronis transforms daily activities into patterns, stories, and insights. No charts clutter. Just your behavior framed like a beautifully written story.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-7 py-3.5 rounded-full shadow-md transition-all cursor-pointer hover:shadow-lg active:scale-98"
          >
            <span>Get Started</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onViewDemo}
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200/80 font-semibold text-sm px-7 py-3.5 rounded-full shadow-xs transition-all cursor-pointer active:scale-98"
          >
            View Demo
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white border-t border-b border-slate-100 py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-2xl font-serif text-slate-900">How Chronis Works</h2>
            <p className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest">3 steps to complete alignment</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold mb-4 font-space">1</div>
              <h3 className="font-serif text-lg text-slate-900 font-medium">Behaviors Check-in</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                Log focus, mood, sleep hours, exercise, and energy levels in under 30 seconds daily.
              </p>
            </div>
            
            <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-rose-50 flex items-center justify-center text-rose-600 font-bold mb-4 font-space">2</div>
              <h3 className="font-serif text-lg text-slate-900 font-medium">Pattern Detection</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                Chronis analyzes data trends to extract key correlations, like how late sleep on Saturdays decay focus on Sunday evenings.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50/50 border border-slate-100">
              <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold mb-4 font-space">3</div>
              <h3 className="font-serif text-lg text-slate-900 font-medium">Signature Narrative Story</h3>
              <p className="text-slate-500 text-xs mt-2.5 leading-relaxed">
                Instead of overwhelming Excel spreadsheets, Chronis wraps logs into beautiful monthly story narrative chapters.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Example Insights Simulation */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif text-slate-900">Example Insights</h2>
          <p className="text-xs text-slate-400 mt-2">Glimpse of intelligence you will unlock</p>
        </div>

        <div className="max-w-xl mx-auto bg-[#FFF]/70 border border-slate-200/60 rounded-3xl p-6 md:p-8 shadow-xs">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[10px] font-bold text-rose-600 uppercase tracking-widest font-mono">EMERGING PATTERN</span>
              <h3 className="text-xl font-serif text-slate-900 mt-1">Weekend focus decay</h3>
              <p className="text-slate-500 text-xs mt-1.5 leading-relaxed">
                Your focus tends to drop on weekends, especially Sundays due to sleep shifts.
              </p>
            </div>
            <div className="w-14 h-14 rounded-full border-4 border-slate-100 flex flex-col justify-center items-center shrink-0">
              <span className="text-sm font-bold text-slate-800 font-space">82%</span>
              <span className="text-[8px] uppercase tracking-wide text-slate-400 font-semibold leading-none">Conf.</span>
            </div>
          </div>
          <div className="mt-6 border-t border-slate-100 pt-5 flex justify-between items-center text-xs text-slate-400 font-mono">
            <span>Factors: late screens, shift offset</span>
            <span className="text-slate-600 cursor-pointer font-bold inline-flex items-center gap-1" onClick={onGetStarted}>Explore <ArrowRight className="w-3.5 h-3.5" /></span>
          </div>
        </div>
      </section>

      {/* Privacy Section (Mandatory Zero-Trust) */}
      <section className="bg-slate-900 text-white py-20 px-6 mt-auto">
        <div className="max-w-3xl mx-auto text-center">
          <ShieldCheck className="w-12 h-12 text-rose-400 mx-auto mb-6" />
          <h2 className="text-2xl font-serif text-white mb-4">Your Privacy First</h2>
          <p className="text-slate-400 text-sm font-light leading-relaxed mb-8 max-w-xl mx-auto">
            Chronis is built on absolute Zero-Trust. Your behavioral metrics are strictly isolated, authenticated securely, and never sold to third-party brokers. What happens in your routine stays yours.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto text-left text-xs text-slate-400 bg-slate-800/40 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-start gap-2">
              <span className="text-rose-400 font-bold font-mono">✓</span>
              <span>Fully Secure isolated data storage</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-rose-400 font-bold font-mono">✓</span>
              <span>No shadow marketing pixels tracking habits</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
