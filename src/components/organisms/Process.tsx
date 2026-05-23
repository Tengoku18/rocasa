import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { ProcessStep } from '../molecules/ProcessStep';

const STEPS = [
  {
    title: 'Free initial consultation',
    description:
      'Send us your property details and the Contract of Sale. We respond within one business day with a clear, fixed-fee quote.',
  },
  {
    title: 'Contract review & due diligence',
    description:
      'We comb the contract for risk — special conditions, easements, zoning, disclosure. You get a plain-English summary of what to negotiate before you sign.',
  },
  {
    title: 'Searches & cooling-off',
    description:
      'Title, council, zoning and strata searches are completed. We liaise with your lender and the other side to keep settlement on track.',
  },
  {
    title: 'PEXA electronic settlement',
    description:
      'Funds and title transfer securely via PEXA. You collect the keys — we handle every detail behind the scenes.',
  },
];

export function Process() {
  return (
    <section id="process" className="bg-white py-20 sm:py-28">
      <Container size="xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="How it works"
              title={
                <>
                  A simple, predictable{' '}
                  <span className="text-[#D0A455]">four-step process.</span>
                </>
              }
              description="Whether you're a first-home buyer or a seasoned investor, you'll always know exactly what's happening with your matter — and what's next."
            />
          </div>
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#FAF0BC]/40 p-8 ring-1 ring-[#D0A455]/20 sm:p-10">
              {STEPS.map((step, i) => (
                <ProcessStep
                  key={step.title}
                  step={i + 1}
                  title={step.title}
                  description={step.description}
                  last={i === STEPS.length - 1}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
