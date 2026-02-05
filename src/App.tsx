import './App.css';
import { agents, summaries, taskBoard, stats } from './data/dashboardData';
import type { Task } from './data/dashboardData';

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
  const columnEntries = Object.entries(taskBoard);

  return (
    <main className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Mission Control</p>
          <h1>Workstream Dashboard</h1>
          <p className="subtitle">
            Live view of priorities, progress, and daily summaries. Designed for GitHub Pages and ready
            for future interactive controls.
          </p>
        </div>
        <div className="hero-card">
          <p className="hero-label">Powerball Report</p>
          <p className="hero-value">90% → polishing write-up + number sets</p>
          <p className="hero-note">ETA ≈ 60 min (charts, 50+50 mixes, narrative)</p>
        </div>
      </header>

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
                    <p className="agent-name">{agent.name}</p>
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

      <footer className="footer">
        <p>Ready for GH Pages. To edit tasks or summaries, update <code>src/data/dashboardData.ts</code> and redeploy.</p>
        <p className="footer-note">Future hooks: interactive forms, API-backed status feeds, Slack/Telegram webhooks.</p>
      </footer>
    </main>
  );
}

export default App;
