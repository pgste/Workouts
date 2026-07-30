import { ATHLETES, REAL_ATHLETES } from '../data/plan.js';
import { planDate, ymd } from '../lib/plan.js';
import { useTracker } from '../state/store.jsx';

/** The card at the top: today's day if a week is live, otherwise the next block up. */
function todayCard(blocks, actions) {
  const live = blocks.find((b) => b.week);

  // No week written yet — point at the first block rather than dereferencing a
  // week that doesn't exist. The card taps through to its "not written yet" screen.
  if (!live) {
    const first = blocks[0];
    return {
      kicker: 'Plan',
      title: 'Plan not written yet',
      sub: first ? first.title + ' · ' + first.dates : 'Weeks drop in soon',
      open: () => { if (first) actions.openBlock(first.id); },
    };
  }

  const dates = live.week.days.map((d) => planDate(d.label));
  const today = ymd(new Date());
  const idx = dates.findIndex((d) => ymd(d) === today);
  const last = dates[dates.length - 1];
  const openWeek = () => actions.set({ block: live.id, day: null, tab: 'plan' });

  if (idx >= 0) {
    const d = live.week.days[idx];
    return {
      kicker: 'Today',
      title: d.title,
      sub: d.type === 'session'
        ? [d.dur, (d.ex || []).length + ' exercises'].filter(Boolean).join(' · ')
        : 'Programmed rest · checklist',
      open: () => actions.openDay(live.id, d.id),
    };
  }

  const diff = Math.round((dates[0] - new Date(today + 'T12:00:00')) / 86400000);
  if (diff > 0) {
    const d = live.week.days[0];
    return {
      kicker: diff === 1 ? 'Starts tomorrow' : 'Starts in ' + diff + ' days',
      title: live.week.title,
      sub: d.label + ' · ' + d.title,
      open: openWeek,
    };
  }

  return {
    kicker: new Date(today) > last ? 'Block finished' : 'Off-plan day',
    title: live.week.title,
    sub: 'Review the week or log court work',
    open: openWeek,
  };
}

export default function Blocks() {
  const { state, actions, record, plan, viewingId } = useTracker();
  const BLOCKS = plan.blocks;
  const isCoach = state.athlete === 'coach';
  const headName = (ATHLETES.find((a) => a.id === state.athlete) || {}).name || '';
  const viewingName = (ATHLETES.find((a) => a.id === viewingId) || {}).name || '';
  const today = todayCard(BLOCKS, actions);

  // Read the list as a timeline: the current block (written, still in progress)
  // and the one genuinely next after it. Everything else is just "later", so the
  // next block reads as next instead of a second copy of the current one.
  const blockDone = (b) => (b.week ? b.week.days.every((d) => record(d.id).completed) : false);
  const currentIdx = BLOCKS.findIndex((b) => b.week && !blockDone(b));
  const nextIdx = BLOCKS.findIndex((b, i) => i > currentIdx && !blockDone(b));
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

      <button type="button" className="today" onClick={today.open}>
        <div className="today__body">
          <div className="today__kicker">{today.kicker}</div>
          <div className="today__title">{today.title}</div>
          <div className="today__sub">{today.sub}</div>
        </div>
        <div className="today__arrow">→</div>
      </button>

      <div className="blocks__list">
        {BLOCKS.map((b, i) => {
          const live = !!b.week;
          const status = statusOf(i);
          const total = live ? b.week.days.length : 0;
          const done = live ? b.week.days.filter((d) => record(d.id).completed).length : 0;
          return (
            <button
              key={b.id}
              type="button"
              className={'block' + (live ? ' block--live' : '') + (status ? ' block--' + status : '')}
              onClick={() => actions.openBlock(b.id)}
            >
              <div className="block__top">
                {status ? (
                  <span className={'block__status block__status--' + status}>
                    {status === 'current' ? 'Current' : 'Next up'}
                  </span>
                ) : null}
                <span className="block__tag">{live ? b.tag : b.tag + ' · not written yet'}</span>
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
                <div className="block__progress">{total ? done + '/' + total + ' days' : 'Awaiting plan'}</div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
