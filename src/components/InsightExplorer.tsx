import { useState } from "react";
import { ArrowLeft, CheckCircle2, User, Users, RefreshCw, Calendar, Eye, Heart, HelpCircle, Shield, Moon, Target, Sparkles, Star } from "lucide-react";
import { InsightDetail, mockInsights } from "../data";

interface InsightExplorerProps {
  activeInsightId: string;
  onSelectInsight: (id: string) => void;
  trackedInsightIds: string[];
  onToggleTrackInsight: (id: string) => void;
}

export default function InsightExplorer({
  activeInsightId,
  onSelectInsight,
  trackedInsightIds,
  onToggleTrackInsight
}: InsightExplorerProps) {
  const [activeTab, setActiveTab] = useState<"Overview" | "Evidence" | "Uncertainty" | "Related Insights">("Overview");

  // Get active insight setup
  const activeInsight = mockInsights.find(ins => ins.id === activeInsightId) || mockInsights[0];
  const isCurrentlyTracked = trackedInsightIds.includes(activeInsight.id);

  // Switch to next insight on "Back to insights" or cycle through insights
  const handleBackToInsights = () => {
    const currentIndex = mockInsights.findIndex(ins => ins.id === activeInsight.id);
    const nextIndex = (currentIndex + 1) % mockInsights.length;
    onSelectInsight(mockInsights[nextIndex].id);
    setActiveTab("Overview");
  };

  // Icon selector based on dynamic factor criteria
  const getFactorIcon = (iconType: string) => {
    switch (iconType) {
      case "routine":
        return <RefreshCw className="w-4 h-4 text-slate-500" />;
      case "social":
        return <Users className="w-4 h-4 text-slate-500" />;
      case "sleep":
        return <Moon className="w-4 h-4 text-slate-500" />;
      case "activity":
        return <User className="w-4 h-4 text-slate-500" />;
      default:
        return <Eye className="w-4 h-4 text-slate-500" />;
    }
  };

  // Colors for confidence pills
  const getConfidenceClasses = (conf: string) => {
    switch (conf) {
      case "High Confidence":
        return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "Low Confidence":
        return "bg-rose-50 text-rose-700 border-rose-100";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100/70";
    }
  };

  return (
    <div id="insight-explorer-section" className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[520px]">
      
      {/* Left Artwork Column */}
      <div className="lg:col-span-3 bg-[#FCF5EE] p-8 flex flex-col justify-between relative overflow-hidden min-h-[250px] lg:min-h-auto">
        <div>
          <h2 className="text-3xl font-serif text-slate-800 leading-tight">Insight<br />Explorer</h2>
          <p className="text-slate-500 font-sans text-xs mt-3 leading-relaxed">
            Understand the why behind your behavioral patterns.
          </p>
        </div>

        {/* Dune and Sun SVG background matching mockup */}
        <div className="absolute bottom-0 left-0 right-0 h-44 w-full pointer-events-none select-none">
          <svg className="w-full h-full" viewBox="0 0 200 150" fill="none" preserveAspectRatio="none">
            {/* The sun rising */}
            <circle cx="100" cy="100" r="35" fill="#FDA4AF" opacity="0.6" />
            <circle cx="100" cy="100" r="28" fill="#FDBA74" opacity="0.8" />
            
            {/* Dune curves */}
            <path d="M-20,135 C50,110 120,160 220,120 L220,160 L-20,160 Z" fill="#F5E3D3" />
            <path d="M-10,145 C60,130 110,130 210,140 L210,160 L-10,160 Z" fill="#EAD5C3" />
          </svg>
        </div>
      </div>

      {/* Right Workstation Column */}
      <div className="lg:col-span-9 p-8 flex flex-col justify-between">
        <div>
          {/* Breadcrumb trigger */}
          <button
            onClick={handleBackToInsights}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 font-medium mb-4 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to insights
          </button>

          {/* Heading summary */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-2xl font-semibold text-slate-800 tracking-tight">{activeInsight.title}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${getConfidenceClasses(activeInsight.confidence)}`}>
                  {activeInsight.confidence}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">{activeInsight.observedPeriod}</p>
            </div>
          </div>

          {/* Interactive Navigation Tab List */}
          <div className="flex gap-4 border-b border-slate-100 mt-6 overflow-x-auto pb-px">
            {(["Overview", "Evidence", "Uncertainty", "Related Insights"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 text-xs font-semibold relative transition-all duration-200 cursor-pointer whitespace-nowrap ${
                  activeTab === tab
                    ? "text-blue-600 font-bold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* Dynamic Tab Body Container */}
          <div className="mt-6 min-h-[220px]">
            {activeTab === "Overview" && (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Visual Description Block */}
                <div className="md:col-span-5 bg-slate-50/50 p-5 rounded-2xl border border-slate-100/50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">What this means</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {activeInsight.whatItMeans}
                    </p>
                  </div>

                  {/* Weekly Relative Bar Graph representation */}
                  <div className="relative mt-6 height-32">
                    <div className="flex items-end justify-between h-20 px-2 mt-4">
                      {activeInsight.weeklyDailies.map((d) => (
                        <div key={d.day} className="flex flex-col items-center flex-1 group relative">
                          
                          {/* Value popover outline representing negative drop nicely */}
                          {d.isFocusTarget && (
                            <div className="absolute -top-7 z-10 bg-rose-50 text-rose-600 text-[9px] font-bold py-0.5 px-1.5 rounded-md border border-rose-100 shadow-2xs whitespace-nowrap">
                              {-27}%
                            </div>
                          )}

                          <div
                            style={{ height: `${(d.value / 100) * 80}px` }}
                            className={`w-4 rounded-t-sm transition-all duration-300 ${
                              d.isFocusTarget 
                                ? "bg-rose-400 hover:bg-rose-500 shadow-sm shadow-rose-200" 
                                : "bg-slate-200 hover:bg-slate-300"
                            }`}
                          />
                          <span className="text-[10px] font-mono text-slate-400 mt-1.5">{d.day}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Evidence Checklist and Factors */}
                <div className="md:col-span-4 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Supporting evidence</h4>
                    <ul className="space-y-2.5">
                      {activeInsight.supportingEvidence.map((ev, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{ev}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3.5">What could be influencing this?</h4>
                    <div className="space-y-2">
                      {activeInsight.influencingFactors.map((factor, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 border border-slate-100/50">
                          <div className="w-6.5 h-6.5 rounded-lg bg-white flex items-center justify-center border border-slate-100 shadow-3xs">
                            {getFactorIcon(factor.iconType)}
                          </div>
                          <span className="text-xs text-slate-700 font-medium">{factor.factor}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Meta Summary Side Block */}
                <div className="md:col-span-3 bg-[#FCFAF7] border border-slate-100 p-5 rounded-2xl flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-slate-500 tracking-wider mb-2">About this insight</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">
                      {activeInsight.aboutInfo}
                    </p>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-2.5">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">First observed</span>
                      <span className="text-slate-600 font-bold">{activeInsight.firstObserved}</span>
                    </div>
                    <div className="flex justify-between text-[11px]">
                      <span className="text-slate-400 font-medium">Last updated</span>
                      <span className="text-slate-600 font-bold">{activeInsight.lastUpdated}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => onToggleTrackInsight(activeInsight.id)}
                    className={`w-full mt-5 py-2 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all duration-150 border cursor-pointer ${
                      isCurrentlyTracked
                        ? "bg-slate-800 border-slate-800 text-white hover:bg-slate-900"
                        : "bg-orange-50/50 border-orange-100 text-orange-950 font-medium hover:bg-orange-100/40"
                    }`}
                  >
                    {isCurrentlyTracked ? "Tracking Active" : "Track this insight"}
                  </button>
                </div>

              </div>
            )}

            {activeTab === "Evidence" && (
              <div className="space-y-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Verification Logs</h4>
                  {activeInsight.evidenceDetails && activeInsight.evidenceDetails.length > 0 ? (
                    <div className="divide-y divide-slate-100">
                      {activeInsight.evidenceDetails.map((item, idx) => (
                        <div key={idx} className="py-2.5 flex items-center justify-between text-xs">
                          <span className="font-semibold text-slate-700">{item.week}</span>
                          <span className="text-slate-500 text-right">{item.value}</span>
                          <span className="text-[10px] bg-emerald-50 text-emerald-600 font-semibold px-2 py-0.5 rounded-full">{item.validation}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4">No granular log details loaded for this preview range.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "Uncertainty" && (
              <div className="space-y-4 max-w-2xl bg-amber-50/30 p-5 rounded-2xl border border-amber-100/60">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Signal Sparser Explanation</h4>
                    <p className="text-xs text-amber-900/90 leading-relaxed font-sans mt-2">
                      {activeInsight.uncertaintyExplanation || "Telemetry density meets standard requirements for general classification. Sensor frequency synchronization remains stable."}
                    </p>
                    <div className="mt-4 text-[11px] text-amber-800/70 space-y-1.5 font-medium">
                      <p>• Data Confidence Score: {activeInsight.confidenceScore}%</p>
                      <p>• Sensor source: Wrist device accelerometer, network state logs, mobile task analytics</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Related Insights" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {activeInsight.relatedInsightIds.map((id) => {
                  const correlated = mockInsights.find(ins => ins.id === id);
                  if (!correlated) return null;
                  return (
                    <button
                      key={correlated.id}
                      onClick={() => {
                        onSelectInsight(correlated.id);
                        setActiveTab("Overview");
                      }}
                      className="text-left p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/30 hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                          {correlated.title}
                        </span>
                        <span className="text-[9px] px-2 py-0.5 bg-slate-100 text-slate-500 rounded-full">
                          {correlated.confidence}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2 line-clamp-2">
                        {correlated.whatItMeans}
                      </p>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
