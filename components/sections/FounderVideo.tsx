import Reveal from "@/components/Reveal";

export default function FounderVideo() {
  return (
    <section className="section bg-cream">
      <div className="container-page max-w-3xl text-center">
        <Reveal>
          <p className="text-sm font-heading font-semibold text-brand uppercase tracking-wide">A message from the author</p>
          <h2 className="mt-2 text-h2 md:text-h2-lg text-forest">Why we made Eat Your Green</h2>
          <p className="mt-3 text-ink/75 prose-measure mx-auto">
            A quick hello from Prerna — the parent behind the books.
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          {/* Branded frame around the author video */}
          <div className="mt-8 mx-auto max-w-sm rounded-[26px] p-2.5 bg-gradient-to-br from-forest to-leaf shadow-card">
            <video
              autoPlay
              muted
              loop
              playsInline
              controls
              preload="auto"
              className="w-full h-auto block rounded-[18px] bg-black"
            >
              <source src="/founder-clean.mp4" type="video/mp4" />
              Your browser doesn&rsquo;t support embedded video.
            </video>
          </div>
          <p className="mt-3 text-xs text-ink/50">▶ Playing on mute — tap the video to turn on sound.</p>
        </Reveal>
      </div>
    </section>
  );
}
