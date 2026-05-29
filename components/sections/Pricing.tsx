import { Check } from "lucide-react";
import { plans } from "@/data/pricing";
import { pricingCopy } from "@/data/content";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CTAButton from "@/components/CTAButton";
import Reveal from "@/components/Reveal";

export default function Pricing() {
  return (
    <section id="pricing" className="section bg-cream">
      <div className="container-page max-w-4xl">
        <Reveal>
          <h2 className="text-h2 md:text-h2-lg text-forest text-center">{pricingCopy.heading}</h2>
          <p className="mt-3 text-center text-ink/75 prose-measure mx-auto">{pricingCopy.sub}</p>
        </Reveal>

        <div className="mt-10 grid md:grid-cols-2 gap-6 items-stretch">
          {plans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.08} className="h-full">
              <Card
                className={`relative p-6 md:p-7 h-full flex flex-col ${
                  plan.popular ? "border-gold border-2 md:scale-[1.03] shadow-lg" : ""
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gold" className="shadow-card">★ Most Popular</Badge>
                  </div>
                )}
                <h3 className="text-h3 md:text-h3-lg text-forest">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-ink/40 line-through">₹{plan.oldPrice.toLocaleString("en-IN")}</span>
                  <span className="text-4xl font-heading font-bold text-forest">
                    ₹{plan.price.toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="text-ink/70 text-sm mt-1">{plan.blurb}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-ink/85 text-sm">
                      <Check className="h-4 w-4 text-leaf shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <CTAButton
                    href={plan.href}
                    plan={plan.id}
                    label={plan.cta}
                    size="lg"
                    className="w-full"
                  />
                </div>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="mt-6 text-center small text-ink/70">{pricingCopy.bothLine}</p>
          <p className="mt-2 text-center text-2xl tracking-wide" aria-label="Accepted payments">
            💳 🏦 📱 UPI
          </p>
        </Reveal>
      </div>
    </section>
  );
}
