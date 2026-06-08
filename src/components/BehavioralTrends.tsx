import { useState } from "react";
import { Info, CheckCircle2 } from "lucide-react";
import { mockDailyLogs, DailyLog } from "../data";

interface BehavioralTrendsProps {
  timeRange: string;
}

interface ShiftMarker {
  date: string;
  metric: "sleep" | "activity" | "focus" | "social";
  label: string;
  desc: string;
  color: string;
}

const SHIFT_MARKERS: ShiftMarker[] = [
  {
    date: "Apr 27",
    metric: "sleep",
    label: "Sleep offset change",
    desc: "Shifted 1.5 hrs later, causing mild social jetlag",
    color: "#3b82f6"
  },
  {
    date: "May 11",
    metric: "focus",
    label: "Sunday focus drop",
    desc: "Focus metrics drop by average of 27% on weekends",
    color: "#f59e0b"
  },
  {
    date: "May 18",
    metric: "activity",
    label: "Thursday Activity spike",
    desc: "Temporary surge in athletic cadence (+6,200 steps)",
    color: "#0ea5e9"
  }
];

export default function BehavioralTrends({ timeRange }: BehavioralTrendsProps) {
  const [activeLegend, setActiveLegend] = useState<string | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hoveredShift, setHoveredShift] = useState<any | null>(null);

  // Filter or scale mock logs for interaction based on time range
  let displayedLogs: DailyLog[] = mockDailyLogs;
  if (timeRange === "7D") {
    displayedLogs = mockDailyLogs.slice(-4); // shorter interval
  } else if (timeRange === "90D") {
    // scale up or display slightly smoother data values
    displayedLogs = mockDailyLogs;
  }

  const handleLegendClick = (metric: string) => {
    setActiveLegend(prev => (prev === metric ? null : metric));
  };

  const chartHeight = 180;
  const chartWidth = 500;
  const paddingX = 40;
  const paddingY = 20;

  const getCoordinates = (
    index: number,
    value: number,
    totalPoints: number,
    width: number,
    height: number
  ) => {
    const x = paddingX + (index / (totalPoints - 1)) * (width - paddingX * 2);
    // invert Y because SVG 0 is top
    const y = height - paddingY - (value / 100) * (height - paddingY * 2);
    return { x, y };
  };

  const totalPoints = displayedLogs.length;

  const makeSvgPath = (points: { x: number; y: number }[]) => {
    if (points.length === 0) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cpX1 = p0.x + (p1.x - p0.x) / 3;
      const cpY1 = p0.y;
      const cpX2 = p0.x + (2 * (p1.x - p0.x)) / 3;
      const cpY2 = p1.y;
      d += ` C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${p1.x} ${p1.y}`;
    }
    return d;
  };

  const sleepCoords = displayedLogs.map((log, i) =>
    getCoordinates(i, log.sleepScore, totalPoints, chartWidth, chartHeight)
  );
  const activityCoords = displayedLogs.map((log, i) =>
    getCoordinates(i, log.activityScore, totalPoints, chartWidth, chartHeight)
  );
  const focusCoords = displayedLogs.map((log, i) =>
    getCoordinates(i, log.focusScore, totalPoints, chartWidth, chartHeight)
  );
  const socialCoords = displayedLogs.map((log, i) =>
    getCoordinates(i, log.socialScore, totalPoints, chartWidth, chartHeight)
  );

  const markerPoints = SHIFT_MARKERS.map(marker => {
    const index = displayedLogs.findIndex(log => log.date === marker.date);
    if (index === -1) return null;
    let value = 50;
    if (marker.metric === "sleep") value = displayedLogs[index].sleepScore;
    else if (marker.metric === "activity") value = displayedLogs[index].activityScore;
    else if (marker.metric === "focus") value = displayedLogs[index].focusScore;
    else if (marker.metric === "social") value = displayedLogs[index].socialScore;

    const coords = getCoordinates(index, value, totalPoints, chartWidth, chartHeight);
    return { ...marker, ...coords };
  }).filter((m): m is (ShiftMarker & { x: number; y: number }) => m !== null);

  return (
    <div id="behavioral-trends-section" className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col h-full justify-between">
      <div>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 tracking-tight">Behavioral Trends</h3>
            <p className="text-xs text-slate-400">Track how your behavior changes over time</p>
          </div>
        </div>

        {/* Dynamic Vector Curve Interactive Screen */}
        <div 
          className="relative mt-8 h-48 w-full"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {/* Y Axis Grid Lines */}
          <div className="absolute inset-0 flex flex-col justify-between text-[10px] font-mono text-slate-400 pointer-events-none select-none py-1">
            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1">
              <span>100</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1">
              <span>75</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1">
              <span>50</span>
            </div>
            <div className="flex justify-between border-b border-dashed border-slate-100 pb-1">
              <span>25</span>
            </div>
            <div className="flex justify-between">
              <span>0</span>
            </div>
          </div>

          <svg
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            className="absolute inset-0 w-full h-full overflow-visible"
          >
            {/* Horizontal Grid lines coordinates */}
            {[100, 75, 50, 25, 0].map((v) => {
              const y = chartHeight - paddingY - (v / 100) * (chartHeight - paddingY * 2);
              return (
                <line
                  key={v}
                  x1={paddingX}
                  y1={y}
                  x2={chartWidth - paddingX}
                  y2={y}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                />
              );
            })}

            {/* Vertical grid lines for timestamps & interaction mapping */}
            {displayedLogs.map((log, index) => {
              const x = paddingX + (index / (totalPoints - 1)) * (chartWidth - paddingX * 2);
              return (
                <g key={log.date}>
                  <line
                    x1={x}
                    y1={paddingY}
                    x2={x}
                    y2={chartHeight - paddingY}
                    stroke={hoveredIndex === index ? "#cbd5e1" : "transparent"}
                    strokeDasharray="2"
                    strokeWidth="1"
                    className="transition-all duration-150"
                  />
                  {/* Invisible broad segment mapping to capture accurate hover indices easily */}
                  <rect
                    x={x - (chartWidth / totalPoints) / 2}
                    y={0}
                    width={chartWidth / totalPoints}
                    height={chartHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(index)}
                  />
                </g>
              );
            })}

            {/* Line Plots */}
            {/* Sleep line (blue) */}
            <path
              d={makeSvgPath(sleepCoords)}
              fill="none"
              stroke="#3b82f6"
              strokeWidth={activeLegend === 'sleep' ? "3" : activeLegend ? "0.75" : "2"}
              opacity={activeLegend === "sleep" ? "1" : activeLegend ? "0.2" : "0.9"}
              className="transition-all duration-300"
            />

            {/* Activity line (green) */}
            <path
              d={makeSvgPath(activityCoords)}
              fill="none"
              stroke="#0ea5e9"
              strokeWidth={activeLegend === 'activity' ? "3" : activeLegend ? "0.75" : "2"}
              opacity={activeLegend === "activity" ? "1" : activeLegend ? "0.2" : "0.9"}
              className="transition-all duration-300"
            />

            {/* Focus line (yellow) */}
            <path
              d={makeSvgPath(focusCoords)}
              fill="none"
              stroke="#f59e0b"
              strokeWidth={activeLegend === 'focus' ? "3" : activeLegend ? "0.75" : "2"}
              opacity={activeLegend === "focus" ? "1" : activeLegend ? "0.2" : "0.9"}
              className="transition-all duration-300"
            />

            {/* Social Balance line (purple) */}
            <path
              d={makeSvgPath(socialCoords)}
              fill="none"
              stroke="#8b5cf6"
              strokeWidth={activeLegend === 'social' ? "3" : activeLegend ? "0.75" : "2"}
              opacity={activeLegend === "social" ? "1" : activeLegend ? "0.2" : "0.9"}
              className="transition-all duration-300"
            />

            {/* Point highlights on hover */}
            {hoveredIndex !== null && (
              <g>
                <circle cx={sleepCoords[hoveredIndex].x} cy={sleepCoords[hoveredIndex].y} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={activityCoords[hoveredIndex].x} cy={activityCoords[hoveredIndex].y} r="4" fill="#10b981" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={focusCoords[hoveredIndex].x} cy={focusCoords[hoveredIndex].y} r="4" fill="#f59e0b" stroke="#ffffff" strokeWidth="1.5" />
                <circle cx={socialCoords[hoveredIndex].x} cy={socialCoords[hoveredIndex].y} r="4" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
              </g>
            )}

            {/* Shift Markers */}
            {markerPoints.map((marker, idx) => (
              <g
                key={`marker-${idx}`}
                className="cursor-pointer"
                onMouseEnter={() => setHoveredShift(marker)}
                onMouseLeave={() => setHoveredShift(null)}
                onClick={() => setHoveredShift(hoveredShift?.label === marker.label ? null : marker)}
              >
                {/* Invisible large touch target circle for easy finger tapping on mobile */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="22"
                  fill="transparent"
                />
                {/* Glow ring */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="10"
                  fill={marker.color}
                  opacity="0.2"
                />
                {/* Pulsing ring */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="7"
                  fill={marker.color}
                  opacity="0.35"
                />
                {/* Solid white bullet with colored stroke */}
                <circle
                  cx={marker.x}
                  cy={marker.y}
                  r="3.5"
                  fill="#ffffff"
                  stroke={marker.color}
                  strokeWidth="2.5"
                />
              </g>
            ))}
          </svg>

          {/* Shift Tooltip - Floating only on Desktop */}
          {hoveredShift && (
            <div
              style={{
                left: `${(hoveredShift.x / chartWidth) * 100}%`,
                top: `${(hoveredShift.y / chartHeight) * 100}%`
              }}
              className="hidden sm:block absolute z-50 bg-slate-900 border border-slate-700/60 text-white p-3 rounded-xl shadow-xl text-[11px] w-60 -translate-x-1/2 -translate-y-[108%] pointer-events-none transition-all duration-150"
            >
              <div className="flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wide mb-1 text-slate-300">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: hoveredShift.color }} />
                <span>{hoveredShift.metric} SHIFT</span>
              </div>
              <div className="font-bold text-white mb-0.5">{hoveredShift.label}</div>
              <div className="text-slate-300 leading-normal font-sans">{hoveredShift.desc}</div>
              <div className="text-[9px] font-mono text-slate-400 mt-1.5">{hoveredShift.date}, 2025</div>
              
              {/* Pointer Arrow */}
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full w-0 h-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-slate-900" />
            </div>
          )}
        </div>

        {/* Shift Details Banner - Responsive Mobile-Only Card Area to prevent overflow */}
        {hoveredShift && (
          <div className="sm:hidden mt-4 bg-slate-950 border border-slate-800 text-white p-4 rounded-2xl shadow-md transition-all duration-200">
            <div className="flex items-center justify-between mb-1.5">
              <span className="flex items-center gap-1.5 font-bold uppercase text-[9px] tracking-wide text-indigo-400">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: hoveredShift.color }} />
                <span>{hoveredShift.metric} SHIFT SUMMARY</span>
              </span>
              <button 
                onClick={() => setHoveredShift(null)} 
                className="text-slate-400 hover:text-white px-2 py-0.5 text-[11px] font-bold rounded bg-slate-800/80"
              >
                Close
              </button>
            </div>
            <div className="font-bold text-white text-xs mb-0.5">{hoveredShift.label}</div>
            <div className="text-slate-300 text-[11px] leading-relaxed font-sans">{hoveredShift.desc}</div>
            <div className="text-[9px] font-mono text-slate-500 mt-2">{hoveredShift.date}, 2025</div>
          </div>
        )}

        {/* X Axis Labels */}
        <div className="flex justify-between px-6 text-[10px] font-mono text-slate-400 mt-2">
          {displayedLogs.map((log, index) => {
            // display every 3rd or specific dates to match mockup layout nicely
            if (totalPoints > 6 && index % 3 !== 0 && index !== totalPoints - 1) {
              return <span key={log.date} className="w-1"></span>;
            }
            return <span key={log.date}>{log.date}</span>;
          })}
        </div>

        {/* Custom Legend Controls with Spotlight Feature */}
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 mt-6">
          <button
            onClick={() => handleLegendClick("sleep")}
            className={`flex items-center text-xs transition-all duration-150 py-1 px-2 rounded-lg ${
              activeLegend === "sleep" ? "bg-blue-50 font-semibold" : ""
            } ${activeLegend && activeLegend !== "sleep" ? "opacity-40" : "opacity-100"}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 mr-1.5 inline-block"></span>
            <span className="text-slate-600">Sleep</span>
          </button>
          <button
            onClick={() => handleLegendClick("activity")}
            className={`flex items-center text-xs transition-all duration-150 py-1 px-2 rounded-lg ${
              activeLegend === "activity" ? "bg-teal-50 font-semibold" : ""
            } ${activeLegend && activeLegend !== "activity" ? "opacity-40" : "opacity-100"}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 mr-1.5 inline-block"></span>
            <span className="text-slate-600">Activity</span>
          </button>
          <button
            onClick={() => handleLegendClick("focus")}
            className={`flex items-center text-xs transition-all duration-150 py-1 px-2 rounded-lg ${
              activeLegend === "focus" ? "bg-amber-50 font-semibold" : ""
            } ${activeLegend && activeLegend !== "focus" ? "opacity-40" : "opacity-100"}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 mr-1.5 inline-block"></span>
            <span className="text-slate-600">Focus</span>
          </button>
          <button
            onClick={() => handleLegendClick("social")}
            className={`flex items-center text-xs transition-all duration-150 py-1 px-2 rounded-lg ${
              activeLegend === "social" ? "bg-purple-50 font-semibold" : ""
            } ${activeLegend && activeLegend !== "social" ? "opacity-40" : "opacity-100"}`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500 mr-1.5 inline-block"></span>
            <span className="text-slate-600">Social Balance</span>
          </button>
        </div>
      </div>

      {/* Mini interactive HUD showing hovered values */}
      {hoveredIndex !== null && (
        <div className="bg-slate-50/80 rounded-xl p-2.5 mt-4 border border-slate-100 grid grid-cols-4 gap-2 text-center transition-all duration-150">
          <div>
            <div className="text-[9px] uppercase text-slate-400 font-mono">Sleep</div>
            <div className="text-xs font-bold text-blue-600">{displayedLogs[hoveredIndex].sleepScore}%</div>
          </div>
          <div>
            <div className="text-[9px] uppercase text-slate-400 font-mono">Activity</div>
            <div className="text-xs font-bold text-cyan-600">{displayedLogs[hoveredIndex].activityScore}%</div>
          </div>
          <div>
            <div className="text-[9px] uppercase text-slate-400 font-mono">Focus</div>
            <div className="text-xs font-bold text-amber-600">{displayedLogs[hoveredIndex].focusScore}%</div>
          </div>
          <div>
            <div className="text-[9px] uppercase text-slate-400 font-mono">Social</div>
            <div className="text-xs font-bold text-purple-600">{displayedLogs[hoveredIndex].socialScore}%</div>
          </div>
        </div>
      )}
    </div>
  );
}
