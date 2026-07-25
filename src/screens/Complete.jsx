import { useTracker } from '../state/store.jsx';

export default function Complete() {
  const { state, actions } = useTracker();
  const c = state.complete;

  return (
    <div className="screen complete">
      <div className="complete__head">
        <div className="complete__badge">✓</div>
        <div className="complete__title">{c.title}</div>
        <div className="complete__sub">{c.sub}</div>
      </div>

      <div className="complete__stats">
        {c.stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="note">{c.next}</div>

      <div className="complete__actions">
        <button
          type="button"
          className="primary-btn complete__primary"
          onClick={() => actions.set({ complete: null, day: null, session: false })}
        >
          Back to the week
        </button>
        <button
          type="button"
          className="ghost-btn complete__secondary"
          onClick={() => actions.set({ complete: null, day: null, session: false, tab: 'progress' })}
        >
          See progress
        </button>
      </div>
    </div>
  );
}
