import { GATE_HEADING, WEEK } from '../data/plan.js';
import { ymd } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

const isNumeric = (label) => /HR|h\)|1–10|Bodyweight/.test(label);

export default function Daily() {
  const { state, actions } = useTracker();
  const today = ymd(new Date());
  const rowKey = state.athlete + ':' + today;
  const row = state.readiness[rowKey] || {};

  const rows = Object.keys(state.readiness)
    .filter((k) => k.startsWith(state.athlete + ':'))
    .sort()
    .reverse()
    .slice(0, 6)
    .map((k) => {
      const r = state.readiness[k];
      const summary = Object.keys(r)
        .filter((f) => r[f] !== '')
        .map((f) => f.replace(' 1–10', '') + ' ' + r[f])
        .join(' · ');
      return { date: k.split(':')[1].slice(5), summary: summary || 'Empty' };
    });

  const logged = rows.length ? rows : [{ date: '—', summary: 'Nothing logged yet' }];

  return (
    <div className="screen screen--pad">
      <div>
        <div className="kicker">AM, before food</div>
        <div className="screen-title">Readiness log</div>
        <div className="screen-sub">
          {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' })}
        </div>
      </div>

      <div className="readiness__list">
        {WEEK.readiness.map((label) => {
          const value = row[label] || '';
          return (
            <div className={'readiness__field' + (value ? ' readiness__field--filled' : '')} key={label}>
              <div className="readiness__label">{label}</div>
              <input
                className="field-input readiness__input"
                type={isNumeric(label) ? 'number' : 'text'}
                inputMode={isNumeric(label) ? 'decimal' : 'text'}
                placeholder="—"
                value={value}
                onChange={(e) => actions.setReadiness(rowKey, label, e.target.value)}
                aria-label={label}
              />
            </div>
          );
        })}
      </div>

      <div className="gate">
        <div className="section-title">{GATE_HEADING}</div>
        {WEEK.gate.map((g) => (
          <div className="gate__card" key={g.level} style={{ background: g.bg, border: '1px solid ' + g.bd }}>
            <div className="gate__level" style={{ color: g.fg }}>{g.level}</div>
            <div className="gate__criteria">{g.criteria}</div>
            <div className="gate__action">{g.action}</div>
          </div>
        ))}
      </div>

      <div className="log-rows">
        <div className="section-title">Logged this week</div>
        {logged.map((r) => (
          <div className="log-row" key={r.date + r.summary}>
            <div className="log-row__date">{r.date}</div>
            <div className="log-row__summary">{r.summary}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
