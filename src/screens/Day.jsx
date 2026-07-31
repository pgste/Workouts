import { useState } from 'react';
import { exercisesOf, parseSets, workoutsOf } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

export default function Day() {
  const { day, actions, record, plan } = useTracker();
  const [shared, setShared] = useState(false);

  // The address bar already holds this day's deep link — share that.
  const share = async () => {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title: day.title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch { /* share sheet dismissed / no clipboard */ }
  };
  const DAILY = plan.daily;
  const rec = record(day.id);
  const workouts = workoutsOf(day);
  const exCount = exercisesOf(day).length;
  const items = day.items || [];
  const done = !!rec.completed;
  const multi = workouts.length > 1;

  const meta = day.type === 'session'
    ? [day.dur, day.rpe ? 'RPE cap ' + day.rpe : ''].filter(Boolean).join(' · ')
    : 'No training';

  return (
    <div className="screen day">
      <div className="day__head">
        <button type="button" className="icon-btn" onClick={actions.closeDay} aria-label="Back">←</button>
        <div className="day__head-body">
          <div className="day__label">{day.label}{day.out != null ? ' · ' + day.out + ' days out' : ''}</div>
          <div className="day__meta">{meta}</div>
        </div>
        <button type="button" className="pill-btn" onClick={share} aria-label="Share link to this day">
          {shared ? 'Copied ✓' : 'Share'}
        </button>
      </div>

      <div className="day__body">
        <div className="day__title">{day.title}</div>

        {day.summary ? <div className="day__summary">{day.summary}</div> : null}

        {items.length ? (
          <div className="list">
            {items.map((it, i) => {
              const on = !!rec.ticks['i' + i];
              const when = it[2] === '—' ? '' : it[2] || '';
              return (
                <button
                  key={it[0]}
                  type="button"
                  className={'row' + (on ? ' row--on' : '')}
                  onClick={() => actions.tick(day.id, 'i' + i)}
                >
                  <span className="row__box">✓</span>
                  <span className="row__body">
                    <span className="row__name">{it[0]}</span>
                    <span className="row__detail">{it[1] || ''}</span>
                  </span>
                  <span className="row__when">{when}</span>
                </button>
              );
            })}
          </div>
        ) : null}

        {workouts.map((w) => (
          <div className="list workout" key={w.id || w.title}>
            {multi ? (
              <div className="workout__head">
                <div className="workout__title">{w.title}</div>
                {w.summary ? <div className="workout__sub">{w.summary}</div> : null}
              </div>
            ) : (
              <div className="eyebrow">{exCount} exercises · tap to jump in</div>
            )}
            {w.exercises.map((e) => {
              const all = (rec.sets[e.idx] || []).filter((s) => s && s.done).length >= parseSets(e.scheme);
              return (
                <button
                  key={e.name + e.idx}
                  type="button"
                  className={'row ex-row' + (all ? ' row--on' : '')}
                  onClick={() => actions.startSession(e.idx)}
                >
                  <span className="row__box">{all ? '✓' : String(e.idx + 1)}</span>
                  <span className="row__body">
                    <span className="row__name">{(e.pair ? e.pair + ' ' : '') + e.name}</span>
                    <span className="ex-row__load">{e.load}</span>
                  </span>
                  <span className="ex-row__scheme">{e.scheme}</span>
                </button>
              );
            })}
          </div>
        ))}

        {day.optional ? (
          <div className="optional">
            <div className="optional__head">
              <div className="optional__title">{day.optional.title}</div>
              <div className="optional__limit">{day.optional.limit}</div>
            </div>
            <div className="optional__body">{day.optional.body}</div>
          </div>
        ) : null}

        {(day.notes || []).map((n) => <div className="note" key={n}>{n}</div>)}

        <div className="day__daily">
          <div className="day__daily-head">
            <div className="day__daily-name">{DAILY.name}</div>
            <div className="day__daily-mins">{DAILY.mins}</div>
          </div>
          <div className="day__daily-chips">
            {DAILY.steps.map((s, i) => {
              const on = !!rec.ticks['bi' + i];
              return (
                <button
                  key={s}
                  type="button"
                  className={'tick-chip' + (on ? ' tick-chip--on' : '')}
                  onClick={() => actions.tick(day.id, 'bi' + i)}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {exCount ? (
          <button type="button" className="primary-btn day__start" onClick={() => actions.startSession(0)}>
            {Object.keys(rec.sets || {}).length ? 'Continue session' : 'Start session'}
          </button>
        ) : null}

        <button
          type="button"
          className={'day__done' + (done ? ' day__done--on' : '')}
          onClick={() => actions.completeDay(day, !done)}
        >
          {done ? 'Day complete ✓' : 'Mark day complete'}
        </button>
      </div>
    </div>
  );
}
