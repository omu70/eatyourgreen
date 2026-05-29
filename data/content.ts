import { CHECKOUT } from "./books";
export { CHECKOUT };

export const nav = [
  { label: "Home", href: "/" },
  { label: "The Guide", href: "/books/the-eat-your-green-guide" },
  { label: "Complete Toolkit", href: "/books/the-eat-your-green-complete-toolkit" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export const hero = {
  h1: "End the Dinner-Table Battles — Without Tears, Bribes, or Guilt.",
  subhead:
    'The gentle, pressure-free method 500+ moms are using to turn "yuck" into "yes" — and get their picky eater curious about greens in as little as 7 days.',
  ctaPrimary: "Explore the Books",
  trust: "★ 4.8/5 from 500+ parents · Instant download · 14-day money-back guarantee",
};

export const trustBadges = [
  { icon: "Download", label: "Instant digital download" },
  { icon: "ShieldCheck", label: "14-day money-back guarantee" },
  { icon: "Lock", label: "Secure checkout" },
  { icon: "Users", label: "Loved by 500+ parents" },
  { icon: "Star", label: "Rated 4.8 / 5" },
];

export const booksIntro = {
  heading: "Two books. One calmer dinner table.",
  sub: "Start with the method, or go all-in with the Complete Toolkit — both are gentle and pressure-free.",
};

export const pain = {
  heading: "Does this sound like your dinner table?",
  items: [
    "Every meal turns into a battle of wills.",
    "You bribe, negotiate, and beg — and still the greens come back untouched.",
    'You cook a separate "safe" meal just to avoid the tears.',
    "You're running behind them with a spoon while dinner goes cold.",
    'And quietly, you wonder: "Am I messing this up?"',
  ],
  closing:
    "It's exhausting. And the harder you push, the more they dig in — because pressure makes greens the enemy.",
};

export const empathy = {
  heading: "You're not a bad mom. You've just been handed the wrong playbook.",
  body:
    'Force, bribes and "two more bites" don\'t fail because you\'re not trying hard enough — they fail because they teach kids that vegetables are something to be survived, not enjoyed. There\'s a calmer way. And it starts tonight.',
};

export const method = {
  heading: "Introducing the 4C Method — how gentle moms raise green-eaters.",
  steps: [
    { title: "Curiosity", icon: "Sparkles", body: "Small, no-pressure ways to make greens interesting." },
    { title: "Comfort", icon: "Heart", body: "Removing the fear and the fight." },
    { title: "Confidence", icon: "TrendingUp", body: "Letting your child lead, one tiny win at a time." },
    { title: "Connection", icon: "Users", body: "Turning the table into a place you bond, not battle." },
  ],
};

// "How it works in real life" — image gallery (replace images with your photos)
export const howItWorks = {
  heading: "What it looks like in real life",
  sub: "Gentle, playful moments — not a battle plan.",
  items: [
    { img: "/images/how-curiosity.jpg", alt: "Mom and child exploring leaves with a magnifying glass", caption: "Spark curiosity with playful exploration" },
    { img: "/images/how-play.jpg", alt: "Mom and child playing a vegetable game with cards and dice", caption: "Turn trying greens into a game" },
    { img: "/images/how-cook.jpg", alt: "Mom and child cooking vegetables together", caption: "Cook together — no pressure to eat" },
    { img: "/images/how-eat.jpg", alt: "Child happily eating a green veggie snack", caption: "Involve them — washing, sorting, choosing" },
  ],
};

export const beforeAfter = {
  heading: "From battleground to dinner table",
  rows: [
    { before: "Tears, bribes, and standoffs", after: "Calm meals and willing tries" },
    { before: "Cooking two separate dinners", after: "One meal the whole family eats" },
    { before: "Guilt and self-doubt", after: "Confidence that you've got this" },
    { before: '"My kid will never eat greens"', after: '"My kid asked for the green smoothie"' },
  ],
};

// What changes, and when
export const results = {
  heading: "What changes — and how fast",
  sub: "Most families notice a calmer table within the first week.",
  steps: [
    { when: "Tonight", title: "The pressure drops", body: "You swap the begging and bribing for one calm shift — and the tension at the table eases right away." },
    { when: "Days 2–7", title: "Curiosity returns", body: "Using the 4C steps, your child starts to explore greens on their own terms — touching, smelling, a tiny taste." },
    { when: "Week 2", title: "Willing tries become normal", body: "Trying a green stops being a fight. Many parents report their first unprompted “can I try that?” moment." },
  ],
};

export const stats = [
  { value: 500, suffix: "+", label: "families using the method" },
  { value: 90, suffix: "%", label: "report reduced mealtime stress within weeks" },
  { value: 95, suffix: "%", label: "of children feel safe exploring greens" },
];

export const guarantee = {
  heading: "Your First Win in 14 Days — or Your Money Back.",
  body:
    "Try it for two weeks. If you don't see your child more curious and calmer around greens, email us and we'll refund every rupee. The only risk is another month of cold, untouched dinners.",
};

export const finalCta = {
  heading: "Tonight's dinner can be different.",
  cta: "Explore the Books",
  urgency: "Launch price ends soon.",
};

export const about = {
  heading: "Why Eat Your Green exists",
  authorName: "Prerna Sultania",
  authorTitle: "Author & gentle-feeding coach",
  authorBio:
    "Prerna Sultania is the author of Eat Your Green and the creator of the gentle 4C Method — a calm, pressure-free approach to helping picky eaters fall for greens, built from years of real dinner-table experience with fussy eaters of her own.",
  body: [
    "Eat Your Green started at a real dinner table — with cold food, hot tempers, and a parent who'd tried everything.",
    "The breakthrough wasn't a new recipe or a stricter rule. It was lowering the pressure. When greens stopped being a battle, curiosity had room to grow.",
    "These two books are that approach, written down: the gentle method, and the printable toolkit that makes it stick. No force. No bribes. No guilt.",
  ],
};

export const contact = {
  heading: "We're here to help",
  body: "Questions about the books, your download, or a refund? Send us a message and we'll get back to you within 1–2 business days.",
  email: "support@eatyourgreen.com", // TODO: real email
  instagram: "https://instagram.com/eatyourgreen", // TODO: real handle
};

export const footer = {
  contact: "support@eatyourgreen.com", // TODO: real email
  instagram: "https://instagram.com/eatyourgreen", // TODO: real handle
  secureNote: "Secure checkout · Instant digital delivery",
};
