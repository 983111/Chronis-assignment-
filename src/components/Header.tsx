import React, { useState } from "react";
import { Flame, User, LogOut, ChevronDown, CheckSquare } from "lucide-react";

interface HeaderProps {
  activeTab: "overview" | "signals" | "story" | "profile";
  setActiveTab: (tab: "overview" | "signals" | "story" | "profile") => void;
  userName: string;
  onLogout: () => void;
  onCheckinOpen: () => void;
}

export default function Header({ activeTab, setActiveTab, userName, onLogout, onCheckinOpen }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  // Derive initials dynamically to satisfy "do not hardcode any names"
  const getInitials = (name: string) => {
    if (!name) return "US";
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  const initials = getInitials(userName);

  return (
    <header className="bg-[#FAF9F6] border-b border-slate-100 sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand Text Logo */}
        <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => setActiveTab("overview")}>
          <div className="w-8 h-8 relative">
            <svg className="w-full h-full" viewBox="0 0 40 40" fill="none">
              <path
                d="M10,25 C12,18 16,14 22,12 C28,10 32,15 30,22 C28,29 24,33 18,34 C12,35 8,32 10,25 Z"
                fill="#C084FC"
                opacity="0.9"
              />
              <path
                d="M12,28 C14,21 19,16 25,18 C31,20 33,25 30,31 C27,37 21,38 15,36 C10,34 10,31 12,28 Z"
                fill="#F43F5E"
                opacity="0.65"
                style={{ mixBlendMode: "multiply" }}
              />
            </svg>
          </div>
          <span className="text-xl font-serif font-semibold tracking-wide text-slate-900">CHRONIS</span>
        </div>

        {/* Navigation Tabs Center */}
        <nav className="hidden md:flex items-center bg-slate-100/60 p-1 rounded-full border border-slate-250/30 gap-1 select-none">
          {([
            { id: "overview", label: "Overview" },
            { id: "signals", label: "Signals" },
            { id: "story", label: "Story" },
            { id: "profile", label: "Profile" }
          ] as const).map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "bg-white text-slate-900 shadow-2xs font-bold"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        {/* Actions Right */}
        <div className="flex items-center gap-3.5 relative">
          
          <button
            onClick={onCheckinOpen}
            className="flex items-center gap-1.5 bg-rose-50 text-rose-600 border border-rose-100/55 hover:bg-rose-100 md:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer shadow-3xs"
          >
            <span className="hidden sm:inline font-bold">Daily Check-in</span>
          </button>



          {/* Profile User Icon Avatar Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="w-8 h-8 rounded-full bg-slate-200 border border-slate-100 flex items-center justify-center font-bold text-xs text-slate-700 font-serif shadow-3xs cursor-pointer hover:ring-2 hover:ring-slate-200 transition-all"
            >
              {initials}
            </button>

            {showDropdown && (
              <div className="absolute right-0 mt-3.5 w-48 bg-white border border-slate-100 shadow-lg rounded-xl p-2.5 z-50">
                <div className="px-2.5 py-2 border-b border-slate-50 mb-1.5/70">
                  <div className="text-xs font-bold text-slate-800 truncate">{userName}</div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">Subscriber account</div>
                </div>
                <button
                  onClick={() => { setActiveTab("profile"); setShowDropdown(false); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-slate-605 hover:bg-slate-50 rounded-lg text-left text-slate-700"
                >
                  <User className="w-3.5 h-3.5 text-slate-400" />
                  <span>My Profile</span>
                </button>
                <button
                  onClick={() => { onLogout(); setShowDropdown(false); }}
                  className="w-full flex items-center gap-2 px-2.5 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-lg text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Mobile Nav Bar */}
      <div className="md:hidden flex bg-[#FAF9F6] border-t border-slate-100 justify-around py-2.5 px-2 select-none">
        {([
          { id: "overview", label: "Overview" },
          { id: "signals", label: "Signals" },
          { id: "story", label: "Story" },
          { id: "profile", label: "Profile" }
        ] as const).map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-xs font-semibold py-1 px-3.5 rounded-full transition-all ${
                isActive ? "bg-slate-900 text-white font-bold" : "text-slate-400"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
