# Chronis — Design Rationale

---

## Why this exists

Most self-tracking tools are built around data collection. Chronis is built around understanding. The gap between those two things is enormous, and it's where most apps fail people.

The premise is simple: people already know they sleep badly or feel scattered on Sundays. What they don't have is a system that connects those feelings to patterns over time, names them clearly, and shows the evidence. Chronis tries to do that without overwhelming the user with raw numbers.

---

## Core decisions

**One check-in, every day, under 30 seconds.** The modal is intentionally minimal — six sliders and one toggle. The more friction in a daily habit, the faster people abandon it. The data only becomes useful if it's consistent over weeks, so the barrier to entry had to be near-zero.

**Narrative chapters instead of dashboards.** The Story tab exists because a table of focus scores across 90 days tells you almost nothing emotionally. Framing that same window as "May: Focus Declined" gives the data a shape people can hold onto. It also creates a natural retrospective — users aren't hunting for meaning, it's handed to them in plain language.

**Signals, not alerts.** The Insights Explorer doesn't push notifications or assign urgency scores. It surfaces patterns with a confidence rating and lets the user decide what to do with it. The goal was to feel like a trusted observation, not an alarm system. Behavioral data is personal and context-dependent — the app shouldn't pretend to know more than it does.

---

## What this isn't trying to be

Chronis isn't a productivity coach, a therapy replacement, or a fitness tracker. It's closer to a mirror — it reflects behavior back to you over time with enough clarity that you can start drawing your own conclusions. The value compounds slowly. That's intentional.

---

## Technical choices

The prototype uses local storage as the data layer to keep the demo self-contained and to avoid the trust problem of a new product asking for cloud access on day one. Firebase handles auth, but behavioral data stays on the device until the user explicitly opts into sync. That's not just a technical convenience — it's a product statement about who owns the data.

SVG charts are hand-drawn rather than pulled from a charting library. This was partly a performance call and partly aesthetic — the wave shapes and sparklines needed to feel organic, not like a BI dashboard.

---

*This document reflects decisions made during the initial prototype phase. Some of these will change as the product meets real users.*
