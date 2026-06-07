import { SectionReveal } from "@/components/sections/SectionReveal";

const faqs = [
  {
    q: "Do you offer delivery?",
    a: "Yes — order via Zomato for delivery, or call us for takeaway. Dine-in is always welcome.",
  },
  {
    q: "What are your most popular dishes?",
    a: "Kurkure Momos and Yo China Special Noodles are crowd favourites. Gravy Manchurian with fried rice is another top combo.",
  },
  {
    q: "How do you handle food hygiene?",
    a: "We take hygiene seriously. If you ever have a concern, please speak to our staff or message us directly — we investigate every report.",
  },
  {
    q: "What is the average spend per person?",
    a: "Most guests spend ₹200–400 per person depending on appetite and add-ons.",
  },
];

export function FaqSection() {
  return (
    <SectionReveal className="px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 text-center" data-reveal>
          <p className="section-label">FAQ</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-charcoal">
            Common questions
          </h2>
        </div>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details
              key={faq.q}
              data-reveal
              className="surface-card group rounded-2xl p-5 open:shadow-md"
            >
              <summary className="cursor-pointer list-none font-medium text-charcoal marker:hidden [&::-webkit-details-marker]:hidden">
                {faq.q}
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-muted">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </SectionReveal>
  );
}
