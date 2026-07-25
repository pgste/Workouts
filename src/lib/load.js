import { daysAgo, ymd } from './plan.js';

/** Court entries for one athlete, plus the 14-day load series the bars render. */
export function courtStats(court, athlete) {
  const mine = court.filter((c) => c.athlete === athlete);
  const byDate = {};
  mine.forEach((c) => { byDate[c.date] = (byDate[c.date] || 0) + c.load; });

  const last14 = Array.from({ length: 14 }, (_, i) => daysAgo(13 - i))
    .map((d) => ({ date: ymd(d), load: byDate[ymd(d)] || 0 }));
  const maxLoad = Math.max(600, ...last14.map((x) => x.load));

  const week = last14.slice(7).reduce((a, x) => a + x.load, 0);
  const prior = last14.slice(0, 7).reduce((a, x) => a + x.load, 0);
  const change = prior ? (week >= prior ? '+' : '') + Math.round(((week - prior) / prior) * 100) + '% vs prior' : 'first week';
  const summary = week ? week + ' load · ' + change : 'Nothing logged yet';

  return { mine, byDate, last14, maxLoad, summary };
}
