import { AMBER, ATHLETES } from '../data/plan.js';
import { courtStats } from '../lib/load.js';
import { daysAgo, ymd } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

const BLUE = '#00a3ff';

export default function Progress() {
  const { state, actions } = useTracker();
  const athlete = ATHLETES.find((a) => a.id === state.athlete);
  const { mine, byDate } = courtStats(state.court, state.athlete);

  const doneKeys = Object.keys(state.log).filter((k) => k.startsWith(state.athlete + ':') && state.log[k].completed);
  const planDates = {};
  doneKeys.forEach((k) => { planDates[state.log[k].date] = true; });

  let streak = 0;
  for (let i = 0; i < 60; i++) {
    const d = ymd(daysAgo(i));
    if (planDates[d] || byDate[d]) streak++;
    else if (i > 0) break;
  }

  const heat = Array.from({ length: 56 }, (_, i) => daysAgo(55 - i)).map((d) => {
    const k = ymd(d);
    return { key: k, plan: !!planDates[k], court: byDate[k] || 0 };
  });

  const history = [
    ...doneKeys.map((k) => ({ date: state.log[k].date, title: state.log[k].name, detail: state.log[k].detail, dot: BLUE })),
    ...mine.map((c) => ({ date: c.date, title: c.type, detail: c.mins + ' min · RPE ' + c.rpe, dot: AMBER })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 6);

  const rows = history.length
    ? history.map((h) => ({ ...h, when: h.date.slice(5) }))
    : [{ title: 'Nothing logged yet', detail: 'Finish a day and it lands here', when: '—', dot: 'rgba(255,255,255,.2)' }];

  const stats = [
    { value: String(doneKeys.length), label: 'Plan days done' },
    { value: String(mine.length), label: 'Court sessions' },
    { value: String(streak), label: 'Day streak' },
  ];

  const exportProgress = () => actions.exportSnapshot({
    a: state.athlete, log: state.log, court: state.court, readiness: state.readiness,
  });

  return (
    <div className="screen screen--pad progress">
      <div>
        <div className="kicker">{athlete ? athlete.name : ''}</div>
        <div className="screen-title">Progress</div>
      </div>

      <div className="stats">
        {stats.map((s) => (
          <div className="stat" key={s.label}>
            <div className="stat__value">{s.value}</div>
            <div className="stat__label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="stack stack--12">
        <div className="section-title">Last 8 weeks</div>
        <div className="heat">
          {heat.map((h) => (
            <div
              key={h.key}
              title={h.key + (h.plan ? ' · plan' : '') + (h.court ? ' · court ' + h.court : '')}
              className={'heat__cell' + (h.plan ? ' heat__cell--plan' : h.court ? ' heat__cell--court' : '')}
            />
          ))}
        </div>
        <div className="legend">
          <span><i style={{ background: BLUE }} />Plan day</span>
          <span><i style={{ background: AMBER }} />Court</span>
          <span><i style={{ background: '#1e2a38' }} />Rest</span>
        </div>
      </div>

      <div className="history">
        <div className="section-title">Recent</div>
        {rows.map((h, i) => (
          <div className="history__row" key={(h.title || '') + i}>
            <div className="history__dot" style={{ background: h.dot }} />
            <div className="history__body">
              <div className="history__title">{h.title}</div>
              <div className="history__detail">{h.detail}</div>
            </div>
            <div className="history__when">{h.when}</div>
          </div>
        ))}
      </div>

      <button type="button" className="ghost-btn" onClick={exportProgress}>
        {state.exported ? 'Copied to clipboard ✓' : 'Export progress for coach'}
      </button>
    </div>
  );
}
