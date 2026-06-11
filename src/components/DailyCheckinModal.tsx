import React, { useState } from "react";
import { X, Smile, Brain, Flame, Calendar, Moon, Users, Check, Loader2 } from "lucide-react";
import { DailyEntry } from "../types";

interface DailyCheckinModalProps {
  userId: string;
  isDemo?: boolean;
  onClose: () => void;
  onCheckinSuccess: (newEntry: DailyEntry) => void;
}

export default function DailyCheckinModal({ userId, isDemo, onClose, onCheckinSuccess }: DailyCheckinModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // States for sliders
  const [focus, setFocus] = useState<number>(7);
  const [energy, setEnergy] = useState<number>(7);
  const [mood, setMood] = useState<number>(8);
  const [sleep, setSleep] = useState<number>(7.5);
  const [social, setSocial] = useState<number>(6);
  const [exercise, setExercise] = useState<boolean>(true);

  // Today's date YYYY-MM-DD
  const dateStrYMD = new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const entryId = `${userId}_${dateStrYMD}`;

      const newEntry: DailyEntry = {
        id: entryId,
        userId,
        date: dateStrYMD,
        focus,
        energy,
        mood,
        sleep,
        social,
        exercise,
        createdAt: new Date().toISOString()
      };

      if (!isDemo) {
        // Log to client-side LocalStorage cache
        const cachedEntriesRaw = localStorage.getItem(`chronis_entries_${userId}`);
        const currentEntries: DailyEntry[] = cachedEntriesRaw ? JSON.parse(cachedEntriesRaw) : [];
        const filtered = currentEntries.filter(item => item.date !== dateStrYMD);
        filtered.push(newEntry);
        localStorage.setItem(`chronis_entries_${userId}`, JSON.stringify(filtered));
      }

      setSuccess(true);
      setTimeout(() => {
        onCheckinSuccess(newEntry);
        onClose();
      }, 1500);

    } catch (e) {
      console.error("Failed recording daily check-in in LocalStorage", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex justify-center items-center px-4 z-50 select-none animate-fade-in font-sans leading-relaxed">
      <div className="bg-white rounded-3xl border border-slate-100/85 shadow-2xl w-full max-w-lg p-6 md:p-8 relative max-h-[90vh] overflow-y-auto">
        
        {/* Header Close triggers */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-650 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mx-auto ring-8 ring-emerald-50">
              <Check className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-serif text-slate-950">Entry Recorded</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Your daily reflex is merged into the timeline. Pattern evaluation completed in 0.1ms.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Headline title block */}
            <div className="text-center md:text-left">
              <span className="text-[9.5px] font-bold text-rose-500 font-mono tracking-widest uppercase block mb-1">
                30-SECOND TWILIGHT REFLEX
              </span>
              <h2 className="text-xl font-serif text-slate-900 font-normal">Daily behavioral check-in</h2>
              <p className="text-xs text-slate-400 mt-1">Assess your subjective states for today: {dateStrYMD}</p>
            </div>

            {/* Sliders bundle container */}
            <div className="space-y-4.5">
              
              {/* Q1: Sleep hours */}
              <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Moon className="w-4 h-4 text-sky-505" />
                    <span>Sleep duration</span>
                  </span>
                  <span className="text-xs font-bold text-rose-600 font-mono">{sleep} hrs</span>
                </div>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="0.5"
                  value={sleep}
                  onChange={e => setSleep(parseFloat(e.target.value))}
                  className="w-full accent-rose-500 h-1 bg-slate-200 rounded-full cursor-pointer"
                />
              </div>

              {/* Q2: Focus score */}
              <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Brain className="w-4 h-4 text-purple-505" />
                    <span>Focus readiness</span>
                  </span>
                  <span className="text-xs font-bold text-rose-600 font-mono">{focus} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={focus}
                  onChange={e => setFocus(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-1 bg-slate-200 rounded-full cursor-pointer"
                />
              </div>

              {/* Q3: Energy score */}
              <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Flame className="w-4 h-4 text-orange-505" />
                    <span>Energy levels</span>
                  </span>
                  <span className="text-xs font-bold text-rose-600 font-mono">{energy} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={energy}
                  onChange={e => setEnergy(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-1 bg-slate-200 rounded-full cursor-pointer"
                />
              </div>

              {/* Q4: Mood score */}
              <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Smile className="w-4 h-4 text-emerald-505" />
                    <span>Subjective mood</span>
                  </span>
                  <span className="text-xs font-bold text-rose-600 font-mono">{mood} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={mood}
                  onChange={e => setMood(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-1 bg-slate-200 rounded-full cursor-pointer"
                />
              </div>

              {/* Q5: Social score */}
              <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-slate-100 flex flex-col justify-between">
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-indigo-505" />
                    <span>Social engagement</span>
                  </span>
                  <span className="text-xs font-bold text-rose-600 font-mono">{social} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={social}
                  onChange={e => setSocial(parseInt(e.target.value))}
                  className="w-full accent-rose-500 h-1 bg-slate-200 rounded-full cursor-pointer"
                />
              </div>

              {/* Q6: Exercise boolean toggle */}
              <div className="bg-[#FAF9F6] p-4.5 rounded-2xl border border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">Did you engage in physical workouts today?</span>
                <button
                  type="button"
                  onClick={() => setExercise(!exercise)}
                  className={`py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    exercise
                      ? "bg-rose-550 text-white fill-white shadow-xs"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                  style={{ backgroundColor: exercise ? "#F43F5E" : "" }}
                >
                  {exercise ? "YES" : "NO"}
                </button>
              </div>

            </div>

            {/* Action buttons */}
            <div className="flex justify-between items-center gap-4 border-t border-slate-50 pt-5 mt-2">
              <button
                type="button"
                onClick={onClose}
                className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-full transition-all cursor-pointer active:scale-98 disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4.5 h-4.5 animate-spin" />
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Register Daily Reflex</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
