import React, { useState } from "react";
import { ShieldCheck, Database, Sliders, Smartphone, User, Mail, Check, ToggleLeft, Command } from "lucide-react";

interface ProfileViewProps {
  userId: string;
  isDemo?: boolean;
  userName: string;
  userEmail: string;
  trackingPref: string[];
  personalizationRole: string;
  checkinPreference: string;
  onProfileUpdate?: (updatedFields: { onboardingPersonalization: string; collectionPreference: string }) => void;
}

export default function ProfileView({
  userId,
  isDemo,
  userName,
  userEmail,
  trackingPref,
  personalizationRole,
  checkinPreference,
  onProfileUpdate
}: ProfileViewProps) {
  // Local state for editing preferences
  const [role, setRole] = useState(personalizationRole || "Professional");
  const [pref, setPref] = useState(checkinPreference || "Both");
  const [success, setSuccess] = useState(false);

  const handleUpdate = async () => {
    try {
      if (isDemo) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 2500);
        return;
      }
      
      const cachedProfile = localStorage.getItem(`chronis_profile_${userId}`);
      let profileData = cachedProfile ? JSON.parse(cachedProfile) : {
        id: userId,
        name: userName,
        email: userEmail,
        onboarded: true,
        trackingPref: trackingPref,
        createdAt: new Date().toISOString()
      };

      profileData.onboardingPersonalization = role;
      profileData.collectionPreference = pref;

      localStorage.setItem(`chronis_profile_${userId}`, JSON.stringify(profileData));
      
      if (onProfileUpdate) {
        onProfileUpdate({
          onboardingPersonalization: role,
          collectionPreference: pref
        });
      }

      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-6 md:py-8 space-y-8 select-none leading-relaxed transition-all">
      
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-serif text-slate-900">Subscriber Profile</h1>
        <p className="text-xs text-slate-400 mt-1">Manage secure preferences, private storage, and telemetry integrations</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7">
        
        {/* Left Side: Personal Account summary */}
        <div className="lg:col-span-4 bg-white border border-slate-100/100 rounded-3xl p-6.5 shadow-3xs flex flex-col justify-between">
          <div className="space-y-6">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">ACCOUNT DETAILS</span>
            
            <div className="flex items-center gap-4.5">
              <div className="w-14 h-14 bg-rose-50 border border-rose-200/50 rounded-full flex items-center justify-center font-bold text-lg font-serif text-rose-600/90 shadow-3xs">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800">{userName}</h3>
                <span className="text-[9.5px] uppercase tracking-wider text-rose-500 font-bold">Standard Subscriber</span>
              </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-50 text-xs text-slate-550">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">UID: {userId}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="truncate">{userEmail}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200/50 rounded-2xl p-4.5 text-[10.5px] text-slate-500 mt-8 mb-2 leading-relaxed">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>ISOLATED SECURITY POLICY</span>
            </span>
            All sub-records are securely validated and locked via our Fortress Zero-Trust firewall policy. Personal logs remain structurally private.
          </div>
        </div>

        {/* Right Side: Integration Preferences Forms */}
        <div className="lg:col-span-8 bg-white border border-slate-100/100 rounded-3xl p-6 md:p-8 shadow-3xs space-y-6.5">
          
          {/* Tracking preferences summary read-only list */}
          <div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono">ACTIVE BEHAVIOR VECTORS</span>
            <div className="flex flex-wrap items-center gap-2 mt-3 select-none">
              {(trackingPref.length > 0 ? trackingPref : ["Focus", "Mood", "Sleep", "Exercise", "Social Life"]).map((pref, i) => (
                <div key={i} className="px-3.5 py-1.5 bg-rose-50 border border-rose-100 text-rose-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>{pref}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Form edits */}
          <div className="border-t border-slate-50 pt-6.5 grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Persona picker */}
            <div>
              <span className="text-[9.5px] font-bold text-slate-450 uppercase tracking-widest font-mono block mb-2.5">PERSONALIZATION BASKET</span>
              <select
                value={role}
                onChange={e => setRole(e.target.value)}
                className="w-full text-xs font-semibold text-slate-705 p-3 rounded-xl border border-slate-205 focus:border-slate-350 bg-slate-50/50"
              >
                <option value="Student">Student (Optimizing retention velocity)</option>
                <option value="Professional">Professional (Maximizing task density)</option>
                <option value="Researcher">Researcher (Tracking cognitive stamina)</option>
                <option value="Founder">Founder (Stress mapping & decision quality)</option>
              </select>
            </div>

            {/* Interval checkin picker */}
            <div>
              <span className="text-[9.5px] font-bold text-slate-455 uppercase tracking-widest font-mono block mb-2.5">COLLECTION MODE</span>
              <select
                value={pref}
                onChange={e => setPref(e.target.value)}
                className="w-full text-xs font-semibold text-slate-705 p-3 rounded-xl border border-slate-205 focus:border-slate-350 bg-slate-50/50"
              >
                <option value="Manual">Manual daily reflex check-ins</option>
                <option value="Automatic">Automatic peripheral background sync</option>
                <option value="Both">Both combined</option>
              </select>
            </div>

          </div>

          <div className="flex items-center justify-between gap-4 border-t border-slate-50 pt-5 mt-2">
            {success ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5 animate-pulse">
                <Check className="w-4 h-4 shrink-0" />
                <span>Preferences updated successfully!</span>
              </span>
            ) : (
              <div />
            )}

            <button
              onClick={handleUpdate}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs py-2.5 px-6 rounded-full cursor-pointer transition-all active:scale-98 shadow-xs"
            >
              Save Changes
            </button>
          </div>

          {/* Connect Data Sources mockup */}
          <div className="border-t border-slate-100 pt-6.5 space-y-4">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest font-mono block">CONNECTED SERVICES & PERIPHERALS</span>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              
              <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Database className="w-5 h-5 text-indigo-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Apple Health Kit</span>
                    <span className="text-[10px] text-slate-450">Automatic step synchronizer</span>
                  </div>
                </div>
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              </div>

              <div className="p-4 bg-slate-50/50 border border-slate-150 rounded-2xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-indigo-500" />
                  <div>
                    <span className="text-xs font-bold text-slate-800 block">Calendar Feed</span>
                    <span className="text-[10px] text-slate-450">Track total meetings duration</span>
                  </div>
                </div>
                <ToggleLeft className="w-8 h-8 text-slate-300" />
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
