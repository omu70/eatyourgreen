import { SITE, RATING } from "@/lib/seo";
import { testimonials } from "@/data/testimonials";
import { faqs } from "@/data/faq";
import { books, type Book } from "@/data/books";

function Json({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export function HomeJsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}${SITE.logo}`,
    sameAs: [SITE.instagram],
  };
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: books.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE.url}/books/${b.slug}`,
      name: b.title,
    })),
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <Json data={org} />
      <Json data={itemList} />
      <Json data={faqPage} />
    </>
  );
}

export function BookJsonLd({ book }: { book: Book }) {
  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: book.title,
    description: book.metaDescription,
    brand: { "@type": "Brand", name: SITE.name },
    image: [`${SITE.url}${book.cover}`],
    offers: {
      "@type": "Offer",
      price: book.price,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      url: book.checkout,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: RATING.value,
      reviewCount: RATING.count,
    },
    review: testimonials.map((t) => ({
      "@type": "Review",
      reviewRating: { "@type": "Rating", ratingValue: t.stars, bestRating: 5 },
      author: { "@type": "Person", name: t.name },
      reviewBody: t.quote,
    })),
  };
  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: book.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  return (
    <>
      <Json data={product} />
      <Json data={faqPage} />
    </>
  );
}
