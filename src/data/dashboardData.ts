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
  flair?: string;
};

export type StatCard = {
  label: string;
  value: number;
  note?: string;
};

export type JoeStat = {
  label: string;
  value: string;
  note?: string;
};

export type JoePick = {
  symbol: string;
  company: string;
  price: string;
  change: number;
  flavorNote: string;
  conviction: 'High Conviction' | 'Momentum Snack' | 'Speculative Bite';
};

export type MarketMood = {
  temperature: string;
  caption: string;
  score: number;
  tags: string[];
};

export type HeatmapCell = {
  symbol: string;
  change: number;
  direction: 'up' | 'down';
  flavor: string;
};

export type SnackableInsight = {
  title: string;
  snippet: string;
  action: string;
};

export type VolumeSpike = {
  symbol: string;
  spike: number;
  context: string;
  tasteProfile: string;
};

export type NextBiteAlert = {
  time: string;
  text: string;
  severity: 'info' | 'watch' | 'alert';
};

export type JoeDashboardData = {
  stats: JoeStat[];
  picks: JoePick[];
  marketMood: MarketMood;
  watchlistHeatmap: HeatmapCell[];
  snackableInsights: SnackableInsight[];
  volumeSpikes: VolumeSpike[];
  nextBites: NextBiteAlert[];
  preOpenDate: string;
};

export type DropCard = {
  name: string;
  releaseDate: string;
  type: string;
  channel: string;
  price: string;
};

export type StockXPulse = {
  shoe: string;
  price: string;
  change: string;
  trend: number[];
};

export type HeatMeter = {
  label: string;
  value: number;
  tags: string[];
};

export type SneakerEvent = {
  date: string;
  shoe: string;
  channel: string;
  icon: string;
};

export type WatchItem = {
  shoe: string;
  target: string;
  status: string;
};

export type RomanDashboardData = {
  heroDrop: string;
  heroCountdown: string;
  upcomingDrops: DropCard[];
  stockxPulse: StockXPulse[];
  heatMeter: HeatMeter;
  sizeAlerts: DropCard[];
  calendar: SneakerEvent[];
  watchlist: WatchItem[];
  rumors: string[];
  lockerStats: {
    collectionCount: number;
    deadstockPct: number;
    avgValue: string;
    favoriteSilhouette: string;
  };
};


export const taskBoard: Record<'todo' | 'inProgress' | 'done', Column> = {
  todo: {
    title: 'Up Next',
    tasks: [
      {
        id: 'todo-2',
        title: 'Daily memory backup → GitHub',
        owner: 'Ion',
        due: 'Daily 22:00',
        priority: 'medium',
        tags: ['ops'],
        notes: 'Push snapshot into jgomez831/memory-backups each evening.'
      },
      {
        id: 'todo-3',
        title: 'Joe’s Daily Stock Picks automation plan',
        owner: 'Ion',
        due: 'Feb 5',
        priority: 'medium',
        tags: ['stocks', 'automation'],
        notes: 'Wire 6:00 pre-open + 7:45 confirmation cadence into dashboard data layer.'
      }
    ]
  },
  inProgress: {
    title: 'In Progress',
    tasks: [
      {
        id: 'prog-1',
        title: 'Dashboard automation pipeline',
        owner: 'Ion',
        due: 'Feb 6',
        priority: 'high',
        tags: ['dashboard', 'automation'],
        notes: 'Build watchdog + scheduled ETL to auto-refresh Workstream/Joe views.'
      },
      {
        id: 'prog-2',
        title: 'Week 5 Final Exam Prep',
        owner: 'Ion',
        due: 'Feb 9',
        priority: 'medium',
        tags: ['cyb200', 'exam'],
        notes: 'Outline study plan + key topics before the 60-pt final.'
      }
    ]
  },
  done: {
    title: 'Completed',
    tasks: [
      {
        id: 'done-1',
        title: 'Week 5 Discussion – CYB200',
        owner: 'Ion',
        due: 'Feb 5',
        priority: 'medium',
        tags: ['cyb200', 'discussion'],
        notes: 'Drafted 250-word response + saved docx for submission.'
      },
      {
        id: 'done-2',
        title: 'Week 5 Assignment – CYB200',
        owner: 'Ion',
        due: 'Feb 9',
        priority: 'medium',
        tags: ['cyb200', 'assignment'],
        notes: 'Created Learning Activity Report Week 5 docx with Ch. 9 answers.'
      },
      {
        id: 'done-3',
        title: 'Dashboard copy refresh + deployment prep',
        owner: 'Ion',
        due: 'Feb 5',
        priority: 'high',
        tags: ['dashboard', 'content'],
        notes: 'Scrubbed outdated references, queued new build for publication.'
      }
    ]
  }
};

export const stats: StatCard[] = [
  { label: 'Open Tasks', value: taskBoard.todo.tasks.length + taskBoard.inProgress.tasks.length },
  { label: 'Completed Today', value: taskBoard.done.tasks.length },
  { label: 'Focus Streams', value: 3 }
];

export const summaries: DailySummary[] = [
  {
    date: 'Wed • Feb 4, 2026',
    highlights: [
      'Dividend playbooks (oil + cross-sector) delivered as DOCX, MD, and XLSX.',
      'Dashboard copy scrub underway to remove stale references.'
    ],
    decisions: [
      'Migrated long scrapes to DigitalOcean droplet.',
      'Green-lit GitHub Pages dashboard for shared visibility.'
    ],
    nextSteps: [
      'Finalize dashboard copy refresh + rebuild the static site.',
      'Publish dashboard + link workflow in README.'
    ]
  }
];

export const agents: Agent[] = [
  {
    name: 'Ion',
    role: 'Ops & Research Lead',
    status: 'active',
    focus: 'Dashboard copy cleanup + orchestration',
    load: 70,
    flair: '👑 Ion'
  },
  {
    name: 'StackCanvas',
    role: 'Dashboard Dev Lead',
    status: 'standby',
    focus: 'Sandwich toggle + Joe’s stock widgets',
    load: 35
  },
  {
    name: 'SandwichPilot',
    role: 'Dashboard Follow-up',
    status: 'active',
    focus: 'Flair, datestamp, deployment',
    load: 45
  },
  {
    name: 'SignalFire',
    role: 'Data Viz Scout',
    status: 'standby',
    focus: 'Chart themes & layout experiments',
    load: 10
  },
  {
    name: 'Ledger',
    role: 'Data Integrity Monitor',
    status: 'standby',
    focus: 'Dividend + task data QA hooks',
    load: 10
  }
];

export const joesDailyView: JoeDashboardData = {
  stats: [
    { label: 'Pre-Open Preview', value: '6:00 AM PT', note: 'Auto-refresh scheduled' },
    { label: 'First-Hour Update', value: '7:45 AM PT', note: 'Validates volume + momentum' },
    { label: 'Hot Themes', value: 'AI Chips · Defense · EV Supply' }
  ],
  picks: [
    {
      symbol: 'TSM',
      company: 'Taiwan Semi',
      price: '$325.70',
      change: 3.2,
      flavorNote: 'Chip supply + NVIDIA partnership chatter',
      conviction: 'High Conviction'
    },
    {
      symbol: 'LMT',
      company: 'Lockheed Martin',
      price: '$448.10',
      change: 1.4,
      flavorNote: 'Defense bill flows + international orders',
      conviction: 'Momentum Snack'
    },
    {
      symbol: 'RIVN',
      company: 'Rivian',
      price: '$23.95',
      change: -0.8,
      flavorNote: 'Speculative bounce ahead of delivery update',
      conviction: 'Speculative Bite'
    }
  ],
  marketMood: {
    temperature: 'Warm & Watchful',
    caption: 'Futures green, but traders eye CPI preview.',
    score: 68,
    tags: ['Growth Tilt', 'AI Flow', 'Earnings Heavy']
  },
  watchlistHeatmap: [
    { symbol: 'NVDA', change: 2.1, direction: 'up', flavor: 'AI orderbook' },
    { symbol: 'AMD', change: 1.4, direction: 'up', flavor: 'MI300 demand' },
    { symbol: 'SMCI', change: -0.9, direction: 'down', flavor: 'Cooling chatter' },
    { symbol: 'PLTR', change: 4.8, direction: 'up', flavor: 'Gov cloud buzz' },
    { symbol: 'SPY', change: 0.3, direction: 'up', flavor: 'Broad risk-on' },
    { symbol: 'DIA', change: -0.2, direction: 'down', flavor: 'Dow lagging' }
  ],
  snackableInsights: [
    {
      title: 'AI CapEx keeps ripping',
      snippet: 'TSMC suppliers flag high-visibility orders through summer.',
      action: 'Watch upstream silicon names.'
    },
    {
      title: 'Defense budget moves',
      snippet: 'Appropriations vote pulled forward two days.',
      action: 'Look for pre-market volume in primes.'
    },
    {
      title: 'EV tax-credit noise',
      snippet: 'IRS guidance rumored tonight; expect volatility.',
      action: 'Set alerts on TSLA, RIVN, GM.'
    }
  ],
  volumeSpikes: [
    {
      symbol: 'SOFI',
      spike: 180,
      context: 'Call volume 3x average after fintech summit',
      tasteProfile: 'Retail latte'
    },
    {
      symbol: 'BA',
      spike: 145,
      context: 'Headline risk on safety review',
      tasteProfile: 'Turbulent bite'
    },
    {
      symbol: 'META',
      spike: 130,
      context: 'Options flow into AI assistant rumors',
      tasteProfile: 'Metaverse mocha'
    }
  ],
  nextBites: [
    { time: '05:45 AM', text: 'ETL pull social + news sentiment', severity: 'info' },
    { time: '06:00 AM', text: 'Pre-open picks publish', severity: 'info' },
    { time: '07:45 AM', text: 'First-hour validation refresh', severity: 'watch' }
  ],
  preOpenDate: 'Thu • Feb 5 2026'
};

export const romanDashboard: RomanDashboardData = {
  heroDrop: "Air Jordan 4 'Infrared Pulse'",
  heroCountdown: '02:17:43',
  upcomingDrops: [
    { name: "Air Jordan 1 'Black Toe Reimagined'", releaseDate: 'Feb 08', type: 'SNKRS Draw', channel: 'SNKRS', price: '$200' },
    { name: "Nike Dunk Low 'Panda'", releaseDate: 'Feb 10', type: 'Restock', channel: 'Nike.com', price: '$115' }
  ],
  stockxPulse: [
    { shoe: "Jordan 4 Bred Reimagined", price: '$410', change: '+4.5% vs last week', trend: [390, 402, 398, 410] },
    { shoe: "Travis Scott Mocha 1", price: '$1,380', change: '-1.8%', trend: [1420, 1410, 1400, 1380] }
  ],
  heatMeter: { label: 'Heat Index', value: 82, tags: ['SNKRS', 'Discord', 'IG Buzz'] },
  sizeAlerts: [
    { name: 'AJ4 Bred Reimagined', releaseDate: 'Size 9.5', type: 'WAITLIST', channel: 'SNKRS', price: '—' },
    { name: 'AJ4 Bred Reimagined', releaseDate: 'Size 10', type: 'LIVE RAFFLE', channel: 'END.', price: '$225' }
  ],
  calendar: [
    { date: 'Feb 06', shoe: 'Jordan 5 Olive', channel: 'Boutiques', icon: '🟢' },
    { date: 'Feb 08', shoe: 'AJ1 Black Toe', channel: 'SNKRS', icon: '🔴' },
    { date: 'Feb 10', shoe: 'Dunk Low Panda', channel: 'Nike.com', icon: '⚪️' }
  ],
  watchlist: [
    { shoe: 'AJ4 Bred Reimagined', target: 'Notify < $350', status: 'Watching' },
    { shoe: 'Nike Dunk SB Yuto', target: 'Notify < $280', status: 'Watching' }
  ],
  rumors: ['Shock drop rumored for Travis Scott Cut the Check on Feb 7', 'Union x Jordan 1 restock whispers on Discord'],
  lockerStats: { collectionCount: 37, deadstockPct: 42, avgValue: '$520', favoriteSilhouette: 'Jordan 4' }
};
