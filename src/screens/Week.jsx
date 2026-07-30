import { exercisesOf } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

function dayMeta(d) {
  if (d.type === 'session') {
    const n = exercisesOf(d).length;
    const w = (d.workouts || []).length;
    return [d.dur, d.rpe ? 'RPE cap ' + d.rpe : '', w > 1 ? w + ' workouts' : null, n + ' exercises']
      .filter(Boolean)
      .join(' · ');
  }
  return d.type === 'travel' ? 'Travel day · checklist' : 'Programmed rest';
}

export default function Week() {
  const { week, block, actions, record, plan } = useTracker();
  const DAILY = plan.daily;
  const days = week.days || [];
  const hasRules = !!week.rules;

  return (
    <div className="screen week">
      <div className="week__nav">
        <button type="button" className="icon-btn" onClick={actions.backToWeeks} aria-label="Back">←</button>
        <div className="week__block-tag">{block.tag}</div>
      </div>

      <div className="week__head">
        <div className="week__title">{week.title}</div>
        {week.subtitle ? <div className="week__dates">{week.subtitle}</div> : null}
        {week.purpose ? <div className="quote week__purpose">{week.purpose}</div> : null}
      </div>

      {week.meta ? (
        <div className="meta-grid">
          {week.meta.map((m) => (
            <div className="meta" key={m.label}>
              <div className="meta__label">{m.label}</div>
              <div className="meta__value">{m.value}</div>
            </div>
          ))}
        </div>
      ) : null}

      {hasRules ? (
        <div className="rules">
          <div className="rules__group">
            <div className="rules__label rules__label--do">Do</div>
            <div className="rules__chips">
              {week.rules.do.map((r) => <span className="chip chip--do" key={r}>{r}</span>)}
            </div>
          </div>
          <div className="rules__group">
            <div className="rules__label rules__label--dont">Do not</div>
            <div className="rules__chips">
              {week.rules.dont.map((r) => <span className="chip chip--dont" key={r}>{r}</span>)}
            </div>
          </div>
          {week.rules.note ? <div className="rules__note">{week.rules.note}</div> : null}
        </div>
      ) : null}

      {days.length ? (
        <div className="week__days">
          <div className="eyebrow">The week</div>
          {days.map((d) => {
            const done = !!record(d.id).completed;
            const rest = d.type !== 'session';
            return (
              <button
                key={d.id}
                type="button"
                className={'day-card' + (rest ? ' day-card--rest' : '') + (done ? ' day-card--done' : '')}
                onClick={() => actions.set({ day: d.id, exIdx: 0 })}
              >
                <div className="day-card__mark">{done ? '✓' : rest ? '·' : '▲'}</div>
                <div className="day-card__body">
                  <div className="day-card__label">{d.label}</div>
                  <div className="day-card__title">{d.title}</div>
                  <div className="day-card__meta">{dayMeta(d)}</div>
                </div>
                {d.out != null ? <div className="day-card__out">{d.out}<br />days out</div> : null}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="empty__card">
          <div className="empty__card-title">Plan not written yet</div>
          <div className="empty__card-body">
            This week unlocks when its sessions are added. Days, workouts and the exercise breakdowns appear here automatically.
          </div>
        </div>
      )}

      <div className="daily-card">
        <div className="daily-card__head">
          <div className="daily-card__name">{DAILY.name}</div>
          <div className="daily-card__mins">{DAILY.mins} · every day</div>
        </div>
        <div className="daily-card__steps">{DAILY.steps.join(' → ')}</div>
      </div>
    </div>
  );
}
