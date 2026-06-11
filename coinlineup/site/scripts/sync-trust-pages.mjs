const WP_BASE_URL = (process.env.WP_BASE_URL || "https://coinlineup.com").replace(/\/+$/, "");
const WP_USER = process.env.WP_USER;
const WP_APP_PASSWORD = process.env.WP_APP_PASSWORD;

if (!WP_USER || !WP_APP_PASSWORD) {
  console.error("Missing WP_USER or WP_APP_PASSWORD.");
  process.exit(1);
}

const authHeader = `Basic ${Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString("base64")}`;

const pages = [
  {
    slug: "about",
    title: "About",
    content: `
      <h1>About CoinLineup</h1>
      <p>CoinLineup is a digital publication covering cryptocurrency news, markets, blockchain developments, and educational guides. Our goal is to help readers understand fast-moving digital asset stories with clearer reporting, plain-language context, and visible editorial standards.</p>
      <p>We publish a mix of breaking news, explainers, market coverage, project reviews, and long-form educational content. Our coverage is written for readers who want signal over hype and transparency over promotion.</p>
      <h2>What we cover</h2>
      <ul>
        <li>Crypto and blockchain news</li>
        <li>Market developments and token ecosystem updates</li>
        <li>Beginner and advanced guides</li>
        <li>Project reviews and research-driven explainers</li>
        <li>Regulation, exchanges, DeFi, NFTs, and infrastructure stories</li>
      </ul>
      <h2>How we work</h2>
      <p>CoinLineup aims to make each article accountable and easy to evaluate. We show bylines, visible publication information, and editorial policy pages so readers can understand who wrote the piece, how we verify information, and how to report an issue.</p>
      <ul>
        <li><a href="/editorial-policy/">Editorial Policy</a></li>
        <li><a href="/publish-editorial-standards-fact-checking-policy/">Editorial Standards &amp; Fact-Checking</a></li>
        <li><a href="/corrections-policy/">Corrections Policy</a></li>
        <li><a href="/ownership-funding-transparency/">Ownership &amp; Funding Transparency</a></li>
        <li><a href="/authors/">Authors</a></li>
        <li><a href="/masthead/">Masthead</a></li>
        <li><a href="/contacts/">Contact</a></li>
      </ul>
      <h2>Editorial independence</h2>
      <p>Editorial decisions are made independently from advertisers, sponsors, and affiliate relationships. CoinLineup does not sell favorable coverage, positive reviews, or guaranteed editorial placement.</p>
      <p>When content includes sponsorship, commercial placement, or affiliate relationships, we aim to label that relationship clearly so readers can distinguish news and analysis from paid promotion.</p>
      <h2>Reader note</h2>
      <p>CoinLineup is a publisher, not an investment adviser. Nothing on this website should be treated as financial, legal, or tax advice. Readers should verify important claims and perform their own research before making decisions involving digital assets.</p>
    `,
  },
  {
    slug: "authors",
    title: "Authors",
    content: `
      <h1>Authors</h1>
      <p>This page lists the current public bylines that appear across CoinLineup coverage. Each contributor is responsible for the accuracy of their reporting and analysis, subject to editorial review and our published standards.</p>
      <p>For questions about a specific article, include the article URL and author name when contacting <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
      <h2 id="rohan-mehta">Rohan Mehta</h2>
      <p>Rohan Mehta covers crypto markets and blockchain technology with a focus on making technical developments understandable to retail readers. His public author bio states that he entered crypto in 2017 and has worked across crypto journalism, fintech content, and editorial strategy.</p>
      <h2 id="jensen-ackles">Acklesverse</h2>
      <p>Acklesverse covers blockchain adoption, decentralized finance, and digital asset market trends. Public disclosures on author materials indicate a Bitcoin holding above CoinLineup's stated disclosure threshold.</p>
      <h2 id="yuki-matsuda">Yuki Matsuda</h2>
      <p>Yuki Matsuda focuses on altcoins, exchange ecosystems, and how blockchain technology intersects with digital ownership. Public disclosures on author materials indicate an ETH holding above CoinLineup's stated disclosure threshold.</p>
      <h2 id="thorne-callahan">Thorne Callahan</h2>
      <p>Thorne Callahan writes about crypto mining, blockchain infrastructure, DeFi protocols, and practical how-to coverage for readers navigating the technical side of digital assets.</p>
      <h2 id="pizza">Pizza</h2>
      <p>Pizza covers altcoin markets, NFTs, and emerging blockchain ecosystems, with a focus on market trends and balanced summaries of new token and project developments.</p>
      <h2>About author information</h2>
      <p>CoinLineup uses public bylines and editorial bios to identify contributors. We update this page when new contributors are added or when author disclosures materially change.</p>
    `,
  },
  {
    slug: "masthead",
    title: "Masthead",
    content: `
      <h1>Masthead</h1>
      <p>This masthead describes the public editorial structure currently visible on CoinLineup.</p>
      <h2>Publication</h2>
      <p>CoinLineup is a digital publication focused on cryptocurrency, blockchain, markets, and educational content.</p>
      <h2>Editorial desk</h2>
      <p>Editorial review is coordinated through the CoinLineup editorial team. Reader questions, corrections requests, and editorial concerns can be sent to <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
      <h2>Public contributors</h2>
      <ul>
        <li>Rohan Mehta</li>
        <li>Acklesverse</li>
        <li>Yuki Matsuda</li>
        <li>Thorne Callahan</li>
        <li>Pizza</li>
      </ul>
      <h2>Commercial contact</h2>
      <p>For advertising and partnership questions, use <a href="/advertise/">Advertise</a>, <a href="/submit-ad/">Submit Ad</a>, or email <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> with a clear subject line.</p>
      <h2>Updates</h2>
      <p>This page is updated when CoinLineup changes its public editorial structure, contributor list, or primary newsroom contact details.</p>
    `,
  },
  {
    slug: "editorial-policy",
    title: "Editorial Policy",
    content: `
      <h1>Editorial Policy</h1>
      <p>CoinLineup publishes cryptocurrency and blockchain coverage for informational and educational purposes. Our editorial goal is to report accurately, explain clearly, and distinguish journalism from marketing.</p>
      <h2>Core principles</h2>
      <ul>
        <li><strong>Accuracy:</strong> We aim to verify factual claims before publication and correct material errors promptly.</li>
        <li><strong>Clarity:</strong> We prefer plain-language explanations over unnecessary jargon or sensational framing.</li>
        <li><strong>Transparency:</strong> We disclose sponsorship, affiliate relationships, and material conflicts where relevant.</li>
        <li><strong>Independence:</strong> Advertisers, sponsors, and commercial partners do not control newsroom decisions.</li>
      </ul>
      <h2>What we publish</h2>
      <p>CoinLineup may publish breaking news, explainers, market coverage, project reviews, educational articles, and opinion or commentary pieces. When a piece is sponsored, promotional, or commercially arranged, we aim to label it clearly.</p>
      <h2>Source standards</h2>
      <p>We prefer primary sources whenever possible, including official statements, on-chain records, court filings, regulatory documents, protocol documentation, exchange notices, and direct company communications. Secondary sources may be used for context, but key claims should not rely on unattributed repetition.</p>
      <h2>Conflicts of interest</h2>
      <p>Contributors should avoid undisclosed conflicts that could reasonably affect their coverage. Relevant holdings or relationships should be disclosed when material to the topic being covered.</p>
      <h2>Commercial relationships</h2>
      <p>CoinLineup may earn revenue through advertising, sponsorships, or affiliate relationships. These commercial arrangements do not guarantee editorial coverage and should not determine newsroom conclusions. Readers can review our <a href="/affiliate-disclaimer/">Affiliate Disclaimer</a> and <a href="/ownership-funding-transparency/">Ownership &amp; Funding Transparency</a> page for more detail.</p>
      <h2>AI and automation</h2>
      <p>Research and drafting tools may assist internal workflows, but human editorial judgment remains responsible for published output. We do not treat automated output as inherently accurate and expect factual verification before publication.</p>
      <h2>Corrections and feedback</h2>
      <p>If you believe an article is inaccurate, incomplete, or misleading, email <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> with the URL, the issue you found, and supporting evidence. Our correction workflow is described on the <a href="/corrections-policy/">Corrections Policy</a> page.</p>
    `,
  },
  {
    slug: "publish-editorial-standards-fact-checking-policy",
    title: "Editorial Standards & Fact-Checking",
    content: `
      <h1>Editorial Standards &amp; Fact-Checking</h1>
      <p>CoinLineup uses an editorial review process designed to improve reliability, attribution, and reader trust. The standard varies by format, but the expectation remains the same: important claims should be checkable.</p>
      <h2>Pre-publication checks</h2>
      <ul>
        <li>Confirm names, dates, prices, percentages, and quotations against the best available source.</li>
        <li>Prefer primary materials such as protocol documentation, company announcements, filings, or direct statements.</li>
        <li>Check links, asset tickers, token names, and network references before publication.</li>
        <li>Remove unsupported claims, vague superlatives, and promotional language that cannot be substantiated.</li>
      </ul>
      <h2>What readers should see</h2>
      <ul>
        <li>A visible byline or accountable editorial label</li>
        <li>A visible publication date</li>
        <li>An updated date when material changes are made after publication</li>
        <li>Clear labels for sponsored or promotional content when applicable</li>
      </ul>
      <h2>Attribution and sourcing</h2>
      <p>We aim to attribute material facts to the most reliable available source and link outward where doing so helps readers verify the claim. Aggregation without added reporting, context, or verification does not meet our preferred standard.</p>
      <h2>Updates after publication</h2>
      <p>Crypto markets move quickly. We may update articles to reflect confirmed new information, corrected data points, or material developments. When changes are substantive, we aim to reflect that in the visible update information.</p>
      <h2>Opinion, analysis, and reviews</h2>
      <p>Analysis and reviews may include judgment, interpretation, and editorial perspective, but they should still be grounded in checkable facts, fair context, and clear disclosure of any material commercial relationship.</p>
      <h2>AI-assisted workflows</h2>
      <p>We may use internal AI tools to assist with research organization, formatting, or drafting support. Final publication remains a human responsibility, and AI-generated text should not replace verification.</p>
      <h2>Escalation path</h2>
      <p>If you want to challenge a factual claim, request a correction, or flag a sourcing concern, contact <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> and include the article URL plus supporting evidence.</p>
    `,
  },
  {
    slug: "corrections-policy",
    title: "Corrections Policy",
    content: `
      <h1>Corrections Policy</h1>
      <p>Accuracy matters more than speed. When CoinLineup makes a material factual error, we aim to correct it as quickly and transparently as possible.</p>
      <h2>How to report an issue</h2>
      <p>Email <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> with the article URL, the exact statement you believe is wrong, and any supporting evidence that helps us verify the issue.</p>
      <h2>How we handle corrections</h2>
      <ul>
        <li><strong>Correction:</strong> Used when a material factual statement was wrong and has been fixed.</li>
        <li><strong>Clarification:</strong> Used when wording was technically incomplete, ambiguous, or potentially misleading.</li>
        <li><strong>Update:</strong> Used when new confirmed information meaningfully changes the story after publication.</li>
        <li><strong>Removal or rewrite:</strong> Used in rare cases where a page no longer meets editorial standards and cannot be responsibly left in place.</li>
      </ul>
      <h2>What we aim to disclose</h2>
      <p>When practical, we aim to preserve the article while correcting the factual issue, rather than silently replacing the entire page. Significant changes should be reflected in visible article information.</p>
      <h2>Response expectations</h2>
      <p>Not every message results in a correction, but every credible report should be reviewed. Response time may vary depending on the evidence provided and the complexity of the claim.</p>
    `,
  },
  {
    slug: "ownership-funding-transparency",
    title: "Ownership & Funding Transparency",
    content: `
      <h1>Ownership &amp; Funding Transparency</h1>
      <p>This page explains the basic commercial and transparency principles behind CoinLineup.</p>
      <h2>Editorial independence</h2>
      <p>Editorial decisions should remain separate from advertising, sponsorship, and affiliate relationships. CoinLineup does not sell favorable editorial outcomes or guaranteed positive coverage.</p>
      <h2>Revenue sources</h2>
      <p>CoinLineup may generate revenue through advertising, sponsored placements, affiliate relationships, and other standard digital publishing arrangements. When a commercial relationship materially affects a page or placement, we aim to label that relationship clearly.</p>
      <h2>Affiliate and sponsored content</h2>
      <p>Affiliate links and commercial content should not be disguised as independent newsroom reporting. Readers can review our <a href="/affiliate-disclaimer/">Affiliate Disclaimer</a> and relevant page labels for more detail.</p>
      <h2>Ownership updates</h2>
      <p>If CoinLineup's controlling ownership, primary funding relationships, or material commercial structure changes in a way that affects reader trust, this page should be updated to reflect that change.</p>
      <h2>Reader questions</h2>
      <p>Questions about ownership, business relationships, or funding transparency can be sent to <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
    `,
  },
  {
    slug: "contacts",
    title: "Contact",
    content: `
      <h1>Contact CoinLineup</h1>
      <p>For editorial questions, corrections requests, partnership inquiries, or general feedback, contact CoinLineup at <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
      <h2>How to reach us effectively</h2>
      <ul>
        <li><strong>Editorial or story tips:</strong> include the relevant project, source link, or document.</li>
        <li><strong>Corrections:</strong> include the article URL, the disputed statement, and your supporting evidence.</li>
        <li><strong>Business inquiries:</strong> include your company name, website, and the nature of the request.</li>
        <li><strong>Privacy or legal requests:</strong> clearly identify the request type in the email subject line.</li>
      </ul>
      <h2>Advertising</h2>
      <p>For advertising-related questions, review <a href="/advertise/">Advertise</a> or <a href="/submit-ad/">Submit Ad</a> before reaching out.</p>
      <h2>Response times</h2>
      <p>Response times vary by request type and volume. Time-sensitive corrections requests should clearly say <strong>Correction Request</strong> in the subject line.</p>
    `,
  },
  {
    slug: "privacy-policy",
    title: "Privacy Policy",
    content: `
      <h1>Privacy Policy</h1>
      <p><strong>Last updated:</strong> June 11, 2026</p>
      <p>This Privacy Policy explains how CoinLineup may collect, use, and protect information when you use coinlineup.com and related services.</p>
      <h2>Information we may collect</h2>
      <ul>
        <li>Information you provide directly, such as your email address when subscribing or contacting us</li>
        <li>Basic technical and usage information, such as browser type, IP address, referral source, and pages viewed</li>
        <li>Preference-related data needed to operate site features, such as theme or form state where applicable</li>
      </ul>
      <h2>How we may use information</h2>
      <ul>
        <li>To operate and improve the website</li>
        <li>To respond to inquiries or correction requests</li>
        <li>To send newsletter communications when a user has opted in</li>
        <li>To understand site usage and maintain security</li>
      </ul>
      <h2>Cookies and analytics</h2>
      <p>CoinLineup may use cookies or similar technologies for site functionality, preference storage, and analytics. You can control cookies through your browser settings, although disabling them may affect some site behavior.</p>
      <h2>Third-party services</h2>
      <p>We may use third-party infrastructure or analytics providers to operate the website. Those providers may process limited technical data as needed to deliver their services.</p>
      <h2>Data retention</h2>
      <p>We retain data only for as long as reasonably necessary for the purpose it was collected, unless a longer retention period is required for legal, security, or operational reasons.</p>
      <h2>Your choices</h2>
      <p>You may unsubscribe from newsletter emails at any time using the unsubscribe link in the message or by contacting <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
      <h2>Contact</h2>
      <p>If you have a privacy-related question, email <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> with <strong>Privacy Request</strong> in the subject line.</p>
    `,
  },
  {
    slug: "terms-conditions",
    title: "Terms of Service",
    content: `
      <h1>Terms of Service</h1>
      <p><strong>Last updated:</strong> June 11, 2026</p>
      <p>By accessing or using CoinLineup, you agree to these terms and to our <a href="/privacy-policy/">Privacy Policy</a>. If you do not agree, do not use the website.</p>
      <h2>Informational use only</h2>
      <p>CoinLineup publishes news, commentary, and educational content for informational purposes only. Nothing on the site is financial, investment, legal, or tax advice.</p>
      <h2>User conduct</h2>
      <p>You agree not to misuse the site, interfere with its operation, attempt unauthorized access, scrape protected areas, or use CoinLineup in violation of applicable law.</p>
      <h2>Intellectual property</h2>
      <p>Unless otherwise stated, CoinLineup content is owned by or licensed to CoinLineup and is protected by applicable intellectual property laws. Limited sharing with attribution may be allowed, but republication or commercial reuse requires permission.</p>
      <h2>Third-party links and commercial content</h2>
      <p>CoinLineup may link to third-party websites and may publish sponsored or affiliate-supported content. We are not responsible for the policies, products, or accuracy of third-party sites.</p>
      <h2>Disclaimer of warranties</h2>
      <p>The site is provided on an as-is and as-available basis without warranties of any kind. We do not guarantee uninterrupted availability or error-free market data.</p>
      <h2>Limitation of liability</h2>
      <p>To the maximum extent allowed by law, CoinLineup is not liable for losses arising from reliance on site content, market data, third-party links, or service interruptions.</p>
      <h2>Contact</h2>
      <p>Questions about these terms can be sent to <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> with <strong>Terms Request</strong> in the subject line.</p>
    `,
  },
  {
    slug: "content-disclaimer",
    title: "Content Disclaimer",
    content: `
      <h1>Content Disclaimer</h1>
      <p>All content on CoinLineup is provided for informational and educational purposes only. It should not be treated as financial, investment, legal, tax, or professional advice.</p>
      <p>Cryptocurrency markets are volatile, and data may change quickly. While we aim for accuracy, CoinLineup cannot guarantee that every figure, quote, price, or project detail will remain current after publication.</p>
      <p>Readers should independently verify important information and consult qualified professionals before making financial or legal decisions.</p>
    `,
  },
  {
    slug: "affiliate-disclaimer",
    title: "Affiliate Disclaimer",
    content: `
      <h1>Affiliate Disclaimer</h1>
      <p>Some CoinLineup pages may include affiliate links. If a reader clicks an affiliate link and completes a qualifying action, CoinLineup may receive a commission at no additional cost to the reader.</p>
      <p>Affiliate relationships should not determine editorial conclusions. We do not accept compensation in exchange for undisclosed favorable coverage.</p>
      <p>When affiliate relationships materially affect a page, we aim to disclose that relationship clearly so readers can evaluate the content with proper context.</p>
    `,
  },
  {
    slug: "rss-feed",
    title: "RSS",
    content: `
      <h1>RSS</h1>
      <p>CoinLineup provides RSS access for readers who want to follow newly published content in a feed reader.</p>
      <h2>Main feed</h2>
      <p><a href="https://coinlineup.com/feed/">https://coinlineup.com/feed/</a></p>
      <h2>How to use it</h2>
      <p>Copy the main feed URL into your preferred RSS reader to receive newly published CoinLineup content as it is added.</p>
      <h2>Note</h2>
      <p>Feed availability and format may change as CoinLineup's publishing stack evolves. If the feed appears outdated or unavailable, contact <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
    `,
  },
];

async function request(pathname, init = {}) {
  const response = await fetch(`${WP_BASE_URL}/wp-json/wp/v2/${pathname}`, {
    ...init,
    signal: AbortSignal.timeout(20000),
    headers: {
      Accept: "application/json",
      Authorization: authHeader,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  const text = await response.text();
  let data;

  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!response.ok) {
    throw new Error(`WordPress request failed for ${pathname}: ${response.status} ${typeof data === "object" ? data?.message || "" : text}`);
  }

  return data;
}

async function upsertPage(page) {
  const existing = await request(`pages?slug=${encodeURIComponent(page.slug)}&_fields=id,slug,title.rendered,status`);
  const payload = {
    title: page.title,
    slug: page.slug,
    status: "publish",
    content: page.content.trim(),
  };

  if (existing[0]?.id) {
    const updated = await request(`pages/${existing[0].id}`, {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { action: "updated", id: updated.id, slug: updated.slug || page.slug, title: updated.title?.rendered || page.title };
  }

  const created = await request("pages", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return { action: "created", id: created.id, slug: created.slug || page.slug, title: created.title?.rendered || page.title };
}

const results = [];
for (const page of pages) {
  console.log(`syncing\t${page.slug}`);
  results.push(await upsertPage(page));
}

for (const result of results) {
  console.log(`${result.action}\t${result.id}\t${result.slug}\t${result.title}`);
}
