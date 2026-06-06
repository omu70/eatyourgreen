import TestimonialCarousel from "@/components/TestimonialCarousel";
import Reveal from "@/components/Reveal";

export default function Testimonials() {
  return (
    <section className="section bg-cream">
      <div className="container-page">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">Moms just like you</h2>
        </Reveal>
        <div className="mt-8 max-w-4xl mx-auto">
          <TestimonialCarousel />
        </div>
      </div>
    </section>
  );
}
