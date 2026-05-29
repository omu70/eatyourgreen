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
  pdf: string;       // path under /public/downloads/ — TODO: replace placeholder with real file
  accent: "brand" | "gold"; // visual accent
  badge?: string;
  forWho: string;
  pages: string;          // e.g. "60 pages"
  format: string;         // e.g. "Instant PDF download"
  whatsInside: InsideItem[];
  outcomes: string[];
  faqs: { q: string; a: string }[];
  ctaLabel: string;
  metaTitle: string;
  metaDescription: string;
};

// Shared checkout links
export const CHECKOUT = {
  guide: "https://eatyourgreen.systeme.io/checkout",
  // TODO: replace with the real Systeme.io checkout URL for the recipe book
  recipeBook: "https://eatyourgreen.systeme.io/recipebook",
  // Buy-both bundle
  bundle: "https://eatyourgreen.systeme.io/bundlepack",
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
    cover: "/images/cover-guide.png",
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
        q: "Will this work for my picky eater?",
        a: 'Built for the toughest "no greens ever" kids aged 2–12 — it works by lowering pressure, which is exactly what strong-willed eaters respond to.',
      },
      {
        q: "I have no time. Is it complicated?",
        a: "No. Steps are 5 minutes and fit into meals you already cook. No special recipes or shopping.",
      },
      {
        q: "How do I get it?",
        a: "Instant digital download right after checkout — start tonight.",
      },
      {
        q: "What if it doesn't help?",
        a: "14-day money-back guarantee, no questions asked.",
      },
    ],
    ctaLabel: "Get the Guide",
    metaTitle: "The Eat Your Green Guide — End Mealtime Battles Gently | Eat Your Green",
    metaDescription:
      "The gentle, pressure-free 4C Method 500+ moms use to get picky eaters (2–12) curious about greens — without tears, bribes, or guilt. Instant download.",
  },
  {
    slug: "the-green-plate-recipe-book",
    title: "The Green Plate Recipe Book",
    tagline: "50 fuss-free, kid-approved ways to get greens onto the plate — and keep them there.",
    subhead:
      "The recipe companion to the 4C Method: simple, playful, low-pressure meals built around how kids actually eat — so trying something green feels like fun, not a fight.",
    // TODO: confirm pricing for the recipe book
    price: 499,
    oldPrice: 799,
    checkout: CHECKOUT.recipeBook,
    cover: "/images/cover-recipe-book.png",
    pdf: "/downloads/the-green-plate-recipe-book.pdf",
    accent: "gold",
    badge: "New",
    forWho: "Parents who have the method down and now want done-for-you meals kids will actually try.",
    pages: "~80 pages",
    format: "Instant PDF download",
    whatsInside: [
      { name: "50 kid-approved recipes", desc: "Breakfasts, lunches, snacks and dinners — every one with a gentle green in it." },
      { name: "5-minute 'first taste' bites", desc: "Tiny, no-pressure ways to introduce a new green without a standoff." },
      { name: "Weekend Games Pack recipes", desc: "Playful cook-together activities that spark curiosity, not lessons.", value: "₹399 value" },
      { name: "Swap-it shopping list", desc: "Easy greens to keep on hand and what to swap when they say no." },
      { name: "BONUS: Lunchbox & smoothie cards", desc: "Grab-and-go ideas for busy mornings.", value: "₹299 value" },
    ],
    outcomes: [
      "A week of meals planned without the 'what do I cook?' panic",
      "Greens hidden in plain sight — in food kids already love",
      "Cooking that becomes play, not a battle of wills",
      '"My kid asked for the green smoothie" moments',
    ],
    faqs: [
      {
        q: "Are the recipes complicated?",
        a: "No — most use everyday ingredients and take 20 minutes or less. No fancy equipment.",
      },
      {
        q: "Do I need the Guide first?",
        a: "Not at all. The recipes stand alone, but they work best paired with the gentle 4C Method in the Guide.",
      },
      {
        q: "Are they suitable for allergies / vegetarian diets?",
        a: "Most recipes are vegetarian-friendly with simple swap notes. Always check ingredients for your child's specific allergies.",
      },
      {
        q: "How do I get it?",
        a: "Instant digital download right after checkout.",
      },
    ],
    ctaLabel: "Get the Recipe Book",
    metaTitle: "The Green Plate Recipe Book — 50 Kid-Approved Veggie Meals | Eat Your Green",
    metaDescription:
      "50 fuss-free, kid-approved recipes that get greens onto the plate — the recipe companion to the gentle 4C Method. Instant PDF download.",
  },
];

export function getBook(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

export type DownloadItem = { title: string; file: string; price: number };

// Resolve which PDF(s) to deliver after payment, keyed by the ?plan query value.
// plan can be a book slug, "bundle", or "guide"/"toolkit" legacy values.
export function getDownloads(plan?: string): DownloadItem[] {
  const key = (plan || "").toLowerCase();
  if (key === "bundle" || key === "both" || key === "complete" || key === "toolkit") {
    return books.map((b) => ({ title: b.title, file: b.pdf, price: b.price }));
  }
  // try exact slug match, then loose contains (e.g. "guide", "recipe")
  const exact = books.find((b) => b.slug === key);
  const loose =
    exact ||
    books.find((b) => key && (b.slug.includes(key) || key.includes(b.slug))) ||
    books.find((b) => key.includes("recipe") && b.slug.includes("recipe")) ||
    books.find((b) => key.includes("guide") && b.slug.includes("guide"));
  const book = exact || loose || books[0]; // default to the Guide
  return [{ title: book.title, file: book.pdf, price: book.price }];
}
