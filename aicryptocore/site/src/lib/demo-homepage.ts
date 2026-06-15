export const HOME_SIGNAL_CARDS = [
  { label: 'Agent Momentum', score: 78, delta: 12.4, status: 'Strong' },
  { label: 'Infra Expansion', score: 72, delta: 8.7, status: 'Strong' },
  { label: 'Data Reliability', score: 64, delta: 5.1, status: 'Moderate' },
  { label: 'Narrative Heat', score: 81, delta: 15.6, status: 'Very Hot' },
  { label: 'Capital Activity', score: 69, delta: 6.3, status: 'Strong' },
] as const

export const HOME_SIGNAL_METRICS = [
  { label: 'Active Projects', value: '2,847', delta: 18.3 },
  { label: 'On-chain AI Txns (7D)', value: '1.24M', delta: 22.7 },
  { label: 'AI Protocols Tracked', value: '468', delta: 14.1 },
  { label: 'Funding (30D)', value: '$412M', delta: 31.4 },
  { label: 'Partnerships (30D)', value: '147', delta: 27.6 },
] as const

export const HOME_STACK_LAYERS = [
  {
    title: 'Application Layer',
    description: 'AI apps and user experiences translating signals into decisions.',
  },
  {
    title: 'Agent Layer',
    description: 'Autonomous agents, workflows, and coordination primitives.',
  },
  {
    title: 'Data Layer',
    description: 'Datasets, indexing systems, and oracle pipelines for AI-native finance.',
  },
  {
    title: 'Compute Layer',
    description: 'Compute, GPUs, and decentralized infrastructure for inference and training.',
  },
  {
    title: 'Execution Layer',
    description: 'Settlement, rollups, and execution rails for real economic activity.',
  },
  {
    title: 'Security Layer',
    description: 'Identity, monitoring, trust, and safety controls for autonomous systems.',
  },
] as const

export const HOME_TRUST_TYPES = [
  { label: 'Research-backed', description: 'Evidence and data-driven analysis.' },
  { label: 'On-chain Evidence', description: 'Verified protocol and wallet activity.' },
  { label: 'Use-case Driven', description: 'Grounded in real operator workflows.' },
  { label: 'Infra Relevant', description: 'Material impact on the stack beneath products.' },
  { label: 'Early Narrative', description: 'Useful for spotting emerging opportunity.' },
  { label: 'Opinion Sensitive', description: 'Analyst judgment where data is incomplete.' },
] as const

export const HOME_PROJECT_MATURITY = [
  { label: 'Concept', count: 240, description: 'Early stage ideas and research.' },
  { label: 'Early Build', count: 612, description: 'MVPs and testnets in development.' },
  { label: 'Live Product', count: 834, description: 'Live products with active users.' },
  {
    label: 'Ecosystem Expanding',
    count: 712,
    description: 'Integrations, partnerships, and composability increasing.',
  },
  { label: 'Adoption Watching', count: 489, description: 'Traction building with risk still active.' },
] as const

export const HOME_TOOLS_SPOTLIGHT = [
  {
    name: 'AgentKit',
    description: 'No-code agent framework for web3 builders shipping autonomous workflows.',
    tag: 'Agent Tooling',
  },
  {
    name: 'RAG3',
    description: 'Web3-native RAG engine for querying wallets, governance, and on-chain context.',
    tag: 'Data',
  },
  {
    name: 'OxScope',
    description: 'On-chain AI analytics and agent intelligence workspace for researchers.',
    tag: 'Analytics',
  },
  {
    name: 'Compute Horde',
    description: 'Decentralized GPU network for elastic AI workloads and inference bursts.',
    tag: 'Compute',
  },
] as const

export const HOME_USE_CASE_RADAR = [
  { axis: 'Real Users', current: 63, potential: 86 },
  { axis: 'Transactions', current: 74, potential: 88 },
  { axis: 'Infra Readiness', current: 69, potential: 85 },
  { axis: 'Composability', current: 78, potential: 91 },
  { axis: 'Security', current: 54, potential: 80 },
  { axis: 'Monetization Potential', current: 66, potential: 90 },
] as const

export const HOME_EVIDENCE_DENSITY = [
  { label: 'High Evidence', description: 'Strong on-chain and product signals.', color: 'bg-teal-400' },
  { label: 'Medium Evidence', description: 'Some proof, with more validation needed.', color: 'bg-amber-400' },
  { label: 'Low Evidence', description: 'Limited signals and higher uncertainty.', color: 'bg-rose-400' },
] as const

export const HOME_NARRATIVE_LIFECYCLE = [
  { label: 'AI Agents', status: 'Accelerating' },
  { label: 'DeFi Agents', status: 'Accelerating' },
  { label: 'Trading Agents', status: 'Accelerating' },
  { label: 'On-chain Agents', status: 'Emerging' },
  { label: 'Agent Economy', status: 'Crowded' },
] as const

export const HOME_OPERATOR_INSIGHTS = [
  {
    audience: 'For Traders',
    description: 'Agent activity is creating new liquidity flows and alternative alpha surfaces.',
  },
  {
    audience: 'For Builders',
    description: 'Composable AI infrastructure unlocks new classes of on-chain products.',
  },
  {
    audience: 'For Researchers',
    description: 'Better data and models lead to sharper interpretation of protocol behavior.',
  },
  {
    audience: 'For Allocators',
    description: 'Infrastructure maturity is becoming a first-order allocation signal.',
  },
] as const

export const HOME_AGENT_WATCHLIST = [
  { name: 'ElizaOS', context: 'On-chain Agents', updated: '2h ago' },
  { name: 'Aether Net', context: 'Infra / Compute', updated: '5h ago' },
  { name: 'Spectral', context: 'On-chain Agents', updated: '8h ago' },
  { name: 'Autonolas', context: 'On-chain Agents', updated: '12h ago' },
  { name: 'Fetch.ai', context: 'Ecosystem / Agents', updated: '1d ago' },
] as const

export const HOME_BRIEFS = [
  {
    name: 'Daily Brief',
    description: 'Top signals, narratives, and market context curated for daily operators.',
  },
  {
    name: 'Builder Brief',
    description: 'Infra updates, tools, and technical deep dives for teams shipping product.',
  },
  {
    name: 'Signal Brief',
    description: 'Higher-conviction signals and trend analysis for active market readers.',
  },
] as const

export const HOME_FOOTER_STRIP = [
  { label: 'On-chain Data', description: 'Indexed from 50+ chains' },
  { label: 'AI Signal Engine', description: 'Pattern detection and scoring' },
  { label: 'Research Framework', description: 'Multi-layer validation' },
  { label: 'Transparent Methodology', description: 'Evidence over narratives' },
  { label: 'Community Driven', description: 'Built with operator feedback' },
] as const
