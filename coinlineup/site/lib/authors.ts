import { decodeHtml } from "@/lib/content";

export interface AuthorProfile {
  name: string;
  slug: string;
  role: string;
  focusAreas: string[];
  sameAs: string[];
}

export interface PublicAuthor {
  name: string;
  slug?: string;
  profile: AuthorProfile | null;
  isEditorialTeam: boolean;
}

const AUTHOR_PROFILES: AuthorProfile[] = [
  {
    name: "Rohan Mehta",
    slug: "rohan-mehta",
    role: "Crypto Markets Reporter",
    focusAreas: [
      "Crypto markets",
      "Blockchain infrastructure",
      "DeFi narratives",
      "Retail-reader explainers",
    ],
    sameAs: [
      "https://about.me/rohancryptowrites",
      "https://x.com/revanmehta",
    ],
  },
  {
    name: "Jensen Ackles",
    slug: "jensen-ackles",
    role: "DeFi and Tokenomics Analyst",
    focusAreas: [
      "Token design",
      "DAO governance",
      "DeFi systems",
      "Crypto market structure",
    ],
    sameAs: [
      "https://about.me/Acklesverse",
      "https://www.youtube.com/@Acklesverse",
    ],
  },
  {
    name: "Acklesverse",
    slug: "jensen-ackles",
    role: "DeFi and Tokenomics Analyst",
    focusAreas: [
      "Token design",
      "DAO governance",
      "DeFi systems",
      "Crypto market structure",
    ],
    sameAs: [
      "https://about.me/Acklesverse",
      "https://www.youtube.com/@Acklesverse",
    ],
  },
  {
    name: "Yuki Matsuda",
    slug: "yuki-matsuda",
    role: "Altcoins and Web3 Gaming Reporter",
    focusAreas: [
      "Altcoin ecosystems",
      "GameFi",
      "NFTs",
      "Exchange coverage",
      "Digital ownership trends",
    ],
    sameAs: [
      "https://x.com/YukiMatsud82024",
      "https://www.youtube.com/@YukiOnWeb3",
    ],
  },
];

const AUTHOR_LOOKUP = new Map(
  AUTHOR_PROFILES.map((profile) => [profile.name.toLowerCase(), profile]),
);

const HIDDEN_AUTHOR_ALIASES = new Set(["pizza", "thorne callahan"]);

export function getAuthorProfile(name?: string | null): AuthorProfile | null {
  if (!name) {
    return null;
  }

  return AUTHOR_LOOKUP.get(decodeHtml(name).trim().toLowerCase()) ?? null;
}

export function getPublicAuthor(name?: string | null, slug?: string | null): PublicAuthor {
  const normalizedName = decodeHtml(name ?? "").trim();
  const normalizedSlug = (slug ?? "").trim();

  if (!normalizedName || HIDDEN_AUTHOR_ALIASES.has(normalizedName.toLowerCase())) {
    return {
      name: "CoinLineup Editorial Team",
      profile: null,
      isEditorialTeam: true,
    };
  }

  return {
    name: normalizedName,
    slug: normalizedSlug || undefined,
    profile: getAuthorProfile(normalizedName),
    isEditorialTeam: false,
  };
}
