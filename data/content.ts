import { CHECKOUT } from "./books";
export { CHECKOUT };

export const nav = [
  { label: "Home", href: "/" },
  { label: "The Guide", href: "/books/the-eat-your-green-guide" },
  { label: "Recipe Book", href: "/books/the-green-plate-recipe-book" },
  { label: "About", href: "/about" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

// Home brand hero
export const hero = {
  h1: "End the Dinner-Table Battles — Without Tears, Bribes, or Guilt.",
  subhead:
    'Two gentle, pressure-free digital books that help moms turn "yuck" into "yes" — the method that calms mealtimes, and the recipes that make greens fun.',
  ctaPrimary: "Explore the Books",
  trust: "★ 4.8/5 from 500+ parents · Instant download · 14-day money-back guarantee",
};

export const booksIntro = {
  heading: "Two books. One calmer dinner table.",
  sub: "Start with the method, add the recipes — or grab both and save.",
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

export const beforeAfter = {
  heading: "From battleground to dinner table",
  rows: [
    { before: "Tears, bribes, and standoffs", after: "Calm meals and willing tries" },
    { before: "Cooking two separate dinners", after: "One meal the whole family eats" },
    { before: "Guilt and self-doubt", after: "Confidence that you've got this" },
    { before: '"My kid will never eat greens"', after: '"My kid asked for the green smoothie"' },
  ],
};

export const stats = [
  { value: 500, suffix: "+", label: "families using the method" },
  { value: 90, suffix: "%", label: "report reduced mealtime stress within weeks" },
  { value: 95, suffix: "%", label: "of children feel safe exploring greens" },
];

export const bundle = {
  heading: "Get both books and save",
  body: "The method + the recipes, together. The complete gentle system for calmer, greener dinners.",
  oldPrice: 898,
  price: 799,
  cta: "Get the Complete Pack",
  href: CHECKOUT.bundle,
};

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
  // TODO: client supplies real author name, photo, and bio
  authorName: "TODO: Author Name",
  authorBio:
    "TODO: 2–3 line credibility blurb. e.g. A certified gentle-parenting coach and mom of two former picky eaters, who built the 4C Method after years of dinner-table standoffs of her own.",
  body: [
    "Eat Your Green started at a real dinner table — with cold food, hot tempers, and a parent who'd tried everything.",
    "The breakthrough wasn't a new recipe or a stricter rule. It was lowering the pressure. When greens stopped being a battle, curiosity had room to grow.",
    "These two books are that approach, written down: the gentle method, and the meals that make it stick. No force. No bribes. No guilt.",
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
