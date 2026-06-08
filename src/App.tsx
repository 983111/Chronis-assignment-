/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Calendar, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { mockInsights } from "./data";
import BehavioralSnapshot from "./components/BehavioralSnapshot";
import BehavioralTrends from "./components/BehavioralTrends";
import RecentChanges from "./components/RecentChanges";
import InsightExplorer from "./components/InsightExplorer";
import NarrativeTimeline from "./components/NarrativeTimeline";
import ProductJudgmentPanel from "./components/ProductJudgmentPanel";

export default function App() {
  const [timeRange, setTimeRange] = useState<"7D" | "30D" | "90D">(() => {
    const saved = localStorage.getItem("chronis_time_range");
    return (saved as "7D" | "30D" | "90D") || "30D";
  });
  const [activeInsightId, setActiveInsightId] = useState<string>("focus-sunday-drop");
  const [trackedInsightIds, setTrackedInsightIds] = useState<string[]>(() => {
    const saved = localStorage.getItem("chronis_tracked_insights");
    try {
      return saved ? JSON.parse(saved) : ["focus-sunday-drop"];
    } catch {
      return ["focus-sunday-drop"];
    }
  });
  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem("chronis_time_range", timeRange);
  }, [timeRange]);

  useEffect(() => {
    localStorage.setItem("chronis_tracked_insights", JSON.stringify(trackedInsightIds));
  }, [trackedInsightIds]);

  // Dynamic values to show responsiveness when shifting range
  const consistencyScores = {
    "7D": 68,
    "30D": 72,
    "90D": 75,
  };

  const dateRanges = {
    "7D": "Jun 02 – Jun 08, 2026",
    "30D": "May 10 – Jun 08, 2026",
    "90D": "Mar 11 – Jun 08, 2026",
  };

  const handleToggleTrackInsight = (insightId: string) => {
    setTrackedInsightIds((prev) =>
      prev.includes(insightId)
        ? prev.filter((id) => id !== insightId)
        : [...prev, insightId]
    );
  };

  // Callback to select insight and scroll Explorer into focus
  const handleSelectInsight = (insightId: string) => {
    setActiveInsightId(insightId);
    setTimeout(() => {
      const el = document.getElementById("insight-explorer-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]/90 text-slate-800 selection:bg-emerald-150 selection:text-emerald-900 pb-16 font-sans">
      
      {/* Prime Header & Navigation Panel */}
      <header className="max-w-7xl mx-auto px-4 md:px-8 py-4 md:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          
          {/* Logo Brand Title with Custom Mobile Grid Placement */}
          <div className="flex items-center justify-between w-full sm:w-auto">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 relative">
                {/* Distinctive custom green icon resembling screenshot logo wings */}
                <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
                  <path
                    d="M10,25 C12,18 16,14 22,12 C28,10 32,15 30,22 C28,29 24,33 18,34 C12,35 8,32 10,25 Z"
                    fill="#10b981"
                    opacity="0.9"
                  />
                  <path
                    d="M12,28 C14,21 19,16 25,18 C31,20 33,25 30,31 C27,37 21,38 15,36 C10,34 10,31 12,28 Z"
                    fill="#14b8a6"
                    opacity="0.65"
                    style={{ mixBlendMode: "multiply" }}
                  />
                </svg>
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900 font-sans">Chronis</span>
            </div>

            {/* Mobile View Avatar Block */}
            <div className="sm:hidden w-8 h-8 rounded-full bg-slate-200 border border-slate-100 overflow-hidden shadow-3xs">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                alt="Alex"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Quick Date Range Selection Controls */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-6 w-full sm:w-auto">
            <div className="flex bg-slate-100/70 rounded-full p-1 border border-slate-200/50 justify-between sm:justify-start">
              {(["7D", "30D", "90D"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setTimeRange(r)}
                  className={`flex-1 sm:flex-none text-center px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                    timeRange === r
                      ? "bg-white text-emerald-700 shadow-2xs font-bold"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            {/* Custom interactive date modal triggers */}
            <div className="relative w-full sm:w-auto">
              <button
                onClick={() => setShowDatePicker(!showDatePicker)}
                className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-2 px-3.5 py-1.5 bg-white border border-slate-100 hover:border-slate-200 hover:bg-slate-50 rounded-xl text-xs font-medium text-slate-600 transition-all cursor-pointer shadow-3xs h-[34px]"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{dateRanges[timeRange]}</span>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-0.5 shrink-0" />
              </button>

              {/* Float popover for date simulation */}
              {showDatePicker && (
                <div className="absolute right-0 left-0 sm:left-auto mt-2 sm:w-56 bg-white rounded-xl border border-slate-100 shadow-lg p-3 z-50">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Simulate Custom Period</span>
                  <div className="space-y-1 mt-2">
                    <button
                      onClick={() => { setTimeRange("7D"); setShowDatePicker(false); }}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700"
                    >
                      Past 7 Days (Jun 02 - Jun 08)
                    </button>
                    <button
                      onClick={() => { setTimeRange("30D"); setShowDatePicker(false); }}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700"
                    >
                      Past 30 Days (May 10 - Jun 08)
                    </button>
                    <button
                      onClick={() => { setTimeRange("90D"); setShowDatePicker(false); }}
                      className="w-full text-left p-2 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700"
                    >
                      Past 90 Days (Mar 11 - Jun 08)
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Desktop View Avatar block */}
            <div className="hidden sm:block w-9 h-9 rounded-full bg-slate-200 border border-slate-100 overflow-hidden shadow-3xs hover:ring-2 hover:ring-emerald-100 transition-all">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120"
                alt="Alex"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

          </div>

        </div>
      </header>

      {/* Greeting Row */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-6">
        <h1 className="text-3xl font-serif text-slate-800 font-normal tracking-tight">Good morning, Alex</h1>
        <p className="text-xs text-slate-400 mt-1 font-medium">Here's your behavioral overview</p>
      </section>

      {/* Component 1 — Dashboard Grid Area */}
      <main className="max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mt-8">
        
        {/* Col 1 — Behavioral Snapshot */}
        <motion.div
          key={`snapshot-${timeRange}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="lg:col-span-3"
        >
          <BehavioralSnapshot
            onViewInsights={() => handleSelectInsight("focus-sunday-drop")}
            consistencyScore={consistencyScores[timeRange]}
          />
        </motion.div>

        {/* Col 2 — Behavioral Trends Chart & Confidence Metrics */}
        <motion.div
          key={`trends-${timeRange}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          className="lg:col-span-6 flex flex-col gap-6"
        >
          <div className="flex-1">
            <BehavioralTrends timeRange={timeRange} />
          </div>

          {/* Inline Confidence Rating Row directly underneath the trend container */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-3xs">
            
            <div className="flex items-center sm:items-start gap-4 sm:gap-2.5">
              <div className="w-9 h-9 relative shrink-0 flex items-center justify-center">
                {/* 80% circle gauge */}
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="12" stroke="#e2e8f0" strokeWidth="2.5" fill="transparent" />
                  <circle cx="16" cy="16" r="12" stroke="#10b981" strokeWidth="2.5" fill="transparent" strokeDasharray="75" strokeDashoffset="15" />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-slate-700">80%</span>
              </div>
              <div>
                <div className="text-[11px] sm:text-[10px] font-bold text-slate-800">High Confidence</div>
                <div className="text-[10px] sm:text-[9px] text-slate-400 leading-tight">Consistent data observed</div>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-4 sm:gap-2.5">
              <div className="w-9 h-9 relative shrink-0 flex items-center justify-center">
                {/* 15% circle gauge */}
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="12" stroke="#e2e8f0" strokeWidth="2.5" fill="transparent" />
                  <circle cx="16" cy="16" r="12" strokeWidth="2.5" fill="transparent" strokeDasharray="75" strokeDashoffset="63" stroke="#f59e0b" />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-slate-700">15%</span>
              </div>
              <div>
                <div className="text-[11px] sm:text-[10px] font-bold text-slate-800">Medium Confidence</div>
                <div className="text-[10px] sm:text-[9px] text-slate-400 font-medium leading-tight">Some variability detected</div>
              </div>
            </div>

            <div className="flex items-center sm:items-start gap-4 sm:gap-2.5">
              <div className="w-9 h-9 relative shrink-0 flex items-center justify-center">
                {/* 5% circle gauge */}
                <svg className="w-8 h-8 transform -rotate-90">
                  <circle cx="16" cy="16" r="12" stroke="#e2e8f0" strokeWidth="2.5" fill="transparent" />
                  <circle cx="16" cy="16" r="12" strokeWidth="2.5" fill="transparent" strokeDasharray="75" strokeDashoffset="71" stroke="#f43f5e" />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-slate-700">5%</span>
              </div>
              <div>
                <div className="text-[11px] sm:text-[10px] font-bold text-slate-800">Low Confidence</div>
                <div className="text-[10px] sm:text-[9px] text-slate-400 leading-tight">Insufficient data</div>
              </div>
            </div>

          </div>
        </motion.div>

        {/* Col 3 — Recent Changes */}
        <motion.div
          key={`changes-${timeRange}-${activeInsightId}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="lg:col-span-3"
        >
          <RecentChanges
            onSelectInsight={handleSelectInsight}
            activeInsightId={activeInsightId}
          />
        </motion.div>

      </main>

      {/* Component 2 — Insight Explorer Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <InsightExplorer
          activeInsightId={activeInsightId}
          onSelectInsight={setActiveInsightId}
          trackedInsightIds={trackedInsightIds}
          onToggleTrackInsight={handleToggleTrackInsight}
        />
      </section>

      {/* Component 3 — Narrative Timeline Section */}
      <section className="max-w-7xl mx-auto px-4 md:px-8 mt-12">
        <NarrativeTimeline
          onTimelineSelectInsight={handleSelectInsight}
          activeInsightId={activeInsightId}
        />
      </section>

      {/* Component 4 & Doc Submission — Product Judgment & Rationale Panel */}
      <section className="px-4 md:px-8">
        <ProductJudgmentPanel />
      </section>

    </div>
  );
}
