import { CHECKOUT } from "./books";
export { CHECKOUT };

export const nav = [
  { label: "Home", href: "/" },
  { label: "The Guide", href: "/books/the-eat-your-green-guide" },
  { label: "Green Explorer Bundle", href: "/books/the-eat-your-green-complete-toolkit" },
  { label: "Junk Food World Guide", href: "/books/raising-kids-in-a-junk-food-world" },
  { label: "About", href: "/about" },
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
  number: "",
  link: "https://chat.whatsapp.com/CbmN4dn73H7BBBsJkBimku",
  qr: "/images/whatsapp-qr.png",
};

// Early-bird scarcity offer (used instead of a countdown timer)
export const offer = {
  line: "First 100 moms get ₹200 off",
  note: "Limited early-bird spots — once they're gone, the price goes back up.",
};

export const hero = {
  h1: "The daily fight over green veggies ends here.",
  subhead:
    "Tears at the table. Bribes that stop working. Cooking two separate dinners just so your child eats one green veggie. Eat Your Green is the gentle, pressure-free way to turn “no” into “yes” — and get your fussy eater (2–12) happily eating green veggies in as little as 7 days. No nagging, no guilt.",
  ctaPrimary: "See the books →",
  trust: "★ 4.8/5 · Loved by 5000+ Indian parents · Instant download",
  // TODO: replace with your exact "what you'll discover" points
  discover: {
    heading: "What you'll discover inside:",
    items: [
      "Creative ways to introduce greens",
      "Simple strategies to reduce picky eating",
      "The 4C method — Curiosity, Creativity, Connection, Consistency — to build confidence and reduce mealtime pressure",
      "Ideas that turn veggies into fun, play and discovery",
      "How to build curiosity before consumption",
      "How to create positive food experiences",
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
  heading: "Gentle books for calmer, healthier kids.",
  sub: "Pick the one that fits your family — from fussy eating to screen time. Each one is simple, gentle and instant to download.",
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

export const parentsKidsPain = {
  heading: "Mom & kids pain points",
  sub: "Mealtime stress goes both ways. Naming it is the first step to easing it.",
  parents: {
    title: "Why moms feel stressed",
    items: [
      "Your child is a picky eater",
      "Your child hates greens",
      "Every meal turns into a battle",
      "Your child only wants junk or fast food",
      "Fed up with bribing and negotiating",
      "Always running behind them with food",
    ],
  },
  kids: {
    title: "Why kids resist greens",
    items: [
      "They feel pressured every single time",
      "Greens feel boring",
      "Greens taste bitter or bland to them",
      "No variety — the same food again and again",
      "Greens are never fun",
      "They're always compared to other kids",
    ],
  },
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
    { title: "Creativity", icon: "Palette", body: "Playful ways to explore greens — games, colours and shapes." },
    { title: "Connection", icon: "Users", body: "Make the dinner table a happy place, not a battle." },
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
  heading: "What changes for your child",
  rows: [
    { before: "Pushes greens away", after: "Touches, smells and explores willingly" },
    { before: 'Says "I don\'t like it"', after: "Talks about greens with curiosity" },
    { before: "Refuses to touch new foods", after: "Helps in the kitchen and garden" },
    { before: "Mealtime becomes stressful", after: "Feels proud of every small achievement" },
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
  sub: "Get the free Fussy-Eater Rescue cheat sheet — 10 calm things to say at the table tonight that stop the fights, without bribes or tears. Instant download.",
  cta: "Send me the free cheat sheet",
  note: "Free PDF + a few genuinely helpful emails. Unsubscribe anytime.",
  file: "/lead-magnet/fussy-eater-rescue.pdf",
  fileName: "Fussy-Eater-Rescue-Eat-Your-Green.pdf",
  successHeading: "Here's your free cheat sheet! 🌱",
  successBody: "Your download should start automatically. If it doesn't, tap the button below — and keep an eye on your inbox.",
};

export const guarantee = {
  heading: "Your first win in 28 days — or your money back.",
  body:
    "Try it for a full 28 days. If your child isn't calmer and more curious about greens, just email us and we'll return your full money — no questions asked. The only risk is another month of cold, untouched dinners.",
};

export const finalCta = {
  heading: "Tonight's dinner can be different.",
  cta: "See the books",
  urgency: "Limited launch offer:",
};

export const about = {
  heading: "Why Eat Your Green exists",
  body: [
    "Eat Your Green started at a real dinner table — with cold food, short tempers, and a parent who had tried everything.",
    "The change wasn't a new recipe or a stricter rule. It was simply removing the pressure. When greens stopped being a fight, curiosity had room to grow.",
    "These gentle books are that simple approach, written down — calm methods and everyday activities that make it easy to follow, from fussy eating to screen time. No force. No bribes. No guilt.",
  ],
};

// Separate Author page — content & photo to be provided by you.
export const author = {
  name: "Prerna Sultania",
  title: "Parent · Founder · Children's Food Education Advocate",
  photo: "/images/author.jpg", // TODO: replace with Prerna's real standing photo
  bio: [
    "As a parent, I understand how confusing food and nutrition can feel in today's world.",
    "Children are surrounded by marketing, ultra-processed foods, screens, and endless messages about what they should eat.",
    "Like many parents, I found myself searching for practical, realistic ways to help children build healthier habits — without pressure, guilt, or perfection.",
    "That journey inspired the Eat Your Green Series — a collection of books designed to help families create positive food environments and raise confident eaters.",
    "My goal is simple: to help parents feel informed, empowered, and supported as they navigate the everyday challenges of feeding children in a modern food world.",
  ],
  quote: "Small changes create lifelong habits.",
  tagline: "Creator of the Eat Your Green Series — helping families raise confident eaters, one small step at a time.",
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
