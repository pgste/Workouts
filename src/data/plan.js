// Plan data. Hand-authored for now.
//
// Hierarchy: PLANS[athleteId] → blocks[] → weeks[] → days[] → workouts[] → exercises.
// A week with no `days` renders as "not written yet". A day is either a `session`
// (holds one or more `workouts`, each with an exercise table) or a `rest`/`travel`
// day (holds a `items` checklist). Plan-level daily / readiness / gate / countdown
// live on the plan. ATHLETES / AMBER / COURT_TYPES / RPE_WORDS stay global.

export const AMBER = '#f5a524';

export const ATHLETES = [
  { id: 'lewis', name: 'Lewis', sub: 'Preseason · 3x3 Finals 3–6 Sep' },
  { id: 'paul', name: 'Paul', sub: 'Hamstring rehab · return to Hyrox' },
  { id: 'coach', name: 'Coach view', sub: 'Read any plan, no logging' },
];

export const REAL_ATHLETES = ATHLETES.filter((a) => a.id !== 'coach');

export const COURT_TYPES = ['Practice', 'Game', 'Shootaround', 'Skills'];
export const RPE_WORDS = ['', 'Very easy', 'Easy', 'Light', 'Steady', 'Moderate', 'Solid', 'Hard', 'Very hard', 'Brutal', 'Everything'];

const GREEN_C = { fg: '#34d399', bg: 'rgba(52,211,153,.08)', bd: 'rgba(52,211,153,.28)' };
const AMBER_C = { fg: AMBER, bg: 'rgba(245,165,36,.08)', bd: 'rgba(245,165,36,.28)' };
const RED_C = { fg: '#ff5470', bg: 'rgba(255,84,112,.07)', bd: 'rgba(255,84,112,.26)' };
const gate = (c, level, criteria, action) => ({ level, ...c, criteria, action });

// ─────────────────────────────────────────────────────────────────────────────
// LEWIS — Preseason (Tue 28 Jul → Sun 6 Sep 2026), 3x3 Finals 3–6 Sep.
// ─────────────────────────────────────────────────────────────────────────────

const LEWIS_DAILY = {
  name: 'Back Insurance',
  mins: '8 min · every evening',
  steps: ['Glute bridge', 'Couch stretch (L first)', 'Supine hamstring (L first)', '90/90', 'Dead bugs', "Child's pose"],
};

const LEWIS_PREWEEK = {
  id: 'preweek',
  title: 'Decompression Pre-week',
  subtitle: 'Tue 28 Jul – Sun 2 Aug · not a training week',
  purpose: 'Shed fatigue, hold tendon quality, reset the clock. Not a training week.',
  meta: [
    { label: 'Days to finals (3 Sep)', value: '37 → 32' },
    { label: 'Week 0 starts', value: 'Mon 3 Aug' },
    { label: 'First heavy lift', value: 'Mon 10 Aug' },
    { label: '3x3 Scotland', value: 'Sun 16 Aug' },
  ],
  rules: {
    do: ['Walk', 'Breathe', 'Mobilise', 'Low-load isometrics', 'Sleep'],
    dont: ['Plyometrics', 'Jumps', 'Sled', 'Change of direction', 'Barbell of any weight', 'Nordics', '5v5', 'Shooting to fatigue', 'GHD (ever)'],
    note: 'Three light sessions, three rest days. The rest days are programmed — they are not missed sessions.',
  },
  days: [
    {
      id: 'd1', label: 'Tue 28 Jul', title: 'Arrival', type: 'travel', out: 37,
      summary: 'No training. Lands 13:00. Jet lag is the only job today.',
      items: [
        ['Ankle pumps / calf circulation', '30 each foot, seated', 'On arrival'],
        ['Easy walk outdoors', '20–30 min, daylight, no phone', '15:00–17:00'],
        ['Nap', '20 min MAX, only before 15:00', '—'],
        ['Back Insurance', '8 min', '~20:30'],
        ['Bed', 'UK time, no later', '22:30'],
      ],
      notes: ['5-hour eastward shift = phase advance. Morning daylight pulls the clock forward; long naps and evening light push it back.'],
    },
    {
      id: 'd2', label: 'Wed 29 Jul', title: 'Restoration A', type: 'session', out: 36, dur: '~35 min', rpe: 5,
      summary: 'Morning: 10 min outdoors within 30 min of waking. Circadian anchor — every day this week.',
      workouts: [{
        id: 'd2_w', title: 'Session',
        ex: [
          ['Easy bike or brisk walk', 'Conversational, nose breathing', '1 × 20min', '—'],
          ['Spanish squat isometric', 'Bodyweight + band', '4 × 30s', '45s'],
          ['Tibialis raise', 'Bodyweight (monkey foot or wall)', '2 × 20', '45s'],
          ['Calf raise, 3s down', 'Bodyweight only', '2 × 12', '60s'],
          ['90/90 hip switches', 'Bodyweight', '2 × 8 each', '30s'],
          ['Dead bug, slow exhale', 'Bodyweight', '2 × 6 each', '45s'],
        ],
        cues: { 'Spanish squat isometric': 'Knees stacked over toes, shins vertical-ish. Hold the shake — this is the tendon dose.' },
      }],
      notes: ['Isometrics maintain tendon stiffness at near-zero systemic cost — the one quality we refuse to give back this week.'],
    },
    {
      id: 'd3', label: 'Thu 30 Jul', title: 'Full Rest', type: 'rest', out: 35,
      summary: 'Nothing. Walk if he wants to, morning light, Back Insurance in the evening.',
      items: [
        ['Morning light', '10 min outdoors within 30 min of waking', 'AM'],
        ['Optional easy walk', 'Only if he wants it', '—'],
        ['Back Insurance', '8 min', 'PM'],
      ],
      notes: ['No gym. No court. No "just a bit of shooting."'],
    },
    {
      id: 'd4', label: 'Fri 31 Jul', title: 'Restoration B', type: 'session', out: 34, dur: '~35 min', rpe: 6,
      summary: 'Blood flow, no CNS cost. He should be fresh the next morning — if he is sore, it was too much.',
      workouts: [{
        id: 'd4_w', title: 'Session',
        ex: [
          ['Spanish squat isometric', 'Bodyweight + band', '4 × 30s', '45s'],
          ['A1 Ring row, tall chest', 'Bodyweight, feet forward (easy angle)', '3 × 10', '30s'],
          ['A2 DB incline press', '12–14kg', '3 × 12', '60s'],
          ['B1 Cable face pull', 'Light', '3 × 15', '30s'],
          ['B2 DB curl', '8–10kg', '3 × 12', '45s'],
          ['Dead bug', 'Bodyweight', '2 × 8 each', '30s'],
          ['Side plank', 'Bodyweight', '2 × 25s each', '45s'],
        ],
      }],
      notes: ['Antagonistic pairing keeps it efficient and keeps the load light. Nothing here should feel like a set worth counting.'],
    },
    {
      id: 'd5', label: 'Sat 1 Aug', title: 'Restoration C', type: 'session', out: 33, dur: '~35 min',
      summary: 'Re-groove patterns at bodyweight. Left leg leads every unilateral movement.',
      workouts: [{
        id: 'd5_w', title: 'Session',
        ex: [
          ['Spanish squat isometric', 'Bodyweight + band', '3 × 30s', '45s'],
          ['ATG split squat', 'Bodyweight only', '2 × 8 each (L first)', '60s'],
          ['Standing knee drive above 90°', 'Band or cable, 5–7kg', '3 × 8 each', '45s'],
          ['Seated hip flexor lift (knee bent)', 'Bodyweight', '2 × 8 each', '45s'],
          ['Glute bridge march', 'Bodyweight', '2 × 10 each', '45s'],
          ['Single-leg RDL, slow', '8kg DB', '2 × 6 each (L first)', '60s'],
        ],
      }],
      optional: { title: 'Court work', limit: '15 min hard cap', body: 'Spot shooting, form only, stationary. Stop the second mechanics wobble — fatigued reps at this stage cost more than they give.' },
      notes: ['Hip flexor work belongs here, not in a heavy week — low load, fresh, full control.', 'No Nordics until Week 0. Hamstrings get length and control this week, not eccentric damage.'],
    },
    {
      id: 'd6', label: 'Sun 2 Aug', title: 'Full Rest + Readiness Gate', type: 'rest', out: 32,
      summary: 'Back Insurance. Log the readiness numbers. Nothing else.',
      items: [
        ['Morning light', '10 min outdoors', 'AM'],
        ['Readiness log', 'All fields, before food', 'AM'],
        ['Back Insurance', '8 min', 'PM'],
      ],
      notes: ['This week is also the test. If he is still flat by Sunday, we have found that out before loading him at 90% — which is the whole point.'],
    },
  ],
};

const LEWIS_PLAN = {
  countdown: 'Finals 3–6 Sep · 3x3 Scotland Sun 16 Aug',
  gateHeading: 'Gate — decision for Mon 3 Aug',
  daily: LEWIS_DAILY,
  readiness: ['Resting HR', 'Sleep (h)', 'Sleep 1–10', 'Soreness 1–10', 'Motivation 1–10', 'Bodyweight', 'Back', 'L hamstring'],
  gate: [
    gate(GREEN_C, 'GREEN', 'RHR within 5 of baseline · sleep 8h+ · motivation 7+ · back clear', 'Week 0 runs as written, 65–70%'),
    gate(AMBER_C, 'AMBER', 'Any two markers off · back tight but not painful', 'Week 0 Day 1 at 55–60%, 4 training days that week only'),
    gate(RED_C, 'RED', 'RHR +10 · broken sleep · back symptomatic · flat and unmotivated', 'Extend decompression 3 days. We move the calendar, not the athlete'),
  ],
  blocks: [
    {
      id: 'preseason', tag: 'Preseason', title: 'Preseason — 3x3 build', dates: '28 Jul – 6 Sep',
      purpose: 'Decompression → reintegration → max strength → power → taper into the 3x3 Finals.',
      weeks: [
        LEWIS_PREWEEK,
        { id: 'week0', title: 'Week 0 — Reintegration', subtitle: 'Mon 3 – Sun 9 Aug · re-groove at 65–70%', days: [] },
        { id: 'week1', title: 'Week 1 — Max Strength (front-loaded)', subtitle: 'Mon 10 – Sun 16 Aug · 3x3 Scotland Sun 16', days: [] },
        { id: 'week2', title: 'Week 2 — Max Strength', subtitle: 'Mon 17 – Sun 23 Aug · heaviest week', days: [] },
        { id: 'week3', title: 'Week 3 — Power Conversion', subtitle: 'Mon 24 – Sun 30 Aug · convert to rate', days: [] },
        { id: 'week4', title: 'Week 4 — Speed & Peak / Taper', subtitle: 'Mon 31 Aug – Sun 6 Sep · arrive fresh', days: [] },
      ],
    },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// PAUL — Return to Hyrox. Distal medial hamstring insertion (semimembranosus).
// Two blocks: Recovery Build (surgeon-cleared rehab) then Hyrox Training.
// Gating metric throughout: next-morning soreness / swelling — hamstring OR knee.
// No cross trainer (treadmill walk / ski erg / rower / bike). Hamstring curls and
// hip work use a monkey-foot cable attachment.
// ─────────────────────────────────────────────────────────────────────────────

const PAUL_DAILY = {
  name: 'Daily spine',
  mins: 'AM iso + knee · PM stretch · daily sled',
  steps: [
    'AM — hamstring iso 5 × 40s @ 30–45° (70% → near-max by wk3)',
    'AM — knee rehab (heel slides, quad sets, SL raises + balance, calf)',
    'PM — light hamstring stretch 3 × 20–30s, mild',
    'Daily — backward sled drag (quad-dominant, hamstring-quiet)',
  ],
};

const STOP_RULE = 'If something feels off mid-session, the session ends. Do not move to another machine to test it.';

// Cardio prescriptions become their own loggable workout; strength/intervals their own.
const REC_W1 = {
  id: 'r_w1', title: 'Week 1 — Rebuild the base', subtitle: 'Ramp-in + Week 1 · iso 70% · no hinge/impact',
  purpose: 'Volume without hinge or impact. Ramp-in weekend, then the week proper.',
  meta: [
    { label: 'Isometrics', value: '70% effort' },
    { label: 'Theme', value: 'Volume, no hinge/impact' },
    { label: 'Ramp-in', value: 'Fri–Sun 31 Jul' },
    { label: 'Gate to Wk2', value: 'Pain-free flexion' },
  ],
  rules: {
    do: ['Machine cardio', 'Backward sled', 'Goblet & split squats', 'Wall balls', "Farmer's carries", 'Full upper body'],
    dont: ['Running', 'Loaded hinging', 'Forward sled', 'Burpees', 'Nordics / GHD', 'Jumps / plyos'],
    note: 'Gate to Week 2: resisted flexion pain-free, and light stretch producing no next-morning soreness.',
  },
  days: [
    {
      id: 'r1_fri', label: 'Fri 31 Jul', title: 'Ramp-in — Stretching only', type: 'rest',
      summary: 'Ramp-in weekend begins. Isometrics @ 60%, mild stretch, walk. No training.',
      items: [
        ['AM isometrics', '5 × 40s @ 60% effort', 'AM'],
        ['PM stretch', '3 × 20s each side, mild', 'PM'],
        ['Walking', 'As desired', '—'],
      ],
    },
    {
      id: 'r1_sat', label: 'Sat 1 Aug', title: 'Basic reintroduction', type: 'session', dur: '~40 min',
      summary: 'Isometrics @ 60%. Easy machine reintroduction. Bike seat set for 25–35° knee bend at full extension.',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [
          ['Treadmill', 'Easy walk, upright', '1 × 12min', '—'],
          ['Static bike', 'Easy, 90rpm, seat 25–35° knee bend', '1 × 10min', '—'],
        ] },
        { id: 'strength', title: 'Reintroduction', ex: [
          ['Backward sled drag', 'Very light', '4 × 20m', '60s'],
          ['Pull-ups', 'Bodyweight', '3 × 6', '90s'],
          ['DB overhead press', 'Moderate', '3 × 8', '90s'],
          ['Face pulls', 'Light', '2 × 15', '45s'],
        ] },
      ],
      notes: [STOP_RULE],
    },
    {
      id: 'r1_sun', label: 'Sun 2 Aug', title: 'A bit more', type: 'session', dur: '~55 min',
      summary: 'Isometrics @ 65%. A little more volume — all machine and light strength.',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [
          ['Ski erg', 'Steady, tall, arms + lats', '1 × 12min', '—'],
          ['Treadmill', 'Steady walk', '1 × 15min', '—'],
        ] },
        { id: 'strength', title: 'Lower + Pull', ex: [
          ['Backward sled drag', 'Light', '6 × 20m', '60s'],
          ['Goblet squat', 'Light', '3 × 10', '90s'],
          ['Split squat', 'Bodyweight–light', '3 × 8 each', '90s'],
          ['Calf raise', '', '3 × 12', '60s'],
          ['DB row', 'Moderate', '3 × 10', '60s'],
          ['Lateral raise', 'Light', '3 × 15', '45s'],
        ] },
      ],
      notes: ["Gate to Week 1: no next-morning soreness Monday. If sore → repeat Saturday's session and delay 2 days."],
    },
    {
      id: 'r1_mon', label: 'Mon 3 Aug', title: 'Lower rehab + Push', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min steady', ex: [
          ['Treadmill walk', 'Steady', '1 × 20min', '—'],
          ['Bike', 'Easy 90rpm', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Lower + Push', ex: [
          ['Backward sled drag', 'Light', '8 × 20m', '60s'],
          ['Goblet squat', 'Moderate', '4 × 10', '90s'],
          ['Split squat', '', '3 × 8 each', '90s'],
          ['Calf raise', '', '3 × 15', '60s'],
          ['Incline DB press', '', '4 × 8', '90s'],
          ['DB overhead press', '', '3 × 10', '90s'],
          ['Lateral raise', '', '3 × 15', '45s'],
          ['Dips or close-grip press', '', '3 × 8', '90s'],
        ] },
      ],
    },
    {
      id: 'r1_tue', label: 'Tue 4 Aug', title: 'Threshold (machine only)', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [['Bike', 'Easy', '1 × 15min', '—']] },
        { id: 'threshold', title: 'Threshold', ex: [
          ['Ski erg intervals', 'RPE 7', '5 × 4min', '90s'],
          ['Wall balls', 'Squat pattern is clear', '4 × 15', '—'],
          ["Farmer's carry", 'Heavy', '4 × 40m', '—'],
          ['Hanging knee raise', '', '3 × 12', '—'],
          ['Pallof press', '', '3 × 12 each', '—'],
        ] },
      ],
      notes: [STOP_RULE],
    },
    {
      id: 'r1_wed', label: 'Wed 5 Aug', title: 'Pull', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Rower', 'Arms + short slide only', '1 × 20min', '—'],
          ['Treadmill walk', 'Steady', '1 × 20min', '—'],
        ] },
        { id: 'pull', title: 'Pull', ex: [
          ['Pull-ups', '', '4 × 6', '90s'],
          ['Lat pulldown', '', '3 × 10', '90s'],
          ['DB row', '', '4 × 10', '60s'],
          ['Face pulls', '', '3 × 15', '45s'],
          ['Rear delt fly', '', '3 × 15', '45s'],
          ['Bicep curl', '', '3 × 12', '45s'],
        ] },
      ],
    },
    {
      id: 'r1_thu', label: 'Thu 6 Aug', title: 'VO2 max (machines only)', type: 'session', rpe: 9,
      workouts: [
        { id: 'warmup', title: 'Warm-up / cool-down', ex: [
          ['Treadmill walk', 'Warm-up', '1 × 10min', '—'],
          ['Bike', 'Cool-down', '1 × 10min', '—'],
        ] },
        { id: 'vo2', title: 'VO2 — Norwegian 4×4', ex: [['Norwegian 4×4 (bike / ski erg)', 'RPE 9', '4 × 4min', '3min']] },
      ],
      notes: ['The hardest session of the week. Machines only — no running.'],
    },
    {
      id: 'r1_fri2', label: 'Fri 7 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching only. Walk.',
      items: [['Isometrics + stretch', 'As the daily routine', '—'], ['Walk', 'Easy', '—']],
    },
    {
      id: 'r1_sat2', label: 'Sat 8 Aug', title: 'Sled + Strength', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Treadmill walk', 'Steady', '1 × 20min', '—'],
          ['Bike', 'Easy', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Sled + Strength', ex: [
          ['Backward sled drag', 'Moderate', '10 × 20m', '60s'],
          ['Box step-ups', "Step, don't jump", '3 × 10 each', '90s'],
          ['Leg extension or wall sit', '', '3 × 30s', '60s'],
          ['Calf raise', '', '4 × 12', '60s'],
          ['Pull-ups', '', '3 × 8', '90s'],
          ['DB press', '', '3 × 10', '90s'],
          ['Lateral raise', '', '3 × 15', '45s'],
        ] },
      ],
    },
    {
      id: 'r1_sun2', label: 'Sun 9 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: '90 min continuous, moderate, RPE 6–7. Bike-based and protected — no running, no burpees. Repeat × 4.',
      workouts: [{ id: 'sim', title: 'Circuit × 4', ex: [
        ['Bike 1km → 10 wall balls', 'RPE 6–7', '4 rounds', '—'],
        ['Ski erg 500m → backward sled drag 40m', 'RPE 6–7', '4 rounds', '—'],
        ['Treadmill walk 5 min → 20 farmer carry steps', 'RPE 6–7', '4 rounds', '—'],
      ] }],
      notes: ['Gate to Week 2: resisted flexion pain-free + light stretch producing no next-morning soreness.'],
    },
  ],
};

const REC_W2 = {
  id: 'r_w2', title: 'Week 2 — Load through range', subtitle: 'Mon 10 – Sun 16 Aug · iso 80% · tempo RDL enters',
  purpose: 'Introduce the tempo RDL (4s eccentric) — the key rebuild lift. Treat it as medicine, not training.',
  meta: [
    { label: 'Isometrics', value: '80% effort' },
    { label: 'Key lift', value: 'Tempo RDL (4s ecc)' },
    { label: 'Runs', value: 'Not yet' },
    { label: 'Gate to Wk3', value: 'RDL comfortable light' },
  ],
  rules: {
    do: ['Tempo RDL (4s ecc)', 'Forward sled push', 'Full-slide rowing', 'Incline walking', 'Wall balls', 'Carries'],
    dont: ['Running', 'Heavy hinge', 'Jumping burpees', 'Nordics / GHD', 'Speed work'],
    note: 'Gate to Week 3: tempo RDL comfortable at light load, no next-morning response.',
  },
  days: [
    {
      id: 'r2_mon', label: 'Mon 10 Aug', title: 'Lower + Push', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Treadmill walk', '', '1 × 20min', '—'], ['Bike', '', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Lower + Push', ex: [
          ['Tempo RDL', 'Very light (empty bar / 20kg), 4s eccentric', '3 × 8', '2min'],
          ['Backward sled drag', 'Moderate', '8 × 20m', '60s'],
          ['Goblet squat', '', '4 × 12', '90s'],
          ['Split squat', '', '3 × 10 each', '90s'],
          ['Incline DB press', '', '4 × 8', '90s'],
          ['DB overhead press', '', '3 × 10', '90s'],
          ['Lateral raise', '', '3 × 15', '45s'],
        ], cues: { 'Tempo RDL': 'The main event. 4-second lower, feel the hamstring lengthen under control. Medicine, not training — range and control, not load.' } },
      ],
    },
    {
      id: 'r2_tue', label: 'Tue 11 Aug', title: 'Threshold (machine)', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [['Rower', 'Full slide, moderate', '1 × 15min', '—']] },
        { id: 'threshold', title: 'Threshold', ex: [
          ['Ski erg intervals', 'RPE 7–8', '5 × 4min', '90s'],
          ['Wall balls', '', '5 × 15', '—'],
          ["Farmer's carry", '', '4 × 50m', '—'],
          ['Hanging leg raise', '', '3 × 12', '—'],
        ] },
      ],
      notes: [STOP_RULE],
    },
    {
      id: 'r2_wed', label: 'Wed 12 Aug', title: 'Pull', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Rower', 'Full slide, moderate', '1 × 20min', '—'], ['Treadmill walk', '', '1 × 20min', '—'],
        ] },
        { id: 'pull', title: 'Pull', ex: [
          ['Pull-ups', '', '4 × 7', '90s'],
          ['Lat pulldown', '', '3 × 10', '90s'],
          ['DB row', '', '4 × 10', '60s'],
          ['Back extension', 'Bodyweight, short range', '3 × 10', '60s'],
          ['Face pulls', '', '3 × 15', '45s'],
          ['Rear delt fly', '', '3 × 15', '45s'],
        ] },
      ],
    },
    {
      id: 'r2_thu', label: 'Thu 13 Aug', title: 'VO2 max (machines)', type: 'session', rpe: 10,
      summary: '30/30 shuttle: 30s @ RPE 9–10 / 30s easy × 12, rest 3 min, repeat × 2 blocks.',
      workouts: [{ id: 'vo2', title: 'VO2 — 30/30', ex: [['30/30 intervals (bike / ski / rower)', 'RPE 9–10', '2 × 12', '3min']] }],
      notes: ['Machines only. Do not run this.'],
    },
    {
      id: 'r2_fri', label: 'Fri 14 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching. Incline walk 10 min @ 5–6% if the shin is quiet.',
      items: [['Isometrics + stretch', 'As the daily routine', '—'], ['Incline walk', '10 min @ 5–6%, only if shin quiet', '—']],
    },
    {
      id: 'r2_sat', label: 'Sat 15 Aug', title: 'Sled + Strength', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Incline walk', '@ 6%', '1 × 15min', '—'], ['Bike', '', '1 × 25min', '—'],
        ] },
        { id: 'lift', title: 'Sled + Strength', ex: [
          ['Forward sled push', 'Moderate — returns this week', '6 × 20m', '90s'],
          ['Backward sled drag', '', '8 × 20m', '60s'],
          ['Box step-ups', '', '4 × 10 each', '90s'],
          ['Tempo RDL', 'Light, 4s eccentric', '3 × 8', '2min'],
          ['Pull-ups', '', '3 × 8', '90s'],
          ['DB press', '', '3 × 10', '90s'],
          ['Bicep curl', '', '3 × 12', '45s'],
        ] },
      ],
    },
    {
      id: 'r2_sun', label: 'Sun 16 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: 'Same structure as Week 1, 4 rounds at RPE 7. Swap one bike block for rower 500m; add 10 step-back burpees per round.',
      workouts: [{ id: 'sim', title: 'Circuit × 4', ex: [
        ['Bike / rower 1km → 10 wall balls', 'RPE 7', '4 rounds', '—'],
        ['Ski erg 500m → backward sled drag 40m', 'RPE 7', '4 rounds', '—'],
        ['Treadmill walk 5 min → 20 farmer carry steps', 'RPE 7', '4 rounds', '—'],
        ['Step-back burpees (no jump)', 'Per round', '4 × 10', '—'],
      ] }],
      notes: ['Gate to Week 3: tempo RDL comfortable at light load, no next-morning response.'],
    },
  ],
};

const REC_W3 = {
  id: 'r_w3', title: 'Week 3 — Strength & full range', subtitle: 'Mon 17 – Sun 23 Aug · iso 85% · curls return',
  purpose: 'Full-range hamstring work returns; build load. The gate to running sits at week end.',
  meta: [
    { label: 'Isometrics', value: '85% effort' },
    { label: 'Theme', value: 'Full-range ham work' },
    { label: 'Runs', value: 'Not yet' },
    { label: 'Gate', value: '3 pain-free tests → run' },
  ],
  rules: {
    do: ['Tempo RDL building', 'Hamstring curl (full range)', 'Front squat', 'Forward sled heavier', 'Incline walk 6–8%'],
    dont: ['Running (until the 3-part gate)', 'Speed work / hills', 'Jumping'],
    note: 'Gate to running: pain-free resisted flexion + loaded hinge + full-range curl. All three.',
  },
  days: [
    {
      id: 'r3_mon', label: 'Mon 17 Aug', title: 'Lower + Push', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Treadmill walk', '', '1 × 20min', '—'], ['Rower', 'Moderate', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Lower + Push', ex: [
          ['Tempo RDL', 'Build load, 3s eccentric', '4 × 8', '2min'],
          ['Hamstring curl', 'Monkey foot on cable, light — full range returns', '3 × 12', '90s'],
          ['Backward sled drag', '', '8 × 25m', '60s'],
          ['Front squat or goblet', 'Moderate', '4 × 8', '2min'],
          ['Incline DB press', '', '4 × 8', '90s'],
          ['DB overhead press', '', '4 × 8', '90s'],
          ['Lateral raise', '', '3 × 15', '45s'],
        ], cues: { 'Hamstring curl': 'Full range but light — the first full-range flexion load. Earn the range before the load.' } },
      ],
    },
    {
      id: 'r3_tue', label: 'Tue 18 Aug', title: 'Threshold (machine)', type: 'session', rpe: 8,
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [['Bike', 'Easy', '1 × 10min', '—']] },
        { id: 'threshold', title: 'Threshold', ex: [
          ['Rower intervals', 'RPE 8', '4 × 1000m', '2min'],
          ['Wall balls', '', '5 × 20', '—'],
          ['Sandbag / DB carries', '', '4 × 50m', '—'],
          ['Core circuit', '', '3 rounds', '—'],
        ] },
      ],
      notes: [STOP_RULE],
    },
    {
      id: 'r3_wed', label: 'Wed 19 Aug', title: 'Pull', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Ski erg', '', '1 × 20min', '—'], ['Treadmill walk', '', '1 × 20min', '—'],
        ] },
        { id: 'pull', title: 'Pull', ex: [
          ['Pull-ups', '', '4 × 8', '90s'],
          ['Weighted lat pulldown', '', '4 × 8', '90s'],
          ['DB row', '', '4 × 12', '60s'],
          ['Back extension', 'Full range', '3 × 12', '60s'],
          ['Face pulls', '', '3 × 15', '45s'],
          ['Bicep curl', '', '3 × 15', '45s'],
        ] },
      ],
    },
    {
      id: 'r3_thu', label: 'Thu 20 Aug', title: 'VO2 max (machines)', type: 'session', rpe: 10,
      summary: 'Norwegian 4 × 4 @ RPE 9–10, alternating machines. Push genuinely hard.',
      workouts: [{ id: 'vo2', title: 'VO2 — Norwegian 4×4', ex: [['Norwegian 4×4 (alternate machines)', 'RPE 9–10', '4 × 4min', '3min']] }],
    },
    {
      id: 'r3_fri', label: 'Fri 21 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching. Incline walk 15 min @ 6–8%.',
      items: [['Isometrics + stretch', 'As the daily routine', '—'], ['Incline walk', '15 min @ 6–8%', '—']],
    },
    {
      id: 'r3_sat', label: 'Sat 22 Aug', title: 'Sled + Strength', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Incline walk', '@ 8%', '1 × 20min', '—'], ['Bike', '', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Sled + Strength', ex: [
          ['Forward sled push', 'Heavier', '8 × 20m', '90s'],
          ['Backward sled drag', '', '8 × 25m', '60s'],
          ['Tempo RDL', 'Moderate load, 3s eccentric', '4 × 6', '2min'],
          ['Box step-ups', '', '4 × 12', '90s'],
          ['Calf raise', '', '4 × 15', '60s'],
          ['Upper accessory', 'Your choice', '3 × 12', '—'],
        ] },
      ],
    },
    {
      id: 'r3_sun', label: 'Sun 23 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 8,
      summary: 'Full machine simulation, 5 rounds, RPE 7–8. Still no running.',
      workouts: [{ id: 'sim', title: 'Circuit × 5', ex: [['Machine Hyrox circuit', 'RPE 7–8', '5 rounds', '—']] }],
      notes: ['GATE TO RUNNING: pain-free resisted flexion + loaded hinge + full-range curl. All three, or running waits.'],
    },
  ],
};

const REC_W4 = {
  id: 'r_w4', title: 'Week 4 — Running returns', subtitle: 'Mon 24 – Sun 30 Aug · runs Tue + Sat, Zone 2',
  purpose: 'Running reintroduced — Tuesday and Saturday only, 48h apart, Zone 2. Frequency before volume.',
  meta: [
    { label: 'Isometrics', value: '85% effort' },
    { label: 'Theme', value: 'Running returns' },
    { label: 'Run days', value: 'Tue + Sat only' },
    { label: 'Rule', value: '48h apart, Zone 2' },
  ],
  rules: {
    do: ['Running Tue + Sat (Zone 2)', 'Tempo RDL', 'Hamstring curl', 'Sled', 'Machine VO2'],
    dont: ['Runs on consecutive days', 'Running the VO2 session', 'Speed work / hills', 'Running inside the Sunday sim'],
    note: 'Runs 48h apart — Tuesday and Saturday only. Never Tues + Thurs.',
  },
  days: [
    {
      id: 'r4_mon', label: 'Mon 24 Aug', title: 'Lower + Push', type: 'session',
      workouts: [
        { id: 'cardio', title: 'Cardio', summary: '40 min', ex: [
          ['Treadmill walk', '', '1 × 20min', '—'], ['Bike', '', '1 × 20min', '—'],
        ] },
        { id: 'lift', title: 'Lower + Push', ex: [
          ['Tempo RDL', 'Building, 3s eccentric', '4 × 6', '2min'],
          ['Hamstring curl', 'Monkey foot on cable', '3 × 12', '90s'],
          ['Backward sled drag', '', '8 × 25m', '60s'],
          ['Squat', 'Moderate', '4 × 6', '2min'],
          ['Full push session', 'Incline press / OHP / lateral raise', '3 × 10', '90s'],
        ] },
      ],
    },
    {
      id: 'r4_tue', label: 'Tue 25 Aug', title: 'RUN 1 🏃', type: 'session',
      summary: 'The first run back. Nothing else this session beyond the run and its tempo RDL.',
      workouts: [
        { id: 'warmup', title: 'Warm-up', ex: [['Treadmill', 'Easy (walk into jog) + dynamic prep', '1 × 10min', '—']] },
        { id: 'run', title: 'Run + Lower', ex: [
          ['Run — 3 × 1km easy', 'Zone 2, conversational, 2 min walk between', '3 × 1km', '2min'],
          ['Tempo RDL (kept in)', '', '3 × 8', '2min'],
        ], cues: { 'Run — 3 × 1km easy': 'Zone 2 — conversational, not threshold. Frequency before volume; this is the first run back.' } },
      ],
      notes: ['Stop immediately on diffuse shin ache or any pull behind the knee — that run is over. The tibia is the slowest tissue and gives little warning.'],
    },
    {
      id: 'r4_wed', label: 'Wed 26 Aug', title: 'Pull (no leg work)', type: 'session',
      summary: 'Recovery from the run — no leg work.',
      workouts: [
        { id: 'cardio', title: 'Cardio', ex: [
          ['Rower', '', '1 × 20min', '—'], ['Ski erg', '', '1 × 20min', '—'],
        ] },
        { id: 'pull', title: 'Pull', ex: [
          ['Pull-ups', '', '4 × 8', '90s'],
          ['Weighted lat pulldown', '', '4 × 8', '90s'],
          ['DB row', '', '4 × 12', '60s'],
          ['Back extension', '', '3 × 12', '60s'],
          ['Face pulls', '', '3 × 15', '45s'],
        ] },
      ],
    },
    {
      id: 'r4_thu', label: 'Thu 27 Aug', title: 'VO2 max (machines only)', type: 'session', rpe: 10,
      summary: 'Machine-based — do NOT run it. Your two runs (Tue + Sat) are the only running this week.',
      workouts: [{ id: 'vo2', title: 'VO2 — machines', ex: [['VO2 intervals (bike / ski / rower)', 'RPE 9–10', '4 × 4min', '3min']] }],
    },
    {
      id: 'r4_fri', label: 'Fri 28 Aug', title: 'Rest', type: 'rest',
      summary: 'Isometrics + stretching. Easy walk.',
      items: [['Isometrics + stretch', 'As the daily routine', '—'], ['Walk', 'Easy', '—']],
    },
    {
      id: 'r4_sat', label: 'Sat 29 Aug', title: 'RUN 2 🏃 + Sled', type: 'session',
      summary: '48h after Run 1 — runs are Tuesday and Saturday only, never consecutive days.',
      workouts: [{ id: 'run', title: 'Run + Sled', ex: [
        ['Run — 3 × 1km easy', 'Zone 2, same as Tuesday', '3 × 1km', '2min'],
        ['Backward sled drag', '', '8 × 20m', '60s'],
        ['Tempo RDL', '', '3 × 8', '2min'],
        ['Light upper accessory', 'Your choice', '3 × 12', '—'],
      ] }],
    },
    {
      id: 'r4_sun', label: 'Sun 30 Aug', title: 'Half-Hyrox simulation', type: 'session', rpe: 7,
      summary: 'Machines + sled, RPE 7. Keep running OUT of the sim — your two runs are enough load.',
      workouts: [{ id: 'sim', title: 'Circuit × 5', ex: [['Machine + sled Hyrox circuit', 'RPE 7', '5 rounds', '—']] }],
      notes: ['Then Hyrox Training: add one running variable per week — +1km OR a third run, never both. Speed and hills come last.'],
    },
  ],
};

const PAUL_PLAN = {
  countdown: 'Recovery build → Hyrox · gate on next-morning soreness',
  gateHeading: 'Gate — next-morning response (hamstring or knee)',
  daily: PAUL_DAILY,
  readiness: ['Next-AM soreness 1–10', 'Hamstring', 'Knee', 'Swelling', 'Sleep (h)', 'Bodyweight', 'Notes'],
  gate: [
    gate(GREEN_C, 'GREEN', 'No next-morning soreness or swelling — hamstring AND knee · movement pain-free', 'Progress as written — add load / range'),
    gate(AMBER_C, 'AMBER', 'Mild next-AM soreness that settles by midday · no swelling', 'Hold. Repeat that week, do not progress'),
    gate(RED_C, 'RED', 'Sorer next morning · joint swelling · sharp or sit-bone pain · diffuse shin ache that won’t settle', 'Stop. Sit-bone / shin / swelling → physio or surgeon’s team. Otherwise repeat the week'),
  ],
  blocks: [
    {
      id: 'recovery', tag: 'Recovery', title: 'Recovery Build', dates: 'Fri 31 Jul – Sun 30 Aug',
      purpose: 'Surgeon-cleared hamstring rehab back to full training — volume → load → strength → running.',
      weeks: [REC_W1, REC_W2, REC_W3, REC_W4],
    },
    {
      id: 'hyrox', tag: 'Training', title: 'Hyrox Training', dates: 'From Week 5',
      purpose: 'Full-on training to Hyrox once recovery clears. Weeks fill in from the detailed program.',
      weeks: [
        { id: 'hx1', title: 'Week 1', subtitle: 'Awaiting the detailed Hyrox program', days: [] },
      ],
    },
  ],
};

export const PLANS = { lewis: LEWIS_PLAN, paul: PAUL_PLAN };
