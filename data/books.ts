export type Money = number;

export type InsideItem = { name: string; desc: string; value?: string };

export type Book = {
  slug: string;
  title: string;
  tagline: string;        // short one-liner for cards
  subhead: string;        // hero paragraph
  price: Money;
  oldPrice: Money;
  checkout: string;
  cover: string;
  pdf: string;            // path under /public/downloads/ — TODO: replace placeholder with real file
  accent: "brand" | "gold";
  badge?: string;
  forWho: string;
  pages: string;
  format: string;
  whatsInside: InsideItem[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
};

// Systeme.io checkout links
export const CHECKOUT = {
  guide: "https://eatyourgreen.systeme.io/checkout",
  toolkit: "https://eatyourgreen.systeme.io/bundlepack",
};

export const books: Book[] = [
  {
    slug: "the-eat-your-green-guide",
    title: "The Eat Your Green Guide",
    tagline: "The gentle 4C Method that turns mealtime battles into willing tries.",
    subhead:
      'The pressure-free system 500+ moms are using to turn "yuck" into "yes" — and get their picky eater curious about greens in as little as 7 days.',
    price: 399,
    oldPrice: 599,
    checkout: CHECKOUT.guide,
    cover: "/images/cover-guide.jpg",
    pdf: "/downloads/the-eat-your-green-guide.pdf",
    accent: "brand",
    badge: "Start here",
    forWho: "Parents of picky eaters aged 2–12 who want calm, not conflict, at the table.",
    pages: "~60 pages",
    format: "Instant PDF download",
    whatsInside: [
      { name: "The full 4C System", desc: "Curiosity, Comfort, Confidence, Connection — in simple, doable steps." },
      { name: "What to say at the table", desc: "Word-for-word scripts that lower pressure instead of raising it." },
      { name: "The 7-day gentle plan", desc: "A calm day-by-day path to your first willing try." },
      { name: "BONUS: Fussy-Eater SOS Cheat Sheet", desc: "Phrases that defuse a meltdown in seconds.", value: "₹299 value" },
    ],
    outcomes: [
      "Calm meals and willing tries instead of tears and standoffs",
      "One family meal instead of cooking two separate dinners",
      "Confidence that you've got this — guilt-free",
      "A child who's curious about greens, not afraid of them",
    ],
    faqs: [
      {
        q: "Will this really work for my fussy eater?",
        a: 'It\'s built for the toughest "no greens ever" kids aged 2–12. It works by lowering pressure — which is exactly what strong-willed eaters respond to. Most parents see a first willing try within the first week.',
      },
      {
        q: "I have no time. Is it complicated?",
        a: "No. The steps take about 5 minutes and fit into meals you already cook. There are no special recipes, ingredients, or shopping trips.",
      },
      {
        q: "My child is extremely stubborn — is it too late?",
        a: "It's not too late. The method doesn't rely on willpower or rules; it slowly rebuilds your child's trust around food, which works at any age in the 2–12 range.",
      },
      {
        q: "How do I get it?",
        a: "It's an instant digital download — the PDF starts downloading automatically right after checkout, and we email you a copy as backup. You can start tonight.",
      },
    ],
    ctaLabel: "Get the Guide",
    metaTitle: "The Eat Your Green Guide — End Mealtime Battles Gently",
    metaDescription:
      "The gentle, pressure-free 4C Method 500+ moms use to get picky eaters (2–12) curious about greens — without tears, bribes, or guilt. Instant download.",
  },
  {
    slug: "the-eat-your-green-complete-toolkit",
    title: "The Eat Your Green Complete Toolkit",
    tagline: "Activities, games, trackers & checklists — gentle, ready-to-use tools that make greens feel like play.",
    subhead:
      "The done-for-you companion to the 4C Method: 25+ printable activities, games and trackers that turn “eat your greens” into something kids actually want to do — no pressure, no nagging.",
    price: 799,
    oldPrice: 1995,
    checkout: CHECKOUT.toolkit,
    cover: "/images/cover-complete-toolkit.jpg",
    pdf: "/downloads/the-eat-your-green-complete-toolkit.pdf",
    accent: "gold",
    badge: "Most Popular",
    forWho: "Parents who want a calmer table now — with done-for-you games, trackers and activities that make trying greens fun.",
    pages: "25+ printable pages",
    format: "Instant PDF download",
    whatsInside: [
      { name: "The full 4C Method Guide", desc: "Everything in The Guide — the complete gentle system, included." },
      { name: "Printable Trackers & Charts", desc: "Turn progress into a game kids want to win.", value: "₹399 value" },
      { name: "Weekend Games Pack", desc: "Playful activities that spark curiosity, not lessons.", value: "₹399 value" },
      { name: "4C Quick-Start Cards", desc: "Exactly what to say and do at the table.", value: "₹299 value" },
      { name: "Exploration & Activity Sheets", desc: "Leaf hunts, sorting games and colour-ins that build curiosity." },
      { name: "BONUS: Fussy-Eater SOS Cheat Sheet", desc: "Phrases that defuse a meltdown in seconds.", value: "₹299 value" },
    ],
    outcomes: [
      "A grab-and-go activity for any tricky mealtime",
      "Kids racing to fill in their tracker instead of resisting",
      "Cooking and play that build curiosity, not pressure",
      "The complete system in one place — nothing left to guess",
    ],
    faqs: [
      {
        q: "What's the difference between the Guide and the Toolkit?",
        a: "The Guide gives you the method. The Complete Toolkit includes the full method plus the printables, games, trackers and activity sheets that make it stick day-to-day — most parents choose the Toolkit.",
      },
      {
        q: "Do I need a printer?",
        a: "A printer helps for the trackers, games and activity cards, but everything can also be used on a tablet or screen. The method itself needs nothing extra.",
      },
      {
        q: "Are the activities age-appropriate?",
        a: "Yes — the games and sheets are designed for ages 2–12, with simpler and more advanced options so they grow with your child.",
      },
      {
        q: "How do I get it?",
        a: "Instant digital download — your files start downloading automatically right after checkout, with an email backup. Start tonight.",
      },
    ],
    ctaLabel: "Get the Complete Toolkit",
    metaTitle: "The Eat Your Green Complete Toolkit — Activities, Games & Trackers",
    metaDescription:
      "25+ printable activities, games, trackers and checklists — the complete gentle system that makes greens feel like play. Includes the full 4C Method. Instant download.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export type DownloadItem = { title: string; file: string; price: number };

// Resolve which PDF(s) to deliver after payment, keyed by the ?plan query value.
// The Toolkit is the complete pack, so it delivers BOTH PDFs.
export function getDownloads(plan?: string): DownloadItem[] {
  const key = (plan || "").toLowerCase();
  const guide = books.find((b) => b.slug.includes("guide"))!;
  const toolkit = books.find((b) => b.slug.includes("toolkit"))!;

  const isToolkit =
    key.includes("toolkit") ||
    key.includes("complete") ||
    key.includes("bundle") ||
    key === toolkit.slug;

  if (isToolkit) {
    return [guide, toolkit].map((b) => ({ title: b.title, file: b.pdf, price: b.price }));
  }
  // default: just the Guide
  return [{ title: guide.title, file: guide.pdf, price: guide.price }];
}
