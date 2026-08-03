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

// Weeks 0–4, written from the preseason master plan: weekly structure (lower
// Mon / court Tue / upper Wed / tendon+sled Thu / full-body Fri / jumps Sat /
// rest Sun), block parameters per week, and the loading table. Skills coach
// runs Mon/Wed/Fri mornings — weights come AFTER skills, never before. Top set
// always stops at 2 reps in reserve; nobody chases a number.
const RIR_RULE = 'Hard rule: top set stops at 2 reps in reserve. If the prescribed weight feels RPE 9 on rep one, it comes down 5kg and the session continues.';
const AFTER_SKILLS = 'Skills coach in the morning — weights after skills, never before.';

const LEWIS_W0 = {
  id: 'week0', title: 'Week 0 — Reintegration', subtitle: 'Mon 3 – Sun 9 Aug · re-groove at 65–70%',
  purpose: 'Re-establish positions and bracing before load returns. Nothing heavy, nothing fast.',
  meta: [
    { label: 'Days to finals', value: '31 → 25' },
    { label: 'Intensity', value: '65–70% · 4–6 reps' },
    { label: 'Rest', value: '90–120s · controlled' },
    { label: 'Plyo contacts', value: '40–60 low amplitude' },
  ],
  rules: {
    do: ['Groove positions', 'Isometrics Mon + Fri', 'Light sled (20–30% BW)', 'Nordics — eccentric only', 'Form shooting (capped)'],
    dont: ['Heavy anything', 'Cutting at speed', 'Rep-outs', 'GHD (ever)', 'Shooting to fatigue'],
    note: 'Gate on Sun 9: patterns re-grooved, back clear. If not — repeat Week 0 at 70% and compress Weeks 1–2.',
  },
  days: [
    {
      id: 'w0_mon', label: 'Mon 3 Aug', title: 'Lower — re-groove', type: 'session', out: 31,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', 'Band + light load', '4 × 30s', '45s']] },
        { id: 'lift', title: 'Lower', ex: [
          ['Back squat', '60kg', '4 × 5', '2min'],
          ['Trap bar deadlift', '50kg/side', '3 × 5', '2min'],
          ['Heavy-slow calf raise', '3s up / 3s down, loaded', '4 × 6', '90s'],
          ['Dead bug', 'Bodyweight', '2 × 8 each', '45s'],
        ] },
      ],
      notes: [RIR_RULE],
    },
    {
      id: 'w0_tue', label: 'Tue 4 Aug', title: 'COD + shooting — low amplitude', type: 'session', out: 30,
      workouts: [{ id: 'court', title: 'Court', ex: [
        ['Linear accel mechanics', 'Wall drills, A-skips, 10m builds', '4 × 10m', '90s'],
        ['Low-amplitude COD', 'No cutting at speed', '3 rounds', '90s'],
        ['Form shooting', 'Capped, tied to skills-coach cues', '1 × 20min', '—'],
      ] }],
      notes: ['No shooting to fatigue — grooving broken mechanics is worse than not shooting.'],
    },
    {
      id: 'w0_wed', label: 'Wed 5 Aug', title: 'Upper — antagonistic, RPE 7 cap', type: 'session', out: 29, rpe: 7,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper', ex: [
        ['A1 Weighted ring row', 'RPE 7 cap', '3 × 8', '45s'],
        ['A2 DB incline press', 'RPE 7 cap', '3 × 8', '90s'],
        ['B1 Chin-up', 'Bodyweight', '3 × 6', '45s'],
        ['B2 Half-kneeling DB press', '', '3 × 8', '90s'],
        ['Cable face pull', 'Light', '3 × 15', '45s'],
      ] }],
    },
    {
      id: 'w0_thu', label: 'Thu 6 Aug', title: 'ATG / tendon + sled', type: 'session', out: 28,
      workouts: [
        { id: 'tendon', title: 'Tendon + ATG', ex: [
          ['ATG split squat', 'Light load (L first)', '3 × 8 each', '90s'],
          ['Tibialis raise', '', '3 × 20', '45s'],
          ['Heavy-slow calf raise', '3s up / 3s down', '4 × 6', '90s'],
        ] },
        { id: 'sled', title: 'Sled + hip flexor', ex: [
          ['Sled march', 'Light, 20–30% BW', '6 × 20m', '90s'],
          ['Standing knee drive above 90°', 'Band or cable', '3 × 8 each', '45s'],
          ['Seated hip flexor lift', 'Bodyweight', '2 × 8 each', '45s'],
        ] },
      ],
    },
    {
      id: 'w0_fri', label: 'Fri 7 Aug', title: 'Full-body — technique', type: 'session', out: 27,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', 'Band + light load', '4 × 30s', '45s']] },
        { id: 'lift', title: 'Full-body', ex: [
          ['Front squat', '50kg', '4 × 5', '2min'],
          ['Power clean', '42.5kg — technique', '4 × 3', '2min'],
          ['Push press', '35kg', '3 × 5', '2min'],
          ['Nordic curl', 'ECCENTRIC ONLY — reintroduced this week', '3 × 4', '90s'],
        ] },
      ],
      notes: ['Bar speed governs the Olympic lifts — 92% of a clean is a technique breakdown, not a stimulus.'],
    },
    {
      id: 'w0_sat', label: 'Sat 8 Aug', title: 'Jumps + skills — 40–60 contacts', type: 'session', out: 26,
      workouts: [{ id: 'plyo', title: 'Low-amplitude plyos', summary: '40–60 total contacts, quality only', ex: [
        ['Pogo hops', 'Stiff ankle, quiet landing', '3 × 10', '60s'],
        ['Line hops', '', '3 × 10', '60s'],
        ['Low box ankle stiffness', 'Step down, pop', '2 × 6', '90s'],
      ] }],
      notes: ['Then skills with the coach. Contacts counted — stop at 60.'],
    },
    {
      id: 'w0_sun', label: 'Sun 9 Aug', title: 'Rest + gate', type: 'rest', out: 25,
      summary: 'Programmed rest. Gate: patterns re-grooved, back clear — else repeat Week 0 at 70% and compress Weeks 1–2.',
      items: [['Readiness log', 'All fields, AM before food', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
  ],
};

const LEWIS_W1 = {
  id: 'week1', title: 'Week 1 — Max Strength (front-loaded)', subtitle: 'Mon 10 – Sun 16 Aug · 3x3 Scotland Sun 16',
  purpose: 'Train through the 3x3, don’t taper for it: heavy Mon/Wed, unload Thu–Sat, compete Sunday. Four days from the last heavy session is enough sharpness for a 3x3.',
  meta: [
    { label: 'Days to finals', value: '24 → 18' },
    { label: 'Intensity', value: '82–92% · 2–4 reps' },
    { label: 'Rest', value: '180–240s' },
    { label: 'Sun 16', value: '3x3 Scotland — COMPETE' },
  ],
  rules: {
    do: ['Heavy Mon + Wed', 'Volume cut ~40% Thu', 'RPE 6 cap Fri', 'CNS primer only Sat', 'Grind allowed on the last rep'],
    dont: ['Tapering the whole week', 'Cleans on Friday', 'Sled on Thursday', 'Anything fatiguing Saturday', 'Rep-outs'],
    note: 'Tapering properly would cost a max-strength week we cannot get back. Heavy early, sharp Sunday.',
  },
  days: [
    {
      id: 'w1_mon', label: 'Mon 10 Aug', title: 'Lower — HEAVY', type: 'session', out: 24,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', 'Progressing toward 5 × 45s', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Lower — heavy', ex: [
          ['Back squat', '80–85kg', '4 × 3', '3min'],
          ['Trap bar deadlift', '60–65kg/side', '3 × 3', '3min'],
          ['Heavy-slow calf raise', 'Load up from last week', '4 × 6', '90s'],
          ['Copenhagen plank', '', '3 × 20s each', '60s'],
        ] },
      ],
      notes: [RIR_RULE],
    },
    {
      id: 'w1_tue', label: 'Tue 11 Aug', title: 'COD at intent + shooting', type: 'session', out: 23,
      workouts: [{ id: 'court', title: 'Court', ex: [
        ['COD at intent', 'Full-speed cuts, long recoveries', '4 rounds', '2min'],
        ['Lateral first-step', '', '4 × 3 each', '90s'],
        ['Shooting off movement', 'Capped reps, coach cues', '1 × 20min', '—'],
      ] }],
    },
    {
      id: 'w1_wed', label: 'Wed 12 Aug', title: 'Upper — HEAVY', type: 'session', out: 22,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper — heavy pairs', ex: [
        ['A1 Weighted dip', '', '4 × 4', '60s'],
        ['A2 Weighted chin-up', '', '4 × 4', '3min'],
        ['B1 Barbell row', '', '3 × 4', '60s'],
        ['B2 DB bench press', '', '3 × 4', '3min'],
        ['Cable face pull', 'Light', '3 × 15', '45s'],
      ] }],
      notes: [RIR_RULE],
    },
    {
      id: 'w1_thu', label: 'Thu 13 Aug', title: 'Tendon — volume cut 40%', type: 'session', out: 21,
      summary: 'Unload begins. Sled dropped entirely this week.',
      workouts: [{ id: 'tendon', title: 'Tendon maintenance', ex: [
        ['ATG split squat', 'Light (L first)', '2 × 8 each', '90s'],
        ['Tibialis raise', '', '3 × 20', '45s'],
        ['Heavy-slow calf raise', 'Hold last week’s load', '3 × 6', '90s'],
        ['Standing knee drive above 90°', 'Band', '2 × 8 each', '45s'],
      ] }],
    },
    {
      id: 'w1_fri', label: 'Fri 14 Aug', title: 'Full-body — LIGHT, RPE 6 cap', type: 'session', out: 20, rpe: 6,
      summary: AFTER_SKILLS + ' No cleans today.',
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Light full-body', ex: [
          ['Front squat', '~60kg, bar speed crisp', '3 × 3', '2min'],
          ['Push press', '~40kg', '3 × 3', '2min'],
          ['Nordic curl', 'Eccentric only', '2 × 4', '90s'],
        ] },
      ],
    },
    {
      id: 'w1_sat', label: 'Sat 15 Aug', title: 'CNS primer — 20 min max', type: 'session', out: 19, dur: '20 min max',
      summary: 'A few jumps, a few accelerations, zero fatigue. Leave the gym feeling springy.',
      workouts: [{ id: 'primer', title: 'Primer', ex: [
        ['Hurdle hop', 'Low hurdle, crisp', '2 × 3', '2min'],
        ['10m acceleration', '', '2 × 10m', '2min'],
        ['Pogo hops', '', '2 × 5', '60s'],
      ] }],
    },
    {
      id: 'w1_sun', label: 'Sun 16 Aug', title: '3x3 Scotland — COMPETE', type: 'rest', out: 18,
      summary: 'Compete. 3x3 is a brutal eccentric load — short court, continuous play, high deceleration density. Tomorrow is a judgement call.',
      items: [
        ['Full warm-up protocol', 'Long, gradual — especially if outdoor concrete', 'Pre-game'],
        ['COMPETE', '', '—'],
        ['Cool-down + easy spin', '', 'Post'],
        ['Back Insurance', '8 min — non-negotiable tonight', 'PM'],
      ],
      notes: ['Log how he pulls up tomorrow morning — Monday is written two ways and the call gets made on the morning.'],
    },
  ],
};

const LEWIS_W2 = {
  id: 'week2', title: 'Week 2 — Max Strength', subtitle: 'Mon 17 – Sun 23 Aug · heaviest week of the year',
  purpose: 'The peak of the strength block. Long rest, low reps, high focus. Monday is the riskiest junction in the plan — it is written two ways.',
  meta: [
    { label: 'Days to finals', value: '17 → 11' },
    { label: 'Intensity', value: '82–92% · 2–4 reps' },
    { label: 'Rest', value: '180–240s' },
    { label: 'Plyo contacts', value: '110–130' },
  ],
  rules: {
    do: ['Heaviest lifting of the year', 'Sled accel heavy (15–20m)', 'Lateral bounds join Saturday', 'Long rests, full focus'],
    dont: ['Going heavy Monday if he pulled up sore', 'Rep-outs', 'GHD (ever)', 'Shooting to fatigue'],
    note: 'Mon 17 gate: post-3x3 pull-up. Sore or flat → recovery option, heavy moves to Tue/Wed. We move the calendar, not the athlete.',
  },
  days: [
    {
      id: 'w2_mon', label: 'Mon 17 Aug', title: 'Judgement call — two sessions, pick ONE', type: 'session', out: 17,
      summary: 'The call gets made on the morning based on how he pulled up from the 3x3. Springy and clear → Option A. Sore, flat, or any back signal → Option B, and heavy shifts to Tue/Wed.',
      workouts: [
        { id: 'optA', title: 'Option A — full heavy (pulled up well)', ex: [
          ['Spanish squat isometric', '', '5 × 45s', '45s'],
          ['Back squat', '87.5–90kg', '3 × 2', '3min'],
          ['Trap bar deadlift', '67.5–70kg/side', '3 × 2', '3min'],
          ['Heavy-slow calf raise', '', '4 × 6', '90s'],
          ['Copenhagen plank', '', '3 × 20s each', '60s'],
        ] },
        { id: 'optB', title: 'Option B — recovery (sore / flat / back signal)', ex: [
          ['Easy bike flush', 'Conversational', '1 × 20min', '—'],
          ['Spanish squat isometric', 'Light', '4 × 30s', '45s'],
          ['90/90 hip switches', '', '2 × 8 each', '30s'],
          ['Back Insurance (extended)', 'Full routine, slow', '1 × 12min', '—'],
        ] },
      ],
      notes: ['Going straight from a 3x3 into the heaviest week of the year is exactly how the back pattern surfaces. Any back symptom stops the session — stop, and tell me.'],
    },
    {
      id: 'w2_tue', label: 'Tue 18 Aug', title: 'COD at intent + shooting', type: 'session', out: 16,
      summary: 'If Monday was Option B, today absorbs the heavy lower session instead.',
      workouts: [{ id: 'court', title: 'Court', ex: [
        ['COD at intent', '', '4 rounds', '2min'],
        ['Lateral first-step', '', '4 × 3 each', '90s'],
        ['Shooting off movement', 'Capped', '1 × 20min', '—'],
      ] }],
    },
    {
      id: 'w2_wed', label: 'Wed 19 Aug', title: 'Upper — HEAVY', type: 'session', out: 15,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Upper — heavy pairs', ex: [
        ['A1 Weighted dip', 'Heavier than last week', '4 × 3', '60s'],
        ['A2 Weighted chin-up', '', '4 × 3', '3min'],
        ['B1 Barbell row', '', '3 × 4', '60s'],
        ['B2 DB bench press', '', '3 × 4', '3min'],
        ['Cable face pull', '', '3 × 15', '45s'],
      ] }],
      notes: [RIR_RULE],
    },
    {
      id: 'w2_thu', label: 'Thu 20 Aug', title: 'ATG loaded + heavy sled', type: 'session', out: 14,
      workouts: [
        { id: 'tendon', title: 'ATG + tendon', ex: [
          ['ATG split squat', 'Loaded (L first)', '3 × 6 each', '2min'],
          ['Poliquin step-down', '', '3 × 8 each', '90s'],
          ['Tibialis raise', '', '3 × 20', '45s'],
          ['Heavy-slow calf raise', '', '4 × 6', '90s'],
        ] },
        { id: 'sled', title: 'Sled accel — heavy', ex: [
          ['Heavy sled acceleration', '15–20m, full recovery', '6 × 15–20m', '3min'],
          ['Standing knee drive above 90°', 'Cable', '3 × 8 each', '45s'],
        ] },
      ],
    },
    {
      id: 'w2_fri', label: 'Fri 21 Aug', title: 'Full-body — peak loads', type: 'session', out: 13,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '5 × 45s', '45s']] },
        { id: 'lift', title: 'Full-body', ex: [
          ['Front squat', '70–75kg', '3 × 3', '3min'],
          ['Power clean', '55–57.5kg — bar speed governs', '4 × 2', '3min'],
          ['Push press', '47.5–50kg', '3 × 3', '3min'],
          ['Nordic curl', 'Full reps now', '3 × 5', '90s'],
          ['Muscle snatch', 'Slow eccentric, light', '3 × 3', '2min'],
        ] },
      ],
      notes: ['Olympic lifts sit lower in the range on purpose — at his training age bar speed governs the adaptation, not load.'],
    },
    {
      id: 'w2_sat', label: 'Sat 22 Aug', title: 'Jumps + skills — 110–130 contacts', type: 'session', out: 12,
      workouts: [{ id: 'plyo', title: 'Plyos', summary: '110–130 total contacts', ex: [
        ['Hurdle hop', '', '4 × 5', '2min'],
        ['Lateral bound', 'Joins this week — stick the landing', '4 × 4 each', '2min'],
        ['Pogo hops', '', '3 × 10', '60s'],
      ] }],
      notes: ['Then skills. Count the contacts.'],
    },
    {
      id: 'w2_sun', label: 'Sun 23 Aug', title: 'Rest', type: 'rest', out: 11,
      summary: 'Programmed rest. The heaviest week of the year is banked — strength built here is still fully expressed on 3 September.',
      items: [['Readiness log', '', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
  ],
};

const LEWIS_W3 = {
  id: 'week3', title: 'Week 3 — Power Conversion', subtitle: 'Mon 24 – Sun 30 Aug · convert strength to rate',
  purpose: 'Load drops, intent goes to maximum. PAP contrasts throughout; plyometric volume peaks. Max intent every rep.',
  meta: [
    { label: 'Days to finals', value: '10 → 4' },
    { label: 'Intensity', value: '70–80% · 3–5 reps' },
    { label: 'Bar speed', value: 'MAX intent every rep' },
    { label: 'Plyo contacts', value: '140–160 (peak)' },
  ],
  rules: {
    do: ['Contrast pairs (heavy → explosive)', 'Depth jumps + lateral bounds', 'Reactive cutting', 'Full recoveries'],
    dont: ['Grinding any rep', 'Adding load at the cost of speed', 'GHD (ever)'],
    note: 'Every rep moves fast or the set ends. This week converts the strength bank into rate.',
  },
  days: [
    {
      id: 'w3_mon', label: 'Mon 24 Aug', title: 'Lower — contrast', type: 'session', out: 10,
      summary: AFTER_SKILLS,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'contrast', title: 'PAP contrast', ex: [
          ['Back squat', '70–75kg heavy double', '4 × 2', '30s → jumps'],
          ['Broad jump', '30s after the squat double', '4 × 3', '3min'],
          ['Trap bar speed pull', '55kg/side — max intent', '4 × 3', '2min'],
          ['Heavy-slow calf raise', '', '3 × 6', '90s'],
        ], cues: { 'Broad jump': 'The pairing is the point: heavy double primes, jumps express. Full rest between pairs.' } },
      ],
    },
    {
      id: 'w3_tue', label: 'Tue 25 Aug', title: 'Peak COD + reactive cutting', type: 'session', out: 9,
      workouts: [{ id: 'court', title: 'Court — peak volume', ex: [
        ['Reactive cutting', 'React to signal, not pattern', '5 rounds', '2min'],
        ['COD at intent', '', '4 rounds', '2min'],
        ['Decision-layered shooting', 'Read → decide → shoot', '1 × 20min', '—'],
      ] }],
    },
    {
      id: 'w3_wed', label: 'Wed 26 Aug', title: 'Upper — contrast', type: 'session', out: 8,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'contrast', title: 'Upper contrast', ex: [
        ['DB bench press', 'Heavy', '4 × 3', '30s → throw'],
        ['Med ball chest throw', 'Max intent', '4 × 4', '2min'],
        ['Weighted chin-up', '', '3 × 4', '2min'],
        ['Med ball deception complex', 'Fake → throw patterns', '3 rounds', '2min'],
        ['Cable face pull', '', '3 × 15', '45s'],
      ] }],
    },
    {
      id: 'w3_thu', label: 'Thu 27 Aug', title: 'ATG maintain + sled contrast', type: 'session', out: 7,
      workouts: [
        { id: 'tendon', title: 'ATG maintain', ex: [
          ['ATG split squat', 'Hold load', '2 × 6 each', '90s'],
          ['Tibialis raise', '', '3 × 20', '45s'],
          ['Heavy-slow calf raise', '', '3 × 6', '90s'],
        ] },
        { id: 'sled', title: 'Sled contrast', ex: [
          ['Heavy sled push', '', '4 × 15m', '30s → sprint'],
          ['Free sprint', 'Straight after the push', '4 × 15m', '3min'],
        ] },
      ],
    },
    {
      id: 'w3_fri', label: 'Fri 28 Aug', title: 'Full-body — at speed', type: 'session', out: 6,
      summary: AFTER_SKILLS,
      workouts: [{ id: 'lift', title: 'Speed work', ex: [
        ['Power clean', '45–47.5kg — at speed', '5 × 2', '2min'],
        ['Hang snatch', '32.5–35kg', '4 × 2', '2min'],
        ['Jump squat', 'Light bar, max intent', '3 × 3', '2min'],
        ['Nordic curl', '', '3 × 5', '90s'],
      ] }],
    },
    {
      id: 'w3_sat', label: 'Sat 29 Aug', title: 'Jumps + skills — 140–160 contacts (peak)', type: 'session', out: 5,
      workouts: [{ id: 'plyo', title: 'Plyo peak', summary: '140–160 total contacts — the peak of the ramp the isometrics protected', ex: [
        ['Depth jump', 'Low box, instant rebound', '4 × 4', '2min'],
        ['Lateral bound', '', '4 × 5 each', '2min'],
        ['Hurdle hop', '', '4 × 5', '2min'],
        ['Pogo hops', '', '3 × 10', '60s'],
      ] }],
      notes: ['Then skills. This is the biggest jump day of the cycle — quality gates every set.'],
    },
    {
      id: 'w3_sun', label: 'Sun 30 Aug', title: 'Rest + taper gate', type: 'rest', out: 4,
      summary: 'Gate: entering the taper fresh, not flat. If flat — cut Week 4 volume further and hold intensity.',
      items: [['Readiness log', '', 'AM'], ['Back Insurance', '8 min', 'PM']],
    },
  ],
};

const LEWIS_W4 = {
  id: 'week4', title: 'Week 4 — Speed & Peak / Taper', subtitle: 'Mon 31 Aug – Sun 6 Sep · arrive fresh',
  purpose: 'Volume falls off a cliff, intensity and quality hold. He should feel underworked. That is correct. Finals Thu 3 – Sun 6.',
  meta: [
    { label: 'Days to finals', value: '3 → 0' },
    { label: 'Intensity', value: '55–65% · velocity governs' },
    { label: 'Plyo contacts', value: '60–80, quality only' },
    { label: 'FINALS', value: 'Thu 3 – Sun 6 Sep' },
  ],
  rules: {
    do: ['Short, sharp, fast', 'Isometrics continue — they cost nothing and protect everything', 'Back Insurance nightly', 'Feel underworked'],
    dont: ['Chasing fatigue', 'New drills', 'Anything past Wednesday except warm-up protocol'],
    note: 'Speed sits deliberately closest to the event — maximal-speed residuals run ~5 days.',
  },
  days: [
    {
      id: 'w4_mon', label: 'Mon 31 Aug', title: 'Lower — light at velocity', type: 'session', out: 3,
      workouts: [
        { id: 'iso', title: 'Pre-lift tendon', ex: [['Spanish squat isometric', '', '4 × 40s', '45s']] },
        { id: 'lift', title: 'Velocity', ex: [
          ['Back squat', '55–62.5kg — bar flies or it ends', '2 × 3', '2min'],
          ['Movement quality circuit', 'Positions, bracing, landing', '2 rounds', '—'],
        ] },
      ],
    },
    {
      id: 'w4_tue', label: 'Tue 1 Sep', title: 'COD — short and sharp', type: 'session', out: 2, dur: '20 min max',
      workouts: [{ id: 'court', title: 'Court', ex: [
        ['Sharp COD', 'Few reps, full intent', '3 rounds', '2min'],
        ['Form shooting', '', '1 × 15min', '—'],
      ] }],
    },
    {
      id: 'w4_wed', label: 'Wed 2 Sep', title: 'Full-body primer', type: 'session', out: 1,
      workouts: [{ id: 'lift', title: 'Primer', ex: [
        ['Power clean', '40kg — speed only', '3 × 2', '2min'],
        ['Push press', '32.5kg', '2 × 3', '2min'],
        ['Pogo hops', 'A handful, springy', '2 × 5', '60s'],
      ] }],
      notes: ['Last training of the cycle. Everything after this is warm-up protocol only.'],
    },
    {
      id: 'w4_thu', label: 'Thu 3 Sep', title: 'FINALS — Day 1', type: 'rest', out: 0,
      summary: 'Warm-up protocol only, no training. Back Insurance nightly through the finals.',
      items: [['Warm-up protocol', 'Long and gradual', 'Pre-game'], ['COMPETE', '', '—'], ['Back Insurance', '8 min', 'PM']],
    },
    {
      id: 'w4_fri', label: 'Fri 4 Sep', title: 'FINALS', type: 'rest',
      items: [['Warm-up protocol', '', 'Pre-game'], ['COMPETE', '', '—'], ['Back Insurance', '8 min', 'PM']],
    },
    {
      id: 'w4_sat', label: 'Sat 5 Sep', title: 'FINALS', type: 'rest',
      items: [['Warm-up protocol', '', 'Pre-game'], ['COMPETE', '', '—'], ['Back Insurance', '8 min', 'PM']],
    },
    {
      id: 'w4_sun', label: 'Sun 6 Sep', title: 'FINALS — final day', type: 'rest',
      summary: 'Everything in the plan pointed at these four days. Leave it on the court.',
      items: [['Warm-up protocol', '', 'Pre-game'], ['COMPETE', '', '—'], ['Back Insurance', 'One more time', 'PM']],
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
        LEWIS_W0,
        LEWIS_W1,
        LEWIS_W2,
        LEWIS_W3,
        LEWIS_W4,
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

// ── Hyrox Training (Integrated Program v2). Shared weekly template; only the
// Tuesday run intervals and Sunday half-Hyrox progress week to week.
const HY_ZONES = 'Zones: Easy/Z2 RPE 3–5 · Threshold RPE 7–8 · VO2 RPE 9–10 (Thursday only) · Hyrox RPE 5–7.';

const HY_MON = [
  { id: 'cardio', title: 'Cardio (first)', summary: '40 min before the lift', ex: [
    ['Ski erg', '1 min hard / 2 min easy pyramid', '1 × 20min', '—'],
    ['Row', 'Steady, RPE 5', '1 × 20min', '—'],
  ] },
  { id: 'handstand', title: 'Handstand skill (10–15 min)', ex: [
    ['Wall walks', '', '3 × 3', '60s'],
    ['Wall handstand hold', 'Chest to wall', '3 × max', '60s'],
    ['Pike push-ups', '', '3 × 5–8', '60s'],
  ] },
  { id: 'strength', title: 'Strength', ex: [
    ['Standing OHP', 'Main lift', '4 × 5', '2min'],
    ['Incline DB press', '', '4 × 8', '90s'],
  ] },
  { id: 'pump', title: 'Pump — supersets, 2 sets each, near failure', ex: [
    ['DB lateral raise', '', '2 × 12–15', '30s'],
    ['Cable lateral raise', '', '2 × 15', '30s'],
    ['Weighted dip', '', '2 × 8', '60s'],
    ['Cable chest fly', '', '2 × 12', '30s'],
    ['Tricep pushdown', '', '2 × 12', '30s'],
    ['Overhead cable ext', '', '2 × 12', '30s'],
    ['Face pulls', 'Shoulder balance — every upper day', '2 × 15', '30s'],
  ] },
  { id: 'core', title: 'Core', ex: [
    ['Hollow hold', '', '3 × max', '45s'],
    ['Pallof press', '', '3 × 10 each', '30s'],
  ] },
];

const HY_WED = [
  { id: 'cardio', title: 'Cardio (first)', summary: '40 min before the lift', ex: [
    ['Row', '1 min hard / 2 min easy', '1 × 20min', '—'],
    ['Ski erg', 'Steady', '1 × 20min', '—'],
  ] },
  { id: 'muscleup', title: 'Muscle-up skill (10–15 min)', ex: [
    ['False-grip ring row', '', '3 × 6', '60s'],
    ['Ring pull-up to chest', 'Pull high — sternum to rings', '3 × 5', '90s'],
    ['Ring dip', '', '3 × 5', '90s'],
    ['Transition drill', '', '3 × 3', '90s'],
  ] },
  { id: 'strength', title: 'Strength', ex: [
    ['Weighted pull-up', 'Main lift', '4 × 5', '2min'],
    ['Barbell / Pendlay row', 'Back thickness', '4 × 6', '2min'],
  ] },
  { id: 'pump', title: 'Pump — supersets, 2 sets each, near failure', ex: [
    ['Lat pulldown', '', '2 × 10', '30s'],
    ['Single-arm DB row', '', '2 × 10 each', '30s'],
    ['Face pulls', '', '2 × 15', '30s'],
    ['Reverse fly (cable)', '', '2 × 15', '30s'],
    ['Barbell curl', '', '2 × 10', '30s'],
    ['Hammer curl', '', '2 × 12', '30s'],
  ] },
  { id: 'core', title: 'Core', ex: [
    ['Ab wheel rollout', '', '3 × 8', '45s'],
    ['Hanging leg raise', '', '3 × 8', '45s'],
  ] },
];

const HY_THU = [
  { id: 'warmup', title: 'Warm-up (12–15 min, gradual)', ex: [
    ['Backward sled drag', 'Moderate', '3 × 20m', '60s'],
    ['Bike', 'Last 2 min build to RPE 7', '1 × 8min', '—'],
    ['Machine build-ups', '30 sec each', '3 × 30s', '30s'],
  ] },
  { id: 'vo2', title: 'VO2 main set — alternate A / B each week', summary: 'A: Norwegian 4×4 (row→ski→bike→row). B: 30/30 shuttles (ski→bike→row, ×10 = 1 block, 3 blocks).', ex: [
    ['Norwegian 4×4 (rotate machines)', 'RPE 9 — 90%+ max HR', '4 × 4min', '3min'],
    ['OR 30/30 shuttles (rotate machines)', 'RPE 10', '3 × 10', '3min'],
  ] },
  { id: 'finisher', title: 'Hyrox finisher — moderate, NOT another VO2 push', summary: '2 rounds, RPE 6–7', ex: [
    ['Sled push 20m → farmers 40m → wall balls 12 → sled drag 20m', 'RPE 6–7', '2 rounds', '—'],
  ] },
];

const HY_FRI = [
  { id: 'cardio', title: 'Cardio (45 min)', ex: [
    ['Boxing — heavy bag', 'Punch Lab', '1 × 30min', '—'],
    ['Ski or row', 'Easy', '1 × 15min', '—'],
  ] },
  { id: 'skills', title: 'Skill work (light, 10–15 min)', ex: [
    ['Front lever', 'Tuck hold → adv tuck → straddle', '3 × 20s', '60s'],
    ['Human flag', 'Vertical clutch flag → straddle', '3 × 10s each', '60s'],
  ] },
  { id: 'hips', title: 'Hip / glute — monkey foot (light)', summary: 'Running stability + knee support', ex: [
    ['Monkey-foot hip extension', 'Standing cable kickback — glute', '3 × 12 each', '45s'],
    ['Monkey-foot hip abduction', 'Standing cable — glute med', '3 × 12 each', '45s'],
  ] },
  { id: 'mobility', title: 'Mobility (15 min)', ex: [
    ['Couch stretch', '', '1 × 60s each', '—'],
    ['Supine hamstring', '', '1 × 45s each', '—'],
    ['90/90 hip switches', '', '1 × 10 each', '—'],
    ['Ankle dorsiflexion', '15 pulses each', '1 × 15 each', '—'],
    ["World's greatest stretch", '', '1 × 6 each', '—'],
    ['Pigeon', '', '1 × 60s each', '—'],
    ['Cat-cow', '', '1 × 10', '—'],
    ['Deep squat hold', '', '3 × 20s', '—'],
  ] },
];

const HY_SAT = [
  { id: 'cardio', title: 'Cardio (first) — machines only', summary: '40 min, keep legs fresh for snatch', ex: [
    ['Bike', 'Easy', '1 × 20min', '—'],
    ['Ski erg', 'Steady', '1 × 20min', '—'],
  ] },
  { id: 'oly', title: 'Oly — snatch focus (fresh legs)', ex: [
    ['Power snatch', 'Catch above parallel', '5 × 2', '2min'],
    ['Snatch pull', '', '3 × 3', '2min'],
    ['Overhead squat or snatch balance', 'Only if OH position is solid', '3 × 5', '2min'],
  ] },
  { id: 'strength', title: 'Strength — squat day', ex: [
    ['Front squat', 'Knee-friendlier torso angle', '4 × 6', '2min'],
    ['RDL', '', '3 × 8', '2min'],
    ['Walking lunge', 'Only if knee stays quiet', '3 × 10 each', '90s'],
    ['GHD leg curl', '', '3 × 8', '90s'],
    ['Calf raise', '', '3 × 15', '60s'],
  ] },
];

const HY_TUE_LIFT = [
  { id: 'oly', title: 'Oly — light (legs pre-fatigued from the run)', ex: [
    ['Power clean', 'Technical, moderate load only', '4 × 2', '2min'],
    ['Push jerk', '', '3 × 3', '2min'],
  ] },
  { id: 'strength', title: 'Strength & hypertrophy', ex: [
    ['Trap-bar or Romanian DL', 'Hinge-first — knee friendly', '4 × 6', '2min'],
    ['Rear-foot-elevated split squat', 'Running strength builder', '3 × 8 each', '90s'],
    ['Nordic curl', '', '3 × 5', '90s'],
    ['Back extension', '', '3 × 12', '60s'],
    ['Monkey-foot hip flexion', 'Standing on cable — hip drive for running', '3 × 12 each', '45s'],
    ['Calf raise', '', '3 × 15', '60s'],
  ] },
];

function hyroxWeek(n, o) {
  const id = (d) => 'hx' + n + '_' + d;
  return {
    id: 'hx_w' + n,
    title: 'Week ' + n + ' — ' + o.tag,
    subtitle: o.subtitle,
    meta: [
      { label: 'Tue run', value: o.tueLabel },
      { label: 'Sun', value: o.sunLabel },
      { label: 'VO2', value: 'Thu machines' },
      { label: 'Runs', value: 'Tue + Sun' },
    ],
    rules: {
      do: ['Cardio before every lift', 'Morning swelling check', 'One new stressor at a time', 'Daily rehab + sled'],
      dont: ['Progress if morning swelling', 'Running on Thursday', 'Two new stressors at once'],
      note: 'Cardio ALWAYS before the lift. Any morning swelling = don’t progress that week, repeat it.',
    },
    days: [
      {
        id: id('mon'), label: 'Mon', title: 'Upper Push + Handstand + Pump', type: 'session', workouts: HY_MON,
        notes: ['Warm-up: shoulder dislocates ×10 · wall angels ×10.', 'Sled ×6 light activation to finish.'],
      },
      {
        id: id('tue'), label: 'Tue', title: 'Run + Lower + Oly light', type: 'session',
        summary: 'Cardio first: run intervals, then bike 20 easy to flush the legs before lifting.',
        workouts: [o.tueRun, ...HY_TUE_LIFT],
        notes: ['Warm-up: full rehab + sled ×6 progressive + empty-bar prep.', 'Legs pre-fatigued from the run — keep Oly technique-focused. Save load PRs for Saturday.'],
      },
      {
        id: id('wed'), label: 'Wed', title: 'Upper Pull + Muscle-up + Pump', type: 'session', workouts: HY_WED,
        notes: ['Warm-up: band pull-aparts ×20 · scap pull-ups ×10.', 'Sled ×6 light activation.'],
      },
      {
        id: id('thu'), label: 'Thu', title: 'VO2 Max — machine intervals', type: 'session', rpe: 10,
        summary: 'Your dedicated VO2 session — it should feel horrible. 90%+ max HR for cumulative minutes.',
        workouts: HY_THU,
        notes: [HY_ZONES, 'If you can talk during the work intervals you are not there. Alternate Format A (Norwegian 4×4) and Format B (30/30) week to week. No running on Thursday.'],
      },
      {
        id: id('fri'), label: 'Fri', title: 'Boxing + Mobility + Skills', type: 'session', workouts: HY_FRI,
        notes: ['Sled ×6 very light.'],
      },
      {
        id: id('sat'), label: 'Sat', title: 'Lower + Oly (snatch focus)', type: 'session',
        summary: 'Cardio first: bike 20 + ski 20 — machines only to keep the legs fresh for snatch. This is your squat day.',
        workouts: HY_SAT,
        notes: ['Warm-up: rehab + sled ×6 + snatch complex empty bar ×3.'],
      },
      {
        id: id('sun'), label: 'Sun', title: 'Half-Hyrox Simulation', type: 'session', rpe: 6,
        summary: o.sunSummary,
        workouts: [o.sunWorkout],
        notes: ['Your favourite — untouched pattern. Start swapping bike legs for real runs per the progression.'],
      },
    ],
  };
}

const HYROX_WEEKS = [
  hyroxWeek(1, {
    tag: 'Build', subtitle: 'Tue 3×800m · bike subs Sunday runs', tueLabel: '3 × 800m RPE 7', sunLabel: 'Bike subs runs',
    tueRun: { id: 'run', title: 'Run intervals — threshold', summary: 'RPE 7 — short sentences only. ~15–20 min inc. walks.', ex: [
      ['Run — 3 × 800m', 'RPE 7, 90 sec walk between', '3 × 800m', '90s'],
      ['Bike', 'Easy — flush the legs before lifting', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. Bike subs all runs. 4 rounds; stations rotate: ski 500m · sled push 25m · row 500m · farmers 50m · wall balls 20 · sled drag 25m · lunges 20m.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (bike subs runs)', ex: [['Bike 1km → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
  hyroxWeek(2, {
    tag: 'Build', subtitle: 'Tue 3×1km · bike subs Sunday runs', tueLabel: '3 × 1km RPE 7', sunLabel: 'Bike subs runs',
    tueRun: { id: 'run', title: 'Run intervals — threshold', summary: 'RPE 7 — short sentences only.', ex: [
      ['Run — 3 × 1km', 'RPE 7, 90 sec walk between', '3 × 1km', '90s'],
      ['Bike', 'Easy — flush the legs', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. Bike subs all runs. 4 rounds, stations rotating.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (bike subs runs)', ex: [['Bike 1km → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
  hyroxWeek(3, {
    tag: 'Progress', subtitle: 'Tue 4×1km · real runs enter Sunday', tueLabel: '4 × 1km RPE 7–8', sunLabel: '500m real runs',
    tueRun: { id: 'run', title: 'Run intervals — threshold', summary: 'RPE 7–8, sustainable.', ex: [
      ['Run — 4 × 1km', 'RPE 7–8, 90 sec walk between', '4 × 1km', '90s'],
      ['Bike', 'Easy — flush the legs', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. Add 500m REAL runs between 2 of the stations; bike the rest. 4 rounds.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (500m real runs ×2)', ex: [['1km bike/run → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
  hyroxWeek(4, {
    tag: 'Progress', subtitle: 'Tue 2×2km continuous · 1km real runs Sunday', tueLabel: '2 × 2km RPE 7', sunLabel: '1km real runs',
    tueRun: { id: 'run', title: 'Run — continuous threshold', summary: 'RPE 7, continuous.', ex: [
      ['Run — 2 × 2km continuous', 'RPE 7', '2 × 2km', '3min'],
      ['Bike', 'Easy — flush the legs', '1 × 20min', '—'],
    ] },
    sunSummary: 'RPE 5–6. 1km REAL runs between 4 stations; build toward full 8×1km over coming weeks.',
    sunWorkout: { id: 'sim', title: 'Half-Hyrox × 4 (1km real runs)', ex: [['1km run → station', 'RPE 5–6', '4 rounds', '—']] },
  }),
];

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
      id: 'hyrox', tag: 'Training', title: 'Hyrox Training', dates: 'Post-holiday · 4-week build',
      purpose: 'Integrated Program v2 — Hyrox conditioning + skills + Oly + shape. Runs Tue + Sun, VO2 on Thursday machines, cardio always before the lift.',
      weeks: HYROX_WEEKS,
    },
  ],
};

export const PLANS = { lewis: LEWIS_PLAN, paul: PAUL_PLAN };
