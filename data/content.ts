import { CHECKOUT } from "./books";
export { CHECKOUT };

export const nav = [
  { label: "Home", href: "/" },
  { label: "The Guide", href: "/books/the-eat-your-green-guide" },
  { label: "Complete Toolkit", href: "/books/the-eat-your-green-complete-toolkit" },
  { label: "Author", href: "/author" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const payments = "UPI · Google Pay · PhonePe · Paytm · Cards";

// TODO: replace with your real support email. While it starts with "TODO",
// the email is hidden on the site (we rely on WhatsApp + the contact form).
export const supportEmail = "TODO-add-your-email";

// WhatsApp community (you'll share a QR code to join)
export const whatsappCommunity = {
  label: "Join our free WhatsApp community",
  link: "", // TODO: community invite link (optional)
  qr: "/images/whatsapp-qr.png", // TODO: drop your QR image here
};

// Launch offer deadline — the countdown counts down to this moment (IST).
// TODO: set your real end date/time. Format: YYYY-MM-DDTHH:MM:SS+05:30
export const launchDeadline = "2026-06-30T23:59:59+05:30";

export const hero = {
  h1: "Get your fussy child to happily eat greens — without fights, bribes or tears.",
  subhead:
    "A simple, gentle way for Indian parents to get fussy kids (age 2–12) to start eating greens — no shouting, no bribing, no drama. It works with the everyday meals you already cook.",
  ctaPrimary: "See the books →",
  trust: "★ 4.8/5 · Loved by 5000+ Indian parents · Instant download",
  // TODO: replace with your exact "what you'll discover" points
  discover: {
    heading: "What you'll discover inside:",
    items: [
      "The one calm sentence to say when your child refuses a vegetable",
      'Why "just one more bite" backfires — and the gentle thing to do instead',
      "A 5-minute dinner habit that slowly builds curiosity about greens",
    ],
  },
};

export const trustBadges = [
  { icon: "Download", label: "Instant download — also sent on WhatsApp & email" },
  { icon: "Lock", label: "Pay safely by UPI, Google Pay, PhonePe, Paytm or card" },
  { icon: "ShieldCheck", label: "28-day money-back promise" },
  { icon: "Users", label: "Trusted by 5000+ Indian parents" },
  { icon: "Star", label: "Easy to read on any phone" },
];

export const howToGet = {
  heading: "Getting it is simple",
  sub: "From payment to your first calm dinner — in minutes.",
  steps: [
    { icon: "CreditCard", title: "1. Pay safely", body: "Pay with UPI, Google Pay, PhonePe, Paytm or any card. Safe and secure." },
    { icon: "Download", title: "2. Get it instantly", body: "Your book downloads right away. We also send it to your WhatsApp and email — so you never lose it." },
    { icon: "Smile", title: "3. Start tonight", body: "Open it on your phone and try the first easy step at dinner today." },
  ],
};

export const madeForIndia = {
  heading: "Made for Indian families",
  body:
    "No fancy or foreign ingredients. The steps fit the everyday Indian meals you already cook — dal, sabzi, roti and more. Simple words, simple steps, made for busy Indian parents.",
};

export const booksIntro = {
  heading: "Two books. One calmer dinner table.",
  sub: "Start with the book that teaches the method, or get the full toolkit with games and trackers. Both are simple and gentle.",
};

export const pain = {
  heading: "Does this sound like your dinner table?",
  items: [
    "Every meal turns into a fight.",
    "You beg, bribe and bargain — and the greens still come back untouched.",
    "You cook a separate plain meal just to stop the crying.",
    "You run behind them with a spoon while the food goes cold.",
    "You worry they're not getting enough nutrition — and it keeps you up at night.",
    'And quietly you wonder: "Am I doing something wrong?"',
  ],
  closing:
    "It's tiring. And the harder you push, the more they refuse — because pushing makes greens feel like the enemy.",
};

export const empathy = {
  heading: "You're not a bad parent. You were just given the wrong way.",
  body:
    'Forcing, bribing and "just two more bites" don\'t fail because you aren\'t trying hard enough. They fail because they teach kids that vegetables are something to fear, not enjoy. There is a calmer way — and it can start at tonight\'s dinner.',
};

// The 4C method: Curiosity, Connection, Creativity, Consistency
export const method = {
  heading: "The simple 4C way to raise a happy green-eater.",
  steps: [
    { title: "Curiosity", icon: "Sparkles", body: "Easy, no-pressure ways to make greens look interesting." },
    { title: "Connection", icon: "Users", body: "Make the dinner table a happy place, not a battle." },
    { title: "Creativity", icon: "Palette", body: "Playful ways to explore greens — games, colours and shapes." },
    { title: "Consistency", icon: "Repeat", body: "Small, gentle repeats that turn trying into a lasting habit." },
  ],
};

export const howItWorks = {
  heading: "What it looks like at home",
  sub: "Gentle, playful moments — not a fight.",
  items: [
    { img: "/images/how-curiosity.jpg", alt: "Mother and child looking at leaves with a magnifying glass", caption: "Make greens fun to explore" },
    { img: "/images/how-play.jpg", alt: "Mother and child playing a vegetable game with cards and dice", caption: "Turn trying greens into a game" },
    { img: "/images/how-cook.jpg", alt: "Mother and child cooking vegetables together", caption: "Cook together — no pressure to eat" },
    { img: "/images/how-eat.jpg", alt: "Child helping wash vegetables at the sink", caption: "Explore greens with all the senses" },
  ],
};

export const beforeAfter = {
  heading: "From daily fights to a calm table",
  rows: [
    { before: "Crying, bribes and stubborn fights", after: "Calm meals and happy little tries" },
    { before: "Cooking two separate dinners", after: "One meal the whole family eats" },
    { before: "Guilt and self-doubt", after: "Confidence that you've got this" },
    { before: '"My child will never eat greens"', after: '"My child asked for the green smoothie!"' },
  ],
};

export const results = {
  heading: "What changes — and how soon",
  sub: "Most parents see a calmer dinner table in the very first week.",
  steps: [
    { when: "Tonight", title: "The pressure goes away", body: "You make one small change — and the tension at the table eases the same evening." },
    { when: "Days 2–7", title: "Curiosity comes back", body: "Using the simple steps, your child starts to explore greens on their own — touching, smelling, a tiny taste." },
    { when: "Week 2", title: "Trying greens feels normal", body: "Trying a green stops being a fight. Many parents hear their first happy “can I try that?”." },
  ],
};

export const stats = [
  { value: 5000, suffix: "+", label: "families using this method" },
  { value: 90, suffix: "%", label: "say dinner stress dropped within weeks" },
  { value: 95, suffix: "%", label: "of kids feel safe trying greens" },
];

export const leadMagnet = {
  heading: "Not ready to buy? Start free.",
  sub: "Get a free sample — 5 gentle phrases that stop a mealtime meltdown in seconds. Sent straight to your inbox.",
  cta: "Send me the free sample",
  note: "No spam. Unsubscribe anytime.",
};

export const guarantee = {
  heading: "Your first win in 28 days — or your money back.",
  body:
    "Try it for a full 28 days. If your child isn't calmer and more curious about greens, just email us and we'll return your full money — no questions asked. The only risk is another month of cold, untouched dinners.",
};

export const finalCta = {
  heading: "Tonight's dinner can be different.",
  cta: "See the books",
  urgency: "Special launch price — ends soon:",
};

export const about = {
  heading: "Why Eat Your Green exists",
  body: [
    "Eat Your Green started at a real dinner table — with cold food, short tempers, and a parent who had tried everything.",
    "The change wasn't a new recipe or a stricter rule. It was simply removing the pressure. When greens stopped being a fight, curiosity had room to grow.",
    "These two books are that simple approach, written down: the method, and the toolkit that makes it easy to follow every day. No force. No bribes. No guilt.",
  ],
};

// Separate Author page — content & photo to be provided by you.
export const author = {
  name: "Prerna Sultania",
  title: "Author of Eat Your Green",
  bio: [
    "TODO: Add Prerna's real bio here (you'll provide this).",
    "A short, warm 2–3 paragraph story — who she is, why she created Eat Your Green, and what makes the gentle method trustworthy for Indian parents.",
  ],
  photo: "/images/author.jpg", // TODO: replace with the real author photo
};

export const contact = {
  heading: "We're here to help",
  body: "Questions about the books, your download, or a refund? Message us and we'll reply within 1–2 working days.",
  email: supportEmail,
  instagram: "https://instagram.com/eatyourgreen", // TODO: real handle
};

export const footer = {
  email: supportEmail,
  instagram: "https://instagram.com/eatyourgreen", // TODO: real handle
  secureNote: "Safe payment · Instant delivery on WhatsApp & email",
  payments,
};
