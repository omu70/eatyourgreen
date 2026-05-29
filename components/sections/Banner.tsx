import Image from "next/image";
import Reveal from "@/components/Reveal";

export default function Banner({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="bg-cream">
      <div className="container-page py-8 md:py-12">
        <Reveal>
          <div className="relative w-full max-w-4xl mx-auto aspect-[3/2] rounded-card overflow-hidden shadow-card border border-mist">
            <Image src={src} alt={alt} fill sizes="(max-width:768px) 100vw, 900px" className="object-cover" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
