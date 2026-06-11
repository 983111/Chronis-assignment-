import React, { useState } from "react";
import { Calendar, BookOpen, Compass, Shield, Award, Heart, Anchor, AlertCircle, TrendingUp, HelpCircle, Smile } from "lucide-react";
import { StoryChapter } from "../types";

interface StoryViewProps {
  stories: StoryChapter[];
}

export default function StoryView({ stories }: StoryViewProps) {
  const [selectedStoryId, setSelectedStoryId] = useState<string>(stories[stories.length - 1]?.id || "");

  const activeStory = stories.find(st => st.id === selectedStoryId) || stories[stories.length - 1];

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "High point":
        return "bg-emerald-50 text-emerald-700 border-emerald-100/50";
      case "Low point":
        return "bg-rose-50 text-rose-700 border-rose-100/50";
      default:
        return "bg-amber-50 text-amber-700 border-amber-100/50"; // Turning point
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 space-y-8 select-none leading-relaxed transition-all">
      
      {/* Intro section */}
      <div>
        <h1 className="text-2xl font-serif text-slate-900">Your Signature Behavioral Book</h1>
        <p className="text-xs text-slate-400 mt-1">Chronis converts raw telemetry parameters into editorial narrative chapters</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Side Info Card & Vector Artwork (Section 3 Left) */}
        <div className="lg:col-span-4 bg-white border border-slate-100/80 rounded-3xl p-6.5 shadow-3xs flex flex-col justify-between overflow-hidden relative">
          <div className="space-y-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">CHRONIS BIOGRAPHY</span>
            <h2 className="text-xl font-serif text-slate-900 leading-tight">Your story over time</h2>
            <p className="text-slate-500 text-xs font-light leading-relaxed">
              A comprehensive chronicle of your physical and cognitive journey. Each milestone builds on the prior as your routine adapts to life's variables.
            </p>
          </div>

          {/* Sunset mountain illustration card in layout */}
          <div className="mt-8 rounded-2xl bg-gradient-to-b from-rose-50/70 to-orange-100/40 border border-orange-100/50 p-5 relative overflow-hidden h-36 flex flex-col justify-between">
            <div className="text-[10px] font-bold text-orange-700 font-mono tracking-wider uppercase">ARCHIVAL SERIES</div>
            <div className="absolute inset-x-0 bottom-0 pointer-events-none opacity-40">
              <svg viewBox="0 0 100 40" fill="currentColor" className="text-rose-400 w-full">
                <path d="M0,40 L25,12 L50,30 L75,18 L100,40 Z" />
              </svg>
              <svg viewBox="0 0 100 40" fill="currentColor" className="text-orange-300 w-full absolute bottom-0 transform scale-y-75 origin-bottom">
                <path d="M0,40 L35,22 L70,35 L100,40 Z" />
              </svg>
            </div>
            <span className="text-[9px] text-slate-400 mt-auto z-10 font-bold uppercase font-space">Volume I • Edition 2026</span>
          </div>

          <div className="mt-6 border-t border-slate-50 pt-5 text-slate-400 text-[10px] space-y-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>High points: Routine consistency peaks</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
              <span>Low points: Sleep onset or focus decay</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span>Turning points: Habits adapting</span>
            </div>
          </div>
        </div>

        {/* Center / Right Story Content Area (Section 3 right parts) */}
        <div className="lg:col-span-8 bg-white border border-slate-100/80 rounded-3xl p-6 md:p-8 shadow-3xs flex flex-col justify-between">
          
          {/* Milestone Interactive Timeline (Section 3 Top Row) */}
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">SELECT CHAPTER</span>
            
            <div className="relative flex justify-between items-center mt-6 mb-8 px-4">
              {/* Connecting line */}
              <div className="absolute inset-x-0 top-3.5 h-[1.5px] bg-slate-100 -z-10" />

              {stories.map(st => {
                const isActive = activeStory?.id === st.id;
                return (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStoryId(st.id)}
                    className="flex flex-col items-center gap-2 shrink-0 select-none cursor-pointer"
                  >
                    <div
                      className={`w-7.5 h-7.5 rounded-full border-2 flex items-center justify-center font-bold text-xs transition-all relative z-10 ${
                        isActive
                          ? "bg-rose-500 border-rose-500 text-white shadow-xs ring-4 ring-rose-100"
                          : "bg-white border-slate-200 text-slate-400 hover:border-slate-400 hover:text-slate-600"
                      }`}
                    >
                      {st.month.slice(0, 1)}
                    </div>
                    <span className={`text-[10px] font-bold ${isActive ? "text-slate-900" : "text-slate-400 font-medium"}`}>
                      {st.month}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Selected Chapter editorial display */}
            {activeStory && (
              <div className="space-y-6">
                
                {/* Meta details */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-5">
                  <div>
                    <span className="text-[9.5px] font-bold text-slate-400 uppercase tracking-widest font-mono block">
                      CHAPTER SUMMARY
                    </span>
                    <h3 className="text-2xl font-serif text-slate-950 font-normal italic mt-1 bg-gradient-to-r">
                      {activeStory.month}: {activeStory.title}
                    </h3>
                  </div>

                  <span className={`text-[10px] py-1 px-3.5 border font-semibold rounded-full uppercase tracking-wider ${getBadgeColor(activeStory.badgeLabel)}`}>
                    {activeStory.badgeLabel || "Turning point"}
                  </span>
                </div>

                {/* Prose Summary */}
                <div className="text-slate-700 text-xs font-light leading-relaxed space-y-4 max-w-xl">
                  <p>{activeStory.summary}</p>
                </div>

                {/* Sub row indicators */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-4">
                  
                  {/* Behavioral Shifts details */}
                  <div className="bg-slate-50/50 border border-slate-100/70 p-4.5 rounded-2xl">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">OBSERVED MOTIFS</span>
                    <div className="space-y-2 mt-3.5 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <span className="text-rose-500">•</span>
                        <span>Sleep irregularity indices surged</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-rose-500">•</span>
                        <span>Outbound messaging peaks on Saturdays</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-rose-500">•</span>
                        <span>Morning productivity routines collapsed</span>
                      </div>
                    </div>
                  </div>

                  {/* Impact metrics details */}
                  <div className="bg-slate-50/50 border border-slate-100/70 p-4.5 rounded-2xl flex flex-col justify-between">
                    <div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">CHAPTER METRIC IMPRESSION</span>
                      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                        <div className="p-2 bg-white rounded-xl border border-slate-100/40">
                          <span className="text-[10px] text-slate-400 block">Focus</span>
                          <span className="text-sm font-bold text-slate-800 font-space mt-1 block">
                            {activeStory.impactDetails.focus}
                          </span>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-slate-100/40">
                          <span className="text-[10px] text-slate-400 block">Energy</span>
                          <span className="text-sm font-bold text-slate-800 font-space mt-1 block">
                            {activeStory.impactDetails.energy}
                          </span>
                        </div>
                        <div className="p-2 bg-white rounded-xl border border-slate-100/40">
                          <span className="text-[10px] text-slate-400 block">Social</span>
                          <span className="text-sm font-bold text-slate-800 font-space mt-1 block">
                            {activeStory.impactDetails.social}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

              </div>
            )}

          </div>

          {/* Bottom row of category vector visual icons from Section 3 bottom line */}
          <div className="flex items-center justify-around border-t border-slate-50 pt-6 mt-8 text-slate-350">
            <button className="hover:text-slate-500 transition-colors cursor-pointer"><BookOpen className="w-5 h-5" /></button>
            <button className="hover:text-slate-500 transition-colors cursor-pointer"><Award className="w-5 h-5" /></button>
            <button className="hover:text-slate-500 transition-colors cursor-pointer"><Heart className="w-5 h-5" /></button>
            <button className="hover:text-slate-500 transition-colors cursor-pointer"><Anchor className="w-5 h-5" /></button>
            <button className="hover:text-slate-500 transition-colors cursor-pointer"><Smile className="w-5 h-5" /></button>
          </div>

        </div>

      </div>

    </div>
  );
}
