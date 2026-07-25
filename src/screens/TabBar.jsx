import { useTracker } from '../state/store.jsx';

const TABS = [
  { key: 'plan', label: 'Plan', icon: '▤' },
  { key: 'court', label: 'Court', icon: '◎' },
  { key: 'daily', label: 'Daily', icon: '✎' },
  { key: 'progress', label: 'Progress', icon: '◔' },
];

export default function TabBar() {
  const { state, actions } = useTracker();

  return (
    <div className="tabs">
      {TABS.map((t) => (
        <button
          key={t.key}
          type="button"
          className={'tab' + (state.tab === t.key ? ' tab--on' : '')}
          onClick={() => actions.setTab(t.key)}
        >
          <span className="tab__icon">{t.icon}</span>
          <span className="tab__label">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
