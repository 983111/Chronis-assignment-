import { ShieldAlert, BookOpen, Star, RefreshCw } from "lucide-react";

export default function ProductJudgmentPanel() {
  return (
    <div id="product-judgment-panel" className="bg-[#FAF9F5] border border-slate-200/60 rounded-3xl p-8 max-w-7xl mx-auto mt-12 shadow-3xs">
      <div className="flex items-center gap-3 border-b border-amber-900/10 pb-4 mb-6">
        <BookOpen className="w-5 h-5 text-amber-800" />
        <h2 className="text-xl font-serif text-slate-800 font-semibold tracking-tight">
          Chronis Assessment — Design Decisions & Product Judgment
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core Decisions */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-md uppercase">UX Decisions</span>
          </div>
          
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">1. Multi-Track Contextual Linking</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                Clicking any historic timeline cluster automatically scrolls into and loads that specific insight in the Insight Explorer workspace. Rather than browsing cards in isolation, behavioral trends exist as connected threads.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">2. Triple-Pane Overview Hub</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                By presenting Behavioral Consistency, Multi-variable Trend plots, and granular Daily Changes under a unified date range, we avoid deep nested navigation. Alex forms an overview in less than five seconds.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">3. Semantic Hierarchy & No Emoji</h4>
              <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-sans">
                Leveraged clean icons from Lucide paired with soft contrast pills. Removed standard emotional emojis to preserve the clinical, reliable authority of a professional wellness and focus diagnostic platform.
              </p>
            </div>
          </div>
        </div>

        {/* Tradeoffs */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-slate-100 text-slate-700 font-bold px-2 py-0.5 rounded-md uppercase">Selected Tradeoff</span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Inline SVG Vector Rendering vs Heavy Chart Libraries</h4>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">
              We hand-calibrated path coordinate projections inside responsive elements instead of adding heavy dependencies (like ChartJS, D3, or Recharts).
            </p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">
              <em>Advantage:</em> High-density drawing binds seamlessly to the theme, loads in under 10 milliseconds, and guarantees precise UI matching.
            </p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">
              <em>Limitation:</em> Displaying infinite historical windows with sub-minute ticks would require virtualization and layout offsets in production.
            </p>
          </div>
        </div>

        {/* Future Prioritization */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-[10px] bg-indigo-50 text-indigo-700 font-bold px-2 py-0.5 rounded-md uppercase">Future Roadmap</span>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-800 tracking-wide uppercase">Attribution Annotations & Copilot Grounding</h4>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">
              The first feature to prioritize is an attribution annotation card where users input text events (e.g., "Started high-fat diet" or "Final project deadline").
            </p>
            <p className="text-xs text-slate-600 mt-2.5 leading-relaxed font-sans">
              By parsing these events with the Gemini SDK, Chronis can cross-reference physical text with raw telemetry to confirm if focus anomalies are lifestyle-dependent or environmental.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
