# Chronis — Product Judgment

---

## Three UX decisions

**1. Timeline cards link directly into the Insight Explorer.**

When a user clicks a behavioral block on the timeline — say, "Focus drop on Sundays" spanning April through June — the app scrolls them directly into the Explorer and loads that specific insight. No extra tap, no re-navigation.

This matters because the timeline is the "where" and the Explorer is the "why." Keeping them disconnected would make users mentally stitch together what the app should be doing for them. The linking makes the relationship explicit: you see the pattern over time, you click it, you get the explanation. It respects the fact that users are usually in discovery mode when they're looking at a timeline — they want answers quickly, not a breadcrumb trail.

**2. Confidence ratings are shown on every insight, not hidden.**

Every pattern card and detail view shows a confidence percentage — 82%, 40%, and so on. The temptation with these products is to only show insights when you're sure about them, or to flatten everything into "detected / not detected." We rejected that.

Showing a 40% confidence insight alongside a 92% one teaches users something about the data. It builds calibration. Someone seeing a Low Confidence rating on their Thursday activity spike will understand why it doesn't feel as solid as their sleep shift pattern, and they'll start noticing whether the pattern holds or falls apart over the next few weeks. That kind of epistemic honesty is rare in wellness apps, and it's a real differentiator.

**3. The onboarding baseline assessment exists to prevent an empty dashboard.**

The last step of onboarding has the user rate yesterday's sleep, focus, energy, mood, and social engagement before they ever see the main app. This feels slightly unusual — you're asking someone to do a check-in before they've even understood what check-ins are.

But the alternative is worse: a first-time user lands on a dashboard with no data, no patterns, and nothing to explore. That's the fastest way to lose someone. The baseline assessment seeds the data layer immediately so the first experience feels real and personal. It also doubles as a mental onramp — by the time they see the dashboard, they've already internalized the vocabulary of the product.

---

## The tradeoff

**Hand-coded SVG charts vs. a charting library.**

Every chart in Chronis is drawn manually using SVG path coordinates — the wave landscape, the trend lines, the sparklines, all of it. The visual output matches the product aesthetic precisely, loads instantly, and has no external dependencies.

The downside is that this approach doesn't scale gracefully. If Chronis needed to render 180 days of data at daily granularity with tooltip interactivity and zoom, the current implementation would need a full rearchitecture. A library like Recharts or D3 would handle that without much effort.

For a prototype, the tradeoff was correct. For a production app hitting its first thousand daily active users, revisiting this would be one of the first engineering conversations.

---

## What to build first if Chronis launched tomorrow

**Attribution annotations.**

Right now the app can tell you that your focus drops on Sundays. What it can't tell you is *why* it started happening in May specifically, or whether the two weeks you traveled for work made it better or worse.

The missing piece is a way for users to log life events — "started a new job," "moved apartments," "cut out caffeine" — as text annotations that sit alongside the behavioral data on the timeline. Once those anchors exist, the insight engine can cross-reference them against pattern shifts and surface correlations that the user wouldn't find themselves.

This would immediately make Chronis more actionable. The gap between "you have a pattern" and "here's what changed it" is exactly where the product needs to go next, and annotations are the lowest-friction way to close that gap. A simple text input that drops a marker on the timeline, tied to an LLM that can scan for co-occurrence with behavioral inflection points, would get you most of the way there.

It's also the feature users would ask for within the first week. Once you understand your patterns, the next question is always: "Okay, but what do I do about it?" Annotations are the beginning of an answer.
