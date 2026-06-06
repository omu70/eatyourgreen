import Image from "next/image";
import Link from "next/link";
import { author } from "@/data/content";
import { getContent } from "@/lib/site-data";
import Reveal from "@/components/Reveal";

export default async function AuthorStrip() {
  const c = await getContent();
  const name = c.authorName || author.name;
  const title = c.authorTitle || author.title;
  const photo = c.authorPhoto || author.photo;
  const bio = c.authorBio && c.authorBio.length ? c.authorBio : author.bio;
  const snippet = bio[bio.length - 1] || bio[0] || "";
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-3xl">
        <Reveal>
          <div className="bg-white rounded-card border border-mist shadow-card p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative h-32 w-28 sm:h-40 sm:w-32 shrink-0 rounded-card overflow-hidden border border-mist bg-mist">
              <Image src={photo} alt={name} fill sizes="128px" className="object-cover" />
            </div>
            <div>
              <p className="small uppercase tracking-wide text-leaf font-semibold">Written by a parent, for parents</p>
              <h2 className="mt-1 text-h3 md:text-h2 text-forest font-heading">{name}</h2>
              <p className="small text-ink/60">{title}</p>
              <p className="mt-3 text-ink/85">{snippet}</p>
              <Link href="/author" className="mt-3 inline-block text-brand font-semibold underline">
                Read more about {name.split(" ")[0]} →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
