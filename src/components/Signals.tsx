import React, { useState } from "react";
import { Search, Brain, Clock, Plus, Layers, ArrowLeft, RefreshCw, BarChart2, Info, Moon, Settings, Smile, Users, Compass } from "lucide-react";
import { InsightPattern } from "../types";

interface SignalsProps {
  insights: InsightPattern[];
  activeInsightId: string | null;
  setActiveInsightId: (id: string | null) => void;
}

export default function Signals({ insights, activeInsightId, setActiveInsightId }: SignalsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const activeInsight = insights.find(ins => ins.id === activeInsightId);

  // Search filter
  const filteredInsights = insights.filter(ins => {
    const q = searchQuery.toLowerCase();
    return (
      ins.title.toLowerCase().includes(q) ||
      ins.description.toLowerCase().includes(q) ||
      ins.metric.toLowerCase().includes(q)
    );
  });

  const getMetricIcon = (metric: string) => {
    switch (metric) {
      case "sleep":
        return <Moon className="w-4 h-4" />;
      case "focus":
        return <Brain className="w-4 h-4" />;
      case "social":
        return <Users className="w-4 h-4" />;
      case "energy":
        return <Settings className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Improving":
        return "bg-emerald-50 text-emerald-700 border-emerald-100/40";
      case "Declining":
        return "bg-rose-50 text-rose-700 border-rose-100/40";
      default:
        return "bg-slate-50 text-slate-500 border-slate-200/40";
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 select-none leading-relaxed transition-all">
      
      {/* If an active insight is selected, render the pristine "Insight Explorer" tab (Screenshot 2) */}
      {activeInsight ? (
        <section className="space-y-6.5 animate-fade-in">
          
          {/* Back Action */}
          <button
            onClick={() => setActiveInsightId(null)}
            className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-slate-650 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all patterns</span>
          </button>

          {/* Grid setup for Explorer (flawless matching of the three-column layout in screenshot 2) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
            
            {/* Column 1: Descriptive Detail */}
            <div className="lg:col-span-4 bg-white border border-slate-100/80 rounded-3xl p-6 shadow-3xs flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <div className="p-2.5 rounded-xl bg-rose-50 text-rose-500">
                    {getMetricIcon(activeInsight.metric)}
                  </div>
                  <span className={`text-[9px] font-bold py-1 px-3 border rounded-full uppercase tracking-wider font-mono ${getStatusColor(activeInsight.status)}`}>
                    {activeInsight.status}
                  </span>
                </div>

                <div>
                  <h1 className="text-2xl font-serif text-slate-900 leading-tight">
                    {activeInsight.title}
                  </h1>
                  <span className="text-[10px] text-slate-400 font-medium font-mono leading-none flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Observed for the past 6 weeks</span>
                  </span>
                </div>

                <p className="text-slate-500 text-xs leading-relaxed font-light">
                  {activeInsight.description}
                </p>

                {/* What it means box */}
                <div className="p-4 rounded-2xl bg-amber-50/20 border border-amber-100/35">
                  <span className="text-[9px] font-bold text-amber-700 uppercase tracking-widest font-mono block">WHAT IT MEANS</span>
                  <p className="text-[10.5px] text-slate-600 font-light mt-1.5 leading-relaxed">
                    {activeInsight.evidenceText} Stabilizing Sunday evening routines often triggers recovery in early Monday circadian efficiency.
                  </p>
                </div>
              </div>

              {/* Factors list */}
              <div className="border-t border-slate-100 pt-5 mt-5">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">POSSIBLE FACTORS</span>
                <div className="space-y-2 mt-2.5">
                  {activeInsight.factors.map((f, i) => (
                    <div key={i} className="flex items-center gap-2.5 text-xs text-slate-650 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Column 2: Histogram Evidence Grid (Section 2 Center) */}
            <div className="lg:col-span-5 bg-white border border-slate-100/80 rounded-3xl p-6 shadow-3xs flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono">EVIDENCE</span>
                <p className="text-[10px] text-slate-405 leading-none mt-0.5">Focus comparisons across tracking segments</p>

                {/* Evidence histogram comparing weeks */}
                <div className="space-y-4 mt-6">
                  {[
                    { week: "Week of Apr 26 - May 02", value: "Sunday focus 4.0 vs median 7.5", offset: "-24%" },
                    { week: "Week of May 03 - May 09", value: "Sunday focus 4.2 vs median 7.6", offset: "-26%" },
                    { week: "Week of May 10 - May 16", value: "Sunday focus 3.8 vs median 7.4", offset: "-29%" },
                    { week: "Week of May 17 - May 23", value: "Sunday focus 4.0 vs median 7.7", offset: "-27%" },
                    { week: "Week of May 24 - May 30", value: "Sunday focus 4.1 vs median 7.8", offset: "-28%" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50/50 border border-slate-100 p-3 rounded-2xl">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>{item.week}</span>
                        <span className="text-rose-600 font-bold">{item.offset}</span>
                      </div>
                      <p className="text-xs font-semibold text-slate-750 mt-1">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Day values list bar */}
              <div className="border-t border-slate-100 pt-5 mt-5">
                <span className="text-[9px] font-bold text-slate-405 uppercase tracking-widest font-mono">CURRENT WEEKDAY INDEX</span>
                <div className="flex justify-between items-end h-20 px-2 mt-4">
                  {[
                    { d: "M", v: 78 },
                    { d: "T", v: 80 },
                    { d: "W", v: 75 },
                    { d: "T", v: 81 },
                    { d: "F", v: 79 },
                    { d: "S", v: 68 },
                    { d: "S", v: 48, target: true }
                  ].map((dayItem, i) => (
                    <div key={i} className="flex flex-col items-center gap-1.5 flex-1">
                      <div className="w-3.5 bg-slate-100 hover:bg-slate-200 rounded-md relative flex items-end h-14 overflow-hidden">
                        <div
                          className={`w-full rounded-md transition-all ${dayItem.target ? "bg-rose-500" : "bg-purple-400"}`}
                          style={{ height: `${dayItem.v}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold font-space">{dayItem.d}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Column 3: Confidence cylinder + Related list (Section 2 Right) */}
            <div className="lg:col-span-3 space-y-6.5">
              
              {/* Confidence Gauge */}
              <div className="bg-white border border-slate-100/80 rounded-3xl p-6 shadow-3xs flex flex-col justify-center items-center text-center">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">CONFIDENCE METER</span>
                <div className="relative w-24 h-24 flex items-center justify-center mt-5">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" stroke="#FCF6F2" strokeWidth="5.5" fill="none" />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#F43F5E"
                      strokeWidth="5.5"
                      fill="none"
                      strokeDasharray="251.2"
                      strokeDashoffset={251.2 - (251.2 * activeInsight.confidence) / 100}
                    />
                  </svg>
                  <div className="absolute text-center">
                    <span className="text-2xl font-bold text-slate-900 font-space">{activeInsight.confidence}%</span>
                  </div>
                </div>
                <span className="text-[10px] tracking-wide text-slate-450 mt-3 font-semibold">High consistency rating</span>
              </div>

              {/* Security Missing data box */}
              {activeInsight.missingDataText && (
                <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4 text-[10.5px] leading-relaxed text-slate-500">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1 mb-1.5">
                    <Info className="w-3.5 h-3.5 text-rose-500" />
                    <span>DATA GAP SUSPENSION</span>
                  </span>
                  <span>{activeInsight.missingDataText}</span>
                </div>
              )}

              {/* Related list */}
              <div className="bg-white border border-slate-100/80 rounded-3xl p-5 shadow-3xs">
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">RELATED INSIGHTS</span>
                <div className="space-y-3 mt-4">
                  {[
                    "Sleep quality shifts on Saturdays",
                    "Social activity peaks on weekends",
                    "Circadian alignment triggers productivity"
                  ].map((rel, idx) => (
                    <div key={idx} className="pb-3 border-b border-slate-50/50 last:border-b-0 last:pb-0 text-xs font-semibold text-slate-700">
                      {rel}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>

        </section>
      ) : (
        <section className="space-y-6">
          
          {/* Header row with search bar to satisfy item 9 request */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-serif text-slate-900">Patterns & Signals</h1>
              <p className="text-xs text-slate-400 mt-1">Full index of tracked active behavioral models</p>
            </div>

            {/* Search Input */}
            <div className="relative max-w-sm w-full">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="text"
                placeholder="Search metrics (e.g. sleep, focus)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-slate-2D3 hover:border-slate-350 focus:border-slate-300 focus:bg-white rounded-xl outline-hidden font-medium transition-all shadow-3xs"
              />
            </div>
          </div>

          {/* List display */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5.5">
            {filteredInsights.length > 0 ? (
              filteredInsights.map(ins => (
                <div
                  key={ins.id}
                  onClick={() => setActiveInsightId(ins.id)}
                  className="bg-white border border-slate-100/80 hover:border-slate-300 rounded-3xl p-5 shadow-3xs transition-all hover:shadow-xs cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-xl bg-slate-50 text-slate-500">
                        {getMetricIcon(ins.metric)}
                      </div>
                      <span className={`text-[9px] font-bold py-1 px-2 border rounded-full font-mono uppercase tracking-wider ${getStatusColor(ins.status)}`}>
                        {ins.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-sm font-bold text-slate-800">{ins.title}</h3>
                      <p className="text-[11px] text-slate-450 mt-1 lines-clamp-2 md:line-clamp-3 leading-relaxed">
                        {ins.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5.5 pt-4 border-t border-slate-50 flex justify-between items-center text-[10px] font-mono text-slate-400">
                    <span>Confidence: {ins.confidence}%</span>
                    <span className="text-rose-500 font-bold uppercase tracking-wider">Explore →</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full bg-white border border-slate-100 rounded-3xl p-12 text-center text-slate-400 text-xs">
                No tracking patterns found matching the keyword "{searchQuery}"
              </div>
            )}
          </div>

        </section>
      )}

    </div>
  );
}
