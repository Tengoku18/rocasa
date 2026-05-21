import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { ServiceCard } from '../molecules/ServiceCard';
import { Badge } from '../atoms/Badge';

const SERVICES = [
  {
    icon: 'document' as const,
    title: 'Contract of Sale Review',
    description:
      'A thorough review of every clause before you sign — special conditions, easements, zoning and disclosure obligations.',
    bullets: ['Plain-English summary', 'Risk flagged in 48hrs', 'Negotiation guidance'],
  },
  {
    icon: 'home' as const,
    title: 'Property Settlement',
    description:
      'End-to-end management of your settlement, with secure PEXA electronic transfer of funds and title.',
    bullets: ['Title & council searches', 'Liaison with lenders', 'PEXA e-settlement'],
  },
  {
    icon: 'building' as const,
    title: 'Structural Inspection',
    description:
      'Engineer-led pre-purchase inspection identifying defects, movement and compliance issues before you commit.',
    bullets: ['On-site assessment', 'Detailed photo report', 'Repair-cost guidance'],
  },
  {
    icon: 'shield-check' as const,
    title: 'Dilapidation Survey',
    description:
      'Independent dilapidation reporting for neighbouring works, council requirements or insurance disputes.',
    bullets: ['Pre & post-works surveys', 'NSW compliant', 'Court-ready evidence'],
  },
  {
    icon: 'gavel' as const,
    title: 'JP Witnessing',
    description:
      'Official witnessing of statutory declarations, affidavits and certification of true copies — by appointment.',
    bullets: ['Stat decs & affidavits', 'Certified copies', 'On-site availability'],
  },
  {
    icon: 'key' as const,
    title: 'Off-the-Plan Purchases',
    description:
      'Specialised review of complex off-the-plan contracts, sunset clauses, strata documents and final inspections.',
    bullets: ['Strata report review', 'Sunset clause checks', 'Final inspection support'],
  },
];

export function Services() {
  return (
    <section id="services" className="relative bg-white py-20 sm:py-28">
      <Container size="xl">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Services"
            title={
              <>
                A complete toolkit for{' '}
                <span className="text-[#D0A455]">buying, selling & building</span>{' '}
                in NSW
              </>
            }
            description="From the first inspection to the final settlement, every step is handled by a licensed conveyancer with a structural engineering background."
          />
          <Badge tone="cream">NSW-wide · PEXA accredited</Badge>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {SERVICES.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </Container>
    </section>
  );
}
