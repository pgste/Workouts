import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { PLANS as BUNDLED_PLANS, REAL_ATHLETES } from '../data/plan.js';
import { firebaseConfigured, initFirebase } from '../lib/firebase.js';
import { countDoneSets, exercisesOf, ymd } from '../lib/plan.js';
import { hashOf, parseHash } from '../lib/route.js';
import {
  decodeSnapshot, encodeSnapshot, loadAthlete, loadPlanDocs, loadProgress,
  saveAthlete, savePlanDocs, saveProgress,
} from '../lib/storage.js';
import { createSyncEngine, fetchProfile } from '../lib/sync.js';

const TrackerContext = createContext(null);

/** Bundled plans are the floor; published Firestore plan docs overlay them.
 *  Plan docs carry the plan as a JSON string (`json`) because the object
 *  contains exercise tuples — arrays of arrays — which Firestore can't store
 *  as native fields. */
function plansWith(docs) {
  const plans = { ...BUNDLED_PLANS };
  for (const [aid, d] of Object.entries(docs || {})) {
    try {
      if (d && d.json) plans[aid] = JSON.parse(d.json);
    } catch { /* corrupt doc — keep the bundled plan */ }
  }
  return plans;
}

const init = () => {
  const plans = plansWith(loadPlanDocs());
  const progress = loadProgress();
  // Older court entries predate sync ids — stamp them once so pushes are idempotent.
  progress.court = progress.court.map((e) => (e && !e.id ? { ...e, id: crypto.randomUUID() } : e));
  return {
    athlete: loadAthlete(),
    tab: 'plan',
    block: null,
    week: null,
    day: null,
    coachView: null,
    session: false,
    exIdx: 0,
    rest: 0,
    overlay: null,
    complete: null,
    draft: { type: 'Practice', mins: 60, rpe: 6 },
    exported: false,
    added: false,
    importText: '',
    imported: 0,
    resetArm: false,
    user: null,
    profile: null,
    plans,
    ...progress,
    // A deep link wins over the remembered athlete — that's what makes shared
    // links land on the right screen.
    ...(typeof window !== 'undefined' ? parseHash(window.location.hash, plans) || {} : {}),
  };
};

/** Clone the day record for `dayId` under the current athlete, mutate, store.
 *  Every mutation stamps updatedAt so cross-device sync can last-write-win. */
function withRecord(state, dayId, fn) {
  const key = state.athlete + ':' + dayId;
  const prev = state.log[key] || {};
  const rec = { ...prev, sets: { ...(prev.sets || {}) }, ticks: { ...(prev.ticks || {}) } };
  fn(rec);
  rec.updatedAt = Date.now();
  return { ...state, log: { ...state.log, [key]: rec } };
}

function reducer(state, action) {
  switch (action.type) {
    case 'set':
      return { ...state, ...action.patch };

    case 'draft':
      return { ...state, draft: { ...state.draft, ...action.patch }, added: false };

    case 'tick-rest':
      return state.rest > 0 ? { ...state, rest: state.rest - 1 } : state;

    case 'prev-ex':
      return { ...state, exIdx: Math.max(0, state.exIdx - 1), rest: 0 };

    case 'next-ex':
      return { ...state, exIdx: state.exIdx + 1, rest: 0 };

    case 'tick':
      return withRecord(state, action.dayId, (rec) => {
        rec.ticks[action.key] = !rec.ticks[action.key];
      });

    case 'set-field':
      return withRecord(state, action.dayId, (rec) => {
        const arr = [...(rec.sets[state.exIdx] || [])];
        arr[action.index] = { ...(arr[action.index] || {}), [action.field]: action.value };
        rec.sets[state.exIdx] = arr;
      });

    case 'toggle-set': {
      let on = false;
      const next = withRecord(state, action.dayId, (rec) => {
        const arr = [...(rec.sets[state.exIdx] || [])];
        const cur = { ...(arr[action.index] || {}) };
        cur.done = !cur.done;
        on = cur.done;
        arr[action.index] = cur;
        rec.sets[state.exIdx] = arr;
      });
      return { ...next, rest: on ? action.rest : 0 };
    }

    case 'complete-day':
      return withRecord(state, action.day.id, (rec) => {
        const day = action.day;
        rec.completed = action.on;
        rec.date = ymd(new Date());
        rec.name = day.title + ' · ' + day.label;
        rec.detail = day.type === 'session'
          ? countDoneSets(rec.sets) + ' sets logged · ' + exercisesOf(day).length + ' exercises'
          : 'Rest day ticked off';
      });

    case 'readiness': {
      // _ts is a reserved sync stamp, filtered out of summaries.
      const row = { ...(state.readiness[action.key] || {}), [action.field]: action.value, _ts: Date.now() };
      return { ...state, readiness: { ...state.readiness, [action.key]: row } };
    }

    case 'add-court': {
      const entry = action.entry.id ? action.entry : { ...action.entry, id: crypto.randomUUID() };
      return { ...state, court: [...state.court, entry], added: true };
    }

    // Strictly-newer remote data from the sync engine — already filtered, so
    // merging is a plain overlay (court entries arrive deduped by id).
    case 'remote-merge':
      return {
        ...state,
        log: action.patch.log ? { ...state.log, ...action.patch.log } : state.log,
        readiness: action.patch.readiness ? { ...state.readiness, ...action.patch.readiness } : state.readiness,
        court: action.patch.court ? [...state.court, ...action.patch.court] : state.court,
      };

    case 'set-plans':
      return { ...state, plans: plansWith(action.docs) };

    case 'import':
      return {
        ...state,
        log: { ...state.log, ...(action.data.log || {}) },
        court: [...state.court, ...(action.data.court || [])],
        readiness: { ...state.readiness, ...(action.data.readiness || {}) },
        imported: 1,
        importText: '',
      };

    case 'reset':
      return { ...state, log: {}, court: [], readiness: {}, resetArm: false, overlay: null };

    default:
      return state;
  }
}

export function TrackerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, init);
  const exportTimer = useRef(null);

  // Live refs for callbacks that outlive a render (popstate, sync engine).
  const plansRef = useRef(state.plans);
  plansRef.current = state.plans;
  const progressRef = useRef(null);
  progressRef.current = { log: state.log, court: state.court, readiness: state.readiness };

  // Persist whenever tracked data changes.
  useEffect(() => {
    saveProgress({ log: state.log, court: state.court, readiness: state.readiness });
  }, [state.log, state.court, state.readiness]);

  // Firebase sync. Auth state drives the engine: signed-in + mapped profile →
  // live listeners + push; anything else → local-only, exactly as before.
  const engineRef = useRef(null);
  useEffect(() => {
    if (!firebaseConfigured) return undefined;
    let offAuth = null;
    let cancelled = false;
    initFirebase().then((fb) => {
      if (!fb || cancelled) return;
      offAuth = fb.authMod.onAuthStateChanged(fb.auth, async (u) => {
        if (engineRef.current) { engineRef.current.stop(); engineRef.current = null; }
        if (!u) { dispatch({ type: 'set', patch: { user: null, profile: null } }); return; }
        const profile = await fetchProfile(fb, u.uid);
        dispatch({ type: 'set', patch: { user: { uid: u.uid, email: u.email }, profile } });
        if (profile && profile.athleteId) {
          engineRef.current = createSyncEngine({
            fb,
            profile,
            athletes: [...REAL_ATHLETES.map((a) => a.id), 'coach'],
            getLocal: () => progressRef.current,
            onPatch: (patch) => dispatch({ type: 'remote-merge', patch }),
            onPlans: (docs) => { savePlanDocs(docs); dispatch({ type: 'set-plans', docs }); },
          });
        }
      });
    });
    return () => {
      cancelled = true;
      if (offAuth) offAuth();
      if (engineRef.current) { engineRef.current.stop(); engineRef.current = null; }
    };
  }, []);

  // Push local changes (debounced; Firestore queues them while offline).
  const pushTimer = useRef(null);
  useEffect(() => {
    if (!engineRef.current) return undefined;
    clearTimeout(pushTimer.current);
    pushTimer.current = setTimeout(() => {
      if (engineRef.current) engineRef.current.push(progressRef.current);
    }, 800);
    return () => clearTimeout(pushTimer.current);
  }, [state.log, state.court, state.readiness]);

  // Rest countdown — a no-op dispatch while no timer is running.
  useEffect(() => {
    const t = setInterval(() => dispatch({ type: 'tick-rest' }), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => () => clearTimeout(exportTimer.current), []);

  // Browser history + deep links. Nav state is mirrored into history entries
  // AND into the URL hash (#/athlete/block/week/day), so any screen is a
  // shareable link and back/forward walk the hierarchy. Hash-based because
  // path routing would 404 on the Pages sub-path. Ephemeral state (session,
  // overlays) lives only in the history entry, not the URL. `popping` stops a
  // restore from pushing a fresh entry back.
  const popping = useRef(false);
  const navKey = JSON.stringify({
    athlete: state.athlete, tab: state.tab, block: state.block, week: state.week, day: state.day,
    coachView: state.coachView, session: state.session, overlay: state.overlay, complete: state.complete,
  });
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const entry = { __nav: JSON.parse(navKey) };
    const url = hashOf(state) || window.location.pathname + window.location.search;
    if (popping.current) {
      popping.current = false;
      // A hash-navigation entry the browser created (followed link, edited
      // hash) isn't ours yet — adopt it, or the next change would replace it
      // away and eat one step of history.
      if (!(window.history.state && window.history.state.__nav)) {
        window.history.replaceState(entry, '', url);
      }
      return;
    }
    if (window.history.state && window.history.state.__nav) {
      window.history.pushState(entry, '', url);
    } else {
      window.history.replaceState(entry, '', url);
    }
  }, [navKey]);
  useEffect(() => {
    const onPop = (e) => {
      popping.current = true;
      const nav = e.state && e.state.__nav;
      if (nav) {
        dispatch({ type: 'set', patch: nav });
      } else {
        // No entry of ours (hand-edited hash, or a link followed in-page):
        // parse the URL instead.
        const patch = parseHash(window.location.hash, plansRef.current);
        dispatch({
          type: 'set',
          patch: patch || { athlete: null, coachView: null, block: null, week: null, day: null, session: false, overlay: null, complete: null, tab: 'plan' },
        });
      }
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const actions = useMemo(() => {
    const set = (patch) => dispatch({ type: 'set', patch });
    return {
      set,
      pickAthlete: (id) => { saveAthlete(id); set({ athlete: id, tab: 'plan', block: null, day: null }); },
      goHome: () => { saveAthlete(null); set({ athlete: null, block: null, day: null, session: false, overlay: null, complete: null, tab: 'plan' }); },
      setTab: (tab) => set({ tab }),
      openBlock: (id) => set({ block: id, week: null, day: null }),
      openWeek: (weekId) => set({ week: weekId, day: null }),
      backToWeeks: () => set({ week: null, day: null }),
      setCoachView: (id) => set({ coachView: id, block: null, week: null, day: null }),
      backToBlocks: () => set({ block: null, week: null, day: null }),
      openDay: (blockId, weekId, dayId) => set({ block: blockId, week: weekId, day: dayId, tab: 'plan', exIdx: 0 }),
      closeDay: () => set({ day: null }),
      startSession: (exIdx = 0) => set({ session: true, exIdx, rest: 0 }),
      closeSession: () => set({ session: false, rest: 0 }),
      prevEx: () => dispatch({ type: 'prev-ex' }),
      nextEx: () => dispatch({ type: 'next-ex' }),
      skipRest: () => set({ rest: 0 }),
      openSettings: () => set({ overlay: 'settings', resetArm: false }),
      closeSettings: () => set({ overlay: null, resetArm: false }),
      draft: (patch) => dispatch({ type: 'draft', patch }),
      tick: (dayId, key) => dispatch({ type: 'tick', dayId, key }),
      setSetField: (dayId, index, field, value) => dispatch({ type: 'set-field', dayId, index, field, value }),
      toggleSet: (dayId, index, rest) => dispatch({ type: 'toggle-set', dayId, index, rest }),
      completeDay: (day, on) => dispatch({ type: 'complete-day', day, on }),
      setReadiness: (key, field, value) => dispatch({ type: 'readiness', key, field, value }),
      addCourt: (entry) => dispatch({ type: 'add-court', entry }),
      importSnapshot: (code) => {
        try {
          dispatch({ type: 'import', data: decodeSnapshot(code) });
        } catch {
          set({ imported: -1 });
        }
      },
      exportSnapshot: (payload) => {
        try { navigator.clipboard.writeText(encodeSnapshot(payload)); } catch { /* no clipboard */ }
        set({ exported: true });
        clearTimeout(exportTimer.current);
        exportTimer.current = setTimeout(() => set({ exported: false }), 2200);
      },
      resetDevice: () => dispatch({ type: 'reset' }),
      signIn: async () => {
        const fb = await initFirebase();
        if (!fb) return;
        try {
          await fb.authMod.signInWithPopup(fb.auth, new fb.authMod.GoogleAuthProvider());
        } catch { /* popup dismissed or blocked */ }
      },
      signOutUser: async () => {
        const fb = await initFirebase();
        if (fb) fb.authMod.signOut(fb.auth);
      },
    };
  }, []);

  const value = useMemo(() => {
    // Coach view reads whichever athlete it points at (defaulting to the first
    // real athlete); everyone else reads their own plan.
    const viewingId = state.athlete === 'coach' ? (state.coachView || REAL_ATHLETES[0].id) : state.athlete;
    const plan = (viewingId && state.plans[viewingId]) || null;
    const blocks = plan ? plan.blocks : [];
    const block = blocks.find((b) => b.id === state.block) || null;
    const weeks = block ? (block.weeks || []) : [];
    const week = weeks.find((w) => w.id === state.week) || null;
    const day = week ? (week.days || []).find((d) => d.id === state.day) || null : null;
    const record = (dayId) => state.log[state.athlete + ':' + dayId] || { sets: {}, ticks: {} };
    return { state, actions, plan, viewingId, block, weeks, week, day, record };
  }, [state, actions]);

  return <TrackerContext.Provider value={value}>{children}</TrackerContext.Provider>;
}

export function useTracker() {
  const ctx = useContext(TrackerContext);
  if (!ctx) throw new Error('useTracker must be used inside <TrackerProvider>');
  return ctx;
}
