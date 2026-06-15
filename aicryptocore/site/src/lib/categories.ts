import type { Category, CategorySlug, Subcategory, SubcategorySlug } from '@/types/category'

export const CATEGORIES: Category[] = [
  {
    slug: 'ai-agents',
    label: 'AI Agents',
    description: 'Autonomous agents, workflows, and economic coordination systems built on-chain.',
    icon: 'Bot',
    color: 'teal',
    count: 1324,
    subcategories: [
      {
        slug: 'defi-agents',
        label: 'DeFi Agents',
        parent: 'ai-agents',
        description: 'Autonomous systems managing yields, liquidity, and DeFi strategies.',
      },
      {
        slug: 'trading-agents',
        label: 'Trading Agents',
        parent: 'ai-agents',
        description: 'Adaptive agents executing and learning from live market conditions.',
      },
      {
        slug: 'onchain-agents',
        label: 'On-chain Agents',
        parent: 'ai-agents',
        description: 'Persistent agent identities and execution rails operating on-chain.',
      },
      {
        slug: 'economy',
        label: 'Economy',
        parent: 'ai-agents',
        description: 'Token incentives, reputation layers, and agent market structures.',
      },
    ],
  },
  {
    slug: 'ai-infrastructure',
    label: 'AI Infrastructure',
    description: 'Compute, models, decentralized AI marketplaces, and core protocol rails.',
    icon: 'Server',
    color: 'teal',
    count: 1201,
    subcategories: [
      {
        slug: 'compute',
        label: 'Compute',
        parent: 'ai-infrastructure',
        description: 'GPU networks, decentralized compute, and workload orchestration.',
      },
      {
        slug: 'decentralized-ai',
        label: 'Decentralized AI',
        parent: 'ai-infrastructure',
        description: 'Networks and marketplaces for open AI models and services.',
      },
      {
        slug: 'models',
        label: 'Models',
        parent: 'ai-infrastructure',
        description: 'Open models, inference rails, and model deployment systems.',
      },
      {
        slug: 'safety',
        label: 'Safety',
        parent: 'ai-infrastructure',
        description: 'Governance, monitoring, and safe execution primitives for AI systems.',
      },
    ],
  },
  {
    slug: 'ai-trading',
    label: 'AI Trading',
    description: 'Signals, bots, execution systems, and reinforcement-driven market strategies.',
    icon: 'TrendingUp',
    color: 'amber',
    count: 1045,
    subcategories: [
      {
        slug: 'bots',
        label: 'Bots',
        parent: 'ai-trading',
        description: 'Automated crypto trading agents and strategy bots.',
      },
      {
        slug: 'signals',
        label: 'Signals',
        parent: 'ai-trading',
        description: 'Risk signals, flow intelligence, and market triggers.',
      },
      {
        slug: 'prediction',
        label: 'Prediction',
        parent: 'ai-trading',
        description: 'Model-driven forecasts and scenario simulations.',
      },
      {
        slug: 'execution',
        label: 'Execution',
        parent: 'ai-trading',
        description: 'Routing, market making, and execution infrastructure.',
      },
    ],
  },
  {
    slug: 'ai-data',
    label: 'AI Data',
    description: 'Datasets, indexing, analytics, and oracle systems powering on-chain intelligence.',
    icon: 'Database',
    color: 'teal',
    count: 896,
    subcategories: [
      {
        slug: 'analytics',
        label: 'Analytics',
        parent: 'ai-data',
        description: 'AI-powered analytics over wallets, flows, and protocol behaviors.',
      },
      {
        slug: 'indexing',
        label: 'Indexing',
        parent: 'ai-data',
        description: 'Structured indexing layers for blockchain data access.',
      },
      {
        slug: 'oracles',
        label: 'Oracles',
        parent: 'ai-data',
        description: 'Real-world data feeds and oracle infrastructure for AI-native systems.',
      },
    ],
  },
  {
    slug: 'ai-ecosystem',
    label: 'AI Ecosystem',
    description: 'Layer 1s, stable systems, and integrated ecosystems where AI and crypto converge.',
    icon: 'Network',
    color: 'teal',
    count: 1287,
    subcategories: [
      {
        slug: 'layer1',
        label: 'Layer 1',
        parent: 'ai-ecosystem',
        description: 'AI-native L1s and settlement environments for autonomous systems.',
      },
      {
        slug: 'defi-ai',
        label: 'DeFi × AI',
        parent: 'ai-ecosystem',
        description: 'Composable DeFi stacks integrating AI into risk and execution.',
      },
      {
        slug: 'data-ai',
        label: 'Data × AI',
        parent: 'ai-ecosystem',
        description: 'Protocols combining open data infrastructure with intelligent systems.',
      },
    ],
  },
]

export const CATEGORY_SLUGS: CategorySlug[] = CATEGORIES.map((category) => category.slug)

const SUBCATEGORIES = CATEGORIES.flatMap((category) => category.subcategories)

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((category) => category.slug === slug)
}

export function getSubcategoryBySlug(slug: string): Subcategory | undefined {
  return SUBCATEGORIES.find((subcategory) => subcategory.slug === slug)
}

export function getCategoryLabel(slug: string): string {
  return getCategoryBySlug(slug)?.label ?? slug.replace(/-/g, ' ')
}

export function getSubcategoryLabel(slug: string): string {
  return getSubcategoryBySlug(slug)?.label ?? slug.replace(/-/g, ' ')
}

export function getAllSubcategories() {
  return SUBCATEGORIES
}

export function getSubcategoriesByCategory(categorySlug: CategorySlug) {
  return getCategoryBySlug(categorySlug)?.subcategories ?? []
}

export const NAV_CATEGORIES = CATEGORIES

export const VALID_CATEGORY_SLUGS = new Set<SubcategorySlug | CategorySlug>([
  ...CATEGORIES.map((category) => category.slug),
  ...SUBCATEGORIES.map((subcategory) => subcategory.slug),
])
