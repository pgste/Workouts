import { createContext, useContext, useEffect, useMemo, useReducer, useRef } from 'react';
import { PLANS, REAL_ATHLETES } from '../data/plan.js';
import { countDoneSets, exercisesOf, ymd } from '../lib/plan.js';
import { hashOf, parseHash } from '../lib/route.js';
import {
  decodeSnapshot, encodeSnapshot, loadAthlete, loadProgress,
  saveAthlete, saveProgress,
} from '../lib/storage.js';

const TrackerContext = createContext(null);

const init = () => ({
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
  ...loadProgress(),
  // A deep link wins over the remembered athlete — that's what makes shared
  // links land on the right screen.
  ...(typeof window !== 'undefined' ? parseHash(window.location.hash) || {} : {}),
});

/** Clone the day record for `dayId` under the current athlete, mutate, store. */
function withRecord(state, dayId, fn) {
  const key = state.athlete + ':' + dayId;
  const prev = state.log[key] || {};
  const rec = { ...prev, sets: { ...(prev.sets || {}) }, ticks: { ...(prev.ticks || {}) } };
  fn(rec);
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
      const row = { ...(state.readiness[action.key] || {}), [action.field]: action.value };
      return { ...state, readiness: { ...state.readiness, [action.key]: row } };
    }

    case 'add-court':
      return { ...state, court: [...state.court, action.entry], added: true };

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

  // Persist whenever tracked data changes.
  useEffect(() => {
    saveProgress({ log: state.log, court: state.court, readiness: state.readiness });
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
    if (popping.current) { popping.current = false; return; }
    const entry = { __nav: JSON.parse(navKey) };
    const url = hashOf(state) || window.location.pathname + window.location.search;
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
        const patch = parseHash(window.location.hash);
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
    };
  }, []);

  const value = useMemo(() => {
    // Coach view reads whichever athlete it points at (defaulting to the first
    // real athlete); everyone else reads their own plan.
    const viewingId = state.athlete === 'coach' ? (state.coachView || REAL_ATHLETES[0].id) : state.athlete;
    const plan = (viewingId && PLANS[viewingId]) || null;
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
