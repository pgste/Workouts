import { useTracker } from '../state/store.jsx';

export default function Block() {
  const { block, actions, record } = useTracker();
  const weeks = block.weeks || [];

  const doneCount = (w) => (w.days || []).filter((d) => record(d.id).completed).length;
  const isWritten = (w) => (w.days || []).length > 0;
  const isDone = (w) => isWritten(w) && doneCount(w) === (w.days || []).length;
  const currentIdx = weeks.findIndex((w) => isWritten(w) && !isDone(w));
  const nextIdx = weeks.findIndex((w, i) => i > currentIdx && !isDone(w));
  const statusOf = (i) => (i === currentIdx ? 'current' : i === nextIdx ? 'next' : '');

  return (
    <div className="screen week">
      <div className="week__nav">
        <button type="button" className="icon-btn" onClick={actions.backToBlocks} aria-label="Back">←</button>
        <div className="week__block-tag">{block.tag}</div>
      </div>

      <div className="week__head">
        <div className="week__title">{block.title}</div>
        <div className="week__dates">{block.dates}</div>
        <div className="quote week__purpose">{block.purpose}</div>
      </div>

      <div className="blocks__list">
        <div className="eyebrow">The weeks</div>
        {weeks.map((w, i) => {
          const days = w.days || [];
          const total = days.length;
          const done = days.filter((d) => record(d.id).completed).length;
          const written = total > 0;
          const status = statusOf(i);
          return (
            <button
              key={w.id}
              type="button"
              className={'block' + (written ? ' block--live' : '') + (status ? ' block--' + status : '')}
              onClick={() => actions.openWeek(w.id)}
            >
              <div className="block__top">
                {status ? (
                  <span className={'block__status block__status--' + status}>
                    {status === 'current' ? 'Current' : 'Next up'}
                  </span>
                ) : null}
                <span className="block__tag">{written ? w.title : 'Not written yet'}</span>
              </div>
              <div className="block__body">
                <div className="block__title">{w.title}</div>
                {w.subtitle ? <div className="block__purpose">{w.subtitle}</div> : null}
              </div>
              <div className="block__foot">
                <div className="block__bar">
                  <i style={{ width: total ? Math.round((done / total) * 100) + '%' : '0%' }} />
                </div>
                <div className="block__progress">{total ? done + '/' + total + ' days' : 'Awaiting plan'}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
