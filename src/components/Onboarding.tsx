import React, { useState } from "react";
import { Check, ArrowRight, Activity, Smile, Brain, BookOpen, Compass, Flame, Users, Calendar, HelpCircle } from "lucide-react";
import { generateClientDemoData } from "../lib/seed";

interface OnboardingProps {
  userId: string;
  userName: string;
  onOnboardingComplete: () => void;
}

export default function Onboarding({ userId, userName, onOnboardingComplete }: OnboardingProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Step 1: Preferences
  const [selectedTrack, setSelectedTrack] = useState<string[]>(["Focus", "Mood", "Sleep"]);
  
  // Step 2: Persona
  const [persona, setPersona] = useState<string>("Professional");

  // Step 3: Preference
  const [preference, setPreference] = useState<string>("Both");

  // Step 4: Assessment Questions
  const [sleepScore, setSleepScore] = useState<number>(7.5);
  const [productivityScore, setProductivityScore] = useState<number>(7);
  const [focusScoreValue, setFocusScoreValue] = useState<number>(8);
  const [moodScore, setMoodScore] = useState<number>(7);
  const [energyScore, setEnergyScore] = useState<number>(7);
  const [socialScore, setSocialScore] = useState<number>(6);
  const [exerciseValue, setExerciseValue] = useState<boolean>(true);

  const trackingOptions = [
    { name: "Focus", desc: "Understand focus blocks & mental exhaustion", icon: <Brain className="w-4 h-4" /> },
    { name: "Energy", desc: "Trace fatigue loops throughout circadian rhythms", icon: <Flame className="w-4 h-4" /> },
    { name: "Mood", desc: "Map emotional variability & satisfaction peaks", icon: <Smile className="w-4 h-4" /> },
    { name: "Sleep", desc: "Correlate sleep cycles to next-day performance", icon: <Calendar className="w-4 h-4" /> },
    { name: "Exercise", desc: "Track movement, steps, and bodily recovery", icon: <Activity className="w-4 h-4" /> },
    { name: "Social Life", desc: "Analyze impact of active social connections", icon: <Users className="w-4 h-4" /> },
    { name: "Productivity", desc: "Optimize personal workflows & tasks", icon: <Compass className="w-4 h-4" /> },
    { name: "Learning", desc: "Catalog assimilation rate & retention scores", icon: <BookOpen className="w-4 h-4" /> }
  ];

  const personaOptions = [
    { name: "Student", desc: "Optimizing learning velocity & exams setup" },
    { name: "Professional", desc: "Maximizing focus blocks & meeting density" },
    { name: "Researcher", desc: "Tracking intellectual stamina & context switches" },
    { name: "Founder", desc: "Managing stress, energy cycles, & decision quality" }
  ];

  const preferenceOptions = [
    { name: "Manual Check-ins", desc: "Quick 30-second sliders at twilight", val: "Manual" },
    { name: "Automatic Integrations", desc: "Pull statistics from calendar, web tracking", val: "Automatic" },
    { name: "Both", desc: "Combine manual self-reflection with sensors", val: "Both" }
  ];

  const toggleTrack = (option: string) => {
    setSelectedTrack(prev => 
      prev.includes(option) ? prev.filter(t => t !== option) : [...prev, option]
    );
  };

  const handleNext = () => {
    if (step < 4) {
      setStep((step + 1) as any);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as any);
    }
  };

  const handleFinish = async () => {
    try {
      // 1. Update user document with complete onboarding parameters in LocalStorage
      const cachedProfile = localStorage.getItem(`chronis_profile_${userId}`);
      let profileData = cachedProfile ? JSON.parse(cachedProfile) : {
        id: userId,
        name: userName,
        email: "subscriber@domain.com",
        createdAt: new Date().toISOString()
      };

      profileData = {
        ...profileData,
        onboarded: true,
        trackingPref: selectedTrack,
        onboardingPersonalization: persona,
        collectionPreference: preference
      };

      localStorage.setItem(`chronis_profile_${userId}`, JSON.stringify(profileData));

      // 2. Pre-seed personalized behavioral entries / insights / stories from assessment sliders
      const seedData = generateClientDemoData(userId, userName, {
        sleep: sleepScore,
        productivity: productivityScore,
        mood: moodScore,
        social: socialScore,
        exercise: exerciseValue
      });

      localStorage.setItem(`chronis_entries_${userId}`, JSON.stringify(seedData.entries));
      localStorage.setItem(`chronis_insights_${userId}`, JSON.stringify(seedData.insights));
      localStorage.setItem(`chronis_stories_${userId}`, JSON.stringify(seedData.stories));

      // 3. Complete Callback
      onOnboardingComplete();
    } catch (e) {
      console.error("Failed completing onboarding profile write", e);
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800 flex flex-col justify-center items-center px-4 py-12 font-sans select-none">
      
      {/* Step dots container */}
      <div className="flex items-center gap-1.5 mb-8">
        {[1, 2, 3, 4].map(s => (
          <div
            key={s}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              step === s ? "w-8 bg-rose-500" : "w-1.5 bg-slate-200"
            }`}
          />
        ))}
      </div>

      <div className="w-full max-w-xl bg-white border border-slate-100/80 rounded-3xl p-6.5 md:p-8 shadow-xs">
        
        {/* Step 1: What to track */}
        {step === 1 && (
          <div>
            <span className="text-[9px] font-bold text-rose-500 font-mono tracking-widest uppercase block mb-1">
              STEP 1 OF 4
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-slate-900 font-normal tracking-tight">
              What would you like to track?
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">Select all behavioral vectors that matter</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {trackingOptions.map(opt => {
                const isSelected = selectedTrack.includes(opt.name);
                return (
                  <button
                    key={opt.name}
                    onClick={() => toggleTrack(opt.name)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? "border-rose-400 bg-rose-50/10 hover:bg-rose-50/15"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/30"
                    }`}
                  >
                    <div className={`p-2 rounded-xl shrink-0 ${isSelected ? "bg-rose-100 text-rose-600" : "bg-slate-50 text-slate-500"}`}>
                      {opt.icon}
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                        <span>{opt.name}</span>
                        {isSelected && <Check className="w-3.5 h-3.5 text-rose-600 ml-auto shrink-0" />}
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1 leading-normal">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: About User */}
        {step === 2 && (
          <div>
            <span className="text-[9px] font-bold text-rose-500 font-mono tracking-widest uppercase block mb-1">
              STEP 2 OF 4
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-slate-900 font-normal tracking-tight">
              Tell us about yourself
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">Select a primary profile for behavior mapping</p>

            <div className="space-y-3">
              {personaOptions.map(p => {
                const isSelected = persona === p.name;
                return (
                  <button
                    key={p.name}
                    onClick={() => setPersona(p.name)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-rose-400 bg-rose-50/10"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/30"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800">{p.name}</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{p.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-rose-150 border border-rose-350 flex items-center justify-center text-rose-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Collection preference */}
        {step === 3 && (
          <div>
            <span className="text-[9px] font-bold text-rose-500 font-mono tracking-widest uppercase block mb-1">
              STEP 3 OF 4
            </span>
            <h2 className="text-xl md:text-2xl font-serif text-slate-900 font-normal tracking-tight">
              Daily behavior preference
            </h2>
            <p className="text-xs text-slate-400 mt-1 mb-6">How would you like Chronis to construct diaries?</p>

            <div className="space-y-3">
              {preferenceOptions.map(pref => {
                const isSelected = preference === pref.val;
                return (
                  <button
                    key={pref.name}
                    onClick={() => setPreference(pref.val)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? "border-rose-400 bg-rose-50/10"
                        : "border-slate-100 hover:border-slate-200 hover:bg-slate-50/30"
                    }`}
                  >
                    <div>
                      <div className="text-xs font-semibold text-slate-800">{pref.name}</div>
                      <p className="text-[10px] text-slate-400 mt-0.5">{pref.desc}</p>
                    </div>
                    {isSelected && (
                      <div className="w-5 h-5 rounded-full bg-rose-150 border border-rose-350 flex items-center justify-center text-rose-600">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Initial Assessment sliders to prevent blank empty state */}
        {step === 4 && (
          <div className="space-y-5 max-h-[460px] overflow-y-auto pr-2">
            <div>
              <span className="text-[9px] font-bold text-rose-500 font-mono tracking-widest uppercase block mb-1">
                STEP 4 OF 4 • CHRONIS TELEMETRY PREPARATION
              </span>
              <h2 className="text-xl font-serif text-slate-900 font-normal tracking-tight">
                Initial Assessment
              </h2>
              <p className="text-[10px] text-slate-450 leading-relaxed mt-1">
                Chronis requires an initial telemetry window to understand your baseline values instead of displaying an empty dashboard. Please assess yesterday's scores:
              </p>
            </div>

            {/* Q1: Sleep hours */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">How many hours did you sleep?</span>
                <span className="text-xs font-bold text-rose-600 font-mono">{sleepScore} hrs</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={sleepScore}
                onChange={e => setSleepScore(parseFloat(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full cursor-pointer bg-slate-200"
              />
              <span className="text-[9px] text-slate-400 mt-1 block">Recommended: 7 – 9 hours</span>
            </div>

            {/* Q2: Productivity */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">How productive was your day?</span>
                <span className="text-xs font-bold text-rose-600 font-mono">{productivityScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={productivityScore}
                onChange={e => setProductivityScore(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full cursor-pointer bg-slate-200"
              />
            </div>

            {/* Q3: Focus */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">How focused did you feel?</span>
                <span className="text-xs font-bold text-rose-600 font-mono">{focusScoreValue} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={focusScoreValue}
                onChange={e => setFocusScoreValue(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full cursor-pointer bg-slate-200"
              />
            </div>

            {/* Q4: Mood */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">How was your mood?</span>
                <span className="text-xs font-bold text-rose-600 font-mono">{moodScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={moodScore}
                onChange={e => setMoodScore(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full cursor-pointer bg-slate-200"
              />
            </div>

            {/* Q5: Energy */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">How was your energy?</span>
                <span className="text-xs font-bold text-rose-600 font-mono">{energyScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={energyScore}
                onChange={e => setEnergyScore(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full cursor-pointer bg-slate-200"
              />
            </div>

            {/* Q6: Social */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-700">How social were you?</span>
                <span className="text-xs font-bold text-rose-600 font-mono">{socialScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={socialScore}
                onChange={e => setSocialScore(parseInt(e.target.value))}
                className="w-full accent-rose-500 h-1 rounded-full cursor-pointer bg-slate-200"
              />
            </div>

            {/* Q7: Exercise */}
            <div className="bg-slate-50/70 p-3.5 rounded-2xl border border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-slate-800 block">Did you exercise today?</span>
                <span className="text-[10px] text-slate-400">At least 20 minutes of elevated cardiac rate</span>
              </div>
              <button
                onClick={() => setExerciseValue(!exerciseValue)}
                className={`py-1.5 px-4 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  exerciseValue
                    ? "bg-rose-550 text-white fill-white shadow-xs"
                    : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                }`}
                style={{ backgroundColor: exerciseValue ? "#F43F5E" : "" }}
              >
                {exerciseValue ? "YES" : "NO"}
              </button>
            </div>

          </div>
        )}

        {/* Next / Back navigation buttons */}
        <div className="mt-8 flex justify-between items-center gap-4">
          {step > 1 ? (
            <button
              onClick={handleBack}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer py-2 px-4"
            >
              Back
            </button>
          ) : (
            <div />
          )}

          {step < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-850 text-white font-semibold text-xs py-2.5 px-5 rounded-full transition-all cursor-pointer ml-auto active:scale-98"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 bg-rose-550 text-white font-bold text-xs py-3 px-6 rounded-full transition-all cursor-pointer ml-auto active:scale-98 shadow-md"
              style={{ backgroundColor: "#F43F5E" }}
            >
              <span>Generate Personal Dashboard</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
