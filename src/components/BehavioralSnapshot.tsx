import { Moon, RefreshCw, Smartphone, TrendingUp, TrendingDown } from "lucide-react";

interface BehavioralSnapshotProps {
  onViewInsights: () => void;
  consistencyScore: number;
}

export default function BehavioralSnapshot({ onViewInsights, consistencyScore }: BehavioralSnapshotProps) {
  // Sparkline coordinates
  const sparklineData = [70, 71, 68, 72, 73, 71, 74, 72, 75, 71, 72, 72];

  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-xs flex flex-col justify-between overflow-hidden h-full relative">
      <div className="p-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Behavioral Snapshot</h3>
          <p className="text-xs text-slate-400">Your overall behavioral consistency</p>
        </div>

        {/* Big Score with custom elegant sans */}
        <div className="mt-6">
          <div className="text-6xl font-light text-emerald-600 tracking-tight">{consistencyScore}%</div>
          <div className="text-sm font-medium text-emerald-550 mt-1">Moderate</div>
        </div>

        {/* High-fidelity Vector Sparkline */}
        <div className="h-10 w-full mt-4 flex items-center">
          <svg className="w-full h-8 overflow-visible" viewBox="0 0 200 40">
            <defs>
              <linearGradient id="sparklineGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d={`M ${sparklineData
                .map((val, i) => `${(i / (sparklineData.length - 1)) * 200},${35 - (val - 65) * 2}`)
                .join(" L ")}`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={`M 0,40 L ${sparklineData
                .map((val, i) => `${(i / (sparklineData.length - 1)) * 200},${35 - (val - 65) * 2}`)
                .join(" L ")} L 200,40 Z`}
              fill="url(#sparklineGrad)"
            />
            {/* pulse dot of active state */}
            <circle cx="200" cy={35 - (sparklineData[sparklineData.length - 1] - 65) * 2} r="3" fill="#10b981" />
          </svg>
        </div>

        {/* What influences this score */}
        <div className="mt-8">
          <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
            What influences this score?
          </h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center text-teal-600">
                  <Moon className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-700 font-medium">Sleep Pattern</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +12%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                  <RefreshCw className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-700 font-medium">Routine Consistency</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +8%
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-pink-50 flex items-center justify-center text-pink-600">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-xs text-slate-700 font-medium">Screen Time</span>
              </div>
              <span className="text-xs font-semibold text-rose-600 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -15%
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onViewInsights}
          className="w-full text-center mt-6 py-2.5 px-4 bg-emerald-50 text-emerald-700 text-xs font-medium rounded-xl hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          View all insights
        </button>
      </div>

      {/* Exquisite SVG wave backdrop matching mockup aesthetic decoration */}
      <div className="w-full h-16 relative bottom-0 left-0 right-0 pointer-events-none select-none bg-slate-50 border-t border-slate-50">
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 350 70" preserveAspectRatio="none">
          <path
            d="M0,45 C90,65 140,25 210,55 C280,75 310,35 350,50 L350,70 L0,70 Z"
            fill="#e6f4ea"
            opacity="0.6"
          />
          <path
            d="M0,55 C70,35 150,65 240,40 C300,30 320,60 350,55 L350,70 L0,70 Z"
            fill="#a7f3d0"
            opacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}
