import { COURT_TYPES, RPE_WORDS } from '../data/plan.js';
import { courtStats } from '../lib/load.js';
import { ymd } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

const MIN_STEPS = [15, 30, 45, 60, 90];

export default function Court() {
  const { state, actions } = useTracker();
  const { draft } = state;
  const { last14, maxLoad, summary } = courtStats(state.court, state.athlete);

  const log = () => actions.addCourt({
    athlete: state.athlete,
    date: ymd(new Date()),
    ...draft,
    load: draft.mins * draft.rpe,
  });

  return (
    <div className="screen screen--pad">
      <div>
        <div className="kicker">On court</div>
        <div className="screen-title">Log today&apos;s load</div>
      </div>

      <div className="court__card">
        <div className="court__group">
          <div className="court__label">Session type</div>
          <div className="court__types">
            {COURT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                className={'choice' + (draft.type === t ? ' choice--on' : '')}
                onClick={() => actions.draft({ type: t })}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="court__group">
          <div className="court__label-row">
            <div className="court__label">Minutes</div>
            <div className="court__value">{draft.mins} min</div>
          </div>
          <div className="court__mins">
            {MIN_STEPS.map((m) => (
              <button
                key={m}
                type="button"
                className={'choice' + (draft.mins === m ? ' choice--on' : '')}
                onClick={() => actions.draft({ mins: m })}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="court__group">
          <div className="court__label-row">
            <div className="court__label">How hard</div>
            <div className="court__rpe-word">{draft.rpe} · {RPE_WORDS[draft.rpe]}</div>
          </div>
          <div className="court__rpe">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                className={'choice' + (draft.rpe === n ? ' choice--on' : '')}
                onClick={() => actions.draft({ rpe: n })}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <button type="button" className="primary-btn court__add" onClick={log}>
          {state.added ? 'Logged ✓' : 'Log session'}
        </button>
      </div>

      <div className="load">
        <div className="load__head">
          <div className="section-title">Last 14 days</div>
          <div className="load__summary">{summary}</div>
        </div>
        <div className="load__bars">
          {last14.map((x) => (
            <div
              key={x.date}
              title={x.date + ' · load ' + x.load}
              className={'load__bar' + (x.load ? ' load__bar--on' : '')}
              style={{ height: Math.max(3, Math.round((x.load / maxLoad) * 100)) + '%' }}
            />
          ))}
        </div>
        <div className="load__axis"><span>14d ago</span><span>Today</span></div>
      </div>
    </div>
  );
}
