import Image from "next/image";
import Link from "next/link";
import { author } from "@/data/content";
import Reveal from "@/components/Reveal";

export default function AuthorStrip() {
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-3xl">
        <Reveal>
          <div className="bg-white rounded-card border border-mist shadow-card p-6 md:p-8 flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative h-32 w-28 sm:h-40 sm:w-32 shrink-0 rounded-card overflow-hidden border border-mist bg-mist">
              {/* TODO: replace /images/author.jpg with Prerna's real photo */}
              <Image src={author.photo} alt={author.name} fill sizes="128px" className="object-cover" />
            </div>
            <div>
              <p className="small uppercase tracking-wide text-leaf font-semibold">Written by a parent, for parents</p>
              <h2 className="mt-1 text-h3 md:text-h2 text-forest font-heading">{author.name}</h2>
              <p className="small text-ink/60">{author.title}</p>
              <p className="mt-3 text-ink/85">{author.bio[2]}</p>
              <Link href="/author" className="mt-3 inline-block text-brand font-semibold underline">
                Read more about {author.name.split(" ")[0]} →
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
