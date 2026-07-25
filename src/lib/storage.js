export const KEY = 'cs.progress.v3';
export const WHO_KEY = KEY + '.who';

const EMPTY = { log: {}, court: [], readiness: {} };

export function loadProgress() {
  try {
    const d = JSON.parse(localStorage.getItem(KEY) || '{}');
    return { log: d.log || {}, court: d.court || [], readiness: d.readiness || {} };
  } catch {
    return { ...EMPTY };
  }
}

export function saveProgress({ log, court, readiness }) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ log, court, readiness }));
  } catch {
    /* private mode / quota — the app still works for this session */
  }
}

export function loadAthlete() {
  try {
    return localStorage.getItem(WHO_KEY);
  } catch {
    return null;
  }
}

export function saveAthlete(id) {
  try {
    if (id) localStorage.setItem(WHO_KEY, id);
    else localStorage.removeItem(WHO_KEY);
  } catch {
    /* ignore */
  }
}

/** Bytes this device is holding — measured off the same payload that gets written. */
export function snapshotSize({ log, court, readiness }) {
  return JSON.stringify({ log, court, readiness }).length;
}

const toBase64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  bytes.forEach((b) => { bin += String.fromCharCode(b); });
  return btoa(bin);
};

const fromBase64 = (b64) => new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));

/** A snapshot code — how progress travels between phones until there's a database. */
export function encodeSnapshot(payload) {
  return toBase64(JSON.stringify(payload));
}

export function decodeSnapshot(code) {
  return JSON.parse(fromBase64(code.trim()));
}
