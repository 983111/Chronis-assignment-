import { useState, useRef } from "react";
import { Moon, User, Target, Users, RefreshCw, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { TimelineItem, mockTimelineItems, mockCalendarData } from "../data";

interface NarrativeTimelineProps {
  onTimelineSelectInsight: (insightId: string) => void;
  activeInsightId: string;
}

export default function NarrativeTimeline({ onTimelineSelectInsight, activeInsightId }: NarrativeTimelineProps) {
  const [viewMode, setViewMode] = useState<"timeline" | "calendar">("timeline");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [panOffset, setPanOffset] = useState<number>(0); // Percentage shift 
  const containerRef = useRef<HTMLDivElement>(null);

  // Filters the timeline bars
  const filteredTimelineItems = mockTimelineItems.filter((item) => {
    if (selectedFilter === "all") return true;
    return item.category === selectedFilter;
  });

  const getMetricIcon = (cat: string) => {
    switch (cat) {
      case "sleep":
        return <Moon className="w-4 h-4 text-slate-500" />;
      case "activity":
        return <User className="w-4 h-4 text-slate-500" />;
      case "focus":
        return <Target className="w-4 h-4 text-slate-500" />;
      case "social":
        return <Users className="w-4 h-4 text-slate-500" />;
      case "routine":
        return <RefreshCw className="w-4 h-4 text-slate-500" />;
      default:
        return null;
    }
  };

  const getColorClasses = (colorType: string, isCurrentDraft: boolean) => {
    const base = isCurrentDraft ? "ring-2 ring-blue-500 ring-offset-1 font-bold" : "";
    switch (colorType) {
      case "blue":
        return `${base} bg-blue-50 text-blue-700 hover:bg-blue-100/80 border border-blue-100`;
      case "green":
        return `${base} bg-cyan-50 text-cyan-700 hover:bg-cyan-100/80 border border-cyan-100`;
      case "yellow":
        return `${base} bg-amber-50 text-amber-700 hover:bg-amber-100/80 border border-amber-100/70`;
      case "purple":
        return `${base} bg-purple-50 text-purple-700 hover:bg-purple-100/80 border border-purple-100`;
      case "orange":
        return `${base} bg-orange-50 text-orange-700 hover:bg-orange-100/80 border border-[#fde8e3]`;
      default:
        return `${base} bg-slate-50 text-slate-700 border border-slate-100`;
    }
  };

  const handlePan = (direction: "left" | "right") => {
    if (direction === "left") {
      setPanOffset((prev) => Math.max(prev - 10, -25));
    } else {
      setPanOffset((prev) => Math.min(prev + 10, 25));
    }
  };

  // Maps timeline items to real interactive explorer keys
  const mapTimelineToInsightId = (item: TimelineItem) => {
    if (item.category === "focus") return "focus-sunday-drop";
    if (item.category === "sleep") return "sleep-saturday-shift";
    if (item.category === "social") return "social-weekend-peak";
    if (item.category === "activity") return "activity-climb";
    return "focus-sunday-drop"; // fallback
  };

  return (
    <div id="timeline-section" className="bg-white rounded-3xl border border-slate-100 shadow-xs overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[500px]">
      
      {/* Left Artwork Column */}
      <div className="lg:col-span-3 bg-[#EAF2ED] p-8 flex flex-col justify-between relative overflow-hidden min-h-[250px] lg:min-h-auto">
        <div>
          <h2 className="text-3xl font-serif text-slate-800 leading-tight">Your Story<br />Over Time</h2>
          <p className="text-slate-500 font-sans text-xs mt-3 leading-relaxed">
            A timeline of your behavioral journey.
          </p>
        </div>

        {/* River winding through mountains SVG Illustration */}
        <div className="absolute bottom-0 left-0 right-0 h-44 w-full pointer-events-none select-none">
          <svg className="w-full h-full" viewBox="0 0 200 150" fill="none" preserveAspectRatio="none">
            {/* Mountain backs */}
            <path d="M-20,120 L40,80 L90,130 L160,70 L220,130 L220,150 L-20,150 Z" fill="#D3E2D8" opacity="0.7" />
            <path d="M10,130 L70,100 L120,140 L180,95 L220,135 L220,150 L10,150 Z" fill="#C2D5C8" opacity="0.9" />
            
            {/* Winding river path */}
            <path
              d="M100,105 Q90,115 110,125 T80,140 T50,150"
              stroke="#A5C4B0"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.6"
            />
            <path
              d="M100,105 Q90,115 110,125 T80,140 T50,150"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
              strokeDasharray="4 4"
            />
          </svg>
        </div>
      </div>

      {/* Right Workstation Column */}
      <div className="lg:col-span-9 p-6 flex flex-col justify-between">
        <div>
          {/* Header Controls Container */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-4">
            
            {/* View switcher */}
            <div className="flex gap-1.5 bg-slate-100/80 p-1 rounded-xl">
              <button
                onClick={() => setViewMode("timeline")}
                className={`py-1.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === "timeline"
                    ? "bg-white text-slate-800 shadow-3xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Timeline view
              </button>
              <button
                onClick={() => setViewMode("calendar")}
                className={`py-1.5 px-4 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  viewMode === "calendar"
                    ? "bg-white text-slate-800 shadow-3xs"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                Calendar view
              </button>
            </div>

            {/* Filter Dropdown Component */}
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-transparent text-xs text-slate-600 font-semibold border-none focus:outline-none focus:ring-0 pr-6 pl-1 cursor-pointer"
              >
                <option value="all">All insights</option>
                <option value="sleep">Sleep</option>
                <option value="activity">Activity</option>
                <option value="focus">Focus</option>
                <option value="social">Social Balance</option>
                <option value="routine">Routine</option>
              </select>
            </div>

          </div>

          {/* Conditional View Renders */}
          <div className="mt-6">
            {viewMode === "timeline" ? (
              <div className="relative overflow-hidden" ref={containerRef}>
                
                {/* Horizontal scale indicators */}
                <div 
                  style={{ transform: `translateX(${panOffset}%)` }}
                  className="flex justify-between border-b border-slate-100 pb-3 mb-4 transition-transform duration-300"
                >
                  <div className="w-[80px] shrink-0" /> {/* Spacer */}
                  <div className="flex-1 flex justify-between px-4 text-[10px] font-mono text-slate-400">
                    <span className="w-1/4 text-center">Mar 2025</span>
                    <span className="w-1/4 text-center">Apr 2025</span>
                    <span className="w-1/4 text-center">May 2025</span>
                    <span className="w-1/4 text-center">Jun 2025</span>
                  </div>
                </div>

                {/* Sub-track Container for horizontal categories */}
                <div 
                  style={{ transform: `translateX(${panOffset}%)` }}
                  className="space-y-4 relative transition-transform duration-300"
                >
                  {/* Category tracks layout */}
                  {(["sleep", "activity", "focus", "social", "routine"] as const).map((cat) => {
                    const itemsInTrack = filteredTimelineItems.filter(v => v.category === cat);
                    
                    // Skip displays of completely hidden rows when category selected is of another name
                    if (selectedFilter !== "all" && selectedFilter !== cat) {
                      return null;
                    }

                    return (
                      <div key={cat} className="flex items-center min-h-[44px] relative">
                        {/* Title panel column */}
                        <div className="w-[85px] shrink-0 flex items-center gap-1.5 pr-2 border-r border-slate-100 py-1">
                          {getMetricIcon(cat)}
                          <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wide capitalize">{cat === 'social' ? 'Social' : cat}</span>
                        </div>

                        {/* Relative overlay tracks */}
                        <div className="flex-1 min-h-[44px] relative bg-slate-50/20 rounded-md">
                          
                          {/* Dotted grid lines passing through tracks */}
                          <div className="absolute inset-0 flex justify-between pointer-events-none">
                            <span className="border-r border-slate-100 h-full w-px" />
                            <span className="border-r border-slate-100 h-full w-px" strokeDasharray="3" />
                            <span className="border-r border-slate-100 h-full w-px" strokeDasharray="3" />
                            <span className="border-r border-slate-100 h-full w-px" />
                          </div>

                          {/* Specific items mapped */}
                          {itemsInTrack.map((item) => {
                            const isCurrentDraft = activeInsightId === mapTimelineToInsightId(item);
                            return (
                              <button
                                key={item.id}
                                onClick={() => {
                                  onTimelineSelectInsight(mapTimelineToInsightId(item));
                                  // Scroll the explorer into view cleanly!
                                  const exp = document.getElementById("insight-explorer-section");
                                  if (exp) {
                                    exp.scrollIntoView({ behavior: "smooth" });
                                  }
                                }}
                                style={{
                                  left: `${item.startOffset}%`,
                                  width: `${item.widthPercent}%`
                                }}
                                className={`absolute top-1.5 h-8 rounded-full text-[10px] font-semibold flex items-center justify-center transition-all duration-200 cursor-pointer shadow-3xs truncate px-3 py-1 ${getColorClasses(
                                  item.colorType,
                                  isCurrentDraft
                                )}`}
                                title={`${item.title} (${item.label})`}
                              >
                                {item.title}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              /* Calendar Mode */
              <div className="p-1 sm:p-2 transition-all duration-300">
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-slate-600 font-sans tracking-wide">May 2025 Overview</h4>
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2.5 max-w-lg">
                  {/* Days indicator header */}
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                    <div key={d} className="text-[9px] sm:text-[10px] font-mono text-slate-400 text-center font-bold">{d}</div>
                  ))}

                  {/* Empty offsets to match accurate calendar days start if Wednesday */}
                  <div className="h-9 sm:h-10 bg-transparent rounded-xl" />
                  <div className="h-9 sm:h-10 bg-transparent rounded-xl" />

                  {/* Days populate */}
                  {mockCalendarData.map((cell) => {
                    const isFiltered = selectedFilter !== "all" && cell.type !== selectedFilter;
                    const getIconColorType = (type: string) => {
                      switch (type) {
                        case "sleep": return "bg-blue-500";
                        case "activity": return "bg-cyan-500";
                        case "focus": return "bg-amber-500";
                        case "social": return "bg-purple-500";
                        case "routine": return "bg-orange-500";
                        default: return "bg-slate-300";
                      }
                    };

                    return (
                      <div
                        key={cell.day}
                        className={`h-9 sm:h-11 rounded-lg sm:rounded-xl border border-slate-100 flex flex-col justify-between p-1 sm:p-1.5 relative transition-all duration-150 group ${
                          isFiltered ? "opacity-25" : "hover:bg-slate-50 hover:border-slate-300 shadow-3xs"
                        }`}
                        title={`${cell.title}`}
                      >
                        <span className="text-[8px] sm:text-[10px] font-mono font-bold text-slate-500">{cell.day}</span>
                        {!isFiltered && (
                          <div className="flex items-center justify-between">
                            <span className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${getIconColorType(cell.type)} shrink-0`} />
                            <span className="hidden sm:inline-block text-[8px] font-bold text-slate-400 capitalize truncate max-w-[32px] scale-90 origin-right transition-all group-hover:max-w-none">
                              {cell.type}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer slider and navigation control buttons */}
        {viewMode === "timeline" && (
          <div className="flex items-center justify-between border-t border-slate-100 pt-5 mt-6 px-1">
            <button
              onClick={() => handlePan("left")}
              className="p-1.5 rounded-full border border-slate-100 hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer"
              title="Pan left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Slider track */}
            <div className="flex-1 mx-6 relative h-4 flex items-center">
              <div className="absolute left-0 right-0 h-1 bg-slate-100 rounded-full" />
              <input
                type="range"
                min="-25"
                max="25"
                value={panOffset}
                onChange={(e) => setPanOffset(Number(e.target.value))}
                className="absolute inset-x-0 w-full opacity-100 accent-blue-600 h-1.5 cursor-pointer rounded-full"
              />
            </div>

            <button
              onClick={() => handlePan("right")}
              className="p-1.5 rounded-full border border-slate-100 hover:bg-slate-50 text-slate-500 transition-colors cursor-pointer"
              title="Pan right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

    </div>
  );
}
