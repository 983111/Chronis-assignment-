export interface UserProfile {
  id: string;
  name: string;
  email: string;
  onboarded: boolean;
  trackingPref: string[];
  onboardingPersonalization: string; // 'Student' | 'Professional' | 'Researcher' | 'Founder'
  collectionPreference: string; // 'Manual' | 'Automatic' | 'Both'
  createdAt: string;
}

export interface DailyEntry {
  id: string; // userId_date
  userId: string;
  date: string; // YYYY-MM-DD
  focus: number; // 1-10
  energy: number; // 1-10
  mood: number; // 1-10
  sleep: number; // hours
  exercise: boolean;
  social: number; // 1-10
  createdAt: string;
}

export interface InsightPattern {
  id: string;
  userId: string;
  title: string;
  description: string;
  confidence: number; // percentage
  status: "Improving" | "Declining" | "Stable";
  metric: "sleep" | "focus" | "activity" | "energy" | "social" | "routine";
  factors: string[];
  evidenceText: string;
  missingDataText: string;
  createdAt: string;
  weeklyDailies?: { day: string; value: number; isFocusTarget?: boolean }[];
  evidenceDetails?: { week: string; value: string; validation: string }[];
}

export interface StoryChapter {
  id: string;
  userId: string;
  month: string; // e.g. "March", "April"
  title: string;
  summary: string;
  status: string; // e.g. "Routine Improved"
  impactDetails: {
    focus: string; // e.g. "↑ 14%"
    energy: string; // e.g. "↑ 8%"
    social: string; // e.g. "↔ 0%"
  };
  createdAt: string;
  category?: string;
  badgeLabel?: string;
}
