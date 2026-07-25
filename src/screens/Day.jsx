import { DAILY } from '../data/plan.js';
import { exercisesOf, parseSets } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

export default function Day() {
  const { day, actions, record } = useTracker();
  const rec = record(day.id);
  const exs = exercisesOf(day);
  const items = day.items || [];
  const done = !!rec.completed;

  const meta = day.type === 'session'
    ? [day.dur, day.rpe ? 'RPE cap ' + day.rpe : ''].filter(Boolean).join(' · ')
    : 'No training';

  return (
    <div className="screen day">
      <div className="day__head">
        <button type="button" className="icon-btn" onClick={actions.closeDay} aria-label="Back">←</button>
        <div className="day__head-body">
          <div className="day__label">{day.label} · {day.out} days out</div>
          <div className="day__meta">{meta}</div>
        </div>
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

        {exs.length ? (
          <div className="list">
            <div className="eyebrow">{exs.length} exercises · tap to jump in</div>
            {exs.map((e, i) => {
              const all = (rec.sets[i] || []).filter((s) => s && s.done).length >= parseSets(e.scheme);
              return (
                <button
                  key={e.name + i}
                  type="button"
                  className={'row ex-row' + (all ? ' row--on' : '')}
                  onClick={() => actions.startSession(i)}
                >
                  <span className="row__box">{all ? '✓' : String(i + 1)}</span>
                  <span className="row__body">
                    <span className="row__name">{(e.pair ? e.pair + ' ' : '') + e.name}</span>
                    <span className="ex-row__load">{e.load}</span>
                  </span>
                  <span className="ex-row__scheme">{e.scheme}</span>
                </button>
              );
            })}
          </div>
        ) : null}

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

        {exs.length ? (
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
