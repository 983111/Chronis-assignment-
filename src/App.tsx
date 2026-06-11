import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, signInAnonymously } from "firebase/auth";
import { auth } from "./firebase";
import { UserProfile, DailyEntry, InsightPattern, StoryChapter } from "./types";
import { Loader2 } from "lucide-react";

// Views
import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import Onboarding from "./components/Onboarding";
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Signals from "./components/Signals";
import StoryView from "./components/StoryView";
import ProfileView from "./components/ProfileView";
import DailyCheckinModal from "./components/DailyCheckinModal";

// Seed helpers list fallback if something gets interrupted
import { generateClientDemoData } from "./lib/seed";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<DailyEntry[]>([]);
  const [insights, setInsights] = useState<InsightPattern[]>([]);
  const [stories, setStories] = useState<StoryChapter[]>([]);

  // Navigation and ui controls
  const [activeTab, setActiveTab] = useState<"overview" | "signals" | "story" | "profile">("overview");
  const [activeInsightId, setActiveInsightId] = useState<string | null>(null);
  const [showCheckin, setShowCheckin] = useState(false);
  const [showAuthForm, setShowAuthForm] = useState(false);
  
  // Loading queues
  const [authLoading, setAuthLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);

  // Auth observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setAuthLoading(true);
      if (currentUser) {
        setUser(currentUser);
        await loadUserData(currentUser.uid);
      } else {
        setUser((prev) => {
          if (prev?.isDemo) return prev;
          setProfile(null);
          setEntries([]);
          setInsights([]);
          setStories([]);
          return null;
        });
      }
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Fetch all User databases profile & collections from LocalStorage
  const loadUserData = async (uid: string) => {
    setDataLoading(true);
    try {
      const localProfile = localStorage.getItem(`chronis_profile_${uid}`);

      if (localProfile) {
        const profileData = JSON.parse(localProfile) as UserProfile;
        setProfile(profileData);

        if (profileData.onboarded) {
          // Fetch entries from LocalStorage
          const cachedEntries = localStorage.getItem(`chronis_entries_${uid}`);
          const loadedEntries: DailyEntry[] = cachedEntries ? JSON.parse(cachedEntries) : [];
          loadedEntries.sort((a, b) => a.date.localeCompare(b.date));
          setEntries(loadedEntries);

          // Fetch insights from LocalStorage
          const cachedInsights = localStorage.getItem(`chronis_insights_${uid}`);
          const loadedInsights: InsightPattern[] = cachedInsights ? JSON.parse(cachedInsights) : [];
          setInsights(loadedInsights);

          // Fetch story chapters from LocalStorage
          const cachedStories = localStorage.getItem(`chronis_stories_${uid}`);
          const loadedStories: StoryChapter[] = cachedStories ? JSON.parse(cachedStories) : [];
          setStories(loadedStories);
        }
      } else {
        // Fallback user placeholder setup in LocalStorage
        const fallbackProfile: UserProfile = {
          id: uid,
          name: auth.currentUser?.displayName || "Trial User",
          email: auth.currentUser?.email || "trial@domain.com",
          onboarded: false,
          trackingPref: [],
          onboardingPersonalization: "",
          collectionPreference: "",
          createdAt: new Date().toISOString()
        };
        localStorage.setItem(`chronis_profile_${uid}`, JSON.stringify(fallbackProfile));
        setProfile(fallbackProfile);
      }
    } catch (err) {
      console.error("Failed loading user telemetry packages", err);
    } finally {
      setDataLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      if (user?.isDemo) {
        setUser(null);
        setProfile(null);
        setEntries([]);
        setInsights([]);
        setStories([]);
      } else {
        await signOut(auth);
      }
      setShowAuthForm(false);
      setActiveTab("overview");
      setActiveInsightId(null);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAuthSuccess = async (uid: string, name: string, email: string, isBrandNew: boolean) => {
    setShowAuthForm(false);
    await loadUserData(uid);
  };

  // Launch a demo preview sandbox using offline client-side fallback
  const handleLaunchDemoSandbox = async () => {
    setAuthLoading(true);
    try {
      const uid = "demo_guest";
      const profileData: UserProfile = {
        id: uid,
        name: "Sarah Connor (Demo)",
        email: "demo@chronis-sandbox.io",
        onboarded: true,
        trackingPref: ["Focus", "Sleep", "Mood", "Energy"],
        onboardingPersonalization: "Professional",
        collectionPreference: "Both",
        createdAt: new Date().toISOString()
      };

      const demoData = generateClientDemoData(uid, "Sarah Connor (Demo)", {
        sleep: 7.5,
        productivity: 7,
        mood: 8,
        social: 6,
        exercise: true
      });

      setProfile(profileData);
      setEntries(demoData.entries);
      setInsights(demoData.insights);
      setStories(demoData.stories);

      setUser({
        uid,
        email: "demo@chronis-sandbox.io",
        displayName: "Sarah Connor (Demo)",
        isDemo: true
      });

      setActiveTab("overview");
    } catch (err) {
      console.error("Demo failed to launch", err);
    } finally {
      setAuthLoading(false);
    }
  };

  // Callback when checking in a daily entry
  const handleCheckinSuccess = (newEntry: DailyEntry) => {
    setEntries(prev => {
      const filtered = prev.filter(e => e.date !== newEntry.date);
      const updated = [...filtered, newEntry];
      return updated.sort((a, b) => a.date.localeCompare(b.date));
    });
  };

  const handleProfileUpdate = (updatedFields: { onboardingPersonalization: string; collectionPreference: string }) => {
    setProfile(prev => {
      if (!prev) return null;
      return {
        ...prev,
        onboardingPersonalization: updatedFields.onboardingPersonalization,
        collectionPreference: updatedFields.collectionPreference
      };
    });
  };

  const handleSelectInsightFromDashboard = (insightId: string) => {
    setActiveInsightId(insightId);
    setActiveTab("signals");
  };

  if (authLoading || dataLoading) {
    return (
      <div className="bg-[#FAF9F6] min-h-screen flex flex-col justify-center items-center font-sans">
        <Loader2 className="w-9 h-9 text-rose-500 animate-spin mb-3" />
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest font-mono">Synchronizing telemetry</p>
      </div>
    );
  }

  // Not signed in -> Show Landing Page / Auth Form
  if (!user) {
    if (showAuthForm) {
      return (
        <AuthPage
          onAuthSuccess={handleAuthSuccess}
          onBack={() => setShowAuthForm(false)}
        />
      );
    }
    return (
      <LandingPage
        onGetStarted={() => setShowAuthForm(true)}
        onViewDemo={handleLaunchDemoSandbox}
      />
    );
  }

  // Signed in but onboarding profile incomplete
  if (profile && !profile.onboarded) {
    return (
      <Onboarding
        userId={user.uid}
        userName={profile.name}
        onOnboardingComplete={() => loadUserData(user.uid)}
      />
    );
  }

  // Signed in & Onboarded -> Render main Chronis Dashboard Applet
  return (
    <div className="bg-[#FAF9F6] min-h-screen text-slate-800 font-sans flex flex-col transition-all">
      
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userName={profile?.name || "Chronis User"}
        onLogout={handleLogout}
        onCheckinOpen={() => setShowCheckin(true)}
      />

      <main className="flex-1 pb-16">
        {activeTab === "overview" && (
          <Dashboard
            userName={profile?.name || "Chronis User"}
            entries={entries}
            insights={insights}
            onSelectInsight={handleSelectInsightFromDashboard}
            onNavigateToSignals={() => setActiveTab("signals")}
          />
        )}

        {activeTab === "signals" && (
          <Signals
            insights={insights}
            activeInsightId={activeInsightId}
            setActiveInsightId={setActiveInsightId}
          />
        )}

        {activeTab === "story" && (
          <StoryView stories={stories} />
        )}

        {activeTab === "profile" && (
          <ProfileView
            userId={user.uid}
            isDemo={user?.isDemo}
            userName={profile?.name || "Subscribed User"}
            userEmail={profile?.email || "subscriber@domain.com"}
            trackingPref={profile?.trackingPref || []}
            personalizationRole={profile?.onboardingPersonalization || "Professional"}
            checkinPreference={profile?.collectionPreference || "Both"}
            onProfileUpdate={handleProfileUpdate}
          />
        )}
      </main>

      {/* Floating Check-in slider form modal */}
      {showCheckin && (
        <DailyCheckinModal
          userId={user.uid}
          isDemo={user?.isDemo}
          onClose={() => setShowCheckin(false)}
          onCheckinSuccess={handleCheckinSuccess}
        />
      )}

    </div>
  );
}
