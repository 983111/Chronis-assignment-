import React, { useState } from "react";
import { ArrowRight, Brain, Calendar, Flame, Layers, Smile, Users, Info, TrendingUp, AlertTriangle } from "lucide-react";
import { DailyEntry, InsightPattern } from "../types";

interface DashboardProps {
  userName: string;
  entries: DailyEntry[];
  insights: InsightPattern[];
  onSelectInsight: (id: string) => void;
  onNavigateToSignals: () => void;
}

export default function Dashboard({
  userName,
  entries,
  insights,
  onSelectInsight,
  onNavigateToSignals
}: DashboardProps) {
  const [highlightMetric, setHighlightMetric] = useState<string | null>(null);

  // Derive current scores dynamically based on the last 3-5 days
  const getAverageScore = (metricKey: keyof DailyEntry) => {
    if (entries.length === 0) return 70; // fallback
    const sum = entries.reduce((acc, entry) => {
      const val = entry[metricKey];
      if (typeof val === "number") return acc + val;
      if (typeof val === "boolean") return acc + (val ? 10 : 2);
      return acc;
    }, 0);
    const avg = sum / entries.length;
    // Scale out of 100 for visual premium scores
    return Math.round(avg * 10);
  };

  const focusScore = getAverageScore("focus");
  const energyScore = getAverageScore("energy");
  const moodScore = getAverageScore("mood");

  // Format today's date
  const todayStr = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  // Highlighted latest pattern
  const topInsight = insights.find(ins => ins.id === "focus-sunday-decay") || insights[0];

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 space-y-8 select-none leading-relaxed transition-all">
      
      {/* Greetings Block */}
      <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-2.5">
        <div>
          <h1 className="text-3xl font-serif text-slate-900 font-normal tracking-tight">
            Good afternoon, <span className="font-semibold text-rose-600/90 italic">{userName}</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium">Your behavior is shifting.</p>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
          <Calendar className="w-3.5 h-3.5 shrink-0" />
          <span>{todayStr}</span>
        </div>
      </section>

      {/* Row 1 Grid: Behavioral Landscape + At A Glance Baselines */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6.5">
        
        {/* SVG Flow Wave Chart Card */}
        <div className="lg:col-span-8 bg-white border border-slate-100/80 rounded-3xl p-6 relative shadow-3xs flex flex-col justify-between overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
                  YOUR BEHAVIORAL LANDSCAPE
                </span>
                <p className="text-[10px] text-slate-405 leading-none mt-0.5">Continuous multi-variate metrics wave</p>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-rose-500 font-semibold px-2 py-0.5 bg-rose-50 rounded-full border border-rose-100/20">
                <Layers className="w-3.5 h-3.5" />
                <span>Wave Sync active</span>
              </div>
            </div>

            {/* Custom Interactive Wave Legend Annotation Rows from the screenshot layout */}
            <div className="grid grid-cols-3 gap-2.5 bg-[#FAF9F6] p-3 rounded-xl border border-slate-100 mb-6 font-space text-left">
              <div>
                <span className="text-[10px] text-slate-400 truncate block">More active</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                  <span className="text-emerald-500 font-mono text-[9px]">↑</span> 18%
                </span>
              </div>
              <div className="border-l border-slate-205 pl-3">
                <span className="text-[10px] text-slate-400 truncate block">Focus dip</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                  <span className="text-rose-500 font-mono text-[9px]">↓</span> 6%
                </span>
              </div>
              <div className="border-l border-slate-205 pl-3">
                <span className="text-[10px] text-slate-400 truncate block">Social uplift</span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1 mt-0.5">
                  <span className="text-teal-600 font-mono text-[9px]">↑</span> 11%
                </span>
              </div>
            </div>

            {/* Smooth Layered SVG Flow Waves */}
            <div className="relative h-44 w-full bg-[#FCFBF9]/40 border border-dashed border-slate-200/50 rounded-xl overflow-hidden mb-4">
              <svg className="w-full h-full" viewBox="0 0 500 150" preserveAspectRatio="none">
                <defs>
                  {/* Gradients */}
                  <linearGradient id="focusWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#C084FC" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="sleepWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.0" />
                  </linearGradient>
                  <linearGradient id="activityWave" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F43F5E" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#F43F5E" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Grid guidelines */}
                <line x1="0" y1="37.5" x2="500" y2="37.5" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="75" x2="500" y2="75" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="0" y1="112.5" x2="500" y2="112.5" stroke="#E2E8F0" strokeWidth="0.5" strokeDasharray="3 3" />

                {/* Wave 1: Sleep (Blue) */}
                <path
                  d="M0,110 C80,95 120,135 200,85 C280,35 340,140 420,105 C460,88 480,98 500,75 L500,150 L0,150 Z"
                  fill="url(#sleepWave)"
                  opacity={highlightMetric === null || highlightMetric === "sleep" ? "1" : "0.15"}
                  className="transition-all duration-300"
                />
                <path
                  d="M0,110 C80,95 120,135 200,85 C280,35 340,140 420,105 C460,88 480,98 500,75"
                  fill="none"
                  stroke="#0EA5E9"
                  strokeWidth="2"
                  opacity={highlightMetric === null || highlightMetric === "sleep" ? "1" : "0.15"}
                  className="transition-all duration-300"
                />

                {/* Wave 2: Focus (Purple) */}
                <path
                  d="M0,90 C70,120 140,80 210,130 C280,180 350,60 410,75 C470,90 485,45 500,55 L500,150 L0,150 Z"
                  fill="url(#focusWave)"
                  opacity={highlightMetric === null || highlightMetric === "focus" ? "1" : "0.15"}
                  className="transition-all duration-300"
                />
                <path
                  d="M0,90 C70,120 140,80 210,130 C280,180 350,60 410,75 C470,90 485,45 500,55"
                  fill="none"
                  stroke="#A855F7"
                  strokeWidth="2.5"
                  opacity={highlightMetric === null || highlightMetric === "focus" ? "1" : "0.15"}
                  className="transition-all duration-300"
                />

                {/* Wave 3: Activity / Social (Pink/Rose) */}
                <path
                  d="M0,130 C60,110 130,135 190,105 C250,75 320,110 380,95 C440,80 470,133 500,115 L500,150 L0,150 Z"
                  fill="url(#activityWave)"
                  opacity={highlightMetric === null || highlightMetric === "activity" ? "1" : "0.15"}
                  className="transition-all duration-300"
                />
                <path
                  d="M0,130 C60,110 130,135 190,105 C250,75 320,110 380,95 C440,80 470,133 500,115"
                  fill="none"
                  stroke="#F43F5E"
                  strokeWidth="2"
                  opacity={highlightMetric === null || highlightMetric === "activity" ? "1" : "0.15"}
                  className="transition-all duration-300"
                />
              </svg>

              {/* Float point markers */}
              <div className="absolute top-[85px] left-[180px] w-2.5 h-2.5 rounded-full bg-indigo-500 border-2 border-white pointer-events-none ring-4 ring-indigo-200/50" />
              <div className="absolute top-[92px] left-[360px] w-2.5 h-2.5 rounded-full bg-rose-500 border-2 border-white pointer-events-none ring-4 ring-rose-200/50" />
            </div>
          </div>

          {/* Interactive Legends toggler bottom */}
          <div className="flex flex-wrap items-center gap-2 border-t border-slate-50 pt-4 mt-2">
            <button
              onClick={() => setHighlightMetric(highlightMetric === "focus" ? null : "focus")}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                highlightMetric === "focus"
                  ? "bg-purple-100 text-purple-700 border-purple-200"
                  : "bg-slate-50 text-slate-500 border-slate-200/40 hover:bg-slate-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
              <span>Focus</span>
            </button>
            <button
              onClick={() => setHighlightMetric(highlightMetric === "sleep" ? null : "sleep")}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                highlightMetric === "sleep"
                  ? "bg-sky-100 text-sky-700 border-sky-200"
                  : "bg-slate-50 text-slate-500 border-slate-200/40 hover:bg-slate-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              <span>Sleep</span>
            </button>
            <button
              onClick={() => setHighlightMetric(highlightMetric === "activity" ? null : "activity")}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                highlightMetric === "activity"
                  ? "bg-rose-100 text-rose-700 border-rose-200"
                  : "bg-slate-50 text-slate-500 border-slate-200/40 hover:bg-slate-100"
              }`}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Activity & Social</span>
            </button>
            {highlightMetric && (
              <button
                onClick={() => setHighlightMetric(null)}
                className="text-[9px] font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              >
                Reset highlighting
              </button>
            )}
          </div>

        </div>

        {/* At-A-Glance Baselines Cards */}
        <div className="lg:col-span-4 bg-white border border-slate-100/80 rounded-3xl p-6 shadow-3xs flex flex-col justify-between">
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              AT A GLANCE
            </span>
            <p className="text-[10px] text-slate-405 leading-none mt-0.5 mb-6">Your dynamic behavioral indices vs baseline</p>

            <div className="space-y-4">
              {/* Focus score card */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600">
                    <Brain className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Focus</div>
                    <div className="text-[10px] text-slate-405">Daily readiness level</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 font-space">{focusScore}</div>
                  <div className="text-[9px] text-emerald-600 font-medium font-mono flex items-center gap-0.5">
                    <span>↑</span> 14%
                  </div>
                </div>
              </div>

              {/* Energy score card */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Energy</div>
                    <div className="text-[10px] text-slate-405">Circadian baseline index</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 font-space">{energyScore}</div>
                  <div className="text-[9px] text-rose-500 font-medium font-mono flex items-center gap-0.5">
                    <span>↓</span> 4%
                  </div>
                </div>
              </div>

              {/* Mood score card */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50/50 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                    <Smile className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-slate-800">Mood</div>
                    <div className="text-[10px] text-slate-405">System consistency rating</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-slate-900 font-space">{moodScore}</div>
                  <div className="text-[9px] text-emerald-600 font-medium font-mono flex items-center gap-0.5">
                    <span>↑</span> 8%
                  </div>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateToSignals}
            className="w-full flex items-center justify-between gap-1 mt-6 border border-slate-100 hover:border-slate-200 p-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50/60 rounded-xl transition-all cursor-pointer"
          >
            <span>View all signals</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Row 2: Emerging Pattern Card (Matches exactly the layout in screen section 1 bottom) */}
      {topInsight && (
        <section className="bg-[#FAF9F6] rounded-3xl border border-slate-200/50 p-6 shadow-3xs flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100 relative overflow-hidden bg-radial-to-br">
          
          {/* Emerging Pattern Text */}
          <div className="flex-1 pb-5 md:pb-0 md:pr-6 md:my-auto">
            <span className="text-[9px] font-bold text-rose-600 uppercase tracking-widest font-mono">
              EMERGING PATTERN
            </span>
            <h3 className="text-xl font-serif text-slate-900 mt-1 font-medium select-none">
              {topInsight.title}
            </h3>
            <p className="text-slate-500 text-xs mt-2 font-normal leading-relaxed max-w-sm">
              {topInsight.description}
            </p>
            <button
              onClick={() => onSelectInsight(topInsight.id)}
              className="mt-5.5 flex items-center gap-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 font-semibold px-4.5 py-2 rounded-full text-xs transition-colors cursor-pointer"
            >
              <span>Explore this insight</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Confidence Circular Gauge */}
          <div className="py-5 md:py-0 md:px-6 flex flex-col justify-center items-center shrink-0 w-full md:w-48 text-center bg-[#FAF9F6] relative z-10/40">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono mb-2">
              CONFIDENCE
            </span>
            <div className="relative w-20 h-20 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="40" cy="40" r="34" stroke="#FAF2EE" strokeWidth="4.5" fill="none" />
                <circle
                  cx="40"
                  cy="40"
                  r="34"
                  stroke="#F43F5E"
                  strokeWidth="4.5"
                  fill="none"
                  strokeDasharray="213"
                  strokeDashoffset={213 - (213 * topInsight.confidence) / 100}
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-bold text-slate-800 font-space">{topInsight.confidence}%</span>
              </div>
            </div>
            <span className="text-[9px] tracking-wide text-slate-400 mt-2 font-semibold">Consistent evidence</span>
          </div>

          {/* Why This Matters */}
          <div className="pt-5 md:pt-0 md:pl-6 flex-1 md:my-auto relative max-w-sm">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
              WHY THIS MATTERS
            </span>
            <p className="text-slate-500 text-xs mt-2 leading-relaxed">
              Sustained focus is one of the strongest drivers of your long term goals. Small behavioral shifts this week can build momentum and produce compound future outcomes.
            </p>

            {/* Micro Art graphic from screenshot */}
            <div className="absolute right-0 bottom-0 opacity-25 pointer-events-none select-none">
              <svg className="w-16 h-16 text-rose-500" viewBox="0 0 40 40" fill="currentColor">
                <path d="M10,25 C12,18 16,14 22,12 C28,10 32,15 30,22 C28,29 24,33 18,34 C12,35 8,32 10,25 Z" opacity="0.4" />
                <path d="M12,28 C14,21 19,16 25,18 C31,20 33,25 30,31 C27,37 21,38 15,36 C10,34 10,31 12,28 Z" opacity="0.25" />
              </svg>
            </div>
          </div>

        </section>
      )}

      {/* Detected Changes Row from simple dashboard layout list */}
      <section className="bg-white border border-slate-100 rounded-3xl p-6.5 shadow-3xs">
        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">
          DETECTED CHANGES (TWILIGHT CLASSIFIER)
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">
          <div className="p-4 rounded-2xl bg-emerald-50/20 border border-emerald-100/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 bloc">Focus Consistency</span>
              <p className="text-[10px] text-slate-405">Improved 14% over weekend</p>
            </div>
            <span className="text-emerald-600 font-bold font-mono py-1 px-2.5 bg-emerald-100/50 rounded-full text-[10px]">IMPROVING</span>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50/20 border border-amber-100/35 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 bloc">Energy Levels</span>
              <p className="text-[10px] text-slate-405">Variance remains unchanged</p>
            </div>
            <span className="text-amber-600 font-bold font-mono py-1 px-2.5 bg-amber-100/50 rounded-full text-[10px]">STABLE</span>
          </div>

          <div className="p-4 rounded-2xl bg-rose-50/20 border border-rose-100/30 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-800 bloc">Circadian Sleep</span>
              <p className="text-[10px] text-slate-405">Sleep shifted 1.5 hrs later</p>
            </div>
            <span className="text-rose-600 font-bold font-mono py-1 px-2.5 bg-rose-100/50 rounded-full text-[10px]">DECLINING</span>
          </div>
        </div>
      </section>

    </div>
  );
}
