import { Container } from '../atoms/Container';
import { SectionHeading } from '../atoms/SectionHeading';
import { ServiceCard } from '../molecules/ServiceCard';
import { Badge } from '../atoms/Badge';

const SERVICES = [
  {
    icon: 'home' as const,
    title: 'Sale & Purchase',
    description:
      'End-to-end conveyancing for residential and commercial property — from Contract of Sale through to PEXA settlement.',
    bullets: ['Residential homes & units', 'Commercial & industrial', 'PEXA e-settlement'],
  },
  {
    icon: 'key' as const,
    title: 'Off the Plan & Vacant Land',
    description:
      'Specialised review of off-the-plan and vacant land contracts, sunset clauses, strata documents and final inspections.',
    bullets: ['Strata report review', 'Sunset clause checks', 'Zoning & council checks'],
  },
  {
    icon: 'shield-check' as const,
    title: 'Pest & Building Inspection',
    description:
      'Coordination of independent pest and building inspections before exchange — so you know exactly what you’re buying.',
    bullets: ['Licensed inspector network', 'Pre-exchange reporting', 'Repair-cost guidance'],
  },
  {
    icon: 'scale' as const,
    title: 'Split Contract',
    description:
      'Structured house-and-land split contracts handled end-to-end — land transfer and building works coordinated cleanly.',
    bullets: ['Land + build coordination', 'Stamp duty optimisation', 'Builder liaison'],
  },
  {
    icon: 'document' as const,
    title: 'Transfer of Lease',
    description:
      'Lease transfers for tenants, landlords or business buyers — assigning rights and obligations correctly under NSW law.',
    bullets: ['Tenant & landlord consent', 'Bond & security transfer', 'Lease assignment'],
  },
  {
    icon: 'clock' as const,
    title: 'Simultaneous Settlement',
    description:
      'Selling and buying on the same day — coordinated cleanly so you avoid bridging finance and double-moves.',
    bullets: ['Sale + purchase same day', 'Lender coordination', 'Single move date'],
  },
  {
    icon: 'gavel' as const,
    title: 'JP Witnessing',
    description:
      'Official witnessing of statutory declarations, affidavits and certification of true copies — by appointment.',
    bullets: ['Stat decs & affidavits', 'Certified copies', 'On-site availability'],
  },
  {
    icon: 'building' as const,
    title: 'Strata Report',
    description:
      'Strata search and report review for apartments and townhouses — uncovering by-laws, levies, special funds and disputes.',
    bullets: ['Owners corporation records', 'Levy & special-fund review', 'By-law compliance'],
  },
  {
    icon: 'sparkle' as const,
    title: 'First Home Buyer Assistance',
    description:
      'Step-by-step help for first home buyers, including First Home Owner Grant and stamp duty concession applications.',
    bullets: ['FHOG application support', 'Stamp duty concessions', 'First-buyer roadmap'],
  },
  {
    icon: 'search' as const,
    title: 'Property Division',
    description:
      'Property settlements arising from divorce, family arrangements or business splits — handled with discretion and care.',
    bullets: ['Family law settlements', 'Title restructure', 'Stamp duty exemptions'],
  },
  {
    icon: 'key' as const,
    title: 'Separation on Title',
    description:
      'Removing or adding parties to title following separation, divorce or estate matters — done cleanly and quickly.',
    bullets: ['Title transfers', 'Spousal exemptions', 'Land Registry lodgement'],
  },
  {
    icon: 'users' as const,
    title: 'Part Tenancy & Related Party Transfers',
    description:
      'Transfers between family members, business partners or trusts — including part-ownership and related-party arrangements.',
    bullets: ['Family & spousal transfers', 'Trust & partnership transfers', 'Tenancy share changes'],
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
            description="From your first contract review to the final settlement, every step is handled by a licensed NSW conveyancer with fixed-fee transparency."
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
