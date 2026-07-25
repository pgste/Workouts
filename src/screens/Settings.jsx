import { snapshotSize } from '../lib/storage.js';
import { useTracker } from '../state/store.jsx';

export default function Settings() {
  const { state, actions } = useTracker();
  const bytes = snapshotSize(state);

  const exportProgress = () => actions.exportSnapshot({
    a: state.athlete, log: state.log, court: state.court, readiness: state.readiness,
  });

  const reset = () => {
    if (!state.resetArm) actions.set({ resetArm: true });
    else actions.resetDevice();
  };

  return (
    <div className="screen settings">
      <div className="settings__nav">
        <button type="button" className="icon-btn" onClick={actions.closeSettings} aria-label="Back">←</button>
        <div className="settings__title">Settings</div>
      </div>

      <div className="settings__group">
        <div className="eyebrow">Sync</div>
        <button type="button" className="ghost-btn" onClick={exportProgress}>
          {state.exported ? 'Copied to clipboard ✓' : 'Export progress for coach'}
        </button>
        <div className="settings__import">
          <input
            type="text"
            placeholder="Paste a progress code"
            value={state.importText}
            onChange={(e) => actions.set({ importText: e.target.value, imported: 0 })}
            aria-label="Progress code"
          />
          <button type="button" onClick={() => actions.importSnapshot(state.importText)}>
            {state.imported === 1 ? 'Loaded' : state.imported === -1 ? 'Bad code' : 'Import'}
          </button>
        </div>
        <div className="settings__hint">
          Codes are a full snapshot — sets, rest-day ticks, court load and readiness. Until the app has a database, this is how progress travels between phones.
        </div>
      </div>

      <div className="settings__group">
        <div className="eyebrow">This device</div>
        <div className="settings__storage">
          <span>Storage used</span>
          <span>{bytes < 1024 ? bytes + ' B' : (bytes / 1024).toFixed(1) + ' KB'}</span>
        </div>
        <button
          type="button"
          className={'settings__reset' + (state.resetArm ? ' settings__reset--armed' : '')}
          onClick={reset}
        >
          {state.resetArm ? 'Tap again to erase everything' : 'Reset this device'}
        </button>
      </div>

      <div className="settings__foot">
        Court Strength · static build<br />
        Plans generated as markdown, compiled at build time.
      </div>
    </div>
  );
}
