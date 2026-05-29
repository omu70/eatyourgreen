export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  stars: number;
  avatar: string; // TODO: client supplies real avatars
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "I stopped forcing my daughter to eat greens. This guide changed how I talk, cook and react at the table — now she tries willingly, without tears.",
    name: "Ananya M.",
    role: "mom of a 4-year-old",
    stars: 5,
    avatar: "/images/avatar-1.png",
  },
  {
    quote:
      "The Weekend Activities section made all the difference. Instead of arguments, we now have curiosity and play. My child actually talks about vegetables now.",
    name: "Neha K.",
    role: "working mom",
    stars: 5,
    avatar: "/images/avatar-2.png",
  },
  {
    quote:
      "I didn't need another diet or recipe plan. I needed someone to tell me to slow down and trust the process. This gave me confidence, not guilt.",
    name: "Lakshmi S.",
    role: "mom of a picky eater",
    stars: 4,
    avatar: "/images/avatar-3.png",
  },
  {
    quote:
      "Nothing felt overwhelming. Small steps, simple games, and so much reassurance that I wasn't doing anything 'wrong' as a parent.",
    name: "Ritika",
    role: "first-time mom",
    stars: 5,
    avatar: "/images/avatar-4.png",
  },
];
