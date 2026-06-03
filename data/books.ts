export type Money = number;
export type InsideItem = { name: string; desc: string; value?: string };
export type GalleryItem = { img: string; caption: string };

export type Book = {
  slug: string;
  title: string;
  tagline: string;
  subhead: string;
  price: Money;
  oldPrice: Money;
  checkout: string;       // external checkout URL (fallback if Razorpay not configured)
  cover: string;
  pdf: string;            // delivered after payment — TODO: replace placeholders with real files
  accent: "brand" | "gold";
  badge?: string;
  forWho: string;
  pages: string;
  format: string;
  whatsInside: InsideItem[];
  outcomes: string[];
  gallery?: GalleryItem[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
};

export const CHECKOUT = {
  guide: "https://eatyourgreen.systeme.io/checkout",
  toolkit: "https://eatyourgreen.systeme.io/bundlepack",
};

export const books: Book[] = [
  {
    slug: "the-eat-your-green-guide",
    title: "The Eat Your Green Guide",
    tagline: "The gentle 4C way that turns mealtime fights into happy little tries.",
    subhead:
      'The pressure-free system 5000+ moms are using to turn "yuck" into "yes" — and get their fussy eater curious about greens in as little as 7 days.',
    price: 399,
    oldPrice: 599,
    checkout: CHECKOUT.guide,
    cover: "/images/cover-guide.jpg",
    pdf: "/downloads/the-eat-your-green-guide.pdf",
    accent: "brand",
    badge: "Start here",
    forWho: "Parents of fussy eaters aged 2–12 who want calm, not fights, at the table.",
    pages: "~60 pages",
    format: "Instant PDF download",
    whatsInside: [
      { name: "The full 4C System", desc: "Curiosity, Connection, Creativity, Consistency — in simple, doable steps." },
      { name: "What to say at the table", desc: "Word-for-word lines that lower pressure instead of raising it." },
      { name: "The 7-day gentle plan", desc: "A calm day-by-day path to your first happy try." },
      { name: "Pre-Meal, During-Meal & Post-Meal Ideas", desc: "Simple ways to make food fun and engaging — before, during and after the meal." },
      { name: "BONUS: Fussy-Eater SOS Cheat Sheet", desc: "Lines that calm a meltdown in seconds.", value: "₹299 value" },
    ],
    outcomes: [
      "Calm meals and happy tries instead of crying and fights",
      "One family meal instead of cooking two separate dinners",
      "Confidence that you've got this — guilt-free",
      "A child who's curious about greens, not scared of them",
    ],
    gallery: [
      { img: "/images/guide-sample-1.jpg", caption: "The 4C Method, made simple" },
      { img: "/images/guide-sample-2.jpg", caption: "What to say at the table" },
      { img: "/images/guide-sample-3.jpg", caption: "Pre, during & post-meal ideas" },
    ],
    faqs: [
      { q: "Will this really work for my fussy eater?", a: 'It\'s built for the toughest "no greens ever" kids aged 2–12. It works by lowering pressure — which is exactly what strong-willed eaters respond to. Most parents see a first happy try within the first week.' },
      { q: "I have no time. Is it complicated?", a: "No. The steps take about 5 minutes and fit into meals you already cook. No special recipes or shopping." },
      { q: "My child is very stubborn — is it too late?", a: "It's not too late. The method slowly rebuilds your child's trust around food, which works at any age in the 2–12 range." },
      { q: "How do I get it?", a: "Instant digital download — the PDF arrives right after payment, and we also send it on WhatsApp and email. Start tonight." },
    ],
    ctaLabel: "Get the Guide",
    metaTitle: "The Eat Your Green Guide — End Mealtime Fights Gently",
    metaDescription:
      "The gentle, pressure-free 4C method 5000+ moms use to get fussy eaters (2–12) curious about greens — without tears, bribes or guilt. Instant download.",
  },
  {
    slug: "the-eat-your-green-complete-toolkit",
    title: "The Eat Your Green Complete Toolkit",
    tagline: "Activities, games, trackers & checklists — ready-to-use tools that make greens feel like play.",
    subhead:
      "The done-for-you companion to the 4C method: 25+ printable activities, games and trackers that turn “eat your greens” into something kids actually want to do — no pressure, no nagging.",
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
      { name: "BONUS: Fussy-Eater SOS Cheat Sheet", desc: "Lines that calm a meltdown in seconds.", value: "₹299 value" },
    ],
    outcomes: [
      "A grab-and-go activity for any tricky mealtime",
      "Kids racing to fill in their tracker instead of resisting",
      "Cooking and play that build curiosity, not pressure",
      "The complete system in one place — nothing left to guess",
    ],
    gallery: [
      { img: "/images/toolkit-sample-2.jpg", caption: "Everything inside the printable pack" },
      { img: "/images/toolkit-sample-1.jpg", caption: "“My favourite green” progress chart" },
      { img: "/images/toolkit-sample-3.jpg", caption: "Ready-to-use games, trackers & checklists" },
    ],
    faqs: [
      { q: "What's the difference between the Guide and the Toolkit?", a: "The Guide gives you the method. The Complete Toolkit includes the full method plus the printables, games, trackers and activity sheets that make it stick day-to-day — most parents choose the Toolkit." },
      { q: "Do I need a printer?", a: "A printer helps for the trackers, games and cards, but everything also works on a tablet or screen. The method itself needs nothing extra." },
      { q: "Are the activities age-appropriate?", a: "Yes — the games and sheets are designed for ages 2–12, with simpler and harder options so they grow with your child." },
      { q: "How do I get it?", a: "Instant digital download — your files arrive right after payment, with a WhatsApp and email backup. Start tonight." },
    ],
    ctaLabel: "Get the Complete Toolkit",
    metaTitle: "The Eat Your Green Complete Toolkit — Activities, Games & Trackers",
    metaDescription:
      "25+ printable activities, games, trackers and checklists — the complete gentle system that makes greens feel like play. Includes the full 4C method. Instant download.",
  },
  {
    slug: "raising-kids-in-a-junk-food-world",
    title: "Raising Kids in a Junk Food World",
    tagline: "Raising healthy eaters in a world of screens, snacks and ultra-processed food.",
    subhead:
      "Book 2 in the Eat Your Green series — calm, realistic ways to help your child make good food choices when junk food is everywhere. No guilt, no strict rules.",
    // TODO: confirm pricing for Book 2
    price: 599,
    oldPrice: 999,
    checkout: "", // on-site Razorpay checkout
    cover: "/images/cover-raising-kids.jpg",
    pdf: "/downloads/raising-kids-in-a-junk-food-world.pdf",
    accent: "brand",
    badge: "New · Book 2",
    forWho: "Parents who want to raise healthy, confident eaters in a modern, junk-food-heavy world.",
    pages: "~70 pages",
    format: "Instant PDF download",
    whatsInside: [
      { name: "Understanding the junk-food world", desc: "Why kids are pulled towards ultra-processed food — and what actually helps." },
      { name: "Screens, snacks & marketing", desc: "Simple ways to handle ads, packets and pester-power without daily battles." },
      { name: "Small daily habits", desc: "Realistic routines that build healthy choices — without guilt or perfection." },
      { name: "Raising a confident eater", desc: "Help your child make good food choices on their own, for life." },
    ],
    outcomes: [
      "Less stress about snacks, screens and treats",
      "A calm plan for parties, school and outside food",
      "Healthier everyday choices — without banning everything",
      "A child who can make good food choices on their own",
    ],
    gallery: [
      { img: "/images/rk-sample-1.jpg", caption: "Living in a junk-food world" },
      { img: "/images/rk-sample-2.jpg", caption: "Small daily habits that work" },
      { img: "/images/rk-sample-3.jpg", caption: "Raising confident eaters" },
    ],
    faqs: [
      { q: "Is this about banning junk food?", a: "No. It's about balance and calm boundaries — helping kids enjoy treats sometimes while building healthy everyday habits, without guilt." },
      { q: "What age is it for?", a: "It's written for parents of children aged 2–12, with ideas that adapt as your child grows." },
      { q: "Do I need Book 1 first?", a: "No — it stands on its own. It pairs well with The Guide, but you can start with either." },
      { q: "How do I get it?", a: "Instant digital download — the PDF arrives right after payment, with a WhatsApp and email backup." },
    ],
    ctaLabel: "Get Book 2",
    metaTitle: "Raising Kids in a Junk Food World — Eat Your Green Book 2",
    metaDescription:
      "Calm, realistic ways to raise healthy, confident eaters in a world of screens, snacks and ultra-processed food. Book 2 in the Eat Your Green series. Instant download.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export type DownloadItem = { title: string; file: string; price: number };

// Resolve which PDF(s) to deliver after payment, keyed by ?plan (a book slug or alias).
export function getDownloads(plan?: string): DownloadItem[] {
  const key = (plan || "").toLowerCase();
  const guide = books.find((b) => b.slug.includes("guide"))!;
  const toolkit = books.find((b) => b.slug.includes("toolkit"))!;

  // Toolkit / complete / bundle delivers the method + the toolkit
  if (key.includes("toolkit") || key.includes("complete") || key.includes("bundle")) {
    return [guide, toolkit].map((b) => ({ title: b.title, file: b.pdf, price: b.price }));
  }
  // Exact or loose slug match for any book
  const book =
    books.find((b) => b.slug === key) ||
    books.find((b) => key && (b.slug.includes(key) || key.includes(b.slug))) ||
    guide;
  return [{ title: book.title, file: book.pdf, price: book.price }];
}
