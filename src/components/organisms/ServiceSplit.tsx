import { Container } from '../atoms/Container';
import { Button } from '../atoms/Button';
import { Icon } from '../atoms/Icon';

export function ServiceSplit() {
  return (
    <section className="relative bg-[#FAF0BC]/40">
      <Container size="xl">
        <div className="grid gap-6 py-16 sm:py-20 lg:grid-cols-2 lg:gap-8">
          <SplitCard
            eyebrow="For buyers"
            title="Buying Property"
            description="From the moment you spot a property to the day you collect the keys — every contract clause, search and settlement handled for you."
            points={[
              'Contract of Sale review before you sign',
              'Title, council & strata searches',
              'PEXA settlement & key collection',
            ]}
            ctaHref="#services"
            ctaLabel="Buying services"
            icon="key"
          />
          <SplitCard
            eyebrow="For sellers"
            title="Selling Property"
            description="Contract preparation, vendor disclosure and settlement coordination — so your sale moves smoothly from listing to settlement."
            points={[
              'Contract of Sale preparation',
              'Vendor disclosure documents',
              'Secure electronic settlement via PEXA',
            ]}
            ctaHref="#services"
            ctaLabel="Selling services"
            icon="document"
            highlighted
          />
        </div>
      </Container>
    </section>
  );
}

type SplitCardProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: string[];
  ctaHref: string;
  ctaLabel: string;
  icon: 'key' | 'document';
  highlighted?: boolean;
};

function SplitCard({
  eyebrow,
  title,
  description,
  points,
  ctaHref,
  ctaLabel,
  icon,
  highlighted = false,
}: SplitCardProps) {
  const wrap = highlighted
    ? 'bg-[#08162D] text-white ring-1 ring-[#D0A455]/30'
    : 'bg-white text-[#08162D] ring-1 ring-[#08162D]/8';
  const desc = highlighted ? 'text-white/75' : 'text-[#475569]';
  const point = highlighted ? 'text-white/85' : 'text-[#08162D]/85';

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-3xl p-8 shadow-[0_10px_30px_-12px_rgba(8,22,45,0.18)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-20px_rgba(8,22,45,0.35)] sm:p-10 ${wrap}`}
    >
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-30 blur-2xl"
        style={{ backgroundColor: highlighted ? '#D0A455' : '#FAF0BC' }}
      />
      <div className="relative flex items-center gap-3">
        <span
          className={`grid h-14 w-14 place-items-center rounded-2xl ${
            highlighted ? 'bg-[#D0A455] text-[#08162D]' : 'bg-[#FAF0BC] text-[#08162D]'
          }`}
        >
          <Icon name={icon} size={26} />
        </span>
        <span className={`text-xs font-semibold uppercase tracking-[0.22em] ${
          highlighted ? 'text-[#D0A455]' : 'text-[#D0A455]'
        }`}>
          {eyebrow}
        </span>
      </div>
      <h3 className={`relative mt-6 font-[family-name:var(--font-open-sans)] text-2xl font-extrabold sm:text-3xl ${
        highlighted ? 'text-white' : 'text-[#08162D]'
      }`}>
        {title}
      </h3>
      <p
        className={`relative mt-3 max-w-lg text-[15px] leading-relaxed ${desc}`}
        dangerouslySetInnerHTML={{ __html: description }}
      />
      <ul className="relative mt-6 space-y-3">
        {points.map((p) => (
          <li key={p} className={`flex items-center gap-3 text-sm ${point}`}>
            <span
              className={`grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                highlighted ? 'bg-[#D0A455]/20 text-[#D0A455]' : 'bg-[#FAF0BC] text-[#08162D]'
              }`}
            >
              <Icon name="check" size={12} />
            </span>
            {p}
          </li>
        ))}
      </ul>
      <div className="relative mt-8">
        <Button
          href={ctaHref}
          variant={highlighted ? 'primary' : 'secondary'}
          size="md"
          iconRight={<Icon name="arrow-right" size={16} />}
        >
          {ctaLabel}
        </Button>
      </div>
    </article>
  );
}
