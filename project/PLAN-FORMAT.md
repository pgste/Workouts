# Workout plan markdown — canonical format

One file = one week. Filename: `plans/<athlete>/<NN>-<slug>.md` (e.g. `plans/kai/00-decompression.md`).
The site build step parses these into JSON; anything not matching the shapes below is ignored, so
**keep to the headings, key lines and table columns exactly as written here.**

---

## 1. Week header

```md
# DECOMPRESSION PRE-WEEK
### Tue 28 Jul – Sun 2 Aug 2026
> Purpose: shed fatigue, hold tendon quality, reset the clock. Not a training week.
```

- `#` — week title (short, uppercase fine)
- `###` — date range, human readable
- `>` immediately after — one-line purpose. Renders as the week's subtitle.

## 2. Meta — the countdown strip

```md
## META
| Days to finals (3 Sep) | 37 → 32 |
| Week 0 starts | Mon 3 Aug |
| First heavy lift | Mon 10 Aug |
| 3x3 Scotland | Sun 16 Aug |
```

Two-column table, no header row needed. 2–4 rows (more will be clipped on phone).

## 3. Rules

```md
## RULES
**Do:** walk · breathe · mobilise · low-load isometrics · sleep
**Don't:** plyometrics · jumps · sled · change of direction · barbell of any weight · Nordics · 5v5 · shooting to fatigue · GHD
**Note:** Three light sessions, three rest days. The rest days are programmed. They are not missed sessions.
**Daily:** Back Insurance | 8 min | glute bridge → couch stretch (L first) → supine hamstring (L first) → 90/90 → dead bugs → child's pose
```

- `Do` / `Don't` — items separated by ` · `. Each becomes a chip.
- `Note` — optional, one line.
- `Daily` — `name | duration | step → step → step`. Becomes a tickable routine attached to **every** day.

## 4. Days

One `## DAY` block per day, in order. Key lines are `key: value`, one per line, before any table.

```md
## DAY | Wed 29 Jul | Restoration A
type: session
days-out: 36
duration: 35 min
rpe-cap: 5
summary: Morning — 10 min outdoors within 30 min of waking. Circadian anchor, every day this week.
```

| key | required | values |
|---|---|---|
| `type` | yes | `session` · `rest` · `travel` |
| `days-out` | yes | integer, shown as the countdown badge |
| `duration` | no | free text, e.g. `35 min` |
| `rpe-cap` | no | integer, shown as a red-line badge |
| `summary` | no | one paragraph above the content |

### 4a. `type: session` — exercise table

Exactly these four columns, in this order:

```md
| Exercise | Load | Sets × Reps | Rest |
|---|---|---|---|
| Spanish squat isometric | Bodyweight + band | 4 × 30s | 45s |
| A1 Ring row, tall chest | Bodyweight, feet forward | 3 × 10 | 30s |
| A2 DB incline press | 12–14kg | 3 × 12 | 60s |
```

- **Sets count** = the number before `×`. It generates that many loggable set rows.
- **Superset**: prefix the exercise name with `A1 ` / `A2 ` / `B1 `… — the prefix is stripped and shown as a paired badge.
- **Per-exercise cue** (optional), placed after the table, one per line:
  `cue: Spanish squat isometric :: Knees over toes, hold the shake.`
- **Per-exercise video** (optional): `video: Spanish squat isometric :: <url>`

### 4b. `type: rest` / `type: travel` — checklist table

Exactly these three columns:

```md
| Item | Detail | When |
|---|---|---|
| Easy walk outdoors | 20–30 min, daylight, no phone | 15:00–17:00 |
| Bed | UK time, no later | 22:30 |
```

Leave `When` as `—` if it doesn't matter. A rest day with no table is fine — just `summary:`.

### 4c. Optional extras on any day

```md
optional: Court work | 15 min HARD CAP | Spot shooting, form only, stationary. Stop the second mechanics wobble.
note: Isometrics maintain tendon stiffness at near-zero systemic cost.
note: No Nordics until Week 0.
```

- `optional:` — `title | limit | body`. Renders as an amber "if he's feeling good" card.
- `note:` — repeatable coach note, rendered as a blue-rule callout at the end of the day.

## 5. Readiness log

```md
## READINESS
fields: Resting HR | Sleep (h) | Sleep 1–10 | Soreness 1–10 | Motivation 1–10 | Bodyweight | Back | L hamstring
```

`|`-separated field names. Numeric-looking fields get a number keypad; the rest get text.
Filled in on the app's **Daily** tab, one row per date, AM before food.

## 6. Gate

```md
## GATE
| GREEN | RHR within 5 of baseline · sleep 8h+ · motivation 7+ · back clear | Week 0 runs as written, 65–70% |
| AMBER | Any two markers off · back tight but not painful | Week 0 Day 1 at 55–60%, 4 training days only |
| RED | RHR +10 · broken sleep · back symptomatic · flat | Extend decompression 3 days. Move the calendar, not the athlete |
```

Three rows, `LEVEL | criteria | action`. Level must be `GREEN`, `AMBER` or `RED` — it drives the colour.

---

## Rules for the generating agent

1. **No prose outside these blocks.** Anything between blocks is dropped.
2. Every day gets a `## DAY` block — including full rest days. Rest is programmed, so it appears on the calendar and can be ticked off.
3. Keep exercise names identical across weeks (they key the history/PR lookups). `Spanish squat isometric` ≠ `Spanish Squat Iso`.
4. Times as `45s` / `2min`, loads as `12–14kg` / `Bodyweight` / `Bodyweight + band` / `RPE 7`.
5. Use `·` as the separator inside chip lists, `|` as the field separator inside key lines.
6. One week per file; weeks ordered by filename prefix (`00-`, `01-`, `02-`…).
