import { DailyEntry, InsightPattern, StoryChapter } from "../types";

export function generateClientDemoData(
  userId: string,
  userName: string,
  initialData: {
    sleep: number;
    productivity: number;
    mood: number;
    social: number;
    exercise: boolean;
  }
): { entries: DailyEntry[]; insights: InsightPattern[]; stories: StoryChapter[] } {
  const entries: DailyEntry[] = [];
  const today = new Date();
  
  for (let i = 14; i >= 1; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const dateStr = d.toISOString().split("T")[0]; // YYYY-MM-DD
    
    // Add realistic noise to initial data
    const weekdayIdx = d.getDay(); // 0 is Sunday, 6 is Saturday
    const isSunday = weekdayIdx === 0;
    const isSaturday = weekdayIdx === 6;

    // Simulate Sunday focus drop requested by user
    const focusNoise = (Math.random() * 2 - 1);
    const sundayFocusDrop = isSunday ? -2.5 : 0;
    const focusVal = Math.max(1, Math.min(10, Math.round(initialData.productivity + focusNoise + sundayFocusDrop)));

    // Saturday sleep onset change / Sunday sleep offset change
    const sleepNoise = (Math.random() * 1.5 - 0.75);
    const saturdaySleepShift = isSaturday ? -1.5 : 0.5;
    const sleepVal = Math.max(3, Math.min(15, Math.round((initialData.sleep + sleepNoise + saturdaySleepShift) * 10) / 10));

    const energyVal = Math.max(1, Math.min(10, Math.round((focusVal + 1) / 2 + (initialData.mood / 2) + (Math.random() * 2 - 1))));
    const moodVal = Math.max(1, Math.min(10, Math.round(initialData.mood + (Math.random() * 2 - 1))));
    const socialVal = Math.max(1, Math.min(10, Math.round(initialData.social + (isSaturday || isSunday ? 2 : -1) + (Math.random() * 2 - 1))));
    const exerciseVal = isSaturday || isSunday || Math.random() > 0.5 ? initialData.exercise : false;

    const entryId = `${userId}_${dateStr}`;

    const entryData: DailyEntry = {
      id: entryId,
      userId,
      date: dateStr,
      focus: focusVal,
      energy: energyVal,
      mood: moodVal,
      sleep: sleepVal,
      exercise: exerciseVal,
      social: socialVal,
      createdAt: new Date().toISOString()
    };

    entries.push(entryData);
  }

  // Seed 3 customized Insight documents requested by user
  const insights: InsightPattern[] = [
    {
      id: "focus-sunday-decay",
      userId,
      title: "Weekend Focus Decay",
      description: `Your focus scores tend to drop by an average of 27% on Sundays compared to your weekday performance. This correlation often aligns with social excursions.`,
      confidence: 82,
      status: "Declining",
      metric: "focus",
      factors: ["Lower routine consistency", "Elevated screen time", "Reduced sleep duration (social jetlag)"],
      evidenceText: `Your focus was lower on 5 of the last 6 Sundays.`,
      missingDataText: "No sleep records detected for 2 Sundays of this reporting slot.",
      createdAt: new Date().toISOString(),
      weeklyDailies: [
        { day: "Mon", value: 78 },
        { day: "Tue", value: 80 },
        { day: "Wed", value: 75 },
        { day: "Thu", value: 81 },
        { day: "Fri", value: 79 },
        { day: "Sat", value: 68 },
        { day: "Sun", value: 48, isFocusTarget: true }
      ],
      evidenceDetails: [
        { week: "Week of May 3 - May 9", value: "Sunday focus 4.2 vs weekday average 7.5", validation: "-24%" },
        { week: "Week of May 10 - May 16", value: "Sunday focus 4.5 vs weekday average 7.8", validation: "-26%" },
        { week: "Week of May 17 - May 23", value: "Sunday focus 3.8 vs weekday average 7.4", validation: "-29%" },
        { week: "Week of May 24 - May 30", value: "Sunday focus 4.0 vs weekday average 7.6", validation: "-27%" },
        { week: "Week of May 31 - Jun 6", value: "Sunday focus 4.1 vs weekday average 7.7", validation: "-28%" }
      ]
    },
    {
      id: "sleep-quality-shift",
      userId,
      title: "Sleep Quality Offset",
      description: `Your sleep onset window shifts 1.5 hours later on Friday/Saturday nights, producing mild circadian drift which impacts Monday focus.`,
      confidence: 82,
      status: "Improving",
      metric: "sleep",
      factors: ["Late night screen interactions", "Absence of alarm routine on weekends"],
      evidenceText: `Sleep onset was consistently pushed 85 minutes later on Friday and Saturday.`,
      missingDataText: "Frictionless wearable tracking recorded full telemetry with no blank frames.",
      createdAt: new Date().toISOString(),
      weeklyDailies: [
        { day: "Mon", value: 85 },
        { day: "Tue", value: 82 },
        { day: "Wed", value: 84 },
        { day: "Thu", value: 80 },
        { day: "Fri", value: 62, isFocusTarget: true },
        { day: "Sat", value: 58, isFocusTarget: true },
        { day: "Sun", value: 88 }
      ],
      evidenceDetails: [
        { week: "Week of May 10 - May 16", value: "Bedtime shifted from 22:45 to 00:20", validation: "Confirmed" },
        { week: "Week of May 17 - May 23", value: "Bedtime shifted from 22:40 to 00:05", validation: "Confirmed" }
      ]
    },
    {
      id: "social-engagement-stable",
      userId,
      title: "Social Engagement Sync",
      description: `Your social activity peaks predictably on Friday and Saturday evenings, providing healthy mood offsets.`,
      confidence: 88,
      status: "Stable",
      metric: "social",
      factors: ["Weekend calendar freedom", "Social activities"],
      evidenceText: `Social metrics increase by an average of 42% on weekends.`,
      missingDataText: "Device telemetry fully synced with zero connectivity drops.",
      createdAt: new Date().toISOString(),
      weeklyDailies: [
        { day: "Mon", value: 30 },
        { day: "Tue", value: 32 },
        { day: "Wed", value: 28 },
        { day: "Thu", value: 35 },
        { day: "Fri", value: 75, isFocusTarget: true },
        { day: "Sat", value: 85, isFocusTarget: true },
        { day: "Sun", value: 60 }
      ],
      evidenceDetails: [
        { week: "Week of May 17 - May 23", value: "Weekend activity duration surpassed weekday mediant", validation: "+48%" }
      ]
    }
  ];

  const stories: StoryChapter[] = [
    {
      id: "ch-march",
      userId,
      month: "March",
      title: "Routine Improved",
      summary: `March marked a highly disciplined period for ${userName}. Guided by structured tracking preferences, you successfully aligned sleep and exercise habits. Exercise frequency spiked for 18 consecutive days, establishing a powerful baseline that positively offset daily focus scores. Morning habits stabilized, allowing cognitive readiness peaks between 09:00 and 11:30 daily.`,
      status: "Routine Improved",
      impactDetails: { focus: "↑ 12%", energy: "↑ 10%", social: "↔ 0%" },
      createdAt: new Date().toISOString(),
      badgeLabel: "High point"
    },
    {
      id: "ch-april",
      userId,
      month: "April",
      title: "Exercise Increased",
      summary: `In April, physical activity became your dominant driver. Daily athletic sessions boosted aerobic baseline indices. However, an increase in evening workouts shifted bedtime targets 45 minutes later, creating minor turbulence in sleep architecture. Overall mood markers remained highly resilient.`,
      status: "Exercise Increased",
      impactDetails: { focus: "↓ 4%", energy: "↑ 15%", social: "↑ 6%" },
      createdAt: new Date().toISOString(),
      badgeLabel: "Turning point"
    },
    {
      id: "ch-may",
      userId,
      month: "May",
      title: "Focus Declined",
      summary: `May introduced behavioral challenges. Academic or workspace demands fragmented your calendar, triggering routine breaks. Sleep irregularity reached its monthly zenith on Sunday nights, triggering Monday fatigue loops. Focus scores took a 27% hit on weekends as routine consistency softened under cumulative fatigue.`,
      status: "Focus Declined",
      impactDetails: { focus: "↓ 18%", energy: "↓ 12%", social: "↑ 14%" },
      createdAt: new Date().toISOString(),
      badgeLabel: "Low point"
    },
    {
      id: "ch-june",
      userId,
      month: "June",
      title: "Recovery Started",
      summary: `June shows promising signs of physiological recalibration. By shifting high-stress tasks away from Sundays, weekend fatigue curves have begun to flatten. A focused effort to return sleep onset to a standard window has restored heart rate recovery metrics. Overall energy is rebounding sustainably.`,
      status: "Recovery Started",
      impactDetails: { focus: "↑ 14%", energy: "↑ 8%", social: "↔ 0%" },
      createdAt: new Date().toISOString(),
      badgeLabel: "Turning point"
    }
  ];

  return { entries, insights, stories };
}
