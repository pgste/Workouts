import { useTracker } from './state/store.jsx';
import Home from './screens/Home.jsx';
import Blocks from './screens/Blocks.jsx';
import Week from './screens/Week.jsx';
import Day from './screens/Day.jsx';
import Session from './screens/Session.jsx';
import Court from './screens/Court.jsx';
import Daily from './screens/Daily.jsx';
import Progress from './screens/Progress.jsx';
import EmptyBlock from './screens/EmptyBlock.jsx';
import Settings from './screens/Settings.jsx';
import Complete from './screens/Complete.jsx';
import TabBar from './screens/TabBar.jsx';

const TABBED = ['blocks', 'week', 'court', 'daily', 'progress', 'empty'];

const SCREENS = {
  home: Home,
  blocks: Blocks,
  week: Week,
  day: Day,
  session: Session,
  court: Court,
  daily: Daily,
  progress: Progress,
  empty: EmptyBlock,
  settings: Settings,
  complete: Complete,
};

function currentScreen(state, block, day) {
  if (!state.athlete) return 'home';
  if (state.overlay === 'settings') return 'settings';
  if (state.complete) return 'complete';
  if (state.session && day) return 'session';
  if (state.tab !== 'plan') return state.tab;
  if (day) return 'day';
  if (block) return block.week ? 'week' : 'empty';
  return 'blocks';
}

export default function App() {
  const { state, block, day } = useTracker();
  const screen = currentScreen(state, block, day);
  const Screen = SCREENS[screen];

  return (
    <div className="app">
      <div className="phone">
        <Screen />
        {state.athlete && TABBED.includes(screen) ? <TabBar /> : null}
      </div>
    </div>
  );
}
