import { ATHLETES, REAL_ATHLETES } from '../data/plan.js';
import { useTracker } from '../state/store.jsx';

/** Flatten a block's written days (across all its weeks). */
function blockDays(b) {
  return (b.weeks || []).flatMap((w) => w.days || []);
}

export default function Blocks() {
  const { state, actions, record, plan, viewingId } = useTracker();
  const BLOCKS = plan.blocks;
  const isCoach = state.athlete === 'coach';
  const headName = (ATHLETES.find((a) => a.id === state.athlete) || {}).name || '';
  const viewingName = (ATHLETES.find((a) => a.id === viewingId) || {}).name || '';

  // Current block = first with unfinished written days; next = the one after it.
  const doneCount = (b) => blockDays(b).filter((d) => record(d.id).completed).length;
  const isWritten = (b) => blockDays(b).length > 0;
  const isDone = (b) => isWritten(b) && doneCount(b) === blockDays(b).length;
  const currentIdx = BLOCKS.findIndex((b) => isWritten(b) && !isDone(b));
  const nextIdx = BLOCKS.findIndex((b, i) => i > currentIdx && !isDone(b));
  const statusOf = (i) => (i === currentIdx ? 'current' : i === nextIdx ? 'next' : '');

  return (
    <div className="screen screen--pad">
      <div className="blocks__head">
        <div>
          <div className="kicker">{headName}</div>
          <div className="screen-title">Training blocks</div>
          <div className="screen-sub">{plan.countdown}</div>
        </div>
        <div className="blocks__head-actions">
          <button type="button" className="gear-btn" onClick={actions.openSettings} aria-label="Settings">⚙</button>
          <button type="button" className="pill-btn" onClick={actions.goHome}>Switch</button>
        </div>
      </div>

      {isCoach ? (
        <>
          <div className="banner">
            Coach view — reading {viewingName}&apos;s plan. Anything you tick here is saved to this device only.
          </div>
          <div className="coach-switch">
            {REAL_ATHLETES.map((a) => (
              <button
                key={a.id}
                type="button"
                className={'pill-btn' + (a.id === viewingId ? ' pill-btn--on' : '')}
                onClick={() => actions.setCoachView(a.id)}
              >
                {a.name}
              </button>
            ))}
          </div>
        </>
      ) : null}

      <div className="blocks__list">
        {BLOCKS.map((b, i) => {
          const days = blockDays(b);
          const total = days.length;
          const done = days.filter((d) => record(d.id).completed).length;
          const written = total > 0;
          const status = statusOf(i);
          const weekCount = (b.weeks || []).length;
          return (
            <button
              key={b.id}
              type="button"
              className={'block' + (written ? ' block--live' : '') + (status ? ' block--' + status : '')}
              onClick={() => actions.openBlock(b.id)}
            >
              <div className="block__top">
                {status ? (
                  <span className={'block__status block__status--' + status}>
                    {status === 'current' ? 'Current' : 'Next up'}
                  </span>
                ) : null}
                <span className="block__tag">{written ? b.tag : b.tag + ' · not written yet'}</span>
                <span className="block__dates">{b.dates}</span>
              </div>
              <div className="block__body">
                <div className="block__title">{b.title}</div>
                <div className="block__purpose">{b.purpose}</div>
              </div>
              <div className="block__foot">
                <div className="block__bar">
                  <i style={{ width: total ? Math.round((done / total) * 100) + '%' : '0%' }} />
                </div>
                <div className="block__progress">
                  {weekCount ? weekCount + (weekCount === 1 ? ' week' : ' weeks') : 'Awaiting plan'}
                  {total ? ' · ' + done + '/' + total + ' days' : ''}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
