import { Moon, RefreshCw, Smartphone, TrendingUp, TrendingDown, Target } from "lucide-react";

interface RecentChangesProps {
  onSelectInsight: (insightId: string) => void;
  activeInsightId: string;
}

export default function RecentChanges({ onSelectInsight, activeInsightId }: RecentChangesProps) {
  const changes = [
    {
      id: "sleep-saturday-shift",
      title: "Sleep improved",
      compareText: "vs last 30 days",
      metric: "+14%",
      isPositive: true,
      color: "emerald",
      icon: <Moon className="w-4 h-4 text-emerald-600" />,
      bg: "bg-emerald-50"
    },
    {
      id: "focus-sunday-drop",
      title: "Focus time dropped",
      compareText: "vs last 30 days",
      metric: "-9%",
      isPositive: false,
      color: "rose",
      icon: <Target className="w-4 h-4 text-rose-500" />,
      bg: "bg-rose-50/70"
    },
    {
      id: "social-weekend-peak",
      title: "Social balance steady",
      compareText: "vs last 30 days",
      metric: "0%",
      isNeutral: true,
      color: "blue",
      icon: <RefreshCw className="w-4 h-4 text-blue-500" />,
      bg: "bg-blue-50/70"
    }
  ];

  return (
    <div id="recent-changes-section" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col justify-between h-full">
      <div>
        <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Recent Changes</h3>
        <p className="text-xs text-slate-400">Key shifts in your behavior</p>

        {/* Change list items */}
        <div className="space-y-4 mt-6">
          {changes.map((item) => {
            const isActive = activeInsightId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectInsight(item.id)}
                className={`w-full text-left flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "border-blue-500 bg-blue-50/30 shadow-xs ring-1 ring-blue-500/20"
                    : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-800">{item.title}</div>
                    <div className="text-[10px] text-slate-400 font-medium">{item.compareText}</div>
                  </div>
                </div>

                <div className="text-right">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-full text-xs font-bold ${
                      item.isNeutral
                        ? "bg-slate-100 text-slate-600"
                        : item.isPositive
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-rose-50 text-rose-600"
                    }`}
                  >
                    {item.metric}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <button
        onClick={() => onSelectInsight("focus-sunday-drop")}
        className="w-full text-center mt-6 py-2.5 px-4 bg-slate-50 border border-slate-100 hover:bg-slate-100/70 text-slate-600 text-xs font-medium rounded-xl transition-all"
      >
        Explore changes
      </button>
    </div>
  );
}
