import { useTracker } from '../state/store.jsx';

export default function EmptyBlock() {
  const { block, actions } = useTracker();

  return (
    <div className="screen empty">
      <button type="button" className="icon-btn" onClick={actions.backToBlocks} style={{ alignSelf: 'flex-start' }} aria-label="Back">←</button>

      <div className="empty__head">
        <div className="empty__dates">{block.dates}</div>
        <div className="empty__title">{block.title}</div>
        <div className="empty__purpose">{block.purpose}</div>
      </div>

      <div className="empty__card">
        <div className="empty__card-title">Plan not written yet</div>
        <div className="empty__card-body">
          This block unlocks when the week&apos;s markdown is added. Sessions, rest days and the readiness gate all appear here automatically.
        </div>
      </div>
    </div>
  );
}
