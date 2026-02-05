# Workstream Dashboard

A lightweight ops dashboard built with Vite + React + TypeScript and designed for GitHub Pages. It tracks the live task board (to-do, in-progress, done), sub-agent roster, and daily end-of-day summaries so we always know what shipped and what is next.

## Features
- **Mission control hero** with the current flagship deliverable + ETA.
- **Task board** grouping work into Up Next / In Progress / Completed with priority pills, tags, and owner/due details.
- **Stats row** for at-a-glance open vs. completed counts.
- **Daily summary cards** listing highlights, decisions, and next steps.
- **Sub-agent roster** block showing each agent’s role, status, and load bar (ready for future automation).
- Responsive layout + dark neon theme for a modern but focused look.

## Project structure
```
src/
  App.tsx              // top-level layout
  App.css              // theme + layout styles
  data/dashboardData.ts // single source of truth for tasks, summaries, agents, stats
```

Update the data file to refresh the board, summaries, or agent roster, then rebuild + deploy.

## Local development
```bash
npm install
npm run dev
```

The dev server runs on `http://localhost:5173` by default.

## Deploying to GitHub Pages
This project is wired to publish the `dist/` folder via the [`gh-pages`](https://github.com/tschaub/gh-pages) helper.

```bash
npm run deploy
```

The script runs the production build and pushes the contents of `dist` to the `gh-pages` branch, which GitHub Pages serves automatically. Remember to enable Pages for the repository and set the source to `Deploy from branch → gh-pages`.

## Roadmap ideas
- Interactive forms to add/edit tasks directly from the UI.
- API/webhook ingestion for Powerball + dividend status so charts stay live.
- Timeline/history view that snapshots each day automatically.
- OAuth-gated admin mode for approving future sub-agent actions.
