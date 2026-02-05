export type Task = {
  id: string;
  title: string;
  owner: string;
  due: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  notes?: string;
};

export type Column = {
  title: string;
  tasks: Task[];
};

export type DailySummary = {
  date: string;
  highlights: string[];
  decisions: string[];
  nextSteps: string[];
};

export type Agent = {
  name: string;
  role: string;
  status: 'active' | 'standby' | 'blocked';
  focus: string;
  load: number;
};

export const taskBoard: Record<'todo' | 'inProgress' | 'done', Column> = {
  todo: {
    title: 'Up Next',
    tasks: [
      {
        id: 'todo-1',
        title: 'Powerball: finalize 50 + 50 number sets',
        owner: 'Primary',
        due: 'Feb 5',
        priority: 'high',
        tags: ['lottery', 'analysis'],
        notes: 'Need Monterey-weighted logic + general mix before write-up lock.'
      },
      {
        id: 'todo-2',
        title: 'Daily memory backup → GitHub',
        owner: 'Primary',
        due: 'Daily 22:00',
        priority: 'medium',
        tags: ['ops'],
        notes: 'Push snapshot into jgomez831/memory-backups each evening.'
      }
    ]
  },
  inProgress: {
    title: 'In Progress',
    tasks: [
      {
        id: 'prog-1',
        title: 'Powerball insights write-up + dashboard polish',
        owner: 'Primary',
        due: 'Feb 4',
        priority: 'high',
        tags: ['lottery', 'report'],
        notes: 'Charts colored, narrative 70% drafted.'
      },
      {
        id: 'prog-2',
        title: 'All-sector dividend ladder QA',
        owner: 'Primary',
        due: 'Feb 4',
        priority: 'medium',
        tags: ['dividends'],
        notes: 'Validate payout cadence + spreadsheet formatting.'
      }
    ]
  },
  done: {
    title: 'Completed',
    tasks: [
      {
        id: 'done-1',
        title: 'Oil dividend playbook delivery',
        owner: 'Primary',
        due: 'Feb 4',
        priority: 'medium',
        tags: ['dividends'],
        notes: 'Sent DOCX + MD via Telegram.'
      },
      {
        id: 'done-2',
        title: 'Cross-sector dividend spreadsheet refresh',
        owner: 'Primary',
        due: 'Feb 4',
        priority: 'medium',
        tags: ['dividends', 'excel'],
        notes: 'Per-payout view + cadence columns added.'
      }
    ]
  }
};

export const stats = [
  { label: 'Open Tasks', value: taskBoard.todo.tasks.length + taskBoard.inProgress.tasks.length },
  { label: 'Completed Today', value: taskBoard.done.tasks.length },
  { label: 'Focus Streams', value: 3 }
];

export const summaries: DailySummary[] = [
  {
    date: 'Wed • Feb 4, 2026',
    highlights: [
      'Dividend playbooks (oil + cross-sector) delivered as DOCX, MD, and XLSX.',
      'Powerball dataset merged with jackpot location metadata; charts 80% styled.'
    ],
    decisions: [
      'Migrated long scrapes to DigitalOcean droplet.',
      'Green-lit GitHub Pages dashboard for shared visibility.'
    ],
    nextSteps: [
      'Finish Powerball number simulations + Monterey overlays.',
      'Publish dashboard + link workflow in README.'
    ]
  }
];

export const agents: Agent[] = [
  {
    name: 'Primary',
    role: 'Ops & Research Lead',
    status: 'active',
    focus: 'Powerball analysis + dashboard deployment',
    load: 85
  },
  {
    name: 'SignalFire',
    role: 'Data Viz Scout',
    status: 'standby',
    focus: 'Chart themes & layout experiments',
    load: 20
  },
  {
    name: 'Ledger',
    role: 'Data Integrity Monitor',
    status: 'standby',
    focus: 'Dividend + task data QA hooks',
    load: 10
  }
];
