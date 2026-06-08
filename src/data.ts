export interface SnapshotMetric {
  name: string;
  change: string;
  isPositive: boolean;
  value: string;
}

export interface InsightDetail {
  id: string;
  title: string;
  confidence: "High Confidence" | "Medium Confidence" | "Low Confidence";
  confidenceScore: number;
  observedPeriod: string;
  category: "sleep" | "activity" | "focus" | "social" | "routine";
  whatItMeans: string;
  supportingEvidence: string[];
  influencingFactors: { factor: string; iconType: string }[];
  aboutInfo: string;
  firstObserved: string;
  lastUpdated: string;
  weeklyDailies: { day: string; value: number; isFocusTarget?: boolean }[];
  evidenceDetails?: { week: string; value: string; validation: string }[];
  uncertaintyExplanation?: string;
  relatedInsightIds: string[];
}

export interface TimelineItem {
  id: string;
  title: string;
  category: "sleep" | "activity" | "focus" | "social" | "routine";
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  startOffset: number; // Percentage offset in timeline scale (0 to 100)
  widthPercent: number; // Percentage span in timeline scale
  label: string;
  colorType: "blue" | "green" | "yellow" | "purple" | "orange";
}

export interface DailyLog {
  date: string;
  sleepScore: number;
  activityScore: number;
  focusScore: number;
  socialScore: number;
  routineScore?: number;
}

// Full mock data matching the screenshot and adding deep interactivity
export const mockDailyLogs: DailyLog[] = [
  { date: "Apr 20", sleepScore: 78, activityScore: 65, focusScore: 42, socialScore: 12 },
  { date: "Apr 22", sleepScore: 82, activityScore: 60, focusScore: 44, socialScore: 18 },
  { date: "Apr 24", sleepScore: 80, activityScore: 62, focusScore: 41, socialScore: 25 },
  { date: "Apr 27", sleepScore: 74, activityScore: 52, focusScore: 38, socialScore: 28 },
  { date: "Apr 29", sleepScore: 85, activityScore: 68, focusScore: 48, socialScore: 30 },
  { date: "May 01", sleepScore: 92, activityScore: 72, focusScore: 54, socialScore: 32 },
  { date: "May 04", sleepScore: 88, activityScore: 74, focusScore: 50, socialScore: 24 },
  { date: "May 06", sleepScore: 81, activityScore: 66, focusScore: 45, socialScore: 18 },
  { date: "May 08", sleepScore: 79, activityScore: 59, focusScore: 42, socialScore: 22 },
  { date: "May 11", sleepScore: 86, activityScore: 53, focusScore: 40, socialScore: 34 },
  { date: "May 13", sleepScore: 84, activityScore: 64, focusScore: 46, socialScore: 31 },
  { date: "May 15", sleepScore: 80, activityScore: 70, focusScore: 51, socialScore: 29 },
  { date: "May 18", sleepScore: 83, activityScore: 78, focusScore: 48, socialScore: 20 },
  { date: "May 20", sleepScore: 82, activityScore: 72, focusScore: 47, socialScore: 23 },
];

export const mockInsights: InsightDetail[] = [
  {
    id: "focus-sunday-drop",
    title: "Focus time drops on Sundays",
    confidence: "Medium Confidence",
    confidenceScore: 75,
    observedPeriod: "Observed for the past 6 weeks",
    category: "focus",
    whatItMeans: "Your focus time tends to drop by an average of 27% on Sundays compared to other days.",
    supportingEvidence: [
      "Consistent pattern in 6 of the last 6 weeks",
      "Average drop of 1.8 hours",
      "Compared to your weekly average"
    ],
    influencingFactors: [
      { factor: "Lower routine consistency", iconType: "routine" },
      { factor: "More social interactions", iconType: "social" }
    ],
    aboutInfo: "This insight is based on your behavioral data and may evolve as more data becomes available.",
    firstObserved: "Mar 30, 2025",
    lastUpdated: "May 18, 2025",
    weeklyDailies: [
      { day: "Mon", value: 75 },
      { day: "Tue", value: 78 },
      { day: "Wed", value: 72 },
      { day: "Thu", value: 80 },
      { day: "Fri", value: 76 },
      { day: "Sat", value: 65 },
      { day: "Sun", value: 48, isFocusTarget: true }
    ],
    evidenceDetails: [
      { week: "Week of Apr 13", value: "Focus score Sunday 45 vs Weekly average 72", validation: "Confirmed" },
      { week: "Week of Apr 20", value: "Focus score Sunday 48 vs Weekly average 74", validation: "Confirmed" },
      { week: "Week of Apr 27", value: "Focus score Sunday 42 vs Weekly average 71", validation: "Confirmed" },
      { week: "Week of May 04", value: "Focus score Sunday 50 vs Weekly average 75", validation: "Confirmed" },
      { week: "Week of May 11", value: "Focus score Sunday 40 vs Weekly average 70", validation: "Confirmed" },
      { week: "Week of May 18", value: "Focus score Sunday 48 vs Weekly average 72", validation: "Confirmed" }
    ],
    uncertaintyExplanation: "Sunday records show an elevation in missing screen-time logs between 18:00 and 22:00. This data sparsity diminishes telemetry density and accounts for our Medium rating.",
    relatedInsightIds: ["sleep-saturday-shift", "social-weekend-peak"]
  },
  {
    id: "sleep-saturday-shift",
    title: "Sleep consistency shifts on Saturdays",
    confidence: "High Confidence",
    confidenceScore: 92,
    observedPeriod: "Observed for the past 8 weeks",
    category: "sleep",
    whatItMeans: "Your sleep onset window shifts 1.5 hours later on Saturday nights, creating a mild social jetlag pattern.",
    supportingEvidence: [
      "Observed in 8 out of 8 Saturdays",
      "Sunday morning wake offset of +72 minutes",
      "Heart rate recovery delayed during early sleep stages"
    ],
    influencingFactors: [
      { factor: "Evening social activities", iconType: "social" },
      { factor: "Absence of alarm triggers on Sundays", iconType: "routine" }
    ],
    aboutInfo: "High data density from continuous wearable synchronization ensures stable classification.",
    firstObserved: "Mar 15, 2025",
    lastUpdated: "May 19, 2025",
    weeklyDailies: [
      { day: "Mon", value: 85 },
      { day: "Tue", value: 83 },
      { day: "Wed", value: 84 },
      { day: "Thu", value: 81 },
      { day: "Fri", value: 78 },
      { day: "Sat", value: 58, isFocusTarget: true },
      { day: "Sun", value: 88 }
    ],
    evidenceDetails: [
      { week: "Week of Apr 20", value: "Bedtime shifted from 22:45 to 00:20", validation: "Confirmed" },
      { week: "Week of Apr 27", value: "Bedtime shifted from 22:30 to 00:15", validation: "Confirmed" },
      { week: "Week of May 04", value: "Bedtime shifted from 22:40 to 00:05", validation: "Confirmed" },
      { week: "Week of May 11", value: "Bedtime shifted from 23:00 to 00:40", validation: "Confirmed" }
    ],
    uncertaintyExplanation: "Our algorithm ranks this with High Confidence due to consistent high-density wearable heart-rate and wrist-movement validation. No telemetry gaps detected.",
    relatedInsightIds: ["focus-sunday-drop", "social-weekend-peak"]
  },
  {
    id: "social-weekend-peak",
    title: "Social activity peaks on weekends",
    confidence: "High Confidence",
    confidenceScore: 88,
    observedPeriod: "Observed for the past 5 weeks",
    category: "social",
    whatItMeans: "Weekend messaging and outbound calls increase by 42%, acting as a major fatigue release mechanism.",
    supportingEvidence: [
      "Total active communication time exceeds 140 minutes on Saturday and Sunday",
      "Direct synergy with elevated step counts on Saturdays",
      "Correlates with reduced focus scores on corresponding evenings"
    ],
    influencingFactors: [
      { factor: "Weekend calendar freedom", iconType: "routine" },
      { factor: "Proximity to key contacts", iconType: "activity" }
    ],
    aboutInfo: "Synthesized from peripheral device interaction statistics and geolocation telemetry.",
    firstObserved: "Apr 05, 2025",
    lastUpdated: "May 20, 2025",
    weeklyDailies: [
      { day: "Mon", value: 20 },
      { day: "Tue", value: 25 },
      { day: "Wed", value: 22 },
      { day: "Thu", value: 30 },
      { day: "Fri", value: 45 },
      { day: "Sat", value: 88, isFocusTarget: true },
      { day: "Sun", value: 82, isFocusTarget: true }
    ],
    evidenceDetails: [
      { week: "Week of May 04", value: "Saturday social contact duration 120min vs weekday median 25min", validation: "Confirmed" },
      { week: "Week of May 11", value: "Saturday social contact duration 145min vs weekday median 30min", validation: "Confirmed" }
    ],
    uncertaintyExplanation: "High metadata reliability from verified communication channels. Minor missing coordinates occur inside indoor shielding zones, introducing negligible variance.",
    relatedInsightIds: ["focus-sunday-drop", "sleep-saturday-shift"]
  },
  {
    id: "activity-climb",
    title: "Activity spikes on Thursday afternoons",
    confidence: "Low Confidence",
    confidenceScore: 40,
    observedPeriod: "Observed for the past 3 weeks",
    category: "activity",
    whatItMeans: "A temporary surge in step cadence occurs Thursdays between 16:00 and 18:00, averaging +6,200 steps.",
    supportingEvidence: [
      "Occurred intermittently in 3 out of the past 6 weeks",
      "Short burst duration showing athletic exertion patterns",
      "Accompanied by a 15% dip in sedentary desk logs"
    ],
    influencingFactors: [
      { factor: "Weekly grocery runs or routine strolls", iconType: "routine" }
    ],
    aboutInfo: "Classified with limited statistical depth due to seasonal weather interruptions.",
    firstObserved: "May 01, 2025",
    lastUpdated: "May 15, 2025",
    weeklyDailies: [
      { day: "Mon", value: 45 },
      { day: "Tue", value: 50 },
      { day: "Wed", value: 48 },
      { day: "Thu", value: 92, isFocusTarget: true },
      { day: "Fri", value: 55 },
      { day: "Sat", value: 70 },
      { day: "Sun", value: 58 }
    ],
    evidenceDetails: [
      { week: "Week of May 08", value: "Thursday walk reached 11,200 steps", validation: "Confirmed" },
      { week: "Week of May 15", value: "Thursday walk reached 9,400 steps", validation: "Confirmed" }
    ],
    uncertaintyExplanation: "This pattern is rated Low Confidence because we only have 3 occurrences in our records. Frequent GPS dropouts inside fitness studios limit our validation robustness.",
    relatedInsightIds: ["focus-sunday-drop"]
  }
];

export const mockTimelineItems: TimelineItem[] = [
  {
    id: "sleep-improved",
    title: "Sleep improved",
    category: "sleep",
    startDate: "Mar 25",
    endDate: "Apr 10",
    startOffset: 8,
    widthPercent: 18,
    label: "Mar 25 – Apr 10",
    colorType: "blue"
  },
  {
    id: "sleep-inconsistent",
    title: "Sleep inconsistent",
    category: "sleep",
    startDate: "May 05",
    endDate: "May 15",
    startOffset: 55,
    widthPercent: 12,
    label: "May 5 – May 15",
    colorType: "blue"
  },
  {
    id: "activity-high",
    title: "More active",
    category: "activity",
    startDate: "Apr 01",
    endDate: "Apr 20",
    startOffset: 16,
    widthPercent: 24,
    label: "Apr 1 – Apr 20",
    colorType: "green"
  },
  {
    id: "activity-dropped",
    title: "Activity dropped",
    category: "activity",
    startDate: "May 16",
    endDate: "May 25",
    startOffset: 68,
    widthPercent: 10,
    label: "May 16 – May 25",
    colorType: "green"
  },
  {
    id: "focus-high",
    title: "Focus high",
    category: "focus",
    startDate: "Mar 28",
    endDate: "Apr 15",
    startOffset: 12,
    widthPercent: 20,
    label: "Mar 28 – Apr 15",
    colorType: "yellow"
  },
  {
    id: "focus-sunday-drop-timeline",
    title: "Focus drop on Sundays",
    category: "focus",
    startDate: "Apr 20",
    endDate: "Jun 10",
    startOffset: 45,
    widthPercent: 45,
    label: "Apr 20 – Jun 10",
    colorType: "yellow"
  },
  {
    id: "social-peak",
    title: "More social",
    category: "social",
    startDate: "Apr 05",
    endDate: "Apr 18",
    startOffset: 20,
    widthPercent: 16,
    label: "Apr 5 – Apr 18",
    colorType: "purple"
  },
  {
    id: "social-balance-steady",
    title: "Social balance steady",
    category: "social",
    startDate: "May 01",
    endDate: "Jun 01",
    startOffset: 52,
    widthPercent: 35,
    label: "May 1 – Jun 1",
    colorType: "purple"
  },
  {
    id: "routine-strong",
    title: "Routine strong",
    category: "routine",
    startDate: "Mar 20",
    endDate: "Apr 05",
    startOffset: 2,
    widthPercent: 18,
    label: "Mar 20 – Apr 5",
    colorType: "orange"
  },
  {
    id: "routine-breaks",
    title: "Routine breaks",
    category: "routine",
    startDate: "May 10",
    endDate: "May 22",
    startOffset: 60,
    widthPercent: 15,
    label: "May 10 – May 22",
    colorType: "orange"
  }
];

export const mockCalendarData = [
  { day: 1, type: "routine", title: "Routine strong", importance: "high" },
  { day: 2, type: "routine", title: "Routine strong", importance: "high" },
  { day: 3, type: "routine", title: "Routine strong", importance: "high" },
  { day: 4, type: "sleep", title: "Sleep improved", importance: "medium" },
  { day: 5, type: "sleep", title: "Sleep improved", importance: "medium" },
  { day: 6, type: "social", title: "More social", importance: "low" },
  { day: 7, type: "social", title: "More social", importance: "low" },
  { day: 8, type: "activity", title: "More active", importance: "high" },
  { day: 9, type: "activity", title: "More active", importance: "high" },
  { day: 10, type: "activity", title: "More active", importance: "high" },
  { day: 11, type: "focus", title: "Focus high", importance: "medium" },
  { day: 12, type: "focus", title: "Focus high", importance: "medium" },
  { day: 13, type: "focus", title: "Focus high", importance: "medium" },
  { day: 14, type: "sleep", title: "Sleep inconsistent", importance: "high" },
  { day: 15, type: "sleep", title: "Sleep inconsistent", importance: "high" },
  { day: 16, type: "routine", title: "Routine breaks", importance: "high" },
  { day: 17, type: "routine", title: "Routine breaks", importance: "high" },
  { day: 18, type: "routine", title: "Routine breaks", importance: "high" },
  { day: 19, type: "activity", title: "Activity dropped", importance: "medium" },
  { day: 20, type: "focus", title: "Focus drop on Sundays", importance: "high" },
  { day: 21, type: "social", title: "Social balance steady", importance: "medium" },
  { day: 22, type: "social", title: "Social balance steady", importance: "medium" },
  { day: 23, type: "social", title: "Social balance steady", importance: "medium" },
  { day: 24, type: "sleep", title: "Sleep improved", importance: "low" },
  { day: 25, type: "activity", title: "More active", importance: "medium" },
  { day: 26, type: "activity", title: "More active", importance: "medium" },
  { day: 27, type: "focus", title: "Focus drop on Sundays", importance: "high" },
  { day: 28, type: "routine", title: "Routine strong", importance: "medium" },
  { day: 29, type: "sleep", title: "Sleep improved", importance: "medium" },
  { day: 30, type: "social", title: "More social", importance: "high" },
  { day: 31, type: "focus", title: "Focus high", importance: "medium" },
];
