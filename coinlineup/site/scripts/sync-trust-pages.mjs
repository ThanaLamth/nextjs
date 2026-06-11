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
      <p>We publish a mix of breaking news, explainers, market coverage, project reviews, and educational content for readers who want useful information rather than hype, imitation, or disguised promotion.</p>
      <h2>What CoinLineup is trying to do</h2>
      <p>Crypto publishing often moves faster than verification. CoinLineup's public trust pages exist so readers can see how the site presents its authorship, sourcing standards, corrections path, and commercial disclosures. We want readers to be able to evaluate not just what we publish, but how we publish it.</p>
      <p>This approach aligns with the broader expectation that news publishers should make it easy for readers to find information about the publication, the people behind it, and the standards applied to its work.</p>
      <h2>What we cover</h2>
      <ul>
        <li>Crypto and blockchain news</li>
        <li>Market developments and token ecosystem updates</li>
        <li>Beginner and advanced guides</li>
        <li>Project reviews and research-driven explainers</li>
        <li>Regulation, exchanges, DeFi, NFTs, and infrastructure stories</li>
      </ul>
      <h2>Who the site is for</h2>
      <p>CoinLineup serves a mixed audience that may include first-time crypto readers, active traders, researchers, and Web3 operators. Because that audience has different experience levels, we try to distinguish basic explainers from more technical analysis and avoid presenting speculation as settled fact.</p>
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
      <h2>Signals readers should expect on CoinLineup pages</h2>
      <ul>
        <li>A visible byline or accountable editorial label</li>
        <li>A publication date, and an updated date when a page is materially revised</li>
        <li>Links to policy, disclosure, or contact pages when they help explain how the content was produced</li>
        <li>Clear labels when a page contains sponsored, promotional, or affiliate-supported elements</li>
      </ul>
      <h2>Editorial independence</h2>
      <p>Editorial decisions are made independently from advertisers, sponsors, and affiliate relationships. CoinLineup does not sell favorable coverage, positive reviews, or guaranteed editorial placement.</p>
      <p>When content includes sponsorship, commercial placement, or affiliate relationships, we aim to label that relationship clearly so readers can distinguish news and analysis from paid promotion.</p>
      <h2>What CoinLineup is not</h2>
      <p>CoinLineup is a publisher, not an exchange, token issuer, broker, investment adviser, or law firm. Coverage may discuss companies, products, tokens, protocols, and market events, but publication does not equal endorsement.</p>
      <h2>How this page should be used</h2>
      <p>This page is intended to give readers a plain-language starting point. More specific process information appears on the Editorial Policy, Fact-Checking, Corrections, Ownership, Authors, and Masthead pages linked above.</p>
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
      <h2>What readers should learn from this page</h2>
      <p>This page exists so readers can identify who is writing CoinLineup content, what topics those contributors usually cover, and where disclosure or accountability questions should be directed. Author visibility is part of helping readers evaluate the origin of a piece of content.</p>
      <h2>How CoinLineup uses bylines</h2>
      <ul>
        <li>News, market, research, and guide content should carry a visible byline or another accountable editorial label.</li>
        <li>Where relevant, author pages should reflect the contributor's typical coverage areas, background, and any material disclosures published by CoinLineup.</li>
        <li>If a piece is substantially updated after publication, the article page should show visible date information so readers can understand when the work was last revised.</li>
      </ul>
      <h2 id="rohan-mehta">Rohan Mehta</h2>
      <p>Rohan Mehta is a crypto markets and blockchain reporter based in Bengaluru, India. He says he entered the crypto space in 2017 and focuses on making technical developments, token ecosystems, and market narratives easier for everyday readers to understand without flattening the underlying complexity.</p>
      <p>His public profile materials describe a finance background, experience in fintech and crypto content roles, and a reporting style centered on research depth, plain-language explanation, and retail-reader accessibility.</p>
      <h2 id="jensen-ackles">Acklesverse</h2>
      <p>Jensen Ackles, who publishes under the byline Acklesverse, covers tokenomics, decentralized finance, DAO governance, and broader digital asset market structure. His public profile materials describe a background that moved from business and market analysis into crypto-native reporting and research.</p>
      <p>CoinLineup uses the Acklesverse byline for coverage aimed at helping readers make sense of complex Web3 topics such as governance proposals, DeFi mechanics, and the economic design behind token-based systems. Public profile materials place him in Toronto, Canada.</p>
      <h2 id="yuki-matsuda">Yuki Matsuda</h2>
      <p>Yuki Matsuda covers altcoins, blockchain gaming, exchange ecosystems, and how Web3 changes digital ownership. Public profile materials describe him as Tokyo-based and focused on the intersection of crypto, gaming, NFTs, and user-facing blockchain adoption.</p>
      <p>His public profile materials also point to a technical education background and prior work connected to blockchain writing and GameFi analysis, which aligns with CoinLineup's use of his byline for gaming-adjacent and altcoin ecosystem coverage.</p>
      <h2 id="thorne-callahan">Thorne Callahan</h2>
      <p>Thorne Callahan writes about crypto mining, blockchain infrastructure, DeFi protocols, and practical how-to coverage for readers navigating the technical side of digital assets.</p>
      <h2 id="pizza">Pizza</h2>
      <p>Pizza covers altcoin markets, NFTs, and emerging blockchain ecosystems, with a focus on market trends and balanced summaries of new token and project developments.</p>
      <h2>Disclosure expectations</h2>
      <p>Where CoinLineup considers a contributor's holdings, affiliations, or commercial relationships material to a topic, those interests should be disclosed in a way that helps readers assess potential conflicts. Not every article requires a disclosure note, but material conflicts should not remain hidden.</p>
      <h2>How author information is maintained</h2>
      <p>CoinLineup uses public bylines, author bios, and editorial records to maintain this page. When new recurring contributors are added, when a contributor's role changes materially, or when a material disclosure changes, this page should be updated accordingly.</p>
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
      <h2>Why a masthead exists</h2>
      <p>A masthead helps readers, sources, platforms, and partners understand who is responsible for the publication and where editorial or operational questions should be directed. It is part of making the site legible as a real publication rather than an anonymous content surface.</p>
      <h2>Editorial desk</h2>
      <p>Editorial review is coordinated through the CoinLineup editorial team. Reader questions, corrections requests, and editorial concerns can be sent to <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a>.</p>
      <h2>Editorial responsibility</h2>
      <p>Published content should be traceable either to a named contributor or to an accountable editorial function. CoinLineup's editorial desk is responsible for coordinating review standards, update practices, and public-facing trust information.</p>
      <h2>Public contributors</h2>
      <ul>
        <li>Rohan Mehta, crypto markets and blockchain reporting</li>
        <li>Jensen Ackles (Acklesverse), tokenomics, DeFi, and DAO coverage</li>
        <li>Yuki Matsuda, altcoins, gaming, and digital ownership coverage</li>
        <li>Thorne Callahan</li>
        <li>Pizza</li>
      </ul>
      <h2>How to use this page</h2>
      <p>If you are checking whether a CoinLineup page comes from a visible editorial operation, this page should be read together with <a href="/authors/">Authors</a>, <a href="/editorial-policy/">Editorial Policy</a>, and <a href="/corrections-policy/">Corrections Policy</a>.</p>
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
      <h2>Scope of this policy</h2>
      <p>This page explains the public editorial rules CoinLineup aims to apply across news articles, explainers, market commentary, guides, reviews, and similar editorial content. Separate legal pages may govern privacy, site use, and affiliate disclosure, but this page focuses on editorial judgment and newsroom standards.</p>
      <h2>Core principles</h2>
      <ul>
        <li><strong>Accuracy:</strong> We aim to verify factual claims before publication and correct material errors promptly.</li>
        <li><strong>Clarity:</strong> We prefer plain-language explanations over unnecessary jargon or sensational framing.</li>
        <li><strong>Transparency:</strong> We disclose sponsorship, affiliate relationships, and material conflicts where relevant.</li>
        <li><strong>Independence:</strong> Advertisers, sponsors, and commercial partners do not control newsroom decisions.</li>
      </ul>
      <h2>What we publish</h2>
      <p>CoinLineup may publish breaking news, explainers, market coverage, project reviews, educational articles, and opinion or commentary pieces. When a piece is sponsored, promotional, or commercially arranged, we aim to label it clearly.</p>
      <h2>Source hierarchy</h2>
      <p>When covering a topic, we prefer the most direct and reliable available sources first. These may include protocol documentation, regulatory filings, court records, direct company statements, blockchain records, exchange notices, and first-hand interviews or written comments. Secondary coverage may be used for additional context, but key factual claims should not rely entirely on repeated summaries from elsewhere.</p>
      <h2>Source standards</h2>
      <p>We prefer primary sources whenever possible, including official statements, on-chain records, court filings, regulatory documents, protocol documentation, exchange notices, and direct company communications. Secondary sources may be used for context, but key claims should not rely on unattributed repetition.</p>
      <h2>Headline and framing standards</h2>
      <p>Headlines should describe the core development accurately and avoid implying certainty that the underlying reporting does not support. We try not to package speculation, rumors, or promotional claims as confirmed facts simply to drive clicks or market reaction.</p>
      <h2>Attribution and linking</h2>
      <p>Where practical, CoinLineup aims to attribute material facts to a named or identifiable source and link outward when that helps readers verify the claim. If an article summarizes information from another outlet, document, or public announcement, the source should be made clear enough for readers to understand where the information originated.</p>
      <h2>Conflicts of interest</h2>
      <p>Contributors should avoid undisclosed conflicts that could reasonably affect their coverage. Relevant holdings or relationships should be disclosed when material to the topic being covered.</p>
      <h2>Reviews, analysis, and opinion</h2>
      <p>Some CoinLineup content may include interpretation, judgment, or comparative analysis. That does not remove the obligation to stay anchored to checkable facts. If a page is primarily opinion, commentary, or commercially influenced comparison content, that should not be disguised as straight reporting.</p>
      <h2>Commercial relationships</h2>
      <p>CoinLineup may earn revenue through advertising, sponsorships, or affiliate relationships. These commercial arrangements do not guarantee editorial coverage and should not determine newsroom conclusions. Readers can review our <a href="/affiliate-disclaimer/">Affiliate Disclaimer</a> and <a href="/ownership-funding-transparency/">Ownership &amp; Funding Transparency</a> page for more detail.</p>
      <h2>AI and automation</h2>
      <p>Research and drafting tools may assist internal workflows, but human editorial judgment remains responsible for published output. We do not treat automated output as inherently accurate and expect factual verification before publication.</p>
      <h2>Updates after publication</h2>
      <p>When a story changes materially after publication, we aim to update the page in a way that helps readers understand what changed and when. Visible publication and updated dates are part of that reader context, especially for news and market-sensitive coverage.</p>
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
      <h2>Purpose of this page</h2>
      <p>This page explains how CoinLineup approaches verification in practice. Readers should be able to understand what checks are expected before publication, what visible signals should appear on the page, and how we handle changes when new information emerges.</p>
      <h2>Pre-publication checks</h2>
      <ul>
        <li>Confirm names, dates, prices, percentages, and quotations against the best available source.</li>
        <li>Prefer primary materials such as protocol documentation, company announcements, filings, or direct statements.</li>
        <li>Check links, asset tickers, token names, and network references before publication.</li>
        <li>Remove unsupported claims, vague superlatives, and promotional language that cannot be substantiated.</li>
      </ul>
      <h2>When one source is not enough</h2>
      <p>If a claim could materially affect price, legal exposure, project reputation, or reader decision-making, a single thin or promotional source is usually not enough on its own. In those cases, CoinLineup should look for corroborating documents, data, or statements before presenting the claim as established fact.</p>
      <h2>Handling uncertain or developing information</h2>
      <p>Some crypto stories develop quickly and not all facts are available at once. In those cases, we should distinguish between what is confirmed, what is claimed by interested parties, and what remains uncertain. Missing certainty should not be hidden behind confident language.</p>
      <h2>What readers should see</h2>
      <ul>
        <li>A visible byline or accountable editorial label</li>
        <li>A visible publication date</li>
        <li>An updated date when material changes are made after publication</li>
        <li>Clear labels for sponsored or promotional content when applicable</li>
      </ul>
      <h2>Attribution and sourcing</h2>
      <p>We aim to attribute material facts to the most reliable available source and link outward where doing so helps readers verify the claim. Aggregation without added reporting, context, or verification does not meet our preferred standard.</p>
      <h2>Fact-checking categories</h2>
      <ul>
        <li><strong>Identity checks:</strong> names of companies, protocols, tokens, exchanges, wallets, regulators, executives, and public figures.</li>
        <li><strong>Chronology checks:</strong> dates of announcements, launches, listings, unlocks, rulings, hacks, and article updates.</li>
        <li><strong>Numeric checks:</strong> prices, percentage moves, treasury sizes, funding amounts, staking yields, or other market-sensitive figures.</li>
        <li><strong>Claim checks:</strong> whether a project, exchange, or third party actually said or did the thing the article attributes to them.</li>
      </ul>
      <h2>Updates after publication</h2>
      <p>Crypto markets move quickly. We may update articles to reflect confirmed new information, corrected data points, or material developments. When changes are substantive, we aim to reflect that in the visible update information.</p>
      <h2>Opinion, analysis, and reviews</h2>
      <p>Analysis and reviews may include judgment, interpretation, and editorial perspective, but they should still be grounded in checkable facts, fair context, and clear disclosure of any material commercial relationship.</p>
      <h2>AI-assisted workflows</h2>
      <p>We may use internal AI tools to assist with research organization, formatting, or drafting support. Final publication remains a human responsibility, and AI-generated text should not replace verification.</p>
      <h2>Records and accountability</h2>
      <p>When an article is challenged, the reporting and review process should be explainable enough for the editorial team to revisit the underlying source trail. That expectation supports both corrections handling and general reader trust.</p>
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
      <h2>Why corrections matter</h2>
      <p>Crypto coverage can influence attention, reputation, and sometimes financial decisions. For that reason, corrections are not treated as an embarrassment to hide but as part of maintaining a trustworthy publishing record.</p>
      <h2>How to report an issue</h2>
      <p>Email <a href="mailto:contact@coinlineup.com">contact@coinlineup.com</a> with the article URL, the exact statement you believe is wrong, and any supporting evidence that helps us verify the issue.</p>
      <h2>What helps us review faster</h2>
      <ul>
        <li>The article URL and headline</li>
        <li>The exact sentence, figure, or claim being challenged</li>
        <li>A source, document, screenshot, filing, or public statement supporting your request</li>
        <li>Context about whether the issue is factual, contextual, or time-sensitive</li>
      </ul>
      <h2>How we handle corrections</h2>
      <ul>
        <li><strong>Correction:</strong> Used when a material factual statement was wrong and has been fixed.</li>
        <li><strong>Clarification:</strong> Used when wording was technically incomplete, ambiguous, or potentially misleading.</li>
        <li><strong>Update:</strong> Used when new confirmed information meaningfully changes the story after publication.</li>
        <li><strong>Removal or rewrite:</strong> Used in rare cases where a page no longer meets editorial standards and cannot be responsibly left in place.</li>
      </ul>
      <h2>What we aim to disclose</h2>
      <p>When practical, we aim to preserve the article while correcting the factual issue, rather than silently replacing the entire page. Significant changes should be reflected in visible article information.</p>
      <h2>What may not result in a correction</h2>
      <p>Not every complaint leads to a correction. Opinion disagreements, requests to suppress truthful reporting, or challenges that do not provide credible evidence may not result in a content change. Even so, credible factual concerns should be reviewed.</p>
      <h2>Serious accuracy concerns</h2>
      <p>If a page contains a potentially harmful factual problem involving identity, fraud allegations, legal status, security incidents, or market-moving information, we aim to review it with priority and update the page when warranted.</p>
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
      <h2>Why this page exists</h2>
      <p>Readers should be able to understand whether commercial incentives, sponsorship arrangements, or ownership interests could reasonably affect how a publication presents information. This page exists to make CoinLineup's commercial posture easier to evaluate.</p>
      <h2>Editorial independence</h2>
      <p>Editorial decisions should remain separate from advertising, sponsorship, and affiliate relationships. CoinLineup does not sell favorable editorial outcomes or guaranteed positive coverage.</p>
      <h2>What this page currently discloses</h2>
      <p>CoinLineup publicly discloses that the site may generate revenue through advertising, sponsorship, affiliate relationships, and related digital publishing arrangements. Where a commercial relationship materially affects a page, that relationship should be labeled clearly enough for readers to recognize it.</p>
      <h2>Revenue sources</h2>
      <p>CoinLineup may generate revenue through advertising, sponsored placements, affiliate relationships, and other standard digital publishing arrangements. When a commercial relationship materially affects a page or placement, we aim to label that relationship clearly.</p>
      <h2>Commercial separation rules</h2>
      <ul>
        <li>Advertisers and sponsors should not control newsroom conclusions.</li>
        <li>Paid placements should not be presented as independent editorial reporting without clear labeling.</li>
        <li>Affiliate incentives should not be hidden when they materially affect a page or recommendation.</li>
        <li>Readers should be able to distinguish editorial content, sponsored content, and legal or commercial disclosure pages.</li>
      </ul>
      <h2>Affiliate and sponsored content</h2>
      <p>Affiliate links and commercial content should not be disguised as independent newsroom reporting. Readers can review our <a href="/affiliate-disclaimer/">Affiliate Disclaimer</a> and relevant page labels for more detail.</p>
      <h2>Ownership and funding updates</h2>
      <p>If CoinLineup's controlling ownership, primary operating structure, or material funding relationships change in a way that affects reader trust, this page should be updated to reflect that change. If readers need clarification about a material business relationship, they can request it through the contact address listed below.</p>
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
      <h2>Purpose of this page</h2>
      <p>Readers, sources, and partners should have a clear route to contact the publication. This page exists so that story tips, corrections, legal questions, privacy requests, and commercial messages are not buried or difficult to route.</p>
      <h2>How to reach us effectively</h2>
      <ul>
        <li><strong>Editorial or story tips:</strong> include the relevant project, source link, or document.</li>
        <li><strong>Corrections:</strong> include the article URL, the disputed statement, and your supporting evidence.</li>
        <li><strong>Business inquiries:</strong> include your company name, website, and the nature of the request.</li>
        <li><strong>Privacy or legal requests:</strong> clearly identify the request type in the email subject line.</li>
      </ul>
      <h2>Suggested subject lines</h2>
      <ul>
        <li><strong>Correction Request</strong> for factual accuracy concerns</li>
        <li><strong>Story Tip</strong> for editorial leads or supporting documents</li>
        <li><strong>Privacy Request</strong> for data-related questions</li>
        <li><strong>Business Inquiry</strong> for advertising or partnership requests</li>
        <li><strong>Legal Notice</strong> for formal legal communications</li>
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
      <h2>Scope</h2>
      <p>This policy applies to information collected through the CoinLineup website and related site features. It is intended to describe the main categories of information we may process, why we may process it, and what choices readers may have.</p>
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
      <h2>Email and newsletter communications</h2>
      <p>If a reader voluntarily subscribes to email updates, CoinLineup may use the submitted address to send newsletter or site-related communications covered by the signup flow. Readers may opt out using the unsubscribe method provided in the message or by contacting us directly.</p>
      <h2>Third-party services</h2>
      <p>We may use third-party infrastructure or analytics providers to operate the website. Those providers may process limited technical data as needed to deliver their services.</p>
      <h2>Security and abuse prevention</h2>
      <p>We may process limited technical data to maintain site reliability, detect abuse, enforce site rules, and protect the service from malicious or unauthorized activity.</p>
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
      <h2>Scope of the terms</h2>
      <p>These terms govern access to the CoinLineup website and related site functionality. Separate agreements may apply to third-party services, external links, or commercial arrangements referenced on the site.</p>
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
      <h2>Changes to the site or terms</h2>
      <p>CoinLineup may update site features, policies, or these terms from time to time. Continued use of the site after a revised version is published constitutes acceptance of the updated terms to the extent permitted by law.</p>
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
      <h2>No professional advice</h2>
      <p>Publication of market commentary, token analysis, protocol research, or exchange coverage does not create an adviser-client, fiduciary, legal, or tax relationship between CoinLineup and the reader.</p>
      <h2>No endorsement by coverage alone</h2>
      <p>References to a token, company, exchange, product, or protocol should not be read as a recommendation or guarantee. Readers should perform their own due diligence before acting on any information discussed on the site.</p>
      <h2>Fast-moving information</h2>
      <p>Because the crypto sector changes rapidly, an accurate statement at the time of publication may become incomplete later. Readers should look at publication and updated dates and verify time-sensitive facts independently when decisions involve real financial or legal consequences.</p>
      <p>Readers should independently verify important information and consult qualified professionals before making financial or legal decisions.</p>
    `,
  },
  {
    slug: "affiliate-disclaimer",
    title: "Affiliate Disclaimer",
    content: `
      <h1>Affiliate Disclaimer</h1>
      <p>Some CoinLineup pages may include affiliate links. If a reader clicks an affiliate link and completes a qualifying action, CoinLineup may receive a commission at no additional cost to the reader.</p>
      <h2>Purpose of this disclosure</h2>
      <p>Readers should be able to understand when a commercial incentive may exist on a page. This disclosure is intended to make that relationship visible rather than implicit.</p>
      <h2>What affiliate compensation can look like</h2>
      <p>Compensation may be tied to clicks, signups, funded accounts, purchases, or other qualifying actions defined by a third-party partner program.</p>
      <p>Affiliate relationships should not determine editorial conclusions. We do not accept compensation in exchange for undisclosed favorable coverage.</p>
      <h2>How CoinLineup aims to separate editorial and affiliate interests</h2>
      <ul>
        <li>Affiliate incentives should not be hidden when they materially affect a page.</li>
        <li>Commercial relationships should not be presented as neutral editorial conclusions when that would mislead readers.</li>
        <li>Readers should be able to distinguish a disclosure page, a review page, and pure editorial reporting.</li>
      </ul>
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
      <h2>Why this page exists</h2>
      <p>RSS helps readers and compatible services discover newly published CoinLineup content in a structured way. Making feed access visible also helps reduce confusion about where the main publication feed lives.</p>
      <h2>How to use it</h2>
      <p>Copy the main feed URL into your preferred RSS reader to receive newly published CoinLineup content as it is added.</p>
      <h2>What the feed is for</h2>
      <p>The main feed is intended to expose newly published content in a machine-readable format suitable for feed readers and compatible discovery tools. Feed contents and formatting may change as the publishing stack evolves.</p>
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
