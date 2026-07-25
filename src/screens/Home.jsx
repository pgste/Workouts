import { ATHLETES } from '../data/plan.js';
import { useTracker } from '../state/store.jsx';

export default function Home() {
  const { state, actions } = useTracker();

  const daysDone = (id) =>
    Object.keys(state.log).filter((k) => k.startsWith(id + ':') && state.log[k].completed).length;

  return (
    <div className="screen home">
      <div className="home__head">
        <div className="home__brand">
          <div className="home__dot" />
          <div className="home__brand-name">Court Strength</div>
        </div>
        <div className="home__title">Who&apos;s training<br />today?</div>
        <div className="home__sub">Pick your name. Your blocks, your log, saved on this device.</div>
      </div>

      <div className="home__list">
        {ATHLETES.map((a) => {
          const n = daysDone(a.id);
          return (
            <button key={a.id} type="button" className="athlete" onClick={() => actions.pickAthlete(a.id)}>
              <div className="athlete__initials">{a.name.slice(0, 2).toUpperCase()}</div>
              <div className="athlete__body">
                <div className="athlete__name">{a.name}</div>
                <div className="athlete__sub">{a.sub}</div>
              </div>
              <div className="athlete__pct">{n ? n + ' days' : 'Start'}</div>
            </button>
          );
        })}
      </div>

      <div className="home__foot">
        Progress is stored in this browser. Use <em>Export</em> on the Progress tab to send a snapshot to your coach.
      </div>
    </div>
  );
}
