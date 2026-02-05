import { useState } from 'react';
import './App.css';
import {
  agents,
  summaries,
  taskBoard,
  stats,
  joesDailyView,
  romanDashboard,
  type Task,
  type JoeDashboardData,
  type RomanDashboardData
} from './data/dashboardData';

type ViewMode = 'workstream' | 'joes' | 'roman';

const heroCopy: Record<ViewMode, { label: string; value: string; note: string }> = {
  workstream: {
    label: 'Powerball Report',
    value: '90% → polishing write-up + number sets',
    note: 'ETA ≈ 60 min (charts, 50+50 mixes, narrative)'
  },
  joes: {
    label: 'Market Mood',
    value: joesDailyView.marketMood.temperature,
    note: joesDailyView.marketMood.caption
  },
  roman: {
    label: 'Next Drop',
    value: romanDashboard.heroDrop,
    note: romanDashboard.heroCountdown
  }
};

const viewOptions: { key: ViewMode; label: string; blurb: string }[] = [
  {
    key: 'workstream',
    label: 'Workstream Stack',
    blurb: 'Tasks · Agents · Summaries'
  },
  {
    key: 'joes',
    label: "Joe's Daily",
    blurb: 'Picks · Mood · Snackables'
  },
  {
    key: 'roman',
    label: "Roman's Heat Check",
    blurb: 'Drops · Watchlist · Alerts'
  }
];

const priorityClass = (priority: Task['priority']) => {
  switch (priority) {
    case 'high':
      return 'pill pill-high';
    case 'medium':
      return 'pill pill-medium';
    default:
      return 'pill pill-low';
  }
};

function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('workstream');
  const columnEntries = Object.entries(taskBoard);
  const hero = heroCopy[viewMode];

  return (
    <main className={`app-shell view-${viewMode}`}>
      <header className="hero">
        <div>
          <p className="eyebrow">Mission Control</p>
          {viewMode === 'workstream' && <h1>Workstream Dashboard</h1>}
          {viewMode === 'joes' && (
            <div className="joes-title-wrapper">
              <h1 className="joes-title">JOE'S DAILY</h1>
              <p className="joes-subtitle">🔥 Stocks</p>
            </div>
          )}
          {viewMode === 'roman' && (
            <div className="roman-title-wrapper">
              <h1 className="roman-title">Roman's Heat Check</h1>
              <p className="roman-subtitle">Nike &amp; Jordan Drop Radar</p>
            </div>
          )}
          <p className="subtitle">
            {viewMode === 'workstream' &&
              'Live view of priorities, progress, and daily summaries. Designed for GitHub Pages and ready for future interactive controls.'}
            {viewMode === 'joes' &&
              'Sandwich-style toggle from NeonPantry brings Joe’s desk into the same shell. All widgets are scaffolded with mock data so API wiring can drop in later.'}
            {viewMode === 'roman' &&
              'Roman’s Heat Check tracks Nike/Jordan drops with StockX-inspired cards, ready for live feed wiring.'}
          </p>
        </div>
        <div className="hero-card">
          <p className="hero-label">{hero.label}</p>
          <p className="hero-value">{hero.value}</p>
          <p className="hero-note">{hero.note}</p>
        </div>
      </header>

      <SandwichSwitch activeView={viewMode} onChange={setViewMode} />

      {viewMode === 'workstream' ? (
        <>
          <section className="stats">
            {stats.map((card) => (
              <div key={card.label} className="stat-card">
                <p className="stat-label">{card.label}</p>
                <p className="stat-value">{card.value}</p>
              </div>
            ))}
          </section>

          <section className="board">
            {columnEntries.map(([key, column]) => (
              <article key={key} className="column">
                <div className="column-head">
                  <h2>{column.title}</h2>
                  <span className="pill pill-neutral">{column.tasks.length}</span>
                </div>
                <div className="column-body">
                  {column.tasks.map((task) => (
                    <div key={task.id} className="task-card">
                      <div className="task-row">
                        <p className="task-title">{task.title}</p>
                        <span className={priorityClass(task.priority)}>{task.priority}</span>
                      </div>
                      <div className="task-meta">
                        <span>Owner: {task.owner}</span>
                        <span>Due: {task.due}</span>
                      </div>
                      <div className="task-tags">
                        {task.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      {task.notes && <p className="task-notes">{task.notes}</p>}
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </section>

          <section className="flex-grid">
            <article className="panel">
              <h2>Daily Summaries</h2>
              {summaries.map((summary) => (
                <div key={summary.date} className="summary">
                  <div className="summary-header">
                    <h3>{summary.date}</h3>
                  </div>
                  <div className="summary-columns">
                    <div>
                      <p className="summary-label">Highlights</p>
                      <ul>
                        {summary.highlights.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="summary-label">Decisions</p>
                      <ul>
                        {summary.decisions.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <p className="summary-label">Next Steps</p>
                      <ul>
                        {summary.nextSteps.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </article>

            <article className="panel">
              <h2>Sub-Agent Roster</h2>
              <div className="agent-grid">
                {agents.map((agent) => (
                  <div key={agent.name} className="agent-card">
                    <div className="agent-header">
                      <div>
                        <div className="agent-name-row">
                          <p className="agent-name">{agent.name}</p>
                          {agent.flair === 'manager' && (
                            <span className="manager-icon-inline" aria-hidden="true">
                              👑
                            </span>
                          )}
                        </div>
                        <p className="agent-role">{agent.role}</p>
                      </div>
                      <span className={`pill pill-${agent.status}`}>
                        {agent.status === 'active' ? 'Active' : agent.status === 'blocked' ? 'Blocked' : 'Standby'}
                      </span>
                    </div>
                    <p className="agent-focus">{agent.focus}</p>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: `${agent.load}%` }} />
                    </div>
                    <p className="agent-load">Load: {agent.load}%</p>
                  </div>
                ))}
              </div>
            </article>
          </section>
        </>
      ) : viewMode === 'joes' ? (
        <JoeDashboard data={joesDailyView} />
      ) : (
        <RomanDashboard data={romanDashboard} />
      )}

      <footer className="footer">
        <p>
          Ready for GH Pages. Update <code>src/data/dashboardData.ts</code>, run <code>npm run build</code>, then drop the
          contents of <code>dist</code> into <code>docs/</code>.
        </p>
        <p className="footer-note">Future hooks: interactive forms, API-backed status feeds, Slack/Telegram webhooks.</p>
      </footer>
    </main>
  );
}

const SandwichSwitch = ({
  activeView,
  onChange
}: {
  activeView: ViewMode;
  onChange: (view: ViewMode) => void;
}) => {
  const activeIndex = viewOptions.findIndex((option) => option.key === activeView);

  return (
    <div
      className="sandwich-switch"
      role="group"
      aria-label="Sandwich view switch"
      data-active={activeView}
      style={{ ['--active-index' as any]: activeIndex }}
    >
      <span className="sandwich-indicator" aria-hidden />
      <div className="sandwich-fill">
        {viewOptions.map((option) => (
          <button
            key={option.key}
            type="button"
            className={`sandwich-option ${activeView === option.key ? 'is-active' : ''}`}
            onClick={() => onChange(option.key)}
            aria-pressed={activeView === option.key}
          >
            <span className="option-label">{option.label}</span>
            <span className="option-blurb">{option.blurb}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const JoeDashboard = ({ data }: { data: JoeDashboardData }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
  const condensedDate = `${today.toLocaleDateString('en-US', { weekday: 'short' })} • ${today.toLocaleDateString('en-US', { month: 'short' })} ${today.getDate()} ${today.getFullYear()}`;
  const isoDate = today.toISOString().split('T')[0];

  return (
    <div className="joes-view">
      <section className="stats joes-stats">
        {data.stats.map((card) => {
          const isPreOpen = card.label === 'Pre-Open Preview';

          return (
            <div key={card.label} className={`stat-card ${isPreOpen ? 'stat-card-preopen' : ''}`}>
              {isPreOpen && (
                <time className="preopen-datestamp" dateTime={isoDate} aria-label={formattedDate}>
                  {condensedDate}
                </time>
              )}
              <p className="stat-label">{card.label}</p>
              <p className="stat-value">{card.value}</p>
              {card.note && <p className="stat-note">{card.note}</p>}
            </div>
          );
        })}
      </section>

      <article className="panel joes-panel picks-panel">
      <div className="panel-head">
        <h2>Daily Picks Board</h2>
        <p className="panel-subhead">Placeholder data — swap in live feed once ready.</p>
      </div>
      <div className="joes-picks-grid">
        {data.picks.map((pick) => (
          <div key={pick.symbol} className="pick-card">
            <div className="pick-top">
              <p className="pick-symbol">{pick.symbol}</p>
              <span className={`pill pill-${pick.conviction.replace(/\s+/g, '-').toLowerCase()}`}>
                {pick.conviction}
              </span>
            </div>
            <p className="pick-company">{pick.company}</p>
            <p className="pick-price">{pick.price}</p>
            <p className={`pick-change ${pick.change >= 0 ? 'is-up' : 'is-down'}`}>
              {pick.change >= 0 ? '+' : ''}
              {pick.change}%
            </p>
            <p className="pick-note">{pick.flavorNote}</p>
          </div>
        ))}
      </div>
    </article>

    <section className="joes-grid">
      <article className="panel joes-panel market-panel">
        <div className="panel-head">
          <h3>Market Mood Meter</h3>
          <span className="mood-label">{data.marketMood.temperature}</span>
        </div>
        <div className="mood-meter" role="img" aria-label={`Market mood score ${data.marketMood.score}%`}>
          <div className="mood-fill" style={{ width: `${data.marketMood.score}%` }} />
        </div>
        <p className="mood-caption">{data.marketMood.caption}</p>
        <div className="mood-tags">
          {data.marketMood.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </article>

      <article className="panel joes-panel heatmap-panel">
        <div className="panel-head">
          <h3>Watchlist Heatmap</h3>
          <p className="panel-subhead">Color-coded placeholders for quick sentiment.</p>
        </div>
        <div className="heatmap-grid">
          {data.watchlistHeatmap.map((item) => (
            <div key={item.symbol} className={`heatmap-cell ${item.direction === 'up' ? 'heat-up' : 'heat-down'}`}>
              <p className="heat-symbol">{item.symbol}</p>
              <p className="heat-change">
                {item.direction === 'up' ? '+' : ''}
                {item.change}%
              </p>
              <p className="heat-note">{item.flavor}</p>
            </div>
          ))}
        </div>
      </article>
    </section>

    <section className="joes-grid">
      <article className="panel joes-panel insights-panel">
        <div className="panel-head">
          <h3>Snackable Insights</h3>
          <p className="panel-subhead">Carousel-ready data model.</p>
        </div>
        <div className="snackable-list">
          {data.snackableInsights.map((insight) => (
            <div key={insight.title} className="snack-card">
              <p className="snack-title">{insight.title}</p>
              <p className="snack-snippet">{insight.snippet}</p>
              <p className="snack-action">{insight.action}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="panel joes-panel volume-panel">
        <div className="panel-head">
          <h3>Volume Spike Radar</h3>
          <p className="panel-subhead">Replace placeholder list with radar chart later.</p>
        </div>
        <ul className="spike-list">
          {data.volumeSpikes.map((spike) => (
            <li key={spike.symbol} className="spike-item">
              <div className="spike-symbol">
                <span>{spike.symbol}</span>
                <span>{spike.spike}%</span>
              </div>
              <div className="spike-bar">
                <span className="spike-fill" style={{ width: `${Math.min(spike.spike, 200) / 2}%` }} />
              </div>
              <p className="spike-context">{spike.context}</p>
              <p className="spike-flavor">{spike.tasteProfile}</p>
            </li>
          ))}
        </ul>
      </article>
    </section>

    <section className="joes-grid">
      <article className="panel joes-panel nextbite-panel">
        <div className="panel-head">
          <h3>Next Bite Alerts</h3>
          <p className="panel-subhead">Static list for now — wire to webhooks later.</p>
        </div>
        <ul className="alerts-list">
          {data.nextBites.map((alert) => (
            <li key={`${alert.time}-${alert.text}`} className={`alert-card alert-${alert.severity}`}>
              <div>
                <p className="alert-time">{alert.time}</p>
                <p className="alert-text">{alert.text}</p>
              </div>
              <span className="alert-severity">{alert.severity}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  </div>
  );
};

const RomanDashboard = ({ data }: { data: RomanDashboardData }) => (
  <div className="roman-view">
    <section className="roman-hero">
      <div>
        <p className="roman-hero-label">Next heat drop</p>
        <h2>{data.heroDrop}</h2>
        <p className="roman-hero-countdown">Drops in {data.heroCountdown}</p>
      </div>
      <div className="roman-hero-card">
        <p>Collection</p>
        <h3>{data.lockerStats.collectionCount} pairs</h3>
        <p>Deadstock {data.lockerStats.deadstockPct}% · Avg value {data.lockerStats.avgValue}</p>
      </div>
    </section>

    <section className="roman-grid">
      <article className="panel roman-panel">
        <div className="panel-head">
          <h3>Upcoming Drops</h3>
        </div>
        <div className="roman-drop-grid">
          {data.upcomingDrops.map((drop) => (
            <div key={drop.name} className="roman-drop-card">
              <p className="drop-date">{drop.releaseDate}</p>
              <p className="drop-name">{drop.name}</p>
              <p className="drop-meta">{drop.type} · {drop.channel}</p>
              <p className="drop-price">{drop.price}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="panel roman-panel">
        <div className="panel-head">
          <h3>StockX Pulse</h3>
        </div>
        <div className="roman-pulse-list">
          {data.stockxPulse.map((pulse) => (
            <div key={pulse.shoe} className="pulse-row">
              <div>
                <p className="pulse-name">{pulse.shoe}</p>
                <p className="pulse-change">{pulse.change}</p>
              </div>
              <p className="pulse-price">{pulse.price}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="panel roman-panel">
        <div className="panel-head">
          <h3>Heat Meter</h3>
        </div>
        <div className="roman-heat-meter">
          <div className="heat-circle">{data.heatMeter.value}%</div>
          <ul>
            {data.heatMeter.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
      </article>
    </section>

    <section className="roman-calendar">
      {data.calendar.map((event) => (
        <div key={`${event.date}-${event.shoe}`} className="calendar-node">
          <span className="calendar-date">{event.date}</span>
          <p>{event.shoe}</p>
          <span className="calendar-channel">{event.channel}</span>
        </div>
      ))}
    </section>

    <section className="roman-lists">
      <article className="panel roman-panel">
        <div className="panel-head">
          <h3>Watchlist</h3>
        </div>
        <ul className="watchlist">
          {data.watchlist.map((entry) => (
            <li key={entry.shoe}>
              <p className="watch-name">{entry.shoe}</p>
              <p className="watch-target">{entry.target}</p>
              <span className="watch-status">{entry.status}</span>
            </li>
          ))}
        </ul>
      </article>
      <article className="panel roman-panel">
        <div className="panel-head">
          <h3>Shock Drop Rumors</h3>
        </div>
        <ul className="rumor-list">
          {data.rumors.map((rumor) => (
            <li key={rumor}>{rumor}</li>
          ))}
        </ul>
      </article>
    </section>
  </div>
);


export default App;
