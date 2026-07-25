import { countDoneSets, exercisesOf, parseReps, parseSets, restSecs } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

export default function Session() {
  const { state, block, day, actions, record } = useTracker();
  const rec = record(day.id);
  const exs = exercisesOf(day);
  const idx = Math.min(state.exIdx, exs.length - 1);
  const ex = exs[idx];
  const nSets = parseSets(ex.scheme);
  const reps = parseReps(ex.scheme);
  const logged = rec.sets[idx] || [];
  const isLast = idx >= exs.length - 1;

  const pairWith = ex.pair
    ? exs.filter((o) => o.pair && o.pair[0] === ex.pair[0] && o.pair !== ex.pair).map((o) => o.name)[0] || 'paired'
    : '';

  const doneCount = exs.filter((_, i) => (rec.sets[i] || []).filter((s) => s && s.done).length > 0).length;

  const finish = () => {
    actions.completeDay(day, true);
    const setCount = countDoneSets(rec.sets);
    const days = block.week.days;
    const next = days[days.findIndex((d) => d.id === day.id) + 1] || null;
    actions.set({
      session: false,
      rest: 0,
      complete: {
        title: day.title + ' done',
        sub: day.label + ' logged. ' + (day.rpe
          ? 'RPE cap was ' + day.rpe + ' — if it felt harder than that, tell your coach.'
          : 'Fresh tomorrow is the target.'),
        stats: [
          { value: String(setCount), label: 'Sets logged' },
          { value: String(exs.length), label: 'Exercises' },
        ],
        next: next
          ? 'Next: ' + next.label + ' — ' + next.title + '. '
            + (next.type === 'session' ? 'Bring the same intent.' : 'Rest is programmed. Take it.')
          : 'Last day of the block. Fill the readiness log before the gate decision.',
      },
    });
  };

  return (
    <div className="screen session">
      <div className="day__head session__head">
        <button type="button" className="icon-btn" onClick={actions.closeSession} aria-label="Back">←</button>
        <div className="day__head-body">
          <div className="day__label">{day.title}</div>
          <div className="day__meta">Exercise {idx + 1} of {exs.length}</div>
        </div>
        <div className="session__count">{doneCount} done</div>
      </div>

      <div className="session__dots">
        {exs.map((e, i) => {
          const hit = (rec.sets[i] || []).filter((s) => s && s.done).length > 0;
          const mod = i === idx ? ' session__dot--current' : hit ? ' session__dot--done' : '';
          return <div className={'session__dot' + mod} key={e.name + i} />;
        })}
      </div>

      <div className="session__body">
        <div className="session__ex-head">
          {ex.pair ? <div className="superset">Superset {ex.pair} · {pairWith}</div> : null}
          <div className="session__ex-name">{ex.name}</div>
          <div className="session__tags">
            <span className="tag tag--scheme">{ex.scheme}</span>
            <span className="tag">{ex.load}</span>
            <span className="tag">Rest {ex.rest}</span>
          </div>
        </div>

        {ex.cue ? <div className="quote">{ex.cue}</div> : null}

        <div className="sets">
          <div className="sets__head">
            <div>Set</div><div>Load</div><div>{/s$/.test(reps) ? 'Time' : 'Reps'}</div><div />
          </div>
          {Array.from({ length: nSets }, (_, i) => {
            const s = logged[i] || {};
            const on = !!s.done;
            return (
              <div className={'set' + (on ? ' set--on' : '')} key={i}>
                <div className="set__n">{i + 1}</div>
                <input
                  type="number"
                  inputMode="decimal"
                  className="field-input set__input"
                  placeholder={/bodyweight/i.test(ex.load) ? 'BW' : 'kg'}
                  value={s.weight || ''}
                  onChange={(e) => actions.setSetField(day.id, i, 'weight', e.target.value)}
                  aria-label={'Set ' + (i + 1) + ' load'}
                />
                <input
                  type="number"
                  inputMode="numeric"
                  className="field-input set__input"
                  placeholder={reps.replace(/[^0-9]/g, '') || '—'}
                  value={s.reps || ''}
                  onChange={(e) => actions.setSetField(day.id, i, 'reps', e.target.value)}
                  aria-label={'Set ' + (i + 1) + ' reps'}
                />
                <button
                  type="button"
                  className="set__check"
                  onClick={() => actions.toggleSet(day.id, i, restSecs(ex.rest))}
                  aria-label={'Mark set ' + (i + 1) + ' done'}
                >
                  ✓
                </button>
              </div>
            );
          })}
        </div>

        {state.rest > 0 ? (
          <div className="rest">
            <div className="rest__time">
              {Math.floor(state.rest / 60)}:{String(state.rest % 60).padStart(2, '0')}
            </div>
            <div className="rest__text">Rest — breathe, then go again.</div>
            <button type="button" className="rest__skip" onClick={actions.skipRest}>Skip</button>
          </div>
        ) : null}
      </div>

      <div className="session__foot">
        <button type="button" className="session__prev" onClick={actions.prevEx} aria-label="Previous exercise">←</button>
        <button type="button" className="primary-btn session__next" onClick={isLast ? finish : actions.nextEx}>
          {isLast ? 'Finish session' : 'Next exercise'}
        </button>
      </div>
    </div>
  );
}
