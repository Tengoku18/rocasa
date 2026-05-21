import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { TestimonialCard } from '../molecules/TestimonialCard';

const TESTIMONIALS = [
  {
    quote:
      'Khem flagged a structural issue our building inspector missed and renegotiated the price. The combined service literally paid for itself.',
    author: 'Priya & Daniel R.',
    role: 'First-home buyers, Parramatta',
  },
  {
    quote:
      'Calm, organised, and brutally clear on the contract. We settled three days early thanks to the PEXA process.',
    author: 'Marcus T.',
    role: 'Investor, Sydney CBD',
  },
  {
    quote:
      'The dilapidation report was court-ready and saved us in a dispute with our neighbour\'s builder. Highly recommended.',
    author: 'Sarah K.',
    role: 'Homeowner, North Sydney',
  },
];

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-[#FAF0BC]/40 py-20 sm:py-28">
      <Container size="xl">
        <SectionHeading
          align="center"
          eyebrow="Client stories"
          title={
            <>
              Trusted by buyers, sellers and{' '}
              <span className="text-[#D0A455]">developers across NSW.</span>
            </>
          }
          description="A small selection of recent matters — names abbreviated for privacy."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.author} {...t} />
          ))}
        </div>
      </Container>
    </section>
  );
}
